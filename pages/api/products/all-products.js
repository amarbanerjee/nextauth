import connectMongoDB from "@/lib/mongoDB";
import Products from "@/models/products";
import { NextResponse } from "next/server";

async function  handler(req, res) {
  await connectMongoDB();
  const products = await Products.find();
  return res.status(200).json({ products });
}

export default handler;