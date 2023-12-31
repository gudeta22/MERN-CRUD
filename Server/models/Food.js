const mongoose = require("mongoose");


const foodSchema =new mongoose.Schema({
    foodName:{
        type:String , 
        required:true,
    },
    dayssinceIate:{
        type:Number,
        required:true,
    },
  
})

const Food = mongoose.model("food" , foodSchema)

module.exports = Food;