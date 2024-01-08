const Cover = require("../models/coverModel");
const ApiFeatures = require("../utils/api-features");

const add = (req,res)=>{
    Cover.create(req.body);
    res.send({"success":"true"});
}

const getById = (req,res)=>{
    const id = req.params.id;
    const cover = Cover.findById(id);
    res.send(cover);
}

const getAll = (req,res)=>{

}

module.exports = {
    add,
    getAll,
    getById,
}