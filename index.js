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

// 新規登録API
app.post('/create', (req, res) => {
  try {
    connection.query('INSERT INTO memo (name) VALUES (?)', [req.body.name], (error, results) => {
      connection.query('SELECT * FROM memo', (error, results) => {
        res.redirect('/');
      });
    });
  } catch (e) {
    console.log(e);
  }
});

// 編集画面
app.get('/edit/:id', (req, res) => {
  try {
    connection.query('SELECT * FROM memo WHERE id = ?', [req.params.id], (error, results) => {
      res.render('edit.ejs', { item: results[0] });
    });
  } catch (e) {
    console.log(e);
  }
});

// 編集API
app.post('/edit/:id', (req, res) => {
  const now = new Date();
  connection.query(
    'UPDATE memo SET name = ? , update_dt = ? WHERE id = ?',
    [req.body.name, now, req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
