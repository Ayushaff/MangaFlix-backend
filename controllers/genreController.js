const { StatusCodes } = require("http-status-codes");
const Genre = require("../models/genreModel");
const { v4: uuidv4 } = require('uuid');


const addGenre = async (req, res) => {
    try {
        const genre = req.body;
        genre.id = uuidv4();
        const data = await Genre.create(genre);
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: {
                    name: data.name,
                    description: data.description,
                    important : data.important,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                }
            }
        });
    } catch (error) {
        res.status(StatusCodes.OK).json({
            status: false,
            content: {
                error: error,
            }
        });
    }
}

const getAllGenre = async (req, res) => {
    try {
        console.log(req.query);
        const data = await Genre.find();
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: data,
            }
        });
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            status: false,
            content: {
                error: error,
            }
        });
    }
}

const getGenreById = async (req, res) => {
    try {
        const data = await Genre.findOne({"id": req.params.id});
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: {
                    name : data.name,
                    description : data.description,
                    important : data.important,
                    createdAt : data.createdAt,
                    updatedAt : data.updatedAt,
                },
            }
        });
    } catch (error) {
        res.status(StatusCodes.OK).json({
            status: false,
            content: {
                error: error,
            }
        });
    }
}



module.exports = {
    addGenre,
    getAllGenre,
    getGenreById
};