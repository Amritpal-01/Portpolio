/** @format */
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Contact from "@/app/models/Contact";

// Optional: DB connection helper to avoid duplicate connections
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
}

export async function POST(request) {
  try {
    // Connect to DB
    await connectDB();

    // Fetch all contact entries
    const contacts = await Contact.find();

    // Optional: Disconnect (only in dev mode or scripts — usually not in production APIs)
    await mongoose.disconnect();

    // Return response
    return NextResponse.json({ status: 200, data: contacts });
  } catch (error) {
    console.error("POST Error:", error.message);

    // Try to disconnect only if connected
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }

    return NextResponse.json({ status: 400, error: error.message });
  }
}
