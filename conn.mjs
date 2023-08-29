// // import dotenv from "dotenv";
// // dotenv.config();
// import { MongoClient } from "mongodb"; 
// const connectionString = process.env.ATLAS_URI || "WEF";

// // const client = new MongoClient(connectionString);

// let conn;

// // try{
// //     conn = await client.connect();
// // }catch(e){
// //     console.error("Error when connecting");
// // }

// // let db = conn.db("sample_analytics");
// console.log(connectionString)

// // export default db;

const mongoose = require('mongoose');
require('dotenv').config();