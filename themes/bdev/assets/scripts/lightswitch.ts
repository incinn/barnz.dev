import feather = require('feather-icons');

export default class LightSwitch {
  switchEl: HTMLButtonElement;
  navEl: HTMLElement;
  toggle = true;

  constructor() {
    this.navEl = document.getElementById('js-nav');

    if (!this.navEl || !feather) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.init = () => {};
      console.error('LightSwitch unable to start');
    }
  }

  init(): void {
    this.switchEl = this.createSwitch();

    this.switchEl.addEventListener('click', this.handleToggle.bind(this));
    this.navEl.appendChild(this.switchEl);

    this.setToggleIcon();
    this.setThemeAttr();
  }

  createSwitch(): HTMLButtonElement {
    const btn = document.createElement('button');

    btn.classList.add('lightSwitch');
    btn.innerHTML = feather.icons.sun.toSvg();

    return btn;
  }

  handleToggle(): void {
    this.toggle = !this.toggle;

    this.setToggleIcon();
    this.setThemeAttr();
  }

  setToggleIcon(): void {
    this.switchEl.innerHTML = this.toggle
      ? feather.icons.sun.toSvg()
      : feather.icons.moon.toSvg();
  }

  setThemeAttr(): void {
    document.documentElement.setAttribute(
      'data-theme',
      this.toggle ? 'light' : 'dark'
    );
  }
}

