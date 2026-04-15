import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 3000;

// This redirects all traffic to the target blocked site
app.use('/', createProxyMiddleware({ 
    target: 'https://blocked-site.com', 
    changeOrigin: true,
    followRedirects: true,
    // Setting these headers can help mimic real browser traffic
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy active! Access it at http://localhost:${PORT}`);
});
