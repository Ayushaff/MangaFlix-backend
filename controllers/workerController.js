const { StatusCodes } = require('http-status-codes');
const Worker = require('../models/workerModel');

// Get all workers
const getAll = async (req, res) => {
    try {
        const response = await Worker.find();
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
                error: error,
            }
        });
    }
};

// Get worker by ID
const getById = async (req, res) => {
    const id = req.params;
    try {
        const response = await Worker.findById(id);
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
                error: error,
            }
        });
    }
};

// Get worker by URL
const getByUrl = async (req, res) => {
    const workerUrl = req.params.url;
    try {
        const worker = await Worker.findOne({ workerUrl: workerUrl });
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
                error: error,
            }
        });
    }
};

// Add a new worker
const addWorker = async (req, res) => {
    //console.log(req.body);
    const worker = req.body;
    try {
        if(worker.workerUrl.trim().length == 0) {
            res.status(StatusCodes.NOT_ACCEPTABLE).json({
                status: false,
                content: {
                    error: "Empty url not acceptable.",
                }
            });
        }
        const response = await Worker.create(worker);
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
                error: error,
            }
        });
    }
};


const getRandomWorker = async (req,res)=>{
    try {
        console.log("yo");
        const response = await Worker.findOne({}).sort({"bytesUsed":1});
        
        
        // res.status(StatusCodes.OK).json({
        //     status: true,
        //     content: {
        //         data: response,
        //     }
        // });
        return response;
        
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error,
            }
        });
    }
}

module.exports = {
    getAll,
    getById,
    getByUrl,
    addWorker,
    getRandomWorker
};
