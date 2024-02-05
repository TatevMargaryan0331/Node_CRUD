var express = require("express");
var path = require("path");
const bodyParser = require('body-parser');
var app = express();
const { ObjectId } = require('mongoose').Types;

const mongoose = require('mongoose');
const { log } = require("console");
const connectionString = 'mongodb+srv://TatevMargaryan0331:saymynameMao17@cluster0.s13geds.mongodb.net/AccountingPrograms';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));

app.get("/", async function(req, res) {
  mongoose.connect(connectionString);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', async () => {
    console.log('Connected to MongoDB!');
    try {
      var result = await db.collection("Users").find().toArray();
      res.render('../public/form.ejs', {
        obj: result
      });
    } catch (error) {
      console.error('Error retrieving data:', error);
    } finally {
      mongoose.connection.close();
    }
  });
});

app.get("/update/:id", async function(req, res) {
    var id = req.params.id;
    mongoose.connect(connectionString);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('Users').findOne({_id: new ObjectId(id)});
            res.render('../public/update.ejs', {
                obj: result
            });
        } catch (error) {
            console.error('Error retrieving users:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.get("/delete/:id", function (req, res) {
	var id = req.params.id;
	   mongoose.connect(connectionString);
	   const db = mongoose.connection;
	   db.on('error', console.error.bind(console, 'Connection error:'));
	   db.once('open', async () => {
		   try {
			   await mongoose.connection.db.collection('Users').deleteOne({_id: new ObjectId(id)});
			   res.redirect('/')
			} catch (error) {
			   console.error('Error retrieving users:', error);
		   } finally {
			   mongoose.connection.close();
		   }
	   })
});

app.post("/updateData", function (req, res) {
    const name = req.body.name;
    const surname = req.body.surname;
    const bithDate = req.body.bithDate;
    const age = req.body.age;
    const horoscope = req.body.horoscope;
    const chineseZodiak = req.body.chineseZodiak;
    const tarot = req.body.tarot;
	const id = req.body.id;

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once('open', async () => {
        console.log('Connected to MongoDB!');

        try {
            await mongoose.connection.db.collection('Users').updateOne(
                { _id: new ObjectId(id) },
                { $set: { name: name, surname: surname, bithDate: bithDate, age: age, horoscope: horoscope, chineseZodiak: chineseZodiak, tarot: tarot } }
            );

            res.redirect('/')
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            mongoose.connection.close();
        }
    });
});

app.post('/addName', async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const bithDate = req.body.bithDate;
    const age = req.body.age;
    const horoscope = req.body.horoscope;
    const chineseZodiak = req.body.chineseZodiak;
    const tarot = req.body.tarot;

    console.log(req.body, 'body of request');

	mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            await mongoose.connection.db.collection('Users').insertOne({
                name: name,
                surname: surname,
                bithDate: bithDate,
                age: age,
                horoscope: horoscope,
				chineseZodiak: chineseZodiak,
				tarot: tarot
            })
            res.redirect('/');
        } catch (error) {
            console.error('Error retrieving users:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.listen(3000, function() {
    console.log("Example is running on port 3000");
});
