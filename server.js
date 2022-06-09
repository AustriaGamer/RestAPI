const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
let students = [{"id":1, "name":"Deniz"},{"id":2, "name":"Dustin"}]

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/students', (req, res) => {
    res.send(students);
    logSend(students);
});

app.get('/student/:id', (req, res) => {
    id = req.params.id;
    let student = students.find(element => element.id == id)
    res.send(student);
    logSend(student);
});

app.post('/students', (req, res) => {
    let student = req.body;
    students.push(student)
    res.send(student)
    console.log(student,"was posted");
});

app.delete('/student/:id', (req, res) => {
    id = req.params.id;
    let student = students.findIndex(element => element.id == id)
    students.splice(student,1)

    res.send(students);
});

app.put('/student/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body
    let student = students.findIndex(element => element.id == id)
    students[student] = data
    res.send(students);
    logSend(students);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

function logSend(data){
    console.log(data, "was sent")
}