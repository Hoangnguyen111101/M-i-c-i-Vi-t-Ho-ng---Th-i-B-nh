import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = Number(process.env.PORT) || 3000;

// Dynamic OpenGraph handler for crawlers and visitors (Facebook, Zalo, iMessage, etc.)
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  const url = req.path;

  // Let express.static handle assets
  if (url.includes('.') && !url.endsWith('.html')) {
    return next();
  }

  const toParam = (req.query.to || req.query.guest || '') as string;
  const distHtmlPath = path.resolve(__dirname, 'dist', 'index.html');
  const indexHtmlPath = fs.existsSync(distHtmlPath)
    ? distHtmlPath
    : path.resolve(__dirname, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    return next();
  }

  try {
    let html = fs.readFileSync(indexHtmlPath, 'utf-8');
    if (toParam && toParam.trim()) {
      const guestName = decodeURIComponent(toParam.trim());
      const titleText = `Thân mời ${guestName} tham dự đám cưới của Việt Hoàng & Thái Bình`;
      const descText = `Thân mời ${guestName} tham dự đám cưới của Việt Hoàng & Thái Bình. Nhấn vào liên kết để xem chi tiết thiệp cưới, thời gian, địa điểm và gửi lời chúc tốt đẹp nhất.`;

      html = html
        .replace(/<title>.*?<\/title>/, `<title>${titleText}</title>`)
        .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${titleText}" />`)
        .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${titleText}" />`)
        .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${descText}" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${descText}" />`)
        .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${descText}" />`);
    }
    return res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(html);
  } catch {
    return next();
  }
});

// Serve production built assets from dist
app.use(express.static(path.resolve(__dirname, 'dist')));

// Fallback to index.html for SPA
app.get('*', (_req, res) => {
  const distHtml = path.resolve(__dirname, 'dist', 'index.html');
  if (fs.existsSync(distHtml)) {
    res.sendFile(distHtml);
  } else {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
