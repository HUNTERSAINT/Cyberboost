const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const root = __dirname;
http.createServer((req,res)=>{
 const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file = path.join(root, pathname === '/' ? 'index.html' : pathname.replace(/^\\/+/,''));
 if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
 fs.readFile(file,(err,data)=>{
  if(err){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Not found');}
  const ext=path.extname(file); const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
  res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream','Cache-Control':'public, max-age=60'});res.end(data);
 });
}).listen(port,'0.0.0.0',()=>console.log('CyberBoostHub listening on '+port));
