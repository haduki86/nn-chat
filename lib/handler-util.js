'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Cookies = require('cookies');
const { currentThemeKey } = require('../config');
const pug = require('pug');

const imageFiles = [
  'IMG_0727.jpeg',
  'IMG_0076.jpeg',
  'IMG_0077.jpeg',
  'IMG_0078.jpeg',
  'IMG_0080.jpeg',
  'IMG_0081.jpeg',
  'IMG_0345.jpeg',
  'IMG_0348.jpeg',
];

function getRandomImagePath() {
  const imageFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  return `/${imageFile}`;
}

function handleLogout(req, res) {
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf8',
    'Cache-Control': 'no-store'
  });
  res.end(pug.
    renderFile('./views/logout.pug', {
      imagePath: getRandomImagePath()
    }));
}

function handleChangeTheme(req, res) {
  const cookies = new Cookies(req, res);
  const currentTheme = (cookies.get(currentThemeKey) !== 'light' ? 'light' : 'dark');
  cookies.set(currentThemeKey, currentTheme);
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}

function handleFavicon(req, res) {
  res.writeHead(200, {
    'Content-Type': 'image/vnd.microsoft.icon',
    'Cache-Control': 'public, max-age=604800'
  });
  const favicon = fs.readFileSync('./favicon.ico');
  res.end(favicon);
}

function handleImageFile(req, res) {
  const imageFile = req.url.slice(1);
  if (!imageFiles.includes(imageFile)) {
    handleNotFound(req, res);
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'image/jpeg',
  });
  const file = fs.readFileSync(path.join(__dirname, '..', imageFile));
  res.end(file);
}

function handleStyleCssFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/css',
  });
  const file = fs.readFileSync('./public/style.css');
  res.end(file);
}

function handleNnChatJsFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/javascript',
  });
  const file = fs.readFileSync('./public/nn-chat.js');
  res.end(file);
}

function handleNotFound(req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(pug.renderFile('./views/404.pug', {
    imagePath: getRandomImagePath()
  }));
}

function handleBadRequest(req, res) {
  res.writeHead(400, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('未対応のリクエストです');
}

function handleForbidden(req, res) {
  res.writeHead(403, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('この操作を実行する権限がありません');
}

module.exports = {
  handleLogout,
  handleNotFound,
  handleBadRequest,
  handleForbidden,
  handleFavicon,
  handleImageFile,
  handleStyleCssFile,
  handleNnChatJsFile,
  handleChangeTheme,
};
