//Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
productName:{
    type:String,
    required:[true,"Product Name must be provided"],
},
productDescription:{
    type:String,
    required:[true,"Product description must be provided"],
},
price:{
    type:Number,
    required:[true,"Price  must be provided"],
},
productStatus:{
    type:String,
    Enum:["available","not available"],
},
productStockQty:{
    type:Number,
    required:[true,"Product Name must be available"],
},
productImage: String,
},
{
    timestamps:true
},
);
const Product = mongoose.model("Product",productSchema);
module.exports = Product;