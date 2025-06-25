import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NextRequest } from 'next/server';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pageId } = await params;
    // Fetch page properties and markdown content concurrently
    const [page, mdBlocks] = await Promise.all([
      notion.pages.retrieve({ page_id: pageId }),
      n2m.pageToMarkdown(pageId),
    ]);
    const { parent: contentString } = n2m.toMarkdownString(mdBlocks);
    const props = (page as any).properties;
    const debt = {
      id: page.id,
      name: props.Name?.title?.[0]?.plain_text || "",
      category: props.Select?.select?.name || "",
      slug: props.Slug?.rich_text?.[0]?.plain_text || "",
      readingTime: props["Reading Time"]?.rich_text?.[0]?.plain_text || "",
      published: props["Is Published?"]?.checkbox || false,
      content: contentString,
      description : props.Description?.rich_text?.[0]?.plain_text || "",
    };
    return new Response(JSON.stringify(debt), {
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