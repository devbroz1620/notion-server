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

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

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
    const article = {
      id: page.id,
      title: props.Name?.title?.[0]?.plain_text || "",
      category: props.Categories?.select?.name || 
                (props.Categories?.multi_select?.map((cat: any) => cat.name).join(", ") || ""),
      readingTime: props["Reading time"]?.rich_text?.[0]?.plain_text || "",
      slug: props.Slug?.rich_text?.[0]?.plain_text || "",
      published: props["Is Published?"]?.checkbox || false,
      content: contentString,
      description : props.Description?.rich_text?.[0]?.plain_text || "",
    };
    return new Response(JSON.stringify(article), {
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