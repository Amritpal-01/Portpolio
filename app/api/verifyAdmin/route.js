/** @format */
import { NextResponse } from "next/server";



export async function POST(request) {
  try {
    let info = await request.json();
    
    if(info.username == "Amritpal Singh" && info.password == "Portfolio@2221x"){
        return NextResponse.json({ status: 200 , message : "user signed in"});
    }else{
        return NextResponse.json({ status: 500, message : "incorrect username or password" });
    }

  } catch {
    return NextResponse.json({ status: 400, message: "internal server error" });
  }
}
