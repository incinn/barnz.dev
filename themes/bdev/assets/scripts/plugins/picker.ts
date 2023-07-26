import feather = require('feather-icons');
import i18next from 'i18next';
import Plugin from '../plugin';

export default class Picker extends Plugin {
  container: HTMLElement;
  wrapperEl: HTMLElement;
  presets = ['#26bf80', '#e64d4d', '#457dd3', '#e89463', '#9572ca'];
  color: string = this.presets[0];
  component = '';
  i18next: typeof i18next;

  constructor() {
    super();

    this.container = document.getElementById('picker');
    if (!this.container) {
      this.init = () => (Promise.resolve());
    }

    console.log('PICKER CTOR');

    document.addEventListener('loadPlugins', async (e: CustomEvent) => {
      this.i18next = e.detail.i18n;
      await this.init();
    });
  }

  async init(): Promise<void> {
    console.log('INIT PICKER');
    console.log('here',i18next.languages);
    await this.i18next.loadNamespaces('picker');

    this.component = this.buildTemplate();
    this.create();

    const savedAccent = this.loadValueFromStore();
    if (savedAccent) this.update(savedAccent);
  }

  buildTemplate(): string {
    return `
      <div class="picker__container">
        <div class="picker__inner">
          ${this.createTitle(this.i18next.t('picker:title', { color: this.color })).outerHTML.toString()}
          <p>${this.i18next.t('picker:description')}</p>
          <div class="picker__presets"></div>
          <small>${this.i18next.t('picker:disclaimer')}</small>
          <button class="picker__reset" title="${this.i18next.t('picker:resetTitle')}"></button>
        </div>
      </div>
    `;
  }

  create(): void {
    this.wrapperEl = document.createElement('aside');
    this.wrapperEl.classList.add('picker');
    this.wrapperEl.innerHTML = this.component;

    const presetContainer = this.wrapperEl.querySelector('.picker__presets');
    this.presets.forEach((val) => {
      const btn = this.createPresetButton(val);
      btn.addEventListener('click', this.handlePresetClick.bind(this));
      presetContainer.appendChild(btn);
    });
    presetContainer.appendChild(this.createPicker());

    const pickerInner = this.wrapperEl.querySelector('.picker__inner');
    const resetButton = this.createResetButton();
    pickerInner.appendChild(resetButton);

    this.container.appendChild(this.wrapperEl);
  }

  createPresetButton(color: string): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.dataset.colour = color;
    btn.style.backgroundColor = color;
    btn.setAttribute('title', this.i18next.t('picker:presetTitle', { color }));

    return btn;
  }

  createPicker(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('colorWrapper');
    const picker = document.createElement('input');
    picker.type = 'color';
    picker.title = this.i18next.t('picker:customTitle');
    const icon = document.createElement('span');
    icon.innerHTML = feather.icons.edit.toSvg();

    picker.addEventListener('change', this.handleInputChange.bind(this));

    wrapper.appendChild(picker);
    wrapper.appendChild(icon);

    return wrapper;
  }

  createResetButton(): HTMLButtonElement {
    const button = this.wrapperEl.querySelector(
      '.picker__reset'
    ) as HTMLButtonElement;
    const icon = document.createElement('span');
    icon.innerHTML = feather.icons['refresh-cw'].toSvg();

    button.addEventListener('click', () => this.reset());
    button.appendChild(icon);

    return button;
  }

  createTitle(content: string): HTMLHeadingElement {
    const titleEl = document.createElement('h2');

    if(!content || content.length < 1) return titleEl;

    titleEl.innerHTML = content.replace(/(#[0-9a-f]{6}|#[0-9a-f]{3})/ig, `<span class="picker__titleColor">$1</span>`);

    return titleEl;
  }

  loadValueFromStore(): string | null {
    const savedValue = localStorage.getItem('accent');
    return savedValue ? savedValue : null;
  }

  setValueInStore(): void {
    localStorage.setItem('accent', this.color);
  }

  reset(): void {
    localStorage.removeItem('accent');
    window.location.reload();
  }

  update(colour: string): void {
    if (this.color === colour) return;

    this.color = colour;
    this.setValueInStore();
    this.setColour();
    this.updateText();
  }

  updateText(): void {
    const titleContainer: HTMLElement = this.wrapperEl.querySelector('.picker__inner h2');
    const prevResponseIndex = titleContainer.dataset.prevIndex || 0;
    
    const responses: string[] = this.i18next.t('picker:responses', { returnObjects: true, color: this.color });
    const response = this.selectRandomResponse(responses, +prevResponseIndex);

    if(!response || !response.response) return;

    const titleEl = this.createTitle(response.response);
    titleEl.dataset.prevIndex = response.index.toString();

    titleContainer.parentElement.replaceChild(titleEl, titleContainer);
  }

  handlePresetClick(event: MouseEvent): void {
    event.preventDefault();

    if (event !== null && event.target instanceof HTMLButtonElement) {
      this.update(event.target.dataset.colour);
    }
  }

  handleInputChange(event: Event): void {
    event.preventDefault();

    if (event !== null) {
      this.update((<HTMLInputElement>event.target).value);
    }
  }

  setColour(): void {
    const root = document.querySelector(':root') as HTMLElement;

    root.style.setProperty('--accent', this.color);
    root.style.setProperty('--accent-alt', this.getContrastColour(this.color));
  }

  getContrastColour(color: string): string {
    const rgbColor = this.hexToRgb(color);
    const contrast =
      0.2126 * rgbColor[0] + 0.7152 * rgbColor[1] + 0.0722 * rgbColor[2];

    return contrast >= 165 ? '#000000' : '#ffffff';
  }

  selectRandomResponse(responses: string[] = [], previous: number = 0): { index: number; response: string } {
    if(responses.length < 1) return;
    // TODO: refactor into shared method 
    //       used in both pircker.ts and textDeconde.ts

    let index = 0;

    while (index === previous) {
      index = Math.floor(Math.random() * responses.length);
    }

    return { index, response: responses[index] };
  }

  hexToRgb(hex: string): number[] {
    // https://javascript.plainenglish.io/convert-hex-to-rgb-with-javascript-4984d16219c3
    if (hex[0] === '#') hex = hex.slice(1);

    const aRgbHex = hex.match(/.{1,2}/g);
    return [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16),
    ];
  }
}

new Picker();
