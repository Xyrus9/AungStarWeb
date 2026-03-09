import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maker:{
        type: String,   
        required: true,
    },
    accessoriesType: {
        type: String,
        required: true,
    },
    goldType: {
        type: String,       
    },
    description: {
      type: String,
      required: true,
    },




    jewelryType: {
        type: String,       
    },
    image: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;