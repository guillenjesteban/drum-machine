import React, {useState, useEffect} from 'react';
import './index.css'


const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


function App() {

    const [volume, setVolume] = React.useState(1);
    const [recording, setRecording] = React.useState("");
    const [isActive, setActive] = React.useState(true);

    
    const playRecording = () => {
      let index = 0;
      let recordArray = recording.split(" ");
      const interval = setInterval(() => {
        const audioTag = document.getElementById(recordArray[index]);
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        index++;

      }, 300);

      setTimeout(() => 
        clearInterval(interval), 300 * recordArray.length -1);
      

    }


    return (


    <div className="container" id="drum-machine">
     { isActive?
      <div id="show">
      <button className="onButton" onClick={() => setActive(true)}>ON</button>     
       <button className="offButton" onClick={() => setActive(false)}>OFF</button>

      
      <h2>Drum Machine</h2>
      <div className="btn-wrapper">
      {audioClips.map((clip) => (
        <Pad className="drum.pad" key={clip.id} clip={clip} volume={volume} setRecording={setRecording} recording={recording} playRecording={playRecording}/>     
      ))} 
      </div>
      <br />
      <h4>Volume: {Math.round(volume * 100)}</h4>
    <input type="range" step="0.01" value={volume} max="1" min="0" className="volume-range" onChange={(e) => setVolume(e.target.value)} ></input>
      <h3 id="display">{recording}</h3>
        {recording && (
           <>
          <button className="onButton" onClick={playRecording}>Play</button>
          <button className="offButton" onClick={() => setRecording("")}>Clear</button>
          </>
        )}
      
      </div>
      : <div><h1>Drum Machine is off</h1><button onClick={() => setActive(true)}>TURN ON AGAIN</button></div>
}
    </div>
  );
}


function Pad({clip, volume, setRecording}) {


    // keypress event

  useEffect(() => {
  document.addEventListener("keydown", handleKeyPress);
  
  return () => {
    document.removeEventListener("keydown", handleKeyPress)
  }
}, [])


  const handleKeyPress = (e) => {
    if  (e.keyCode === clip.keyCode) {
      playSound()
    }
  }


  // change color when clicking pad

  const [active, setActive] = useState(false);


    // when clicking reproduce clip sound

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording(prev => prev + clip.keyTrigger + " ")
  }

  return (
    <button onClick={playSound} className={`"drum-pad" ${active}`}>
    {clip.keyTrigger}
    <audio className="clip" id={clip.keyTrigger} src={clip.url}></audio>
    </button>
  )
}


export default App;
