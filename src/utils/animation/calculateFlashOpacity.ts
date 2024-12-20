import { ANIMATION } from '../../constants';

export function calculateFlashOpacity(): number {
  const { FLASH_DURATION, MIN_OPACITY, MAX_OPACITY } = ANIMATION.ARROW;
  const time = Date.now() % FLASH_DURATION;
  const progress = time / FLASH_DURATION;
  
  // Create a smooth sine wave oscillation between MIN_OPACITY and MAX_OPACITY
  const opacity = MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * 
    (0.5 + 0.5 * Math.sin(2 * Math.PI * progress));
  
  return opacity;
}