import LightSwitch from './lightswitch';

export default class Website {
  constructor() {
    this.init();
  }

  init(): void {
    const lightswitch = new LightSwitch();
    lightswitch.init();
  }
}

