import React, { useRef, useState, useEffect } from 'react';

const Topiary = () => {
  const canvasRef = useRef(null);
  const [w, setW] = useState(window.innerWidth);
  const [h, setH] = useState(window.innerHeight);
  const w2 = w * 0.5;
  const h2 = h * 0.5;
  const [ŭ, setU] = useState(0);
  const [cnt, setCnt] = useState(0);
  
  class Branch {
      constructor(len, ang, gen) {
          this.len = len;
          this.ang = ang;
          this.gen = gen;
          this.limb = [];
          this.sway = 0;
          this.mult = rnd(0.01, 0.1);
          this.spawn = 0;
          this.vel = 0;
          
          if (gen < 10) {
              this.limb.push(new Branch(len * rnd(0.8, 0.99),
              rnd(0, Math.PI / 6), this.gen + 1));
              this.limb.push(new Branch(len * rnd(0.8, 0.99),
              rnd(0, -Math.PI / 6), this.gen + 1));
            }
            
            this.disp = function ($) {
                this.sway++;
                $.save();
                this.vel *= 0.9;
                var dif = 1 - this.spawn;
                this.vel += (dif * 0.1);
                this.spawn += this.vel;
                
                $.strokeStyle = "hsla(" + (ŭ % 360) + ",100%,50%,1)";
                $.lineWidth = 1;
                $.beginPath();
                $.rotate(this.ang + (Math.sin(this.sway * this.mult) * Math.PI / 128));
                $.moveTo(0, 0);
                $.lineTo(this.len * this.spawn, 0);
                $.stroke();
                
                $.translate(this.len * this.spawn, 0);
                
                if (this.spawn > 0.6) {
                    for (var i = 0; i < this.limb.length; i++) {
                        var limb = this.limb[i];
                        limb.disp($);
                    }
                }
                $.restore();
            };
        }
    }
    const topiary = new Branch(80, 0, 0);
    useEffect(() => {
        const handleResize = () => {
            setW(window.innerWidth);
            setH(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const anim = () => {
      setCnt(prevCnt => prevCnt + 1);
      setU(prevU => prevU - 0.5);
      if (cnt % 2) {
        draw(ctx);
      }
      window.requestAnimationFrame(anim);
    };
    window.requestAnimationFrame(anim);
  }, []);

  const draw = (ctx) => {
    ctx.save();
    ctx.clearRect(0, 0, w, h);
    ctx.translate(w2, h*0.98);
    ctx.rotate(-Math.PI * 0.5);
    topiary.disp(ctx);
    ctx.restore();
  };

    function rnd(min, max){
        return Math.random()*(max - min) + min;
    }

  return (
    <div>
      <canvas ref={canvasRef} width={w} height={h} />
    </div>
  );
};

export default Topiary;
