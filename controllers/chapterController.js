const Chapter = require("../models/chapterModel");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { getRandomWorker } = require("./workerController");
const axios = require('axios');
const FormData = require('form-data');

const getByMangaId = async (req, res) => {
    try {
        const mangaId = req.params.id;
        const allChapters = await Chapter.find({ mangaId: mangaId });
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: allChapters,
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
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const chapter = await Chapter.find({ id: id });
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: chapter,
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
}



const addInWorker = async (url, req) => {
    return new Promise((resolve, reject) => {
        const directoryPath = `controllers/workerTemp/${req.body.chapterId}`;
        fs.readdir(directoryPath, async (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                reject(err);
            } else {
                try {
                    // Filter out only files (exclude directories)
                    const fileNames = files.filter(file => fs.statSync(directoryPath + '/' + file).isFile());
                    //console.log('Files in the directory:');
                    //console.log(fileNames);
                    fileNames.sort();
                    const workerImageUrls = [];
                    for (const fileName of fileNames) {
                        const formData = new FormData();
                        const filePath = `controllers/workerTemp/${req.body.chapterId}/${fileName}`;
                        const fileStream = fs.createReadStream(filePath);
                        //console.log("filename ---> ", fileName);
                        formData.append('image', fileStream, {
                            filename: `${fileName}`,
                            contentType: 'image/jpeg'
                        });

                        const response = await axios.post(url, formData, {
                            headers: {
                                ...formData.getHeaders(),
                            },
                        });
                        //console.log(response.data.imageUrl);
                        workerImageUrls.push(response.data.imageUrl);
                    }
                    //console.log(workerImageUrls);
                    fs.rmdir(directoryPath, { recursive: true }, (err) => {
                        if (err) {
                            console.error('Error while deleting directory:', err);
                        }
                    });
                    resolve(workerImageUrls);
                } catch (error) {
                    console.error('Error processing files:', error);
                    reject(error);
                }
            }
        });
    });
};



const addChapter = async (req, res) => {
    try {

        //worker logic
        const worker = await getRandomWorker();//worker with the most space avail
        if (worker.bytesUsed >= "800") {
            res.status(StatusCodes.NOT_FOUND).json({
                status: false,
                content: {
                    error: `Worker not available`,
                }
            });
        }
        const workerUrls = await addInWorker(`${worker.workerUrl}/insert`, req);
        workerUrls.sort();
        //console.log(workerUrls);
        //output model
        const outputJson = {
            chapterId: req.body.chapterId,
            mangaId: req.body.mangaId,
            title: req.body.title,
            volume: req.body.volume,
            chapterNumber: req.body.chapterNumber,
            summary: req.body.summary,
            language: req.body.language,
            pages: {
                server1:workerUrls,
                server2:[]
            },
            pageCount: req.body.pageCount,
            version: req.body.version,
            publishedAt: req.body.publishAt,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
            isActive: req.body.isActive,
            relationship: [],
        };

        const response = await Chapter.create(outputJson);

        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: response,
            }
        });
    } catch (error) {
        console.log("Error in chapterController.js :\n", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            content: {
                error: error,
            }
        });
    }

}


const deleteChapter = async (req, res) => {

    const id = req.params.id;

    try {
        const response = await Chapter.deleteOne({ chapterId: id });
        res.status(StatusCodes.OK).json({
            status: true,
            content: {
                data: response,
            }
        });
    } catch (error) {
        console.log("error\n", error);
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