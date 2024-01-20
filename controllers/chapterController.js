const Chapter = require("../models/chapterModel");
const { StatusCodes } = require("http-status-codes");


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

const addChapter = async (req, res) => {
    try {
        console.log(req.body);
        const outputJson={
            mangaId: req.body.mangaId,
            title: req.body.title,
            volume : req.body.volume,
            chapterNumber: req.body.chapterNumber,
            summary: req.body.summary,
            language: req.body.language,
            pages:[
                
            ],
            pageCount: req.body.pageCount,
            version: req.body.version,
            publishedAt: req.body.publishedAt,
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
    addChapter
}