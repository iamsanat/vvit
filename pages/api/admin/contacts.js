import clientPromise from "../../../mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db("your_database_name"); // Use the default database from the connection URI
  const collection = db.collection("contacts"); // Replace with your collection name

  if (method === "GET") {
    // Pagination logic
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    try {
      const totalEntries = await collection.countDocuments();
      const contacts = await collection.find().skip(skip).limit(parseInt(limit)).toArray();

      res.status(200).json({
        success: true,
        data: contacts,
        totalPages: Math.ceil(totalEntries / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else if (method === "DELETE") {
    // Handling DELETE request to remove an entry
    const { id } = req.body;

    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'Entry not found.' });
      }
      
      res.status(200).json({ success: true, message: "Entry deleted successfully!" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
  }
}
