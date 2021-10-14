const fs = require("fs");
const path = require("path");
const https = require('https');

// copy onnxruntime-web WebAssembly files to {workspace}/public/ folder
const srcFolder = path.join(__dirname, 'node_modules', 'onnxruntime-web', 'dist');
const destFolder = path.join(__dirname, 'public', 'static', 'js');
if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder);
}
fs.copyFileSync(path.join(srcFolder, 'ort-wasm.wasm'), path.join(destFolder, 'ort-wasm.wasm'));
fs.copyFileSync(path.join(srcFolder, 'ort-wasm-simd.wasm'), path.join(destFolder, 'ort-wasm-simd.wasm'));
fs.copyFileSync(path.join(srcFolder, 'ort-wasm-threaded.wasm'), path.join(destFolder, 'ort-wasm-threaded.wasm'));
fs.copyFileSync(path.join(srcFolder, 'ort-wasm-simd-threaded.wasm'), path.join(destFolder, 'ort-wasm-simd-threaded.wasm'));

let download = function(url, dest) {
  if (fs.existsSync(dest)) {
    console.log("file exists, ignore: " + dest);
    return
  }
  console.log("downloading: " + url);
  let file = fs.createWriteStream(dest);
  let request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      console.log("downloaded: " + url);
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
    console.log(err.message);
  });
};

let downloadModel = function(name) {
  let url = "https://github.com/vicalloy/image-transformer/releases/download/v0.2.0-alpha/" + name;
  let dest = "public/models/" + name;
  download(url, dest);
}

let downloadModels = function(styleName, sizeList) {
  sizeList.forEach(function(size) {
    downloadModel(styleName + size + ".onnx")
  });
}

downloadModels("candy", [135, 200, 270, 300, 350, 360, 400, 540, 1200]);
downloadModels("gogh", [135, 200, 300, 350, 400, 500, 1000, 1500, 4000]);
downloadModels("rain", [135, 200, 300, 350, 500, 1000]);
downloadModels("mosaic", [224]);
