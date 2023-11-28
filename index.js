const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

//Import MongoDB library
const mongoose = reuire('mongoose');
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
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
