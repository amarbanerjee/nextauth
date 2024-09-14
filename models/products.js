import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);

const Products =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Products;
