import ResponsiveHelpers from "./helpers/responsive.helpers";
import Plugin from "./plugin";
import LightSwitch from "./plugins/lightswitch";
import Picker from "./plugins/picker";
import ProjectItemEffect from "./plugins/projectItem";
import TextDecode from "./plugins/textDecode";

export default class Website {
  plugins: Plugin[] = [];

  constructor() {
    const responsiveHelpers = new ResponsiveHelpers();
    this.plugins = [
      new LightSwitch(),
      new Picker(),
      new TextDecode(),
      new ProjectItemEffect(responsiveHelpers),
    ];

    this.init();
  }

  init(): void {
    this.plugins.forEach((plugin: Plugin) => plugin.init());
  }
}
