import LightSwitch from './lightswitch';

export default class Website {
  constructor() {}

  init(): void {
    const lightswitch = new LightSwitch();
    lightswitch.init();
  }
}
