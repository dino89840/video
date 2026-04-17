import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("movieDB");
  const { id } = req.query;

  if (req.method === "POST") {
    const movie = JSON.parse(req.body);
    const result = await db.collection("movies").insertOne(movie);
    res.json(result);
  } else if (id) {
    const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
    res.json(movie);
  } else {
    const movies = await db.collection("movies").find({}).toArray();
    res.json(movies);
  }
}
