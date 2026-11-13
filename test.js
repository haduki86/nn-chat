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