const client = require('./connection.js');
const express = require('express');
const app = express();

app.listen(3000, (req, res) => {
    console.log('Express API is running at port 3000');
})

client.connect();

app.get('/getData', (req, res) => {
    client.query(`Select * from admin`,(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/getData/:id', (req, res) => {
    client.query(`Select * from admin where id=${req.params.id}`,(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/insertData', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into admin(id, username, email, phone_no) 
                       values(${user.id}, '${user.username}', '${user.email}', '${user.phone_no}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/updateUser/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `UPDATE admin
                       set email = '${user.email}',
                       username = '${user.username}',
                       phone_no = '${user.phone_no}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/deleteUser/:id', (req, res)=> {
    let insertQuery = `delete from admin where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})