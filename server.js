const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});