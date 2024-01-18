const { StatusCodes } = require("http-status-codes");
const Manga = require("../models/mangaModel");
const ApiFeatures = require("../utils/api-features");
const { v4: uuidv4 } = require('uuid');
const config = require('config');
const aws4 = require('aws4');
const fs = require('fs');
const sharp = require('sharp');
const axios = require('axios')

const getAll = async (req, res) => {
  var mangaList = await Manga.find({});
  res.send(mangaList);
}


//add manga
const addManga = async (req, res) => {
  try {
    const inputJson = req.body;
    console.log("input json\n", inputJson);
    var outputJson = {
      id: "",
      mdex_id: "",
      state : "",
      badge : "",
      title: {
        en: "",
        jp: "",
      },
      altTitles: {
        en: "",
        jp: ""
      },
      description: { en: "" },
      isLocked: false,
      originalLanguage: "",
      lastVolume: "",
      lastChapter: "",
      publicationDemographic: "",
      status: "",
      year: "",
      contentRating: "",
      genre: [],
      author: [],
      artist: [],
      keywords: [],
      chapterNumbersResetOnNewVolume: false,
      createdAt: "",
      updatedAt: "",
      latestUploadedChapter: 0,
      relationships: ["",],
      type: "",
      views: 0,
      rating: 0,
      follows: 0,
      poster: {
        original: "",
        thumb: ""
      },
      slug: "",
    };
    outputJson.id = uuidv4();
    outputJson.mdex_id = "NULL";
    outputJson.title.en = inputJson.titleEn || "";
    outputJson.title.jp = inputJson.titleJp || "";
    outputJson.altTitles.en = inputJson.altTitle || "";
    outputJson.description.en = inputJson.description;
    outputJson.isLocked = Boolean(inputJson.isLocked);
    outputJson.originalLanguage = inputJson.originalLanguage;
    outputJson.publicationDemographic = inputJson.publicationDemographic;
    outputJson.lastVolume = inputJson.lastVolume;
    outputJson.lastChapter = inputJson.lastChapter;
    outputJson.status = inputJson.status || "";
    outputJson.year = inputJson.year || "";
    outputJson.contentRating = inputJson.contentRating || "";
    outputJson.author = JSON.parse(inputJson.author);
    outputJson.artist = JSON.parse(inputJson.artist);
    outputJson.genre = JSON.parse(inputJson.genres);
    outputJson.keywords = JSON.parse(inputJson.keywords);
    outputJson.chapterNumbersResetOnNewVolume = inputJson.chapterNumbersResetOnNewVolume || false;
    outputJson.createdAt = inputJson.createdAt || "";
    outputJson.updatedAt = inputJson.updatedAt || "";
    outputJson.latestUploadedChapter = inputJson.latestUploadedChapter;
    outputJson.relationships = [];//will add
    outputJson.type = inputJson.type || "";
    outputJson.views = inputJson.views || 0;
    outputJson.rating = inputJson.rating || 0;
    outputJson.follows = inputJson.follows || 0;
    outputJson.postAt = inputJson.postAt;
    outputJson.state = inputJson.state;
    outputJson.badge = inputJson.badge;
    contaboUpload(outputJson.id);
    const contaboApi = config.get('CONTABO_API');
    outputJson.poster.original = `${contaboApi}/${outputJson.id}/poster/${outputJson.id}.jpg`;
    outputJson.poster.thumb = `${contaboApi}/${outputJson.id}/thumb/${outputJson.id}.jpg`;
    outputJson.slug = outputJson.title.en
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const manga = await Manga.create(outputJson);
    res.status(StatusCodes.OK).json({
      status: true,
      content: {
        data: manga,
      }
    });
  } catch (error) {
    console.log("---->>>>" + error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: true,
      content: {
        error: error,
      }
    });
  }
}

//upload to contabo bucket
var contaboUpload = (id) => {

  try {
    sharp('public/imagefile.jpg')
      .webp()
      .resize(200, 300)
      .toFile('public/outputfile.webp', async (err, info) => {
        if (err) {
          console.error(err);
        } else {
          // console.log(info);
          var contabo_resp = await contaboAPI(id, "jpeg", "poster", "public/imagefile.jpg");
          if (contabo_resp.status == 200) {
            console.log("jpg poster placed");
          } else {
            console.log("jpg poster error");
          }
          var contabo_resp2 = await contaboAPI(id, "webp", "thumb", "public/outputfile.webp");
          if (contabo_resp2.status == 200) {
            console.log("webp thumb placed");
          } else {

          }
        }
      });
  } catch (error) {
    throw Error({ message: error })
  }

};
const contaboAPI = async (mangaName, mime, route, directory) => {
  const contaboApi = config.get('CONTABO_API');
  var response;
  try {
    const url = `${contaboApi}/${mangaName}/${route}/${mangaName}.${mime}`;
    const imageBuffer = fs.readFileSync(`${directory}`);
    var { ACCESS_KEY, SECRET_KEY } = config.get("awsSignature");
    const headers = {
      'Content-Type': `image/${mime}`,
    };

    const signedRequest = aws4.sign(
      {
        host: url.split('/')[2],
        method: 'PUT',
        path: `/${url.split('://')[1].split('/').slice(1).join('/')}`,
        headers,
        service: 's3',
        body: imageBuffer,
      },
      { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY }
    );

    response = await axios.put(url, imageBuffer, {
      headers: signedRequest.headers,
    });

    return response;
  } catch (err) {
    console.log("contabo error : " + err);
    return response;
  }
}



module.exports = {
  getAll,
  addManga,
}