import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food items 
const addFood = async (req, res) =>{

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name : req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try{
        await food.save()
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

// List of All Food
const listfood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// Remove food items
const removeFood = async (req, res)=>{
    try {
        const food =await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export {addFood, listfood, removeFood}