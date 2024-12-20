import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

interface WebcamConfig {
  width: number;
  height: number;
  facingMode: string;
  mirrored: boolean;
  audio: boolean;
  screenshotFormat: string;
}

export const useWebcam = (config: WebcamConfig) => {
  const webcamRef = useRef<Webcam>(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  useEffect(() => {
    const checkWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setIsWebcamReady(true);
      } catch (err) {
        console.error('Webcam access error:', err);
        setIsWebcamReady(false);
      }
    };

    checkWebcam();
  }, []);

  return { webcamRef, isWebcamReady };
};