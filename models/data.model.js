let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let DataSchema = new Schema({
_id: Schema.Types.ObjectId,
name: {type: String, required: true, max: 100},
grade: {type:Number, required: true}});

var data = mongoose.model('data', DataSchema);

//Export the model
module.exports = data;