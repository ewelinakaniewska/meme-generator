import { useState, useEffect, useReducer } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not sipmly",
    imgUrl: "http://i.imgflip.com/1bij.jpg",
    bottomText: "Walk into Mordor",
  });
  const [memes, setMemes] = useState([]);

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  function getNewMeme() {
    let newMemeUrl = memes[Math.floor(Math.random() * memes.length)].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      imgUrl: newMemeUrl,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </label>
        <button onClick={getNewMeme}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imgUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
