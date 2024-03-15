import { Router } from "express";
import { Amenities } from "../models/listing.model.js";

const router = Router();

router.post("/add-amenity",async (req,res)=>{
        const {name,description,icon} = req.body
        try {
            const amenity = await Amenities.create({
                name,
                description,
                icon
            })
            res.json({message:"amenity added",amenity})
        } catch (error) {
            if(error.code===11000) return res.json(`amenity with with the name ${name} already exists`)
            res.status(500).json(error)    
        }
})

router.delete("/delete-amenity/:name",async (req,res)=>{
    const name=req.params.name;
    try {
        const deleted = await Amenities.deleteOne({name});
        if(!deleted) return res.json(`No amenity with the name: ${name}`)
        res.status(201).json(`amenity ${name} deleted successfully`)
    } catch (error) {
        res.status(401).json("something went wrong when deleting amenitiy");
    }
})

router.get("/all-amenities",async (req,res)=>{
    try {
        const allAmenities = await Amenities.find();
        res.json(allAmenities)
    } catch (error) {
        res.status(501).json({message:error.message})
    }
})

export default router