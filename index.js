
const DbConnect = require('./src/config/DbConnection.js')
const app =  require('./app.js')


const PORT = 8000||process.env.PORT

app.listen(PORT, ()=>{
    DbConnect();
    console.log(`server is running at http://localhost:${PORT}`);
})