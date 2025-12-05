//File to tie together

//SLOC TEST FOR NOW
import {handleWrapper} from './modules/reader.js'
import {buildHtml} from './modules/generator.js'

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
  'facebook/react': 1057177,
  'WhyFenceCode/receipt-generator': 699359,
  'IrisShaders/docs': 70014
};
console.log(data);
buildHtml(data);