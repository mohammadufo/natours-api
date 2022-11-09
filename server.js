const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');

mongoose
  .connect(process.env.LOCALDATABASE)
  .then(() => console.log('DB Connection Successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
