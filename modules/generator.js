import { JSDOM } from "jsdom";
import fs from "fs";

export function buildHtml(){
    const html = fs.readFileSync(new URL("../resources/image.html", import.meta.url), "utf8");
    const dom = new JSDOM(html);
    let document = dom.window.document;
    const content = document.querySelector("#content");

    console.log(content)
}