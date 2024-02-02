const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'memo',
});

// 一覧画面
app.get('/', (req, res) => {
  try {
    connection.query('SELECT * FROM memo', (error, results) => {
      res.render('list.ejs', { items: results });
    });
  } catch (e) {
    console.log(e);
  }
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
