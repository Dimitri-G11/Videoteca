const mongoose = require("mongoose");


const videoSchemas = new mongoose.Schema({
    id: {
        type:String,
        required:true,
        },
    title: {
        type:String,
        required:true,
        },
    link: {
        type:String,
        required:true,
        },
    liked: {
        type:Boolean,
        required:false,
        }
});

module.exports = mongoose.model("Video", videoSchemas);