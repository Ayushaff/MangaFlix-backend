const Manga = require("../models/mangaModel");
const ApiFeatures = require("../utils/api-features");

const getAll = async (req,res) => {
    var mangaList=await Manga.find({});
    res.send(mangaList);
}

const addManga = async (req,res) => {
    console.log("/addmanga");
    const manga= await Manga.create(req.body);
    res.send({"success":"true"});
}

module.exports = {
    getAll,
    addManga
}