import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
const dynamicOpenGraphPlugin = () => {
  return {
    name: 'dynamic-opengraph-meta',
    transformIndexHtml(html: string, ctx: any) {
      const urlStr = ctx?.originalUrl || ctx?.server?.req?.url || '';
      const queryIdx = urlStr.indexOf('?');
      if (queryIdx !== -1) {
        try {
          const searchParams = new URLSearchParams(urlStr.slice(queryIdx));
          const toParam = searchParams.get('to') || searchParams.get('guest');
          if (toParam && toParam.trim()) {
            const guestName = decodeURIComponent(toParam.trim());
            const titleText = `Thân mời ${guestName} tham dự đám cưới của Việt Hoàng & Thái Bình`;
            const descText = `Thân mời ${guestName} tham dự đám cưới của Việt Hoàng & Thái Bình. Nhấn vào liên kết để xem chi tiết thiệp cưới, thời gian, địa điểm và gửi lời chúc tốt đẹp nhất.`;

            return html
              .replace(/<title>.*?<\/title>/, `<title>${titleText}</title>`)
              .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${titleText}" />`)
              .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${titleText}" />`)
              .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${descText}" />`)
              .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${descText}" />`)
              .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${descText}" />`);
          }
        } catch {
          // fallback to default html
        }
      }
      return html;
    },
  };
};

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), dynamicOpenGraphPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
