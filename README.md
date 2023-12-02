# Exercise Tracker

## Overview
This Exercise Tracker project allows users to track their exercise routines and view their exercise logs.

## Live API Endpoints Address
`https://exercisetracker.harviando.repl.co/api/`
<p><sub><i>*If the server was not up the first time, please retry in 30 seconds.</i></sub></p>

## Features

- **User Registration**: Users can sign up and create an account.
- **Logging Exercises**: Users can log exercises by providing descriptions, durations, and dates.
- **Viewing Logs**: Users can view their exercise logs.
- **Filtering Logs**: Users can filter logs by date range and limit the number of logs displayed.

## Technologies Used

- **Node.js**: Backend JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database used for data storage.
- **Mongoose**: MongoDB object modeling for Node.js.
- **React**: Frontend library for building user interfaces.

## API Endpoints

### User Routes

- **POST /api/users**: Register a new user.
- **GET /api/users/:_id/logs**: Retrieve exercise logs for a specific user.

### Exercise Routes

- **POST /api/users/:_id/exercises**: Log a new exercise for a user.

<hr>
<p align="right"><sub><i>Created by Muhammad Harviando - 2023</i></sub></p>
