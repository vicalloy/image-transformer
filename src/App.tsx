import React, { useState, useEffect } from 'react';
import { prepareAndRunStyle } from "./transformer.js";
import './App.css';
import candy from './assets/images/styles/candy.jpg';
import gogh from './assets/images/styles/gogh.jpg';
import rain from './assets/images/styles/rain.jpg';
import { modelConfig } from "./models";

function App() {

  // https://github.com/mxkrn/onnxruntime-web-tutorial/blob/main/src/js/main.js
  // https://github.com/kleinicke/fast_web_style_transfer/tree/master/public
  const [imageSrc, setImageSrc] = useState<any>();
  const defaultStyle = 'rain'
  const [sizeList = modelConfig[defaultStyle], setSizeList] = useState<number[]>();
  const [selectStyle = defaultStyle, setSelectedStyle] = useState<any>();
  const [selectImageSize = 135, setSelectedImageSize] = useState<any>();

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const style = event.target.value;
    setSelectedStyle(style);
    setSizeList(modelConfig[style]);
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    setSelectedImageSize(size);
  };

  const fileOnChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  };

    useEffect(() => {
    if (imageSrc) {
      prepareAndRunStyle(
          imageSrc,
          "resultCanvas",
          selectImageSize,  // selectSize,
          selectStyle,
      )
    } else {
    }
  }, [imageSrc, selectImageSize, selectStyle]);

  return (
    <div className="App">

      <header className="App-header">
        <div>
          {Object.keys(modelConfig).map(function(key, index) {
            return (
              <label>
                <input type="radio" name="style" value={key} onChange={radioHandler} checked={key == selectStyle}/>
                <img src={"assets/images/styles/" + key + ".jpg"}/>
              </label>
            )})}
        </div>
        <div>
          Output image size:
          <select name="imageSize" id="imageSize" value={selectImageSize} onChange={selectHandler}>
            {sizeList.map(item => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <input
          type="file"
          name="backgroundImg"
          onChange={fileOnChange}
        ></input>
        <canvas id="resultCanvas" width={selectImageSize} height={selectImageSize} />
      </header>
    </div>
  );
}

export default App;
