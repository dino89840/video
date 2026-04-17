import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("movieDB");

  if (req.method === "POST") {
    try {
      const movie = req.body;
      const result = await db.collection("movies").insertOne(movie);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Failed to insert" });
    }
  } else if (req.query.id) {
    try {
      const movie = await db.collection("movies").findOne({ _id: new ObjectId(req.query.id) });
      return res.status(200).json(movie);
    } catch (error) {
      return res.status(404).json({ error: "Movie not found" });
    }
  } else {
    try {
      const movies = await db.collection("movies").find({}).toArray();
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch movies" });
    }
  }
}
