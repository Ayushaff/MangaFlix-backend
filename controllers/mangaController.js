const { StatusCodes } = require("http-status-codes");
const Manga = require("../models/mangaModel");
const ApiFeatures = require("../utils/api-features");

const getAll = async (req, res) => {
    var mangaList = await Manga.find({});
    res.send(mangaList);
}

const addManga = async (req, res) => {
    const manga = await Manga.create(req.body);
    res.status(StatusCodes.OK).json({
        status: true,
        content: {
            data: manga
        }
    });

}

module.exports = {
    getAll,
    addManga
}