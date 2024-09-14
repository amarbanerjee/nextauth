import connectMongoDB from "@/lib/mongoDB";
import Products from "@/models/products";
import uploadFile from "@/lib/upload-file";



async function handler(req,res) {
  
  //const formData = await req.FormData(); 
  //const file = formData.get('file')
  
  const data = req.body
  //const file = da;

  console.log("Request",data);
  
        // const title= req.body.title;
        // const price= req.body.price;
        // const description= req.body.description;
        // const image= req.body.image;

       // console.log("File",file);

      
      
      
      await connectMongoDB();
      await Products.create({ title, description, price,image });
  return res.status(200).json(
    { message: "Product created successfully" }
  );
}



export default handler;
