// Proxy for backend links
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    ['/api', '/api/v1/'],
    createProxyMiddleware({
      target: 'http://localhost:4000'
    })
  );
};
