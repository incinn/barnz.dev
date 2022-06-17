import Website from './website';
import Picker from './picker';
import ProjectItem from './projectItem';

document.addEventListener('DOMContentLoaded', () => {
  const w = new Website();
  const p = new Picker();
  const pi = new ProjectItem();
  w.init();
  p.init();
  pi.init();
});

