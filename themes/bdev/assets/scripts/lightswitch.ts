import feather = require('feather-icons');

export default class LightSwitch {
  switchEl: HTMLButtonElement;
  wrapper: HTMLElement;
  toggle = true;

  constructor() {
    this.wrapper = document.getElementById('js-lightswitch');

    if (!this.wrapper || !feather) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.init = () => { };
      console.error('LightSwitch unable to start');
    }
  }

  init(): void {
    this.switchEl = this.createSwitch();

    this.switchEl.addEventListener('click', this.handleToggle.bind(this));
    this.wrapper.appendChild(this.switchEl);

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

    btn.classList.add('lightSwitch', 'btn', 'btn--small', 'btn--dark');
    btn.innerHTML = feather.icons.sun.toSvg();
    btn.setAttribute('aria-label', 'Toggle between light and dark mode');

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
