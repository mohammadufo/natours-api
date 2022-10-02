const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB Connection Successful!'));

//* Read File

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//* import data in to database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('DATA successfuly loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//* Delete All data from database

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfuly deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
