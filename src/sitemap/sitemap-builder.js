const superagent = require("superagent");

require("babel-register")({
  presets: ["es2015", "react"],
});

require('dotenv').config();

const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;
const {base_url, app_url} = require("../utils/constants");

async function loadResources() {
  try {
    const res = await superagent.get(`${base_url}sitemap`);
    return JSON.parse(res.text).data;
  } catch (err) {
    console.error(err);
  }
}

const resourceMap = [];

async function generateSitemap() {
  const resourceUrl = await loadResources();

  resourceUrl.forEach((resource) => {
    resourceMap.push({
      id: resource,
    });
  });

  const paramsConfig = {
    "/resources/:id": resourceMap,
  };

  return new Sitemap(router)
    .applyParams(paramsConfig)
    .build(`${app_url}`)
    .save("./public/sitemap.xml");
}

generateSitemap().then();
