import mongoose from "mongoose";

var imageSchema = new mongoose.Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

// Correct method to create an index
imageSchema.index({ "name": 1 });

export default mongoose.model('Image', imageSchema);
