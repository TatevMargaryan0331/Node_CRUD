var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static("public"));

app.param('team_id', function(req, res, next, team_id) {

    Team.findOne(team_id, function(err, team) {

        if (err) {
            return next(err);
        }
        if (!team) {
            throw new Error("no team matched");
        }
        req.team = team;
        next();
    });
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/form.html"));
});

// app.post("/addName", (req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;
//     console.log("Received data: ", name, age);
//     //res.status(200).send("Data received successfully");
//     res.redirect("/");
// });

app.listen(3000, function() {
    console.log("Example is running on port 3000");
});

// const mongoose = require('mongoose');

// // Replace the connection string with your MongoDB connection string
// const connectionString = 'mongodb+srv://TatevMargaryan0331:saymynameMao17@cluster0.s13geds.mongodb.net/?retryWrites=true&w=majority';


// // Connect to MongoDB
// mongoose.connect(connectionString, { useUnifiedTopology: true });

// // Check the connection
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => {
// console.log('Connected to MongoDB!');
// // You can add additional code here for testing or other operations
// // Make sure to close the connection when you're done
// mongoose.connection.close();
// });

const mongoose = require('mongoose');
const { log } = require("console");

// Define a Mongoose schema and model for the Person collection
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = mongoose.model('Person', personSchema);

// Replace the connection string with your MongoDB connection string
const connectionString = 'mongodb+srv://TatevMargaryan0331:saymynameMao17@cluster0.s13geds.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(connectionString);

// Check the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB!');

  try {
    // Retrieve data from the Person collection
    const people = await Person.find(); // Retrieve all documents
    //console.log(db);
    //console.log(db.Collection);
    const result = mongoose.connection.db.collection("sample_mflix").find.toArray();
    console.log('Retrieved data:', result);
  } catch (error) {
    console.error('Error retrieving data:', error);
  } finally {
    // Make sure to close the connection when you're done
    mongoose.connection.close();
  }
});