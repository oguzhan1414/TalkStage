import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await context.params;
    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse('Path required', { status: 400 });
    }

    // Resolve path inside root videos directory: d:/ingilizce/videos
    const possibleRoots = [
      path.resolve(process.cwd(), 'videos'),
      path.resolve(process.cwd(), '..', 'videos'),
      'd:/ingilizce/videos',
      'D:/ingilizce/videos',
    ];
    const videosRoot = possibleRoots.find((p) => fs.existsSync(p)) || path.resolve(process.cwd(), '..', 'videos');
    const targetFile = path.resolve(videosRoot, ...pathSegments);

    // Prevent directory traversal
    if (!targetFile.startsWith(videosRoot)) {
      return new NextResponse('Access denied', { status: 403 });
    }

    if (!fs.existsSync(targetFile)) {
      return new NextResponse('File not found', { status: 404 });
    }

    const stat = fs.statSync(targetFile);
    if (stat.isDirectory()) {
      return new NextResponse('Cannot stream directory', { status: 400 });
    }

    const fileSize = stat.size;
    const range = req.headers.get('range');

    const ext = path.extname(targetFile).toLowerCase();
    const contentType =
      ext === '.mp4'
        ? 'video/mp4'
        : ext === '.webm'
          ? 'video/webm'
          : ext === '.json'
            ? 'application/json'
            : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.png'
                ? 'image/png'
                : 'application/octet-stream';

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const stream = fs.createReadStream(targetFile, { start, end });

      // Convert Node.js stream to Web ReadableStream
      const webStream = new ReadableStream({
        start(controller) {
          stream.on('data', (chunk) => controller.enqueue(chunk));
          stream.on('end', () => controller.close());
          stream.on('error', (err) => controller.error(err));
        },
        cancel() {
          stream.destroy();
        },
      });

      return new NextResponse(webStream, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize.toString(),
          'Content-Type': contentType,
        },
      });
    }

    const stream = fs.createReadStream(targetFile);
    const webStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
      cancel() {
        stream.destroy();
      },
    });

    return new NextResponse(webStream, {
      headers: {
        'Content-Length': fileSize.toString(),
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
      },
    });
  } catch (error) {
    console.error('Video streaming error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
