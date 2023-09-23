import {
  run
} from './run';

/**
 * Basic implementation for run the loader in cases where you need page load events
 */

export const domReady = (event = 'DOMContentLoaded', toRun = run, element = window.document, initAttr = 'data-nc') => {
  const ready = document.readyState === 'complete'
    || document.readyState === 'interactive';
  if (!ready) {
    window.addEventListener(event, () => {
      toRun(element, initAttr);
    });
  } else {
    toRun(element, initAttr);
  }
};
