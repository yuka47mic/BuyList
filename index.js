const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));

// 一覧画面
app.get('/', (req, res) => {
  res.render('list.ejs');
});

// 新規作成画面
app.get('/create', (req, res) => {
  res.render('create.ejs');
});

// 編集画面
app.get('/edit/:id', (req, res) => {
  res.render('edit.ejs');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
