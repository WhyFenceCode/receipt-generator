import nodeHtmlToImage from 'node-html-to-image';

export async function generateImageFromHTML(html, outputPath, width, height) {
  const buffer = await nodeHtmlToImage({
    output: outputPath,
    html,
    puppeteerArgs: {
      defaultViewport: {
        width,
        height,
        deviceScaleFactor: 1,
      },
    },
  });

  return buffer;
}
