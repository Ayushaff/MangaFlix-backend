const Chapter = require("../models/chapterModel");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { getRandomWorker } = require("./workerController");
const axios = require('axios');

const getByMangaId = async (req, res) => {
    try{
        const mangaId = req.params.id;
        const allChapters = await Chapter.find({mangaId : mangaId});
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: allChapters,
            }
        });
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error,
            }
        });
    }
}

const getById = async (req, res) => {
    try{
        const id = req.params.id;
        const chapter = await Chapter.find({id : id});
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: chapter,
            }
        });
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error,
            }
        });
    }   
}

const addInWorker = async (url)=>{
    const formData = new FormData();
    formData.append('image', fs.createReadStream("controllers/workerTemp/imagefile.jpg"));
    const response = await axios.put(url,formData,{
        headers :{
            'Content-Type': `multipart/form-data`
        }
    });
    console.log(response);
    return response.imageUrl;
}

const addChapter = async (req, res) => {
    try {

        //worker logic
        const stat = fs.stat("controllers/workerTemp/imagefile.jpg");
        const size = stat.size;
        console.log(size,"Bytes file.");
        const worker = await getRandomWorker();
        if(worker.bytesUsed < size){
            res.status(StatusCodes.OK).json({
                status: false,
                content: {
                    error: `Worker not available with ${size}Bytes empty.`,
                }
            });
        }
        const workerUrl = await addInWorker(worker);
        console.log(workerUrl);


        //once the chapter object is created, just update later on
        const outputJson={
            chapterId : uuidv4(),
            mangaId: req.body.mangaId,
            title: req.body.title,
            volume : req.body.volume,
            chapterNumber: req.body.chapterNumber,
            summary: req.body.summary,
            language: req.body.language,
            pages:{
                server1: [
                    workerUrl,
                ]
            },
            pageCount: req.body.pageCount,
            version: req.body.version,
            publishedAt: req.body.publishAt,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
            isActive: req.body.isActive,
            relationship:[],
        };
        
        
        const response = await Chapter.create(outputJson);

        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: response,
            }
        });
    } catch (error) {
        console.log("error blud\n",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error,
            }
        });
    }

}


const deleteChapter = async (req,res)=>{

    const id = req.params.id;
    
    try {
        const response = await Chapter.deleteOne({chapterId:id});
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: response,
            }
        });
    } catch (error) {
        console.log("error\n",error);
        res.status(StatusCodes.OK).json({
            status: false,
            content: {
                error: error,
            }
        });
    }
}


module.exports = {
    getById,
    getByMangaId,
    addChapter,
    deleteChapter,
}