const { StatusCodes } = require("http-status-codes");
const Genre = require("../models/genreModel");
const { v4: uuidv4 } = require('uuid');
const APIFeatures = require("../utils/api-features");


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
                    important: data.important,
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
        const pageSize = req.query.limit;
        const searchTerm = req.query.search;

        const query = Genre.find({
            $and: [
                { "name": { $regex: searchTerm, $options: 'i' } }
            ]
        });

        const apifeatures = new APIFeatures(query, req.query)
            .pagination(pageSize);

        let genres = await apifeatures.query.lean();
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: genres
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
        const data = await Genre.findOne({ "id": req.params.id });
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: {
                    name: data.name,
                    description: data.description,
                    important: data.important,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
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

const deleteGenre = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Genre.deleteOne({ id: id });
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: response,
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

const updateGenre = async (req,res)=>{
    try {
        const genre = req.body;
        
        Genre.findOneAndUpdate(
            {id:genre.id},
            {$set : genre},
            {new : true}
          )
          .then((updatedGenre)=>{
            res.status(StatusCodes.OK).json({
              status: true,
              content: {
                data: updatedGenre,
              }
            });
          })
          .catch((error)=>{
            console.log("inner ", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              status: false,
              content: {
                error: error,
              }
            });
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
    getGenreById,
    deleteGenre,
    updateGenre
};