//File to tie together

//SLOC TEST FOR NOW
import {handleWrapper} from './modules/reader.js'
import {buildHtml} from './modules/generator.js'
import {generateImageFromHTML} from './modules/buffer.js'

const test_monoSloc = {
    type: "sloc_mono",
    repo: "https://github.com/facebook/react",
}

const test_multiSloc = {
    type: "sloc_multi",
    repos: [
        "https://github.com/facebook/react",
        "https://github.com/IrisShaders/docs",
        "https://github.com/WhyFenceCode/receipt-generator",
    ]
}
const data = {
  'react': 1057177,
  'receipt-generator': 699359,
  'docs': 70014
};
console.log(data);
const htmlData = buildHtml(data);
console.log(htmlData);
const buffer = await generateImageFromHTML(htmlData[0], 430, (298 + 24 + 28 * (htmlData[1]+1) ));
