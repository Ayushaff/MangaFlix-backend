const { StatusCodes } = require("http-status-codes");
const Blogger = require("../models/bloggerModel");
const { v4: uuidv4 } = require("uuid");

const addBlogger = async (req, res) => {
    try {
        //console.log(req.body);
        const blogger = req.body;
        blogger["id"] = uuidv4();

        const response = await Blogger.create(blogger);


        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: response,
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error.message,
            }
        });
    }
}

const getAllBlogger = async (req, res) => {
    try {
        Blogger.find({})
            .then((response) => {
                res.status(StatusCodes.OK).json({
                    status: true,
                    content: {
                        data: response,
                    }
                });
            })
            .catch((error) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: false,
                    content: {
                        error: error.message,
                    }
                });
            });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error,
            }
        });
    }
}

const getBloggerById = async (req, res) => {
    try {
        const id = req.params.id;
        Blogger.find({ id: id })
            .then((response) => {
                res.status(StatusCodes.OK).json({
                    status: true,
                    content: {
                        data: response,
                    }
                });
            })
            .catch((error) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: false,
                    content: {
                        error: error,
                    }
                });
            });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error,
            }
        });
    }
}

const deleteBlogger = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Blogger.deleteOne({ id: id });
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: response,
            }
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error.message,
            }
        });
    }
}

const getRandomBlogger = () => {
    try {
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error.message,
            }
        });
    }
}

const editBlogger = (req, res) => {
    try {
        const id = req.params.id;
        const outputJson = {
            email : req.body.email,
            status : req.body.status,
            post_url : req.body.post_url,
            cookie : req.body.cookie,
        }
        Blogger.findOneAndUpdate(
            { id: id },
            { $set: outputJson },
            { new: false },
        )
            .then((response) => {
                res.status(StatusCodes.OK).json({
                    status: true,
                    content: {
                        data: outputJson,
                    }
                });
            })
            .catch((error) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: false,
                    content: {
                        error: error.message,
                    }
                });
            });


    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error.message,
            }
        });
    }
}


module.exports = {
    addBlogger,
    getAllBlogger,
    getBloggerById,
    deleteBlogger,
    editBlogger
}