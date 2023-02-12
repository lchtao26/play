import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import Parser from "./parser.js";

main();
async function main() {
  const entries = [
    {
      name: "api",
      url: "https://developers.weixin.qq.com/miniprogram/dev/api/",
    },
    {
      name: "component",
      url: "https://developers.weixin.qq.com/miniprogram/dev/component/",
    },
  ];
  entries.forEach(crawl);
}

async function crawl(entry) {
  const links = new Parser(await fetchHTML(entry.url)).getSidebarLinks();
  save({
    name: entry.name,
    date: new Date().toUTCString(),
    links,
  });
}

async function fetchHTML(url) {
  const resp = await fetch(url);
  return resp.text();
}

function save(data) {
  const { name, links } = data;
  const filename = `data/${name}.json`;
  fs.writeFile(filename, JSON.stringify(data, null, "  "), (err) => {
    if (err) throw err;
    console.log(`saved ${filename} (total: ${links.length})`);
  });
}
