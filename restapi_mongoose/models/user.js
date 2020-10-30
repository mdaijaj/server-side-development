// var mongoose=require('mongoose');
// var Schema= mongoose.Schema;

// var User =new Schema ({
//    username: {
//       type: String,
//       require: true,
//       unique: true
//    },
//    password: {
//       type: String,
//       require: true
//    },
//    admin: {
//       type: Boolean,
//       default: false
//    }
// })


//use of passport
var mongoose=require('mongoose');
var Schema= mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User =new Schema ({
   admin: {
      type: Boolean,
      default: false
   }
})

User.plugin(passportLocalMongoose)

module.exports=mongoose.model('User', User)