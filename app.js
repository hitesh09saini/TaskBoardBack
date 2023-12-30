require('dotenv').config();
const  express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
	origin: 'https://task-boardbyhitesh.netlify.app/',
	credentials: true
}));

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