const Cover = require("../models/coverModel");
const ApiFeatures = require("../utils/api-features");

const add = async (req,res)=>{
    await Cover.create(req.body);
    res.send({"success":"true"});
}

const getById =async (req,res)=>{
    
    const id = req.params.id;
    console.log("/"+id);
    const cover = await Cover.findOne({"id":id});
    res.send(cover);
}

const getAll = (req,res)=>{

}

module.exports = {
    add,
    getAll,
    getById,
}