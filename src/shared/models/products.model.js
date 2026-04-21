import { hash } from "bcryptjs";
import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    price:{
        type: Number,
        required: true,
        min: 0,
    }
},{
    timestamps: true
});


const Product = model("Product", productSchema);

export {
    Product
}
