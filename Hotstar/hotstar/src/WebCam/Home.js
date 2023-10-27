import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const GreenScreenEffect = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawGreenBackground = () => {
      if (webcamRef.current) {
        const video = webcamRef.current.video;
        canvas.width = video.width;
        canvas.height = video.height;

        // Draw the green background
        context.fillStyle = 'green';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the video frame on top of the green background
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        requestAnimationFrame(drawGreenBackground);
      }
    };

    drawGreenBackground();
  }, []);

  return (
    <div>
      <Webcam
        audio={false}
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default GreenScreenEffect;
