//File to tie together

//SLOC TEST FOR NOW
import {countTotalLines, countLinesByLanguage} from './modules/plugins/sloc.js';


async function test() {
  const repo = "https://github.com/facebook/react";

  console.log("Counting by language...");
  const langStats = await countLinesByLanguage(repo);
  console.log(langStats);

  console.log("Counting total lines...");
  const total = await countTotalLines(repo);
  console.log("Total lines:", total);
}

test();