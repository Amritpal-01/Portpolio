/** @format */
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Contact from "@/app/models/Contact";


async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${process.env.MONGODB_URI}/test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const contacts = await Contact.find();

    // await mongoose.disconnect();

    return NextResponse.json({ status: 200, data: contacts });
    
  } catch (error) {
    console.error("POST Error:", error.message);

    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }

    return NextResponse.json({ status: 400, error: error.message });
  }
}
