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
    let info = await request.json();
    
    await connectDB();

    function cleanSpaces(str) {
      return str.trim().replace(/\s+/g, " ");
    }

    let polishedInfo = {
      name: cleanSpaces(info.name),
      email: info.email?cleanSpaces(info.email):"",
      message: cleanSpaces(info.message),
    };


    let newMessage = new Contact({
      name: polishedInfo.name,
      email: (polishedInfo.email == "")?"not provided":polishedInfo.email,
      message: polishedInfo.message,
      createdAt: Date.now(),
    });

    await newMessage.save();
    // await mongoose.disconnect();

    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ status: 400 });
  }
}
