const {v4 : uuidv4} = require('uuid');


const mangaConversion = (req, res) => {
  const inputJson = req.body;
  var outputJson =  outputJson = {
    id: "",
    mdex_id: "",
    title: [],
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
    relationship: [],
    type: "",
    views: 0,
    rating: 0,
    follows: 0,
    poster: {
      main: "",
      optimized: "",
      cdnUrl: "",
    },
    Slug: "",
  };
  outputJson.id = uuidv4();
  outputJson.mdex_id = inputJson.id;
  outputJson.title = inputJson.attributes.title.en;
  outputJson.altTitles.en = inputJson.attributes.altTitles.en
  outputJson.description.en = inputJson.attributes.description?.en || "";
  outputJson.isLocked = inputJson.attributes.isLocked || false;
  outputJson.originalLanguage = inputJson.attributes.originalLanguage || "";
  outputJson.lastVolume = inputJson.attributes.lastVolume || "";
  outputJson.lastChapter = inputJson.attributes.lastChapter || "";
  outputJson.publicationDemographic = inputJson.attributes.publicationDemographic || null;
  outputJson.status = inputJson.attributes.status || "";
  outputJson.year = inputJson.attributes.year || "";
  outputJson.contentRating = inputJson.attributes.contentRating || "";
  outputJson.genre = inputJson.attributes.tags
    .filter((tag) => tag.type === "tag" && tag.attributes.group === "genre")
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
  outputJson.relationship = inputJson.relationships.map((relation) => {
    return { id: relation.id, type: relation.type, related: relation.related || null };
  });
  outputJson.type = inputJson.type;
  outputJson.views = inputJson.views?.type || 0;
  outputJson.rating = inputJson.rating?.type || 0;
  outputJson.follows = inputJson.follows?.type || 0;
  outputJson.poster.main = inputJson.attributes.links?.al || "";
  outputJson.poster.optimized = inputJson.attributes.links?.ap || "";
  outputJson.poster.cdnUrl = inputJson.attributes.links?.kt || "";
  outputJson.Slug = inputJson.attributes.links?.mu || "";

  res.send({
    "output": outputJson,
  });
};

module.exports = {
  mangaConversion,
};
