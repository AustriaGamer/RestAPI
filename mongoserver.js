const express = require("express");
const bodyParser = require("body-parser");
const { query } = require("express");
const mongo = require("mongodb").MongoClient;

// Ein Docker MongoDB Container auf meinem Laptop
const url = "mongodb://172.17.0.2:27017/";

let db;

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error("Bling:" + err);
      return;
    } else {
      console.log("found");
    }
    db = client.db("students");
    console.log("running");
  }
);

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/students", async (req, res) => {
  let data = await findMongoData();
  res.send(data);
  logSend(data);
});

app.get("/student/:id", async (req, res) => {
  id = req.params.id;
  const data = await findMongoData(id);
  res.send(data);
  logSend(data);
});

app.post("/student", async (req, res) => {
  let student = req.body;
  res.send(await postMongoData(student))
});

app.post("/students", async (req, res) => {
  let student = req.body;
  res.send(await postMongoData(student))
});

app.delete("/student/:id", (req, res) => {
  id = req.params.id;
  let student = students.findIndex((element) => element.id == id);
  students.splice(student, 1);

  res.send(students);
});

app.put("/student/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let student = students.findIndex((element) => element.id == id);
  students[student] = data;
  res.send(students);
  logSend(students);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);

function logSend(data) {
  console.log(data, "was sent");
}
async function findMongoData(id = undefined) {
  return new Promise((resolve) => {
    if (id == undefined) {
      db.collection("students")
        .find({}, { projection: { _id: 0 } })
        .toArray(function (err, result) {
          if (err) throw err;
          resolve(result);
        });
    } else {
      const query = { id: parseInt(id) };
      db.collection("students").findOne(
        query,
        { projection: { _id: 0 } },
        function (err, result) {
          if (err) throw err;
          resolve(result);
        }
      );
    }
  });
}

async function postMongoData(data) {
  console.log("🚀 ~ file: mongoserver.js ~ line 108 ~ postMongoData ~ data", data)
  return new Promise((resolve) => {
    
    if (Array.isArray(data.students )) {
      db.collection("students")
        .insertMany(data.students)
        resolve(data.students);
    } else {
      db.collection("students").insert(
        data
      );
      resolve(data)
    }
  });
}