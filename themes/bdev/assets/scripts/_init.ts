import Website from "./website";
import Picker from "./picker";
import ProjectItem from "./projectItem";
import ResponsiveHelpers from "./helpers/responsive.helpers";
import Blurb from "./blurb";

document.addEventListener("DOMContentLoaded", () => {
  const responsiveHelpers = new ResponsiveHelpers();

  const w = new Website();
  const p = new Picker();
  const pi = new ProjectItem(responsiveHelpers);
  const b = new Blurb();
  w.init();
  p.init();
  pi.init();
  b.init();
});
