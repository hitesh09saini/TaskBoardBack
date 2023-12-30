require('dotenv').config();
const  express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ping-pong

app.get('/', (req, res)=>{
   res.json({
     message: 'server is running '
   })
})

// routes


// user routes
const UserRoutes = require('./src/Routes/user.routes')
app.use('/api/v1/user', UserRoutes);


// list create 
const ListRoutes = require('./src/Routes/list.routes')
app.use('/api/v1/list', ListRoutes)

module.exports =  app;