import React, { useState, useEffect } from 'react';
import { prepareAndRunStyle } from "./transformer.js";
import './App.css';
import { modelConfig } from "./models";

function App() {

  const [imageSrc, setImageSrc] = useState<any>();
  const defaultStyle = 'rain'
  const [sizeList = modelConfig[defaultStyle], setSizeList] = useState<number[]>();
  const [selectStyle = defaultStyle, setSelectedStyle] = useState<any>();
  const [selectImageSize = 135, setSelectedImageSize] = useState<any>();
  const [hint = "please upload a image", setHint] = useState<string>();

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
      setHint("transforming ...")
      prepareAndRunStyle(
        imageSrc,
        "resultCanvas",
        selectImageSize,  // selectSize,
        selectStyle,
      ).then((value) => {
        setHint("");
      });
    } else {
    }
  }, [imageSrc, selectImageSize, selectStyle]);

  return (
    <div className="App">

      <header className="App-header">
        <div>
          {Object.keys(modelConfig).map(function(key, index) {
            return (
              <label key={key}>
                <input type="radio" name="style" value={key} onChange={radioHandler} checked={key === selectStyle}/>
                <img src={`${process.env.PUBLIC_URL}/assets/images/styles/${key}.jpg`}/>
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
        <div>
          { hint }
        </div>
        <canvas id="resultCanvas" width={selectImageSize} height={selectImageSize} />
      </header>
    </div>
  );
}

export default App;
