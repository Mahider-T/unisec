//Load environment variables

// import './loadEnvironment.mjs';

import { MongoClient } from "mongodb"; 
   
const uri = 'mongodb+srv://myAtlasDBUser:mdwTlPeA9kaZXczP@myatlasclusteredu.nymdmy1.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    return;
  }
  console.log('Connected to MongoDB Atlas');

  // Start your Express app or perform other operations
});

     