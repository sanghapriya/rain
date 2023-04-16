import React, { useRef, useState, useEffect } from 'react';
import p5 from 'p5';

const Rain = (props) => {
  const sketchRef = useRef(null);

 

  const [canvasWidth,setCanvasWidth] = useState(400);
  const [canvasHeight,setCanvasHeight] = useState(400);

  useEffect(() => {
    setCanvasWidth(props.width);
  }, [props.width]);

  useEffect(() => {
    setCanvasHeight(props.height);
  }, [props.height]);

  useEffect(() => {
    const sketch = new p5((p5) => {
    

      let drops = [];

      p5.setup = () => {
        const canvas = p5.createCanvas(canvasHeight , canvasWidth);
        canvas.position(200, 200);
        canvas.style('z-index', '-1');
      };

      p5.draw = () => {
        p5.background(230, 230, 250);

        if (p5.frameCount % 10 === 0) {
          drops.push(new Drop());
        }

        for (let i = drops.length - 1; i >= 0; i--) {
          drops[i].fall();
          drops[i].show();

          if (drops[i].offScreen()) {
            drops[i].remove();
            drops.splice(i, 1);
          }
        }
      };

      class Drop {
        constructor() {
          this.x = p5.random(canvasWidth);
          this.y = p5.random(-500, -50);
          this.z = p5.random(0, 20);
          this.len = p5.map(this.z, 0, 20, 10, 20);
          this.yspeed = p5.map(this.z, 0, 20, 1, 20);
        }

        fall() {
          this.y = this.y + this.yspeed;
          this.yspeed = this.yspeed + p5.map(this.z, 0, 20, 0.05, 0.2);
        }

        show() {
          const thick = p5.map(this.z, 0, 20, 1, 3);
          p5.strokeWeight(thick);
          p5.stroke(138, 43, 226);
          p5.line(this.x, this.y, this.x, this.y + this.len);
        }

        offScreen() {
          return this.y > canvasHeight;
        }

        remove() {
          this.x = null;
          this.y = null;
          this.z = null;
          this.len = null;
          this.yspeed = null;
        }
      }
    });

    // Store the p5 instance to the ref so it can be destroyed later
    sketchRef.current = sketch;
    
    // Clean up function that destroys the p5 instance
    return () => {
      sketchRef.current.remove();
      sketchRef.current = null;
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default Rain;
