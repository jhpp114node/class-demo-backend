// import data
let { data, UIDs } = require("./data");
const generateID = require("./services");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

console.log(UIDs);
// middleware
// Nelly said we are receiving data as an object {...}
// a npm package call bodyparser was being used but it is deprecated
// therefore use express.something
// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  console.log(data.length);
  res.status(200).send("Good morninig!");
});

app.get("/destination", (req, res) => {
  console.log(data);
  res.send(data);
});

// It handles
// GET Method /search?destination=xxx or /search?location=xxx
app.get("/search", (req, res) => {
  // console.log(req.query.destination);
  let result = [];
  if (req.query.destination === undefined && req.query.location !== undefined) {
    result = data.filter((eachData) => {
      return eachData.location === req.query.location;
    });
    if (result === null || result === undefined || result.length === 0) {
      res.send("We do not have that location in our data");
    } else {
      res.send(result);
    }
  } else if (
    req.query.destination !== undefined &&
    req.query.location === undefined
  ) {
    result = data.filter((eachData) => {
      return eachData.destination === req.query.destination;
    });
    if (result === null || result === undefined || result.length === 0) {
      res.send("We do not have that destination in our data");
    } else {
      res.send(result);
    }
  } else {
    res.send(
      "Fail to retrieve data from data.js. Need query parameters {destination= or location=}"
    );
  }
  // console.log(result);
});

// POST method
app.post("/destination", (req, res) => {
  console.log("GOT a POST request");
  const { destination, location, photoURL, description } = req.body;
  // console.log(receivedObj);
  if (
    destination === undefined ||
    destination.length === 0 ||
    location === undefined ||
    description.length === 0
  ) {
    return res
      .status(400)
      .send({ error: "Destination and location are required" });
  }
  // adding on to the array of obj in data.js
  data.push({
    id: generateID(),
    destination,
    location,
    photoURL:
      photoURL !== undefined && photoURL.length > 0
        ? photoURL
        : "https://images.unsplash.com/photo-1621415780222-5a62b90a7b50?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    description,
  });
  console.log(data);
  return res.status(200).json({ success: "Create success" });
});

// PUT method
app.put("/destination/:id", (req, res) => {
  let doesExit = false;
  // find the object based on users
  console.log("Got a PUT request");
  const targetId = req.params.id;
  if (targetId === undefined || targetId.length === 0) {
    return res.status(400).send({ error: "Id required" });
  }
  const { destination, location, photoURL, description } = req.body;
  if (
    destination === undefined ||
    destination.length === 0 ||
    location === undefined ||
    description.length === 0
  ) {
    return res
      .status(400)
      .send({ error: "Destination and location are required" });
  }
  const result = data.map((eachData) => {
    if (Number(eachData.id) === Number(targetId)) {
      doesExit = true;
      eachData.destination = destination;
      eachData.location = location;
      eachData.photoURL = photoURL;
      eachData.description = description;
    }
    return eachData;
  });
  if (!doesExit) {
    return res.status(400).json({ fail: "data does not exist" });
  }
  data = result;
  return res.status(200).json({ success: "Update success" });
});

// Delete method
app.delete("/destination/:id", (req, res) => {
  console.log("Got a DELETE request");
  if (req.body.destination === undefined || req.body.description.length === 0) {
    return res.status(400).json({ error: "Destination cannot be empty" });
  }
  const targetId = req.params.id;
  console.log(targetId);
  const result = data.filter((eachData) => {
    console.log(eachData.id);
    return Number(eachData.id) !== Number(targetId);
  });
  if (data.length === result.length) {
    return res.status(400).json({ fail: "data does not exist" });
  }
  data = result;
  return res.status(200).json({ success: "Delete success" });
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Fail to load the page</h1>");
});

app.listen(PORT, () => {
  console.log("Server listening to " + PORT);
});
