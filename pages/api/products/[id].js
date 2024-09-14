import connectMongoDB from "@/lib/mongoDB";
import Products from "@/models/products";
import { NextResponse } from "next/server";
import uploadFile from "@/lib/upload-file";
import formidable from 'formidable-serverless';

async function  handler(req, res) {

    if(req.method =="DELETE")
        {
            const { id } = req.query;
            console.log("DELETE", id);
            await connectMongoDB();
            await Products.findByIdAndDelete(id);
            return res.status(200).json( { message: "Product deleted successfully" });

        }

        if(req.method =="GET")
            {
                const { id } = req.query;
                console.log("EDIT", id);
                await connectMongoDB();
                const product = await Products.findOne({ _id: id });
                return res.status(200).json({ product });
    
            }

            if(req.method =="POST")
                {
                    const { id } = req.query;
                    console.log("EDIT", id);
                    let editObj = {};

                    const form = new formidable.IncomingForm();
                    form.parse(req, async (err, fields, files) => {

                    const title = fields.title;
                    const description = fields.description;
                    const price = fields.price;

                    if(files && files.file!=null)
                    {
                        const file = files.file;
                        const image = await uploadFile(file);
                        editObj={ title, description, price,image }
                    }else
                    {
                            editObj={ title, description, price }
                    }
                    
                    

                    await connectMongoDB();
                    await Products.findByIdAndUpdate(id, editObj);
                    return res.status(200).json(
                        { message: "Product updated successfully" }
                    );

    
      });
     }
  
}

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default handler;