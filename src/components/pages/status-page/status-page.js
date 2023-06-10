import "./status-page.css";
import React, { useState, useEffect } from "react";
import anime from "animejs";
import Topiary from "../../molecules/tree-component/tree-component";
export default function StatusPage() {
  const [num, setNum] = useState(60);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [vw, setVw] = useState(
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  );
  const [vh, setVh] = useState(
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  );

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

  function handleSwitch() {
    console.log(isVideoVisible);
    setIsVideoVisible(!isVideoVisible);
  }
  return (
    <div id="App">
      <svg id="sky">
        {[...Array(num)].map((x, y) => (
          <circle
            cx={getRandomX()}
            cy={getRandomY()}
            r={randomRadius()}
            stroke="none"
            strokeWidth="0"
            fill="white"
            key={y}
            className="star"
          />
        ))}
      </svg>
      <div id="shootingstars">
        {[...Array(60)].map((x, y) => (
          <div
            key={y}
            className="wish"
            style={{
              left: `${getRandomY()}px`,
              top: `${getRandomX()}px`,
            }}
          />
        ))}
      </div>

      <section className="messagesection">
        <p className="message">
          A Video Just for You <span className="heart">❤️</span>
        </p>
      </section>

      <label className="switch">
        <div className="round">
          <input name="onoff" id="onoff" type="checkbox" />
          <div className="back">
            <label htmlFor="onoff" className="but" onClick={handleSwitch}>
              <span className="on">0</span>
              <span className="off">I</span>
            </label>
          </div>
        </div>
      </label>
      {isVideoVisible && (
        <section className="videoSection">
          <div className="card">
            <video
              className="video"
              src="/videos/video-1.mp4"
              autoPlay={true}
              controls={true}
            />
          </div>
        </section>
      )}
      <p className="regards">With Love : <br/> Sachin ❤️</p>
      {/* <p className="regards">Sachin ❤️</p> */}
    </div>
  );
}
