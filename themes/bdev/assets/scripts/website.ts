import { LightSwitch } from './lightswitch';

export class Website {
  constructor() {
    this.init();
  }

  init(): void {
    const lightswitch = new LightSwitch();
    lightswitch.init();
  }
}

