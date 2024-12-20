import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera } from '@mediapipe/camera_utils';
import { FaceMesh } from '@mediapipe/face_mesh';
import useSound from 'use-sound';
import { AlertTriangle } from 'lucide-react';
import { useWebcam } from '../hooks/useWebcam';
import { useFaceMesh } from '../hooks/useFaceMesh';
import { DrowsinessState, VehicleAction } from '../types/detection';
import { analyzeEyeState } from '../utils/eyeDetection';
import { analyzeDrowsiness, getVehicleAction } from '../utils/drowsinessDetection';
import { LEFT_EYE_INDICES, RIGHT_EYE_INDICES } from '../utils/faceLandmarks';

const WEBCAM_CONFIG = {
  width: 640,
  height: 480,
  facingMode: "user",
  mirrored: true,
  audio: false,
  screenshotFormat: "image/jpeg"
};

const DrowsinessDetector: React.FC = () => {
  const { webcamRef, isWebcamReady } = useWebcam(WEBCAM_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drowsinessState, setDrowsinessState] = useState<DrowsinessState>({
    isDrowsy: false,
    alertLevel: 'none',
    consecutiveFrames: 0
  });
  const [vehicleAction, setVehicleAction] = useState<VehicleAction | null>(null);
  const [playAlert] = useSound('/alert.mp3', { volume: 0.75 });

  useEffect(() => {
    let camera: Camera | null = null;
    let faceMesh: FaceMesh | null = null;

    const initializeDetection = async () => {
      try {
        if (!webcamRef.current || !isWebcamReady) {
          console.log('Waiting for webcam...');
          return;
        }

        const video = webcamRef.current.video;
        if (!video) {
          throw new Error('Video element not found');
        }

        // Initialize FaceMesh
        faceMesh = new FaceMesh({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`;
          }
        });

        await faceMesh.initialize();

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        faceMesh.onResults((results) => {
          if (results.multiFaceLandmarks) {
            const face = results.multiFaceLandmarks[0];
            if (face) {
              const leftEyePoints = LEFT_EYE_INDICES.map(index => [
                face[index].x,
                face[index].y
              ]);
              
              const rightEyePoints = RIGHT_EYE_INDICES.map(index => [
                face[index].x,
                face[index].y
              ]);
              
              const eyeState = analyzeEyeState(leftEyePoints, rightEyePoints);
              const newDrowsinessState = analyzeDrowsiness(eyeState.isBlinking, drowsinessState);
              
              setDrowsinessState(newDrowsinessState);
              
              const action = getVehicleAction(newDrowsinessState.alertLevel);
              if (action) {
                setVehicleAction(action);
                if (action.type === 'SOUND_ALERT') {
                  playAlert();
                }
              } else {
                setVehicleAction(null);
              }
            }
          }
        });

        // Initialize Camera
        camera = new Camera(video, {
          onFrame: async () => {
            if (video) {
              await faceMesh.send({ image: video });
            }
          },
          width: WEBCAM_CONFIG.width,
          height: WEBCAM_CONFIG.height
        });

        await camera.start();
        setIsLoading(false);
      } catch (err) {
        console.error('Detection initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize detection');
        setIsLoading(false);
      }
    };

    if (isWebcamReady) {
      initializeDetection();
    }

    return () => {
      camera?.stop();
      faceMesh?.close();
    };
  }, [isWebcamReady, webcamRef]);

  if (error) {
    return (
      <div className="text-center p-4 bg-red-100 rounded-lg">
        <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-700">{error}</p>
        <p className="text-sm text-red-600 mt-2">
          Please ensure camera access is granted and try reloading the page.
        </p>
      </div>
    );
  }

  if (isLoading || !isWebcamReady) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p className="text-gray-600">
          {!isWebcamReady ? 'Initializing webcam...' : 'Setting up detection system...'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          className="rounded-lg shadow-lg"
          {...WEBCAM_CONFIG}
        />
        {drowsinessState.isDrowsy && (
          <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
            <AlertTriangle className="inline-block mr-2" />
            Drowsiness Detected!
          </div>
        )}
      </div>

      {vehicleAction && (
        <div className={`mt-4 p-4 rounded-lg text-white text-center w-full max-w-md ${
          vehicleAction.type === 'SOUND_ALERT' ? 'bg-yellow-500' :
          vehicleAction.type === 'APPLY_BRAKES' ? 'bg-orange-500' :
          'bg-red-500'
        }`}>
          <h3 className="text-lg font-bold mb-2">Alert</h3>
          <p>{vehicleAction.message}</p>
        </div>
      )}

      <div className="mt-4 p-4 bg-gray-100 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">System Status</h3>
        <ul className="space-y-2">
          <li>
            <span className="font-medium">Detection Status:</span>{' '}
            {drowsinessState.isDrowsy ? 'Drowsy' : 'Alert'}
          </li>
          <li>
            <span className="font-medium">Alert Level:</span>{' '}
            {drowsinessState.alertLevel}
          </li>
          <li>
            <span className="font-medium">Consecutive Frames:</span>{' '}
            {drowsinessState.consecutiveFrames}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DrowsinessDetector;