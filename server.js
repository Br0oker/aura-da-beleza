const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    // Rota da página inicial (formulário)
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (pathname === '/processar-formulario') {
    // Rota para processar o formulário
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const formData = parseFormData(body);
        // Salvar os dados em um arquivo ou realizar outras operações
        console.log(formData);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Obrigado por enviar o formulário!</h1>');
      });
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

function parseFormData(formData) {
  const params = {};
  const formFields = formData.split('&');

  formFields.forEach((field) => {
    const [key, value] = field.split('=');
    params[key] = decodeURIComponent(value);
  });

  return params;
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
