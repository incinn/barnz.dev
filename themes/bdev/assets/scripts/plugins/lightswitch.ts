import i18next from 'i18next';
import Plugin from '../plugin';

export default class LightSwitch extends Plugin {
  elementId = 'lightModeToggle';
  wrapper: HTMLElement;
  inputEl: HTMLInputElement;
  toggle: boolean; // true = lightMode

  constructor() {
    super();
    this.wrapper = document.getElementById('js-lightswitch');

    if (!this.wrapper) {
      this.init = undefined;
    }
  }

  async init(): Promise<void> {
    await i18next.loadNamespaces('lightswitch');

    const switchEl = this.createSwitch();
    const label = this.createLabel();

    this.inputEl = switchEl.querySelector('input[type=checkbox]');
    this.inputEl.addEventListener('change', (e: InputEvent) => {
      this.toggle = (<HTMLInputElement>e.target).checked;
      this.handleToggle();
    });

    this.wrapper.replaceWith(label, switchEl);

    this.setDefaultTheme();
  }

  reset(): void { }

  setDefaultTheme(): void {
    let theme = localStorage.getItem('theme');

    if (!theme) {
      theme =
        window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    }

    this.toggle = theme === 'light' ? true : false;
    this.handleToggle();
    this.setThemeAttr();
  }

  createLabel(): HTMLElement {
    const label = document.createElement('label');
    label.setAttribute('for', this.elementId);
    label.classList.add('optionsMenu__content__title');

    const smallText = document.createElement('small');
    smallText.innerText = i18next.t('optionsLabelDesc', { ns: 'lightswitch' });

    label.innerText = i18next.t('optionsLabelTitle', { ns: 'lightswitch' });
    label.appendChild(smallText);

    return label;
  }

  createSwitch(): HTMLElement {
    const wrapper = document.createElement('label');

    wrapper.classList.add('switch');
    wrapper.setAttribute('for', this.elementId);

    const inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'checkbox');
    inputEl.classList.add('switch__input');
    inputEl.setAttribute('id', this.elementId);

    const fillEl = document.createElement('div');
    fillEl.classList.add('switch__fill');

    wrapper.appendChild(inputEl);
    wrapper.appendChild(fillEl);

    return wrapper;
  }

  handleToggle(): void {
    this.inputEl.checked = this.toggle;

    this.setThemeAttr();
    this.storeTheme();
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
