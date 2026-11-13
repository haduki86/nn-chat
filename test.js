'use strict';
const pug = require('pug');
const test = require('node:test');
const assert = require('node:assert');

test('チャットメッセージに含まれる HTML タグがエスケープされる', () => {
  const html = pug.renderFile(
    './views/posts.pug',
    {
      posts: [
        {
          id: 1,
          content: '<script>alert("XSS!");</script>',
          postedBy: 'test_user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      user: 'test_user',
    },
  );

  // メッセージの <script> タグがエスケープされていることをチェック
  assert(html.includes('&lt;script&gt;alert(&quot;XSS!&quot;);&lt;/script&gt;'));
});

test('投稿一覧にナビゲーションが一つだけ表示され、投稿本文が必須になる', () => {
  const html = pug.renderFile('./views/posts.pug', {
    posts: [],
    user: 'test_user',
    currentTheme: 'light',
    oneTimeToken: 'token',
  });

  assert.equal((html.match(/<nav\b/g) || []).length, 1);
  assert.match(html, /<textarea[^>]*name="content"[^>]*required/);
});

test('投稿者には指定されたアイコン付きの編集フォームを表示する', () => {
  const html = pug.renderFile('./views/posts.pug', {
    posts: [
      {
        id: 1,
        content: '編集対象',
        postedBy: 'test_user',
        createdAt: new Date(),
      },
      {
        id: 2,
        content: '他のユーザーの投稿',
        postedBy: 'other_user',
        createdAt: new Date(),
      },
    ],
    user: 'test_user',
    currentTheme: 'light',
    oneTimeToken: 'token',
  });

  assert.equal((html.match(/action="\/posts\/edit"/g) || []).length, 1);
  assert.match(html, /class="bi bi-pencil-square"/);
  assert.match(html, /<textarea[^>]*>編集対象<\/textarea>/);
});

test('404画面とログアウト画面に渡された画像を表示する', () => {
  const imagePath = '/IMG_0077.jpeg';
  const notFoundHtml = pug.renderFile('./views/404.pug', { imagePath });
  const logoutHtml = pug.renderFile('./views/logout.pug', { imagePath });

  assert.match(notFoundHtml, /src="\/IMG_0077\.jpeg"/);
  assert.match(logoutHtml, /src="\/IMG_0077\.jpeg"/);
});