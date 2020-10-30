const mongoose= require('mongoose')

const Schema= mongoose.Schema
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const leader_schema=new Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   image: {
      type: String,
      required: true
  },
   description: {
      type: String,
      required: true,
   },
  label: {
      type: String,
      default: ''
  },
  price: {
      type: Currency,
      required: true,
      min: 0
  },
  featured: {
      type: Boolean,
      default:false      
  },
}, {
  timestamps: true
});

var lead_Dish= mongoose.model('permotion_database', leader_schema);
module.exports=lead_Dish;
// exports.genreSchema = genreSchema



