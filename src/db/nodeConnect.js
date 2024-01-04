import { MongoClient } from "mongodb";
const URL = process.env.MONGODB_URI;
const database = process.env.DATA_BASE;
const client = new MongoClient(URL);
async function nodeConnect() {
  let result = await client.connect();
  let db = result.db(database);
  return db.collection("data");
}
export default nodeConnect;
