import cheerio from "cheerio";

export default class Parser {
  constructor(html) {
    this.$ = cheerio.load(html);
  }

  getHeaderLinks() {
    return this.getLinks(this.$(".subnavbar__item a"));
  }

  getSidebarLinks() {
    return this.getLinks(this.$(".sidebar .NavigationItem__router-link"));
  }

  getTableLinks() {
    return this.getLinks(this.$(".table-wrp tr td:first-child a"));
  }

  getLinks(aElements) {
    return aElements.map((_, elm) => this.getLink(this.$(elm))).get();
  }

  getLink(aElement) {
    return {
      url: this.urlFor(aElement.attr("href")),
      text: aElement.text().trim(),
    };
  }

  urlFor(pathname) {
    const base = "https://developers.weixin.qq.com";
    return new URL(pathname, base).toString();
  }
}
