var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
var app = express();

const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://TatevMargaryan0331:saymynameMao17@cluster0.s13geds.mongodb.net/sample_mflix';
mongoose.connect(connectionString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', async () => {
//   console.log('Connected to MongoDB! ');
//   try {
//     // await db.collection('movies').updateOne({title : "Street Angel"}, {$set: {year : 2020}})

//     // var filter = {title : "Street Angel"};
//     // var update = {$set: {year : 2020}};
//     // await db.collection('movies').findOneAndUpdate(filter,update)//,
//     //   {
//     //   new: true
//     // });

//     // var filter = {title : "Street Angel"};
//     // var update = {$set: {
//     //   runtime : 222,
//     //   plot : "My dear Angel",
//     //   countries : ["Germany"]
//     // }};
//     // await db.collection('movies').findOneAndUpdate(filter,update)

//     // await db.collection('users').deleteOne({name : "Robert Baratheon"})


//   } catch (error) {
//     console.error('Error retrieving data:', error);
//   } finally {
//     // Make sure to close the connection when you're done
//     mongoose.connection.close();
//   }
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", async function(req, res) {
    // res.sendFile(path.join(__dirname, "./public/form.html"));
    var info = [
      { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
      { name: 'Tux', organization: "Linux", birth_year: 1996},
      { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];

    mongoose.connect(connectionString);
    const db = mongoose.connection;
    let theatersArr = await db.collection('theaters').find({"location.address.city" : "Bloomington"}).toArray();

    res.render('../public/form.ejs', {
      theatersArr : theatersArr
  });
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
