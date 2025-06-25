import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
  try {
    const databaseId = process.env.NOTION_ETF_DB_ID!;
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Is published?',
        checkbox: { equals: true },
      },
    });

    const etfs = response.results.map(page => {
      const props = (page as any).properties;
      return {
        id: page.id,
        name: props.Name?.title?.[0]?.plain_text || "",
        description: props.Description?.rich_text?.[0]?.plain_text || "",
        slug: props.Slug?.rich_text?.[0]?.plain_text || "",
        readingTime: props["Reading Time"]?.rich_text?.[0]?.plain_text || "",
        published: props["Is published?"]?.checkbox || false,
        tags : props.Tags?.select?.name || "",
      };
    });

    return new Response(JSON.stringify(etfs), {
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