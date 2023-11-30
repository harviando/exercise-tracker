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
const exercise = mongoose.model("Exercise", ExerciseSchema);

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })); // middleware to extract req body
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Creating API

// API 1
app.post('/api/users', async (req, res) => {
  const user_name = req.body.username;
  const userObj = new User({
    username: user_name,
  });
  
  try {
    
    const user = await userObj.save();
    console.log(user);
    res.json(user);
    
  } catch (error) {
    
    console.log(error);
    
  }
});

// [UPDATE] able to save the data on the database but the database name keeps labeled 'test' like wtf change it please
// [TIMESTAMP] 8:33




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
