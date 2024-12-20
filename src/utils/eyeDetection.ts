import { EyeState } from '../types/detection';

// Eye Aspect Ratio (EAR) calculation
export const calculateEAR = (landmarks: number[][]): number => {
  // Vertical eye landmarks
  const p2_p6 = euclideanDistance(landmarks[1], landmarks[5]);
  const p3_p5 = euclideanDistance(landmarks[2], landmarks[4]);
  
  // Horizontal eye landmarks
  const p1_p4 = euclideanDistance(landmarks[0], landmarks[3]);
  
  // Calculate EAR
  return (p2_p6 + p3_p5) / (2.0 * p1_p4);
};

const euclideanDistance = (point1: number[], point2: number[]): number => {
  return Math.sqrt(
    Math.pow(point1[0] - point2[0], 2) + 
    Math.pow(point1[1] - point2[1], 2)
  );
};

export const analyzeEyeState = (leftEyePoints: number[][], rightEyePoints: number[][]): EyeState => {
  const leftEAR = calculateEAR(leftEyePoints);
  const rightEAR = calculateEAR(rightEyePoints);
  
  // EAR threshold for determining if eyes are closed
  const EAR_THRESHOLD = 0.2;
  
  return {
    leftEye: leftEAR,
    rightEye: rightEAR,
    isBlinking: (leftEAR + rightEAR) / 2 < EAR_THRESHOLD
  };
};