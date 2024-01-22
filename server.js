var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
var app = express();

const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://TatevMargaryan0331:saymynameMao17@cluster0.s13geds.mongodb.net/sample_mflix';
// mongoose.connect(connectionString);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));

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

app.listen(3000, function() {
    console.log("Example is running on port 3000");
});

app.post("/addName", async(req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  mongoose.connect(connectionString);
  const db = mongoose.connection;
  db.once('open', async () => {
    console.log('Connected to MongoDB! ');
    try {
      await db.collection('users').insertOne({
        "name": name,
        "email": email,
        "password": password
      }); 
    } catch (error) {
      console.error('Error retrieving data:', error);
    } finally {
      // Make sure to close the connection when you're done
      mongoose.connection.close();
    }
  });  

});

