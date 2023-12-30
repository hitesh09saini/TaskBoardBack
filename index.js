const DbConnect = require('./src/config/DbConnection.js');
const app = require('./app.js');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  DbConnect();
  console.log(`Server is running at http://localhost:${PORT}`);
});
