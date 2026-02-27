import { NextRequest, NextResponse } from 'next/server';
import archiver from 'archiver';
import { SectionInstance } from '@/types/builder';
import { generateLiquidSection } from '@/lib/compiler/liquidGenerator';

export async function POST(req: NextRequest) {
  try {
    const { sections } = (await req.json()) as { sections: SectionInstance[] };

    // Create a zip archive in memory
    const archive = archiver('zip', { zlib: { level: 9 } });

    // 1. layout/theme.liquid
    const themeLiquid = `
<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>{{ page_title }}</title>
    {{ content_for_header }}
    <style>
      body { margin: 0; font-family: sans-serif; }
      * { box-sizing: border-box; }
    </style>
  </head>
  <body>
    {{ content_for_layout }}
  </body>
</html>
    `;
    archive.append(themeLiquid, { name: 'layout/theme.liquid' });

    // 2. templates/index.json
    const indexJson: any = {
      sections: {},
      order: [],
    };

    sections.forEach((section, index) => {
      const sectionId = `builder_${section.type}_${index}`;
      indexJson.sections[sectionId] = {
        type: section.type,
        settings: section.settings,
      };
      indexJson.order.push(sectionId);
    });

    archive.append(JSON.stringify(indexJson, null, 2), { name: 'templates/index.json' });

    // 3. sections/*.liquid
    // We only need to generate one .liquid file per section TYPE
    const uniqueTypes = Array.from(new Set(sections.map((s) => s.type)));
    uniqueTypes.forEach((type) => {
      const sampleSection = sections.find((s) => s.type === type)!;
      const liquidContent = generateLiquidSection(sampleSection);
      archive.append(liquidContent, { name: `sections/${type}.liquid` });
    });

    // 4. config/settings_schema.json
    const settingsSchema = [
      {
        name: 'theme_info',
        theme_name: 'Shopify Builder Theme',
        theme_version: '1.0.0',
        theme_author: 'AI Builder',
        theme_documentation_url: 'https://example.com',
        theme_support_url: 'https://example.com',
      },
    ];
    archive.append(JSON.stringify(settingsSchema, null, 2), { name: 'config/settings_schema.json' });

    // Finalize the archive
    archive.finalize();

    // Convert Node.js Readable stream to Web ReadableStream
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    
    archive.on('data', (chunk) => writer.write(chunk));
    archive.on('end', () => writer.close());
    archive.on('error', (err) => writer.abort(err));

    return new NextResponse(readable, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="shopify-theme.zip"',
      },
    });
  } catch (error) {
    console.error('Theme generation error:', error);
    return NextResponse.json({ error: 'Failed to generate theme' }, { status: 500 });
  }
}
