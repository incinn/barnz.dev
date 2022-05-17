import Website from './website';
import Picker from './picker';

document.addEventListener('DOMContentLoaded', () => {
  const w = new Website();
  const p = new Picker();
  w.init();
  p.init();
});

