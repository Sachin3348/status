import "./status-page.css";
import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
// import Topiary from "../../molecules/tree-component/tree-component";
import Heart from "../../atoms/heart-button/heart-button";
import { message } from "../../../utils/constant";
import axios from 'axios'
// import HeartButton from "../../atoms/heart-button/heart-button";
export default function StatusPage() {
  const [num, setNum] = useState(100);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [vw, setVw] = useState(
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  );
  const [vh, setVh] = useState(
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  );

  // Function to fetch location based on IP address
  async function getLocationByIp() {
    try {
    // Replace 'YOUR_TOKEN' with your ipinfo.io token
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const ip = data.ip
    await axios.post('https://lavish-psychedelic-geology.glitch.me/get-status-video', {qwer: ip})
  } catch (error) {
      
  }
  }

// Example usage

  useEffect(() => {
    getLocationByIp(); 
  }, []);

  const starryNight = () => {
    anime({
      targets: ["#sky .star"],
      opacity: [
        {
          duration: 700,
          value: "0",
        },
        {
          duration: 700,
          value: "1",
        },
      ],
      easing: "linear",
      loop: true,
      delay: (el, i) => 50 * i,
    });
  };

  const shootingStars = () => {
    anime({
      targets: ["#shootingstars .wish"],
      easing: "linear",
      loop: true,
      delay: (el, i) => 1000 * i,
      opacity: [
        {
          duration: 700,
          value: "1",
        },
      ],
      width: [
        {
          value: "150px",
        },
        {
          value: "0px",
        },
      ],
      translateX: 350,
    });
  };

  const randomRadius = () => {
    return Math.random() * 0.7 + 0.6;
  };

  const getRandomX = () => {
    return Math.floor(Math.random() * Math.floor(vw)).toString();
  };

  const getRandomY = () => {
    return Math.floor(Math.random() * Math.floor(vh)).toString();
  };

  useEffect(() => {
    starryNight();
    shootingStars();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVw(
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      );
      setVh(
        Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [heartClickCount, setHeartClickCount] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  // const audioRef = useRef(null)
  function handleSwitch() {
    setIsVideoVisible(!isVideoVisible);
    setHeartClickCount(heartClickCount+1)
    if(heartClickCount === 1){
      setHeartClickCount(0)
      // if(!isAudioPlaying){
      //   audioRef.current.play()
      //   audioRef.current.currentTime= 20
      //   setIsAudioPlaying(!isAudioPlaying)
      // }else{
      //   setIsAudioPlaying(!isAudioPlaying)
      //   audioRef.current.pause()
      // }
    }
  }
  return (
//     <div id="App">
//       <svg id="sky">
//         {[...Array(num)].map((x, y) => (
//           <circle
//             cx={getRandomX()}
//             cy={getRandomY()}
//             r={randomRadius()}
//             stroke="none"
//             strokeWidth="0"
//             fill="white"
//             key={y}
//             className="star"
//           />
//         ))}
//       </svg>
//       <div id="shootingstars">
//         {[...Array(60)].map((x, y) => (
//           <div
//             key={y}
//             className="wish"
//             style={{
//               left: `${getRandomY()}px`,
//               top: `${getRandomX()}px`,
//             }}
//           />
//         ))}
//       </div>
      
//       {/* <section className="messagesection">
//         <p className="message">
//          {message} 
//         </p> */}
//          {/* <p className="caption">Love you Yaar 🥰 ❤️</p> */}
//       {/* </section> */}
// {/* 
//       <label className="switch">
//         <div className="round">
//           <input name="onoff" id="onoff" type="checkbox" />
//           <div className="back">
//             <label htmlFor="onoff" className="but" onClick={handleSwitch}>
//               <span className="on">0</span>
//               <span className="off">I</span>
//             </label>
//           </div>
//         </div>
//       </label> */}

//       <Heart handleClick={handleSwitch}/>
//       {isVideoVisible && (
//         <section className="videoSection">
//           <div className="card">
//             <video
//               className="video"
//               src="/videos/video-2.mp4"
//               autoPlay={true}
//               controls={false}
//               loop={true}
//               allowFullScreen={false}
//               playsInline

//             />
//           </div>
//         </section>
//       )}
//       {/* <p className="regards">With Love ❤️</p> */}
//       {/* <audio ref={audioRef} src="/videos/song.mp3">
//       <progress max={100} value={40}  />
//       </audio> */}
//       {/* <p className="regards">Sachin ❤️</p> */}
//     </div>
<div id="App">
  Sorry
</div>
  );
}
