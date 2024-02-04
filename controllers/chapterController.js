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


// function to add local loaded images to worker throught post url
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
                    console.log(fileNames);
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
                    // fs.rmdir(directoryPath, { recursive: true }, (err) => {
                    //     if (err) {
                    //         console.error('Error while deleting directory:', err);
                    //     }
                    // });
                    resolve(workerImageUrls);
                } catch (error) {
                    console.error('Error processing files:', error);
                    reject(error);
                }
            }
        });
    });
}

//
const addInBlogger = async (page_uri,cookie, req) => {
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
                    //console.log(fileNames);
                    const workerImageUrls = [];
                    let response = [];
                    // const _imageObj = [{
                    //     size: 321398,
                    //     name: "image.jpeg",
                    //     data: fs.readFileSync('image/image.jpeg')
                    // }];
                    cookie = cookie || "_ga=GA1.2.1961785975.1690523639; HSID=AAT8oLeVG9vwUr2Jy; SSID=AyNISzBi-PhJQO3HC; APISID=rB5CSi3unUW8iNGY/AOekKYs_XgO-CdB5T; SAPISID=uxUAU-0v-fV3QnDE/A5WOr-9cLCOJUi-ZB; __Secure-1PAPISID=uxUAU-0v-fV3QnDE/A5WOr-9cLCOJUi-ZB; __Secure-3PAPISID=uxUAU-0v-fV3QnDE/A5WOr-9cLCOJUi-ZB; SID=fAhtQgQ-4TuuCWscygK3tNo_wx0UppMbbUDfSgwMrqUPnSBbr0uSVt3fXJEApXcPLyzRgw.; __Secure-1PSID=fAhtQgQ-4TuuCWscygK3tNo_wx0UppMbbUDfSgwMrqUPnSBbGGFXo_RCo1TTLr-Ro9U8Nw.; __Secure-3PSID=fAhtQgQ-4TuuCWscygK3tNo_wx0UppMbbUDfSgwMrqUPnSBb1tSSbCmWSMDrHQenUzZhrQ.; OTZ=7374702_48_48_123900_44_436380; NID=511=crWk-IahkDkftvH_msBGkwu0nS7O8Zf0yyzxujPrWpZ4LUiBw_hMMU5K8UsPdiEmV7I2j8vYY9zarK55M1MnjCxCPO4clAoz2FjywBUOuC7TvLmriL1H3eEVzUtx1ZP9UcwFs6NiTZdH4elDuG-hcC17uru5tUYc6ZpaOipXpxozeigDvs1sgogd1LpOfp1l";
                    page_uri = page_uri || "https://www.blogger.com/blog/post/edit/1752759376017980559/3236587965745307076";

                    const match = page_uri.match(/edit\/(\d+)/);
                    if (!match) return;

                    const post_uid = match[1];

                    const pageDataResponse = await axios.get(page_uri, {
                        headers: {
                            'cookie': cookie
                        }
                    });

                    const page_data = pageDataResponse.data;

                    const parent_match = page_data.match(/\.blogspot\.com\/".+?"(\d{12,})",null/);
                    if (!parent_match) return;

                    const parent_id = parent_match[1];

                    let xsrf = 'APwFbINwumsnouppJap8kt23XC-Y%3A1649320540040';

                    const xsrf_match = page_data.match(/"\w+?":"(.{20,40}?:\d+)",/);
                    if (xsrf_match) {
                        xsrf = xsrf_match[1];
                    }

                    for (const fileName of fileNames) {
                        const data = fs.readFileSync(`controllers/workerTemp/${req.body.chapterId}/${fileName}`);
                        const name = fileName;
                        const stat = fs.statSync(`controllers/workerTemp/${req.body.chapterId}/${fileName}`);
                        const size = stat.size;
                        //console.log("utils------------>",data,name,size);
                        const upload_uri = 'https://www.blogger.com/upload/blogger/photos/resumable?authuser=0';
                        const file_name = name || crypto.randomBytes(5).toString('hex') + '.jpeg';
                        const content_length = size;

                        const upload_data = {
                            protocolVersion: "0.8",
                            createSessionRequest: {
                                fields: [
                                    { external: { name: "file", filename: file_name, put: {}, size: content_length } },
                                    { inlined: { name: "album_id", content: parent_id, contentType: "text/plain" } },
                                    { inlined: { name: "client", content: "blogger", contentType: "text/plain" } }
                                ]
                            }
                        };

                        const uploadResponse = await axios.post(upload_uri, upload_data, {
                            headers: {
                                'cookie': cookie,
                                'X-GUploader-Client-Info': 'mechanism=scotty xhr resumable; clientVersion=438501294'
                            }
                        });
                        //console.log("uploadResp------------------>\n", uploadResponse);

                        const upload_headers = uploadResponse.headers;
                        if (!upload_headers['x-guploader-uploadid']) continue;

                        const upload_id = upload_headers['x-guploader-uploadid'];
                        //console.log("upload_id ---->", upload_id);
                        const upload_uri_with_id = `https://www.blogger.com/upload/blogger/photos/resumable?authuser=0&upload_id=${upload_id}&file_id=000`;

                        const upload_response = await axios.post(upload_uri_with_id, data, {
                            headers: {
                                'cookie': cookie,
                                'X-GUploader-No-308': 'yes',
                                'X-HTTP-Method-Override': 'PUT',
                                'content-type': 'application/octet-stream'
                            }
                        });
                        //console.log("uploadResp2------------------>\n", upload_response.data);

                        const upload_response_data = upload_response.data;
                        if (!upload_response_data.sessionStatus) continue;

                        const customer_specific_info = upload_response_data.sessionStatus.additionalInfo['uploader_service.GoogleRupioAdditionalInfo'].completionInfo.customerSpecificInfo || {};

                        const share_uri = 'https://www.blogger.com/_/BloggerUi/data/batchexecute?rpcids=kpZTVe';

                        const share_data = `f.req=%5B%5B%5B%22kpZTVe%22%2C%22%5B%5C%22${customer_specific_info.photoMediaKey}%5C%22%2C%5C%22${post_uid}%5C%22%2C%5C%22${customer_specific_info.albumid}%5C%22%2C%5C%22${encodeURIComponent(customer_specific_info.url)}%5C%22%2C%5B%5D%2C%5C%22${file_name}%5C%22%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=${encodeURIComponent(xsrf)}&`;

                        const shareResponse = await axios.post(share_uri, share_data, {
                            headers: {
                                'cookie': cookie
                            }
                        });
                        //console.log("shareresp------------------>\n", shareResponse);
                        const share_data_response = shareResponse.data;
                        const image_url_match = share_data_response.match(/"(http[^"]+?blogger\.googleusercontent[^"]+?)"/);
                        if (!image_url_match) continue;

                        const image_url = image_url_match[1].replace('\\', '');

                        const temp_array = {
                            original: image_url + '?auth_user=0',
                            thumbnail: image_url.replace('s1600', 's350') + '?auth_user=0'
                        };
                        //console.log("temp-array:\n", temp_array);
                        response.push(temp_array.original);
                    }

                    resolve(response);

                } catch (error) {
                    console.error('Error processing files:', error);
                    reject(error);
                }
            }
        });
    });
}


