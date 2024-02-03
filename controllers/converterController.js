const { v4: uuidv4 } = require('uuid');
const request = require('request');
const fs = require('fs');
const sharp = require('sharp');
const axios = require('axios');
const config = require('config');
const aws4 = require('aws4');
const { response } = require('express');


const mangaConversion = async (req, res) => {
  const inputJson = req.body;
  var outputJson = outputJson = {
    id: "",
    mdex_id: "",
    title: {
      en: "",
      jp: "",
    },
    altTitles: {},
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
    latestUploadedChapter: [],
    relationships: [],
    type: "",
    views: 0,
    rating: 0,
    follows: 0,
    poster: {
      original: "",
      thumb: ""
    },
    slug : ""
  };
  outputJson.id = uuidv4();
  outputJson.mdex_id = inputJson.id;
  outputJson.title.en = inputJson.attributes.title.en;
  outputJson.title.jp = inputJson.attributes.title.jp;
  outputJson.altTitles = inputJson.attributes.altTitles
  outputJson.description.en = inputJson.attributes.description?.en || "";
  outputJson.isLocked = inputJson.attributes.isLocked || false;
  outputJson.originalLanguage = inputJson.attributes.originalLanguage || "";
  outputJson.lastVolume = inputJson.attributes.lastVolume || "";
  outputJson.lastChapter = inputJson.attributes.lastChapter || "";
  outputJson.genre.push(inputJson.attributes.publicationDemographic || null);
  outputJson.status = inputJson.attributes.status || "";
  outputJson.year = inputJson.attributes.year || "";
  outputJson.contentRating = inputJson.attributes.contentRating || "";
  outputJson.genre = inputJson.attributes.tags
    .filter((tag) => tag.type === "tag" && (tag.attributes.group === "genre" || tag.attributes.group === "theme" || tag.attributes.group === "format"))
    .map((tag) => tag.attributes.name.en);
  outputJson.author = inputJson.relationships
    .filter((relation) => relation.type === "author")
    .map((author) => author.id);
  outputJson.artist = inputJson.relationships
    .filter((relation) => relation.type === "artist")
    .map((artist) => artist.id);
  outputJson.keywords = inputJson.attributes.tags
    .filter((tag) => tag.type === "tag" && tag.attributes.group === "theme")
    .map((tag) => tag.attributes.name.en);
  outputJson.chapterNumbersResetOnNewVolume = inputJson.attributes.chapterNumbersResetOnNewVolume || false;
  outputJson.createdAt = inputJson.attributes.createdAt || "";
  outputJson.updatedAt = inputJson.attributes.updatedAt || "";
  outputJson.latestUploadedChapter = [inputJson.attributes.latestUploadedChapter];
  outputJson.relationships = [];//will add
  outputJson.type = inputJson.type;
  outputJson.views = inputJson.views?.type || 0;
  outputJson.rating = inputJson.rating?.type || 0;
  outputJson.follows = inputJson.follows?.type || 0;
  outputJson.postAt = "now";
  outputJson.slug = outputJson.title.en
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');

  var poster_link = inputJson.relationships
    .filter((relation) => relation.type === "cover_art")
    .map((poster) => poster.attributes.fileName);
  var poster_uri = `https://uploads.mangadex.org/covers/${outputJson.mdex_id}/${poster_link}`;

  var destination = `controllers/temp/tempfile.jpg`;
  var scrap_poster = (url, destination) => {
    request(url)
      .pipe(fs.createWriteStream(destination))
      .on("close", () => {
        sharp('controllers/temp/tempfile.jpg')
          .webp()
          .resize(200, 300)
          .toFile('controllers/temp/outputfile.webp',async (err, info) => {
            if (err) {
              console.error(err);
            } else {
              // console.log(info);
              var contabo_resp = await contaboAPI(outputJson.slug, "jpeg", "poster", "controllers/temp/tempfile.jpg");
              if (contabo_resp.status == 200) {
                console.log("jpg poster placed");
              } else {
                console.log("jpg poster error");
              }
              var contabo_resp2 = await contaboAPI(outputJson.slug, "webp", "thumb", "controllers/temp/outputfile.webp");
              if (contabo_resp2.status == 200) {
                console.log("webp thumb placed");
              } else {

              }
            }
          });
      })
      .on("error", (err) => {
        console.error("Error downloading the image:", err);
      });
  };
  scrap_poster(poster_uri, destination);
  outputJson.poster.original = `https://eu2.contabostorage.com/07430bd7553b41ab8e21fb8ab9438054:manga/${outputJson.slug}/poster/${outputJson.slug}.jpg`;
  outputJson.poster.thumb = `https://eu2.contabostorage.com/07430bd7553b41ab8e21fb8ab9438054:manga/${outputJson.slug}/thumb/${outputJson.slug}.jpg`;
  res.send(outputJson);
};

//api to post images to contabo manga bucket
const contaboAPI = async (mangaName, mime, route, directory) => {
  var response;
  try {
    const url = `https://eu2.contabostorage.com/07430bd7553b41ab8e21fb8ab9438054:manga/${mangaName}/${route}/${mangaName}.${mime}`;
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



const chapterConversion = (req, res) => {
  var outputJson = {
    id: "",
    mangaId: "",
    mdex_id: "",
    title: "",
    volume: 0,
    chapterNumber: "",
    summary: "",
    language: "",
    pages: [

    ],
    pageCount: 0,
    version: 0,
    publishedAt: "",
    createdAt: "",
    updatedAt: "",
    isActive: false,
    relationships: [

    ],
  };

}


module.exports = {
  mangaConversion,
};

// page reference --> (context of chapter)

// {
//   pageNumber: 0,
//   urls: {
//     server1: "",
//     server2: "",
//     server3: "",
//     server4: "",
//   },
// },

// {
//   user_id: "",
//   method: "",
//   from: "",
// },