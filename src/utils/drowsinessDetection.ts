import { DrowsinessState, VehicleAction } from '../types/detection';

const DROWSY_FRAME_THRESHOLD = 48; // About 2 seconds at 24 fps

export const analyzeDrowsiness = (
  isBlinking: boolean,
  previousState: DrowsinessState
): DrowsinessState => {
  let consecutiveFrames = isBlinking ? previousState.consecutiveFrames + 1 : 0;
  let isDrowsy = consecutiveFrames >= DROWSY_FRAME_THRESHOLD;
  
  // Determine alert level based on consecutive drowsy frames
  let alertLevel: DrowsinessState['alertLevel'] = 'none';
  if (isDrowsy) {
    if (consecutiveFrames >= DROWSY_FRAME_THRESHOLD * 3) {
      alertLevel = 'pullover';
    } else if (consecutiveFrames >= DROWSY_FRAME_THRESHOLD * 2) {
      alertLevel = 'brake';
    } else {
      alertLevel = 'sound';
    }
  }
  
  return {
    isDrowsy,
    alertLevel,
    consecutiveFrames
  };
};

export const getVehicleAction = (alertLevel: DrowsinessState['alertLevel']): VehicleAction | null => {
  switch (alertLevel) {
    case 'sound':
      return {
        type: 'SOUND_ALERT',
        message: '⚠️ Wake up! Drowsiness detected!'
      };
    case 'brake':
      return {
        type: 'APPLY_BRAKES',
        message: '🛑 Emergency! Applying brakes...'
      };
    case 'pullover':
      return {
        type: 'PULL_OVER',
        message: '🚨 Critical! Pulling over to the side...'
      };
    default:
      return null;
  }
};