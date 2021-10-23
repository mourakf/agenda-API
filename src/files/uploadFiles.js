const fs = require('fs')
// readFile - sincrono, caminho,tipo de arquivo, funcao callback
// transforma em stream e ler aos poucos, não tem function callback
module.exports = (path, imgName, callbackimg) => {
    const imgPath = `./assets/img${imgName}`
    fs.createReadStream(path)
    // pipe transforma a stream de leitura em escrita
        .pipe(fs.createWriteStream(imgPath))
        // ativa evento
        .on('finish', () => callbackimg(imgPath))

}

