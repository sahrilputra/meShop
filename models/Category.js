import mongoose, { mongo } from "mongoose";

const {ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: [2, "Harus lebih dari 2 karakter"],
        maxlength: [2, "Harus lebih dari 2 karakter"],
    },
    slug: {
        type: String,
        uniqe: true,
        lowercase: true,
        index: true, 
    },
},{
    timestamps:true,
})

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
