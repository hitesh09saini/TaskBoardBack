const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS middleware
app.use(cors({
  origin: process.env.CLIENT, // You can use a specific origin or '*' for any origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ping-pong
app.get('/', (req, res) => {
  res.json({
    message: 'server is running',
  });
});

// routes
// user routes
const UserRoutes = require('./src/Routes/user.routes');
app.use('/api/v1/user', UserRoutes);

// list create
const ListRoutes = require('./src/Routes/list.routes');
app.use('/api/v1/list', ListRoutes);



module.exports = app;
