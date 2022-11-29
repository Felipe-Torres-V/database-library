const express = require('express');
const connection = require('./connection').connected;
const app = express();

app.use(express.json()) 

app.get("/livros",(req,res) => {
  connection.query('SELECT * FROM biblioteca', (error, result) => {
    if (error) {res.send('error')}
    return res.send(result);
  })
})

app.get("/livros/:id",(req,res) => {
  const {id} = req.params;
  connection.query(`SELECT * FROM biblioteca WHERE id = ${id}`, (error, result) => {
    if (error) {res.send('error')}
    return res.send(result)
  })
})

app.post("/livros",(req,res) => {
  const {title, author} = req.body;
  connection.query(`SELECT * FROM biblioteca WHERE title = '${title}' AND author = '${author}'`, (err, result) => {
    if (err) {res.send('error');}
    if (result.length) {
      return res.send('This book has already been registered')}
    connection.query(`INSERT INTO biblioteca(title, author) VALUES('${title}', '${author}')`, (error, result) => {
      if (error) {res.send('error')}
      return res.send(result)
    })
})})

app.put("/livros",(req,res) => {
  const {id, title, author} = req.body;
  connection.query(`UPDATE biblioteca SET title = '${title}', author = '${author}' WHERE id = ${id}`, (error, result) => {
    if (error) {res.send('error')}
    return res.send(result)
  })
})

app.delete("/livros/:id",(req,res) => {
  const {id} = req.params;
  connection.query(`DELETE FROM biblioteca WHERE id = ${id}`, (error,result) => {
    if (error) {res.send('error')}
    return res.send(result)
  })
})

app.listen(3000, () => {
    console.log('Server is running');
})
// * 