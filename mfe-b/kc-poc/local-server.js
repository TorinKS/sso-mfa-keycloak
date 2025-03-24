const express = require('express'),
  http = require('http'),
  cors = require('cors'),
  app = express(),
  port = 3000;

const server = http.createServer(app);
app.use(cors());

app.use(express.static('dist/mf-kc'));

app.get('/', (req, res) => {
  res.redirect('/assets');
});

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
  const url = `http://localhost:${port}`;
  const start = (process.platform === 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
  require('child_process').exec(start + ' ' + url);
});
