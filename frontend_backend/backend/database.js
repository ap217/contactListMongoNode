// // database.js
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// const url = 'mongodb+srv://adi217:lZ2UZkzEawHMdNOA@cluster0.znthyyr.mongodb.net/?retryWrites=true&w=majority';

// let db;

// async function connectToDatabase() {
//   const client = await MongoClient.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   db = client.db('contacts');
//   console.log('Connected to MongoDB');
// }

// function getDatabase() {
//   return db;
// }

// module.exports = {
//   connectToDatabase,
//   getDatabase,
// };


// database.js
const { MongoClient } = require('mongodb');

let db = null;

async function connectDatabase() {
  const uri = 'mongodb+srv://<username>:<password>@cluster0.znthyyr.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db('<your-database-name>');
    console.log('Database connected');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
}

function getDatabase() {
  return db;
}

module.exports = { connectDatabase, getDatabase };
