import { useEffect, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';

export const useFaceMesh = () => {
  const [faceMesh, setFaceMesh] = useState<FaceMesh | null>(null);

  useEffect(() => {
    const initializeFaceMesh = async () => {
      const mesh = new FaceMesh({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`;
        }
      });

      await mesh.initialize();
      mesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      setFaceMesh(mesh);
    };

    initializeFaceMesh();

    return () => {
      faceMesh?.close();
    };
  }, []);

  return faceMesh;
};