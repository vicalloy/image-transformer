import ndarray from "ndarray";
import ops from "ndarray-ops";
import {Tensor} from 'onnxruntime-web';
import { createModelCpu, runModel } from "./runModel";
import { modelConfig } from "./models";

const loadImage = imageSrc =>
  new Promise((resolve, reject) => {
    const img = new Image()

    // the following handler will fire after the successful loading of the image
    img.onload = () => {
      resolve(img)
    }

    // and this handler will fire if there was an error with the image (like if it's not really an image or a corrupted one)
    img.onerror = () => {
      reject('There was some problem with the image.')
    }

    img.src = imageSrc
  })


function getModelImageSize(styleName, maxSize, imageDimensions) {
  const sizeList = modelConfig[styleName];
  const imageSize = imageDimensions.width > imageDimensions.height ? imageDimensions.width : imageDimensions.height;
  let modelImageSize = 0;
  for(let len = sizeList.length, i = len - 1; i >= 0 ; i--) {
    const size =  sizeList[i];
    if (size > maxSize) {
      continue;
    }
    if (size <= imageSize) {
      modelImageSize = modelImageSize || size;
      break;
    }
    modelImageSize = size;
  }
  modelImageSize = modelImageSize || sizeList[0];
  return modelImageSize;
}


function getOutputDimension(image, modelImageSize) {
  let height = modelImageSize;
  let width = image.width * (modelImageSize / image.height);
  if (image.width > image.height) {
    width = modelImageSize;
    height = image.height * (modelImageSize / image.width);
  }
  return {width, height};
}

async function getData(image, modelImageSize, outputDimension) {
  let canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = modelImageSize;
  canvas.height = modelImageSize;

  ctx.drawImage(image, 0, 0, outputDimension.width, outputDimension.height);
  const imgData = ctx.getImageData(0, 0, modelImageSize, modelImageSize).data;
  return new Float32Array(imgData);
}


function normalizeInputColor(data) {
  const mean = [0.485, 0.456, 0.406];
  const std = [0.229, 0.224, 0.225];
  const normData = new Float32Array(data.length);
  for (let i = 0; i < data.length; i += 3) {
    normData[i] = (data[i] - mean[0]) / std[0];
    normData[i + 1] = (data[i + 1] - mean[1]) / std[1];
    normData[i + 2] = (data[i + 2] - mean[2]) / std[2];
  }
  return normData;
}

function normalizeOutputColor(data) {

}


let preprocess = (imgData, modelImageSize, style) => {
  if (style === 'anime-gan-v2-') {
    for(let i = 0; i < imgData.length; i += 1) {
      imgData[i] = (imgData[i] / 255) * 2 - 1;
    }
  }

  let dataFromImage = ndarray(imgData, [modelImageSize, modelImageSize, 4]);
  let dataProcessed = ndarray(new Float32Array(modelImageSize * modelImageSize * 3), [
    1,
    3,
    modelImageSize,
    modelImageSize,
  ]);

  ops.assign(
    dataProcessed.pick(0, 2, null, null),
    dataFromImage.pick(null, null, 2)
  );

  ops.assign(
    dataProcessed.pick(0, 1, null, null),
    dataFromImage.pick(null, null, 1)
  );
  ops.assign(
    dataProcessed.pick(0, 0, null, null),
    dataFromImage.pick(null, null, 0)
  );
  const inputTensor = new Tensor(
    "float32",
    new Float32Array(3 * modelImageSize * modelImageSize),
    [1, 3, modelImageSize, modelImageSize]
  );

  inputTensor.data.set(dataProcessed.data);
  return inputTensor;
}

let postprocess = () => {

}

export async function prepareAndRunStyle(
  imageSrc,
  resultCanvas,
  maxModelImageSize,
  style,
) {
  const image = await loadImage(imageSrc)
  const modelImageSize = getModelImageSize(
    style, maxModelImageSize, {width: image.width, height: image.height});
  const outputDimension = getOutputDimension(image, modelImageSize);
  let imgData = await getData(image, modelImageSize, outputDimension);

  const inputTensor = preprocess(imgData, modelImageSize, style);

  const modelFile = `${process.env.PUBLIC_URL}/models/${style}${modelImageSize}.onnx`;
  console.log("loading onnx model");
  let session = await createModelCpu(modelFile);
  console.log("transforming");
  const [output, time] = await runModel(session, inputTensor);
  console.log("finished");
  session = null;
  let outputData = output.data;
  const dataFromImageBack = ndarray(
    new Float32Array(modelImageSize * modelImageSize * 4),
    [modelImageSize, modelImageSize, 4]
  );
  const dataProcessedBack = ndarray(new Float32Array(outputData), [
    1,
    3,
    modelImageSize,
    modelImageSize,
  ]);

  ops.assign(
    dataFromImageBack.pick(null, null, 0),
    dataProcessedBack.pick(0, 0, null, null)
  );
  ops.assign(
    dataFromImageBack.pick(null, null, 1),
    dataProcessedBack.pick(0, 1, null, null)
  );
  ops.assign(
    dataFromImageBack.pick(null, null, 2),
    dataProcessedBack.pick(0, 2, null, null)
  );

  let dataForImage = dataFromImageBack.data;
  for (let y = 0; y < modelImageSize; y++) {
    for (let x = 0; x < modelImageSize; x++) {
      let pos = (y * modelImageSize + x) * 4; // position in buffer based on x and y
      if (style === 'anime-gan-v2-') {
        for (let i = 0; i < 3; i++) {
          let c = dataForImage[pos + i];
          c = c * 0.5 + 0.5;
          c = c < 0 ? 0 : c > 1 ? 255 : Math.round(c * 255);
          dataForImage[pos + i] = c;
        }
      }
      dataForImage[pos + 3] = 255; // set alpha channel
    }
  }
  let canvas = document.getElementById(resultCanvas);
  let ctx = canvas.getContext("2d");
  canvas.width = outputDimension.width;
  canvas.height = outputDimension.height;
  // create imageData object
  let idata = ctx.createImageData(modelImageSize, modelImageSize);
  // set our buffer as source
  idata.data.set(dataForImage);
  // update canvas with new data
  ctx.putImageData(idata, 0, 0);
}
