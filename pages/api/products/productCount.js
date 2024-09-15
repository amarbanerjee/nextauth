import connectMongoDB from "@/lib/mongoDB";
import Products from "@/models/products";


async function  handler(req, res) {

 

  //console.log("perpage", perpage);

  await connectMongoDB();
  const count = await Products.countDocuments();
  console.log("record count",count);

  return res.status(200).json({ count });
}

export default handler;