const processImages = async (page_uri,cookie,url, req) => {
    try {
        const [workerUrls, bloggerUrls] = await Promise.all([addInWorker(url, req), addInBlogger(page_uri,cookie, req)])
        return {
            workerUrls : workerUrls,
            bloggerUrls : bloggerUrls
        };
    } catch (error) {
        console.log(error);
    }
}

//add chapter into mongo (takes average )
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
        //const workerUrls = await addInWorker(`${worker.workerUrl}/insert`, req);
        const cookie =  "_ga=GA1.2.1961785975.1690523639; HSID=AAT8oLeVG9vwUr2Jy; SSID=AyNISzBi-PhJQO3HC; APISID=rB5CSi3unUW8iNGY/AOekKYs_XgO-CdB5T; SAPISID=uxUAU-0v-fV3QnDE/A5WOr-9cLCOJUi-ZB; __Secure-1PAPISID=uxUAU-0v-fV3QnDE/A5WOr-9cLCOJUi-ZB; __Secure-3PAPISID=uxUAU-0v-fV3QnDE/A5WOr-9cLCOJUi-ZB; SID=fAhtQgQ-4TuuCWscygK3tNo_wx0UppMbbUDfSgwMrqUPnSBbr0uSVt3fXJEApXcPLyzRgw.; __Secure-1PSID=fAhtQgQ-4TuuCWscygK3tNo_wx0UppMbbUDfSgwMrqUPnSBbGGFXo_RCo1TTLr-Ro9U8Nw.; __Secure-3PSID=fAhtQgQ-4TuuCWscygK3tNo_wx0UppMbbUDfSgwMrqUPnSBb1tSSbCmWSMDrHQenUzZhrQ.; OTZ=7374702_48_48_123900_44_436380; NID=511=crWk-IahkDkftvH_msBGkwu0nS7O8Zf0yyzxujPrWpZ4LUiBw_hMMU5K8UsPdiEmV7I2j8vYY9zarK55M1MnjCxCPO4clAoz2FjywBUOuC7TvLmriL1H3eEVzUtx1ZP9UcwFs6NiTZdH4elDuG-hcC17uru5tUYc6ZpaOipXpxozeigDvs1sgogd1LpOfp1l";
        const page_uri =  "https://www.blogger.com/blog/post/edit/1752759376017980559/3236587965745307076";
        const {workerUrls,bloggerUrls} = await processImages(page_uri,cookie,`${worker.workerUrl}/insert`,req);
        console.log("workerURLs :",workerUrls);
        console.log("bloggerURLs :",bloggerUrls);
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
                server1: workerUrls,//worker server
                server2: bloggerUrls, //blogger server
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