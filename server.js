var express = require("express");
var path = require("path");
const bodyParser = require('body-parser');
var app = express();
const { ObjectId } = require('mongoose').Types;

const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://TatevMargaryan0331:saymynameMao17@cluster0.s13geds.mongodb.net/AccountingPrograms';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));

// var usersArr = [
//   ["Janik", "Ghulyan", 20/11/2000, 24, "Scorpio", "Dragon", "The Pope"],
//   ["Tatev", "Margaryan", 31/3/2003, 21, "Aries", "Sheep", "The Hanged Man"],
//   ["Varduhi", "Babayan", 17/2/2001, 23, "Aquarius", "Snake", "(Death) - unnamed"],
//   ["Aram", "Azabyan", 9/2/1990, 34, "Aquarius", "Horse", "The Empress"],
//   ["Nikolay", "Shurupov", 22/10/1976, 48, "Libra", "Dragon", "The Wheel of Fortune"]
// // ["Aram", "Khachturyan", 25/3/2000, 24, "Aries", "Dragon", "The Hanged Man"],
// // ["Garik", "Mirzoyan", 17/5/1998, 26, "Taurus", "Tiger", "The Emperor"],
// // ["Arman", "Bezhanyan", 19/3/2000, 24, "Pisces", "Dragon", "The Devil"],
// // ["Tigran", "Mkrtchyan", 23/9/2002, 22, "Libra", "Horse", "The Moon"],
// // ["Artur", "Manukyan", 11/3/1972, 52, "Pisces", "Rat", "The Lovers"]
// // ["Mariam", "Nikoghosyan", 27/7/1999, 25, "Leo", "Rabbit", "Justice"],
// // ["Vladimir", "Grigoryan", 11/7/1992, 32, "Cancer", "Monkey", "The Empress"],
// // ["Samvel", "Torosyan", 11/4/2000, 24, "Aries", "Dragon", "Justice"],
// // ["Seryoja", "Petrosyan", 17/8/1992, 32, "Leo", "Monkey", "The Wheel of Fortune"],
// // ["Khachik", "Avetisyan", 17/2/1992, 32, "Taurus", "Monkey", "The Empress"]
// // ["Varduhi", "Avalyan", 17/8/1968, 56, "Leo", "Monkey", "The Emperor"],
// // ["Hayk", "Gevorgyan", 19/1/1992, 32, "Capricorn", "Monkey", "The Pope"],
// // ["Naira", "Mkrtchyan", 17/1/1969, 55, "Capricorn", "Rooster", "The Chariot"],
// // ["Andranik", "Harutyunyan", 8/4/1987, 22, "Aries", "Rabbit", "The Wheel of Fortune"],
// // ["Lilia", "Setrakyan", 23/12/1972, 52, "Capricorn", "Rat", "The Hermit"]
// // ["Artak", "Gevorgyan", 15/5/1983, 41, "Taurus", "Pig", "The Pope"],
// // ["Meri", "Aghababyan", 5/3/1993, 31, "Pisces", "Rooster", "The Empress"],
// // ["Arpine", "Meselyan", 1/9/2002, 22, "Virgo", "Horse", "Temperance"],
// // ["Mane", "Simonyan", 29/7/1988, 36, "Leo", "Dragon", "Justice"],
// // ["Artak", "Azabyan", 23/6/1988, 36, "Cancer", "Dragon", "The Wheel of Fortune"]
// // ["Garnik", "Zakaryan", 20/4/1989, 35, "Aries", "Snake", "The Lovers"],
// // ["Shushan", "Gyulkhasyan", 15/7/1950, 74, "Cancer", "Tiger", "The Wheel of Fortune"],
// // ["Irina", "Shahinyan", 21/6/1973, 51, "Cancer", "Ox", "Strength"],
// // ["Susanna", "Shahinyan", 21/12/1970, 54, "Sagittarius", "Dog", "The Pope"],
// // ["Arusik", "Petrosyan", 6/5/1997, 27, "Taurus", "Ox", "The Wheel of Fortune"]
// // ["Eleonor", "Harutyunyan", 1/12/1997, 27, "Sagittarius", "Ox", "The Empress"],
// // ["Raya", "Martirosyan", 13/12/2002, 22, "Sagittarius", "Horse", "Strength"],
// // ["Ella", "Sharafyan", 13/10/1953, 22, "Libra", "Snake", "The Pope"]
// ];

// function FillData(Arr, Collection) {
//   for (let index = 0; index < Arr.length; index++) {

// 	mongoose.connect(connectionString);
// 	const db = mongoose.connection;
// 	db.on('error', console.error.bind(console, 'Connection error:'));
// 	db.once('open', async () => {
// 	  console.log('Connected to MongoDB!');

// 	  try {
// 		const element = Arr[index];

// 		db.collection(Collection).insertOne({
// 		"name": element[0],
// 		"surname": element[1],
// 		"bithDate": element[2],
// 		"age": element[3],
// 		"horoscope": element[4],
// 		"chineseZodiak": element[5],
// 		"tarot": element[6]
// 		});
// 	  } catch (error) {
// 		console.error('Error retrieving data:', error);
// 	  } finally {
// 		mongoose.connection.close();
// 	  }
// 	});
//   }
// }

// mongoose.connect(connectionString);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', async () => {
//   console.log('Connected to MongoDB!');

//   try {
//     // const User =
// 	await Users.createCollection();
//     // FillData(usersArr, "Users");
//   } catch (error) {
//     console.error('Error retrieving data:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// });

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
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('Users').findOne({_id: new ObjectId(id)});
            res.render('../public/update.ejs', {
                obj: result
            });
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.get("/delete/:id", function (req, res) {
	var id = req.params.id;
	   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
	   const db = mongoose.connection;
	   db.on('error', console.error.bind(console, 'Connection error:'));
	   db.once('open', async () => {
		   try {
			   let result = await mongoose.connection.db.collection('Users').deleteOne({_id: new ObjectId(id)});
			   res.redirect('/')
			} catch (error) {
			   console.error('Error retrieving movies:', error);
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
            let result = await mongoose.connection.db.collection('Users').updateOne(
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

	mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            let result = await mongoose.connection.db.collection('Users').insertOne({
                name: name,
                surname: surname,
                bithDate: bithDate,
                age: age,
                horoscope: horoscope,
				chineseZodiak: chineseZodiak,
				tarot: tarot
            })
            res.redirect('/')
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.listen(3000, function() {
    console.log("Example is running on port 3000");
});
