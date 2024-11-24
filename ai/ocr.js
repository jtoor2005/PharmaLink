const { createWorker } = require('tesseract.js');

const processImage = async (imagePath) => {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imagePath);
    await worker.terminate();
    return text;
};

module.exports = processImage;
