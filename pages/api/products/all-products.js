import connectMongoDB from "@/lib/mongoDB";
import Products from "@/models/products";
import { NextResponse } from "next/server";

async function  handler(req, res) {

  

  const perpage = +req.query.perpage;
  const page = +req.query.page;

  //console.log("perpage", perpage);

  await connectMongoDB();
  const products = await Products.find().skip(perpage*(page-1)).limit(perpage);
  return res.status(200).json({ products });
}

export default handler;