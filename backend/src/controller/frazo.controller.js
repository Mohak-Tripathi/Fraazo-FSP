const Fraazo = require("../models/frazo.models")
const express= require('express');

const authenticate= require('../middleware/authenticate')
const router= express.Router();


// get all product 

router.get("/", async(req, res)=>{

    try{

        const page= req.query.page || 1;
const pagesize = req.query.pagesize || 3;
const skip = (page -1) * pagesize;
const category = req.query.category 
const subcategory= req.query.subcategory 
const sort = +req.query.sort


if(category !==undefined && subcategory !==undefined){
    const data= await Fraazo.find({$and: [{category: {$eq:category}},{sub_category: {$eq: subcategory}}]}).sort({prize: sort}).skip(skip).limit(pagesize).lean().exec()

    const totalPages= Math.ceil((await Fraazo.find({$and: [{category: {$eq:category}},{sub_category: {$eq: subcategory}}]}).countDocuments())/pagesize)
    
    return res.status(200).send({"data": data, "totalpages": totalPages})

}


else if(category!==undefined){

    const data= await Fraazo.find({category: {$eq:category}}).sort({prize: sort}).skip(skip).limit(pagesize).lean().exec()

    const totalPages= Math.ceil((await Fraazo.find({category: {$eq:category}}).countDocuments())/pagesize)
    
    return res.status(200).send({"data": data, "totalpages": totalPages})


}

else if(subcategory!==undefined){

    const data= await Fraazo.find({sub_category: {$eq:subcategory}}).sort({prize: sort}).skip(skip).limit(pagesize).lean().exec()

    const totalPages= Math.ceil((await Fraazo.find({sub_category: {$eq:subcategory}}).countDocuments())/pagesize)
    
    return res.status(200).send({"data": data, "totalpages": totalPages})


}


const data= await Fraazo.find({}).sort({prize:sort}).skip(skip).limit(pagesize).lean().exec()

const totalPages= Math.ceil((await Fraazo.find({}).countDocuments())/pagesize)

return res.status(200).send({"data": data, "totalpages": totalPages})

    }
    catch(error){
return res.status(500).send({error: error.message})
    }
})


router.post("/ ", authenticate, async (req, res) => {
    try{

        console.log(req.user)
        const data= await Fraazo.create(req.body)
        
        
return res.status(201).send(data)
    }
    catch(error){
        return res.status(500).send({error: error.message})
    }
})

//get only one product


router.get("/:id", async(req,res)=>{

try{

    console.log(req.params)
const data= await Fraazo.findById(req.params.id).lean().exec();

return res.status(200).send(data)
}
catch(error){
    return res.status(500).send({error: error.message})
}

})

// update one product

router.patch("/:id", async(req,res)=>{
try{
const data= await Fraazo.findByIdAndUpdate(req.params.id, req.body, {new:true})
return res.status(200).send(data)

}
catch(error){
    return res.status(500).send({error: error.message})
}

})


router.delete("/:id", async(req,res)=>{
    try{
const data= await Fraazo.findByIdAndDelete(req.params.id).lean().exec()
return res.status(200).send(data);   
}
    catch(error){
return res.status(500).send({error: error.message})
    }
})


//get all by category;


// router.get("/category/:category", async(req, res)=>{

//     try{

//         const page= req.query.page || 1;
//         const pagesize = req.query.pagesize || 3;
        
//         const skip = (page -1) * pagesize;
        
//         const data= await Fraazo.find({category: req.params.category}).skip(skip).limit(pagesize).lean().exec()
    
        
//         const totalPages= Math.ceil((await Fraazo.find({category: req.params.category}).countDocuments())/pagesize)
        
//         return res.status(200).send({"data": data, "totalpages": totalPages})

//     }
//     catch(error){
// return res.status(500).send({error: error.message})
//     }
// })


//get all by sub-category;


// router.get("/sub/:subcategory", async(req, res)=>{

//     try{

//         const page= req.query.page || 1;
//         const pagesize = req.query.pagesize || 3;
        
//         const skip = (page -1) * pagesize;
        
//         const data= await Fraazo.find({sub_category: req.params.subcategory}).skip(skip).limit(pagesize).lean().exec()
    
        
//         const totalPages= Math.ceil((await Fraazo.find({sub_category: req.params.subcategory}).countDocuments())/pagesize)
        
//         return res.status(200).send({"data": data, "totalpages": totalPages})

//     }
//     catch(error){
// return res.status(500).send({error: error.message})
//     }
// })

//get all with the help of tag: 

// router.get("/tag/:tag", async(req, res)=>{

// try{
// const data= await Fraazo.find({tag: req.params.tag}).lean().exec()
// return res.status(200).send(data)
// }
// catch(error){
//     return res.status(500).send({error: error.message})
// }

// })



module.exports= router