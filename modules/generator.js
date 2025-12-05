import { JSDOM } from "jsdom";
import fs from "fs";

export function buildHtml(data){
    const html = fs.readFileSync(new URL("../resources/image.html", import.meta.url), "utf8");
    const dom = new JSDOM(html);
    let document = dom.window.document;
    const content = document.querySelector("#content");

    content.appendChild(horizontalDivider(document));

    let i = 0;
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            i++;
            content.appendChild(item(document, i, key, data[key]));
        }
    }

    content.appendChild(horizontalDivider(document));

    return [dom, i];
}

function horizontalDivider(document) {
    let div = document.createElement('div');
    div.className = 'horizontal-divider';
    return div;
}

function item(document, count, name, value) {
    let div = document.createElement('div');
    div.className = 'item-wrapper roboto-mono-font';

    let countItem = document.createElement('p');
    countItem.innerHTML = String(count).padStart(2, '0');
    countItem.className = 'item-count roboto-mono-font';
    
    let nameItem = document.createElement('p');
    nameItem.innerHTML = name.toUpperCase();
    nameItem.className = 'item-name roboto-mono-font';

    let spacerItem = document.createElement('div');
    spacerItem.className = 'item-spacer';

    let valueItem = document.createElement('div');
    valueItem.innerHTML = value;
    valueItem.className = 'item-value roboto-mono-font';

    div.appendChild(countItem);
    div.appendChild(nameItem);
    div.appendChild(spacerItem);
    div.appendChild(valueItem);

    return div;
}