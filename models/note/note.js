const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {type: String, required: true},
    created_time: {type: Date, default: Date.now},
    modified_time: {type: Date, default: Date.now},
    content: {type: String},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    created_by: {type: Schema.Types.ObjectId, ref: "User", required: true}
});