import { Client } from '@notionhq/client';
import { NextRequest } from 'next/server';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoryName: string }> }
) {
  try {
    const { categoryName } = await params;
    const databaseId = process.env.NOTION_DEBT_DB_ID!;
    const category = decodeURIComponent(categoryName).replace(/_/g, ' ');
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Is Published?',
            checkbox: { equals: true },
          },
          {
            property: 'Select',
            select: { equals: category },
          },
        ],
      },
    });

    const debts = response.results.map(page => {
      const props = (page as any).properties;
      return {
        id: page.id,
        name: props.Name?.title?.[0]?.plain_text || "",
        category: props.Select?.select?.name || "",
        slug: props.Slug?.rich_text?.[0]?.plain_text || "",
        readingTime: props["Reading Time"]?.rich_text?.[0]?.plain_text || "",
        published: props["Is Published?"]?.checkbox || false,
      };
    });

    return new Response(JSON.stringify(debts), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
} 