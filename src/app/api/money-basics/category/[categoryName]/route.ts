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
  { params }: { params: { categoryName: string } }
) {
  try {
    const databaseId = process.env.NOTION_DB_ID!;
    const category = decodeURIComponent(params.categoryName).replace(/_/g, ' ');

    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          and: [
            {
              property: 'Is Published?',
              checkbox: {
                equals: true,
              },
            },
            {
              property: 'Categories',
              multi_select: {
                contains: category,
              },
            },
          ],
        },
      });

    const articles = response.results.map(page => {
      const props = (page as any).properties;
      return {
        id: page.id,
        title: props.Name?.title?.[0]?.plain_text || "",
        category: props.Categories?.select?.name || 
                  (props.Categories?.multi_select?.map((cat: any) => cat.name).join(", ") || ""),
        readingTime: props["Reading time"]?.rich_text?.[0]?.plain_text || "",
        slug: props.Slug?.rich_text?.[0]?.plain_text || "",
        published:props["Is Published?"]?.checkbox || false,
      };
    });

    return new Response(JSON.stringify(articles), {
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