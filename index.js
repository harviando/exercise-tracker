const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

//Import MongoDB library
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connecting to the database
mongoose.connect(process.env['MONGO_URI'])

// Creating User Schema
const UserSchema = new Schema({
  username: String,
});
const User = mongoose.model("User", UserSchema);

// Creating Exercise Schema
const ExerciseSchema = new Schema({
  user_id: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
});
const Exercise = mongoose.model("Exercise", ExerciseSchema);

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })); // middleware to extract req body
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Creating API

//GET users
app.get('/api/users', async (req, res) => {
  const users = await User.find({}).select('_id username'); // This is like a SQL query that specify which field you want to ouput
  if (!users) {
    res.send('No users found');
  } else {
    res.json(users);
  }
});

// API 1
app.post('/api/users', async (req, res) => {
  const userName = req.body.username;
  const userObj = new User({
    username: userName,
  });
  
  try {
    const user = await userObj.save();
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error); 
  }
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  const id = req.params._id;
  const  { description, duration, date } = req.body;

  try {
    const user = await User.findById(id);
    
    if (!user) {
      res.send("User not found");
    } else {
      const exerciseObj = new Exercise({
        user_id: user._id,
        description,
        duration: parseInt(duration),
        date: date ? new Date(date) : new Date(),
      });
      const exercise = await exerciseObj.save();
      res.json({
        _id: user._id,
        username: user.username,
        date: new Date(exercise.date).toDateString(),
        duration: exercise.duration,
        description: exercise.description,
      });
      console.log({
        _id: user._id,
        username: user.username,
        date: new Date(exercise.date).toDateString(),
        duration: exercise.duration,
        description: exercise.description,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: 'Error saving exercise',
    });
  }
});


// [UPDATE] able to save exercise and console log the result
// [TIMESTAMP] 15.01


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
