/** @format */
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Contact from "@/app/models/Contact";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${process.env.MONGODB_URI}/test`);
  }
}

export async function POST(request) {
  try {
    let info = await request.json();

    await connectDB();

    await Contact.deleteOne({message : info.message});
    
    await mongoose.disconnect();

    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ status: 400 });
  }
}
