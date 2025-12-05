import {countTotalLines, countLinesByLanguage} from './plugins/sloc.js';

const wrapperHandlers = {
  sloc_mono: (data) => {
    console.log("Data is of type _sloc_mono_");
    return monoSloc(data);
  },
  sloc_multi: (data) => {
    console.log("Data is of type _sloc_multi_");
    return multiSloc(data);
  },
};

export function handleWrapper(data) {
    let output = null;
    if (wrapperHandlers[data.type]) {
        output = wrapperHandlers[data.type](data);
    } else {
        console.log("Unknown type:", data.type);
    }

    if (output) return output;
}

async function monoSloc(data){
    const langStats = await countLinesByLanguage(data.repo);
    return langStats
}

async function multiSloc(data) {
    const processed = await Promise.all(
        data.repos.map(async (name) => {
            const parts = name.split("/");
            const key = parts.pop();

            const value = await countTotalLines(name);

            return { key, value };
        })
    );

    processed.sort((a, b) => b.value - a.value);

    const output = {};
    for (const item of processed) {
        output[`${item.key}`] = item.value;
    }

    return output;
}