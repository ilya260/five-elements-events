const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json; charset=utf-8'};
http.createServer((req,res)=>{
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
  catch { res.writeHead(400);return res.end('Bad request'); }
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  let file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403);return res.end('Forbidden'); }
  if (!path.extname(file)) file += '.html';
  fs.readFile(file,(err,content)=>{
    if(err){res.writeHead(404);return res.end('Not found');}
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    res.end(content);
  });
}).listen(3000,'127.0.0.1',()=>console.log('http://localhost:3000/'));
