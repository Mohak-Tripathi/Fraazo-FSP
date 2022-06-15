const mongoose = require("mongoose")

const fraazoSchema= new mongoose.Schema(
{
    name: {type: String, required: true},
    image: {type: String, required: true},
    weight: {type: String, required: true},
    prize: {type: Number, required: true},
    old_price: {type: Number, required: false, default: null},
    category: { type: String, required: true },
    sub_category: { type: String, required: true },
    description: {
      type: String,
      required: false,
      default: "No Details Available",
    },
    benefit: { type: String, required: false, default: "No Details Available" },
    info: { type: String, required: false, default: "No Details Available" },
    tag: { type: String, required: false, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
  },
  { versionKey: false, timestamps: true }
);

const Fraazo = mongoose.model("frazo", fraazoSchema)
    
module.exports = Fraazo;






// "name": "Apple Green / Granny Smith",
//     "image": "https://images.fraazo.com/fraazo-master/FAPP23.png/tr:w-512,h-512",
//     "weight": "1 kg",
//     "prize": 30,
//     "old_price": 17, 
//     "category": "Fruits",
//     "sub_category": "Apples, Pears, Plums"