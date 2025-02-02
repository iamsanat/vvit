import clientPromise from '../../mongodb';
import rateLimit from 'express-rate-limit'; // Rate limiting library


// Rate Limiter middleware (limit to 5 requests per IP per 10 minutes)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Apply rate limiter middleware
    limiter(req, res, async () => {
      const { name, phoneNumber, message, deviceId } = req.body;

      // Check for dummy or placeholder phone numbers (like '1234567890')
      const dummyNumbers = [
        "1234567890", "1111111111", "0000000000", "9876543210"
      ];
      if (dummyNumbers.includes(phoneNumber)) {
        return res.status(400).json({ success: false, error: 'Dummy phone number detected.' });
      }

      // Step 2: Check if the phone number already exists in the database
      try {
        const clientDb = await clientPromise;
        const db = clientDb.db('your_database_name'); // Replace with your database name
        const collection = db.collection('contacts'); // Replace with your collection name
        const messageLogCollection = db.collection('message_logs'); // To track message count for phone numbers

        // Step 3: Check if phone number already exists in the contacts collection
        const existingContact = await collection.findOne({ phoneNumber });
        if (existingContact) {
          return res.status(400).json({ success: false, error: 'Phone number already in use.' });
        }

        // Step 4: Check if device ID exceeds request limit (5 requests)
        const deviceCollection = db.collection('device_requests');
        const deviceRequest = await deviceCollection.findOne({ deviceId });

        // Increment request count for the device
        if (deviceRequest) {
          await deviceCollection.updateOne({ deviceId }, { $inc: { count: 1 } });
        } else {
          await deviceCollection.insertOne({ deviceId, count: 1 });
        }

        // Step 5: Insert the new contact into the contacts collection
        const result = await collection.insertOne({ name, phoneNumber, message });

        // Send success response
        res.status(200).json({ success: true, message: 'Data saved successfully!', result });

      } catch (error) {
        console.error('Error with database or validation:', error);
        res.status(500).json({ success: false, error: 'Failed to save data.' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
