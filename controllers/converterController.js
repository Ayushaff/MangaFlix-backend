const mangaConversion = (req, res) => {
  const inputJson = req.body;
  const outputJson = {
    id: { type: 'String' },
    mdex_id: { type: 'String' },
    title: { en: { type: 'String' } },
    altTitles: { type: ['Mixed'] },
    description: { en: { type: 'String' } },
    isLocked: { type: 'Boolean' },
    originalLanguage: { type: 'String' },
    lastVolume: { type: 'String' },
    lastChapter: { type: 'String' },
    publicationDemographic: { type: 'String' },
    status: { type: 'String' },
    year: { type: 'String' },
    contentRating: { type: 'String' },
    genre: { type: ['String'] },
    author: { type: ['String'] },
    artist: { type: ['String'] },
    keywords: { type: 'Array' },
    chapterNumbersResetOnNewVolume: { type: 'Boolean' },
    createdAt: { type: 'String' },
    updatedAt: { type: 'String' },
    latestUploadedChapter: { type: 'Array' },
    relationship: { type: 'Array' },
    type: { type: 'String' },
    views: { type: 'Number' },
    rating: { type: 'Number' },
    follows: { type: 'Number' },
    poster: {
      main: { type: 'String' },
      optimized: { type: 'String' },
      cdnUrl: { type: 'String' },
    },
    Slug: { type: 'String' },
  };
  outputJson.id.type = inputJson.id.type;
  outputJson.title.en.type = inputJson.attributes.title.en.type;
  outputJson.altTitles.type = inputJson.attributes.altTitles.type;
  outputJson.description.en.type =
    inputJson.attributes.description?.type || "String";
  outputJson.isLocked.type = inputJson.attributes.isLocked.type;
  outputJson.originalLanguage.type = inputJson.attributes.originalLanguage.type;
  outputJson.lastVolume.type = inputJson.attributes.lastVolume.type;
  outputJson.lastChapter.type = inputJson.attributes.lastChapter.type;
  outputJson.publicationDemographic.type =
    inputJson.attributes.publicationDemographic.type;
  outputJson.status.type = inputJson.attributes.status.type;
  outputJson.year.type = inputJson.attributes.year.type;
  outputJson.contentRating.type = inputJson.attributes.contentRating.type;
  outputJson.chapterNumbersResetOnNewVolume.type =
    inputJson.attributes.chapterNumbersResetOnNewVolume.type;
  outputJson.createdAt.type = inputJson.attributes.createdAt.type;
  outputJson.updatedAt.type = inputJson.attributes.updatedAt.type;
  outputJson.latestUploadedChapter.type =
    inputJson.attributes.latestUploadedChapter.type;
  outputJson.relationship.type = inputJson.relationships.type;

  res.send({
    "output": outputJson,
  });
};

module.exports = {
  mangaConversion,
};
