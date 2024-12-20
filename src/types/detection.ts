export interface EyeState {
  leftEye: number;
  rightEye: number;
  isBlinking: boolean;
}

export interface DrowsinessState {
  isDrowsy: boolean;
  alertLevel: 'none' | 'sound' | 'brake' | 'pullover';
  consecutiveFrames: number;
}

export interface VehicleAction {
  type: 'SOUND_ALERT' | 'APPLY_BRAKES' | 'PULL_OVER' | 'HAZARD_LIGHTS';
  message: string;
}