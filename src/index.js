import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import nodeConnect from "./db/nodeConnect.js";
import mongodb from "mongodb";
import userRoutes from "./routes/userRoutes.js";
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongo db connection failed", err);
  });
app.use("/api/user", userRoutes);
app.get("/", async (req, res) => {
  let data = await nodeConnect();
  let dataq = await data.find().toArray();
  res.send(dataq);
});
app.post("/", async (req, res) => {
  let data = await nodeConnect();
  let dadq = await data.insertOne(req.body);
  res.send(dadq);
});
app.put("/", async (req, res) => {
  let data = await nodeConnect();
  let dadq = await data.updateOne(
    { email: "sharoz@gmail.com" },
    { $set: { name: "sharoz khan" } }
  );
  res.send(dadq);
});
app.delete("/:id", async (req, res) => {
  let data = await nodeConnect();
  let dataz = await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(dataz);
});
