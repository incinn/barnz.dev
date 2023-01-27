import Website from "./website";
import Picker from "./picker";
import ProjectItem from "./projectItem";
import ResponsiveHelpers from "./helpers/responsive.helpers";
import TextDecode from "./textDecode";

document.addEventListener("DOMContentLoaded", () => {
  const responsiveHelpers = new ResponsiveHelpers();

  const w = new Website();
  const p = new Picker();
  const pi = new ProjectItem(responsiveHelpers);
  const t = new TextDecode();
  w.init();
  p.init();
  pi.init();
  t.init();
});
