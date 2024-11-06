import {
  connectDatabase,
  deleteDocument,
  getAllDocuments,
  insertDocument,
  updateDocument,
} from "@/Servises/mongo";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
//su

export async function GET(req: Request) {
  try {
    let client = await connectDatabase();
    const data = await getAllDocuments(client, "Cars");
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: Request) {
  try {
    let client = await connectDatabase();
    const data = await req.json();
    const response = await insertDocument(client, "Cars", data);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: Request) {
  try {
    let client = await connectDatabase();
    const {searchParams}  = new URL(req.url); 
    console.log(searchParams)
    const id = searchParams.get("id");
    

      if (!id) {
    return NextResponse.json({ message: "ID parameter is required" });
  }
    console.log(id)
    const response = await deleteDocument(client, "Cars", id);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
  }
}

export async function PATCH(req: Request) {
  try {
    let client = await connectDatabase();
    const data = await req.json();
    const response = await updateDocument(client, "Cars", data);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
  }
}
