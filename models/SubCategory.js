import mongoose from "mongoose";

const {
    ObjectId
} = mongoose.Schema;

const subSchema = new mongoose.Schema({

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
    parent: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
});


const subCategory = mongoose.models.subCategory || mongoose.model("SubCategory", subSchema);

export default subCategory;