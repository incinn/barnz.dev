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

    this.setTheme();
  }

  setTheme(): void {
    let theme = localStorage.getItem('theme');

    if (!theme) {
      theme =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    }

    if (theme !== this.getThemeName()) this.handleToggle();
    else {
      this.setToggleIcon();
      this.setThemeAttr();
    }
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
    this.storeTheme();
  }

  setToggleIcon(): void {
    this.switchEl.innerHTML = this.toggle
      ? feather.icons.sun.toSvg()
      : feather.icons.moon.toSvg();
  }

  setThemeAttr(): void {
    document.documentElement.setAttribute('data-theme', this.getThemeName());
  }

  getThemeName(): string {
    return this.toggle ? 'light' : 'dark';
  }

  storeTheme(): void {
    localStorage.setItem('theme', this.getThemeName());
  }
}
