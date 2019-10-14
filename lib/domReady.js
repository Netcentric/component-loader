import {
  run
} from './run';

/**
 * Basic implementation for run the loader in cases where you need page load events 
 */

export const domReady = (event = "DOMContentLoaded", toRun = run) => {
  const ready = document.readyState === 'complete' ||
    document.readyState === 'interactive';
  if (!ready) {
    window.addEventListener(event, () => {
      toRun();
    });
  } else {
    toRun();
  }
};
