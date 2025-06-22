import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(request: Request) {
  try {
    const databaseId = process.env.NOTION_DB_ID!;
    const db = await notion.databases.retrieve({ database_id: databaseId });
    const categoryProperty = db.properties.Categories as any;
    
    let categories: string[] = [];
    if (categoryProperty?.type === 'select') {
      categories = categoryProperty.select.options.map((opt: any) => opt.name.replace(/ /g, '_'));
    } else if (categoryProperty?.type === 'multi_select') {
      categories = categoryProperty.multi_select.options.map((opt: any) => opt.name.replace(/ /g, '_'));
    }

    return new Response(JSON.stringify({ categories }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}