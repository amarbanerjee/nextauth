import multiparty from "multiparty";
import connectMongoDB from "@/lib/mongoDB";
import Products from "@/models/products";
import uploadFile from "@/lib/upload-file";
import formidable from 'formidable-serverless';


async function handler(req, res) {


  const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
         //console.log(err, fields, files);

          

         const file = files.file;
         const image = await uploadFile(file);
         const title = fields.title;
         const description = fields.description;
         const price = fields.price;

         await connectMongoDB();
         await Products.create({ title, description, price,image });
         return res.status(200).json(
            { message: "Product created successfully" }
          );

    
      });
    
  }

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default handler;