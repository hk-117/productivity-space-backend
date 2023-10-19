const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    created_by: { type: Schema.Types.ObjectId, ref:"User", required: true},
    name: {type: String}
});

module.exports = mongoose.model("Category",categorySchema);