import { readFile } from 'fs/promises';
import { resolve } from 'path';
import type { Route } from './+types/assets.$';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const assetPath = params['*'];

  if (!assetPath) {
    throw new Response('Not Found', { status: 404 });
  }

  try {
    const fullPath = resolve(process.cwd(), 'content', 'blog', 'assets', assetPath);
    const file = await readFile(fullPath);

    // Determine content type based on file extension
    const ext = assetPath.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';

    switch (ext) {
      case 'webp':
        contentType = 'image/webp';
        break;
      case 'png':
        contentType = 'image/png';
        break;
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      case 'svg':
        contentType = 'image/svg+xml';
        break;
    }

    return new Response(file as unknown as BodyInit, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    throw new Response('Not Found', { status: 404 });
  }
};
