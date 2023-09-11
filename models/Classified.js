
const mongoose = require('mongoose');

const classifiedSchema = new mongoose.Schema({
  name: {type:String,required:true},
  description: {type:String,required:true},
  category: {type:String,required:true},
  image: {type:String,required:true},
  location: {type:String,required:true},
  postedAt: {type:String,required:true},
  price: {type:Number,required:true},
});

const classifiedModel = mongoose.model('Classified', classifiedSchema);

module.exports = {
  classifiedModel
}
 