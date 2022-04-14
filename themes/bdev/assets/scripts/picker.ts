import feather = require('feather-icons');

const component = `
  <div class="picker__inner">
    <h1>Select an Accent</h1>
    <div class="picker__presets">
    </div>
  </div>
`;

const presets = ['#df1155', '#26bf80', '#457dd3', '#c18f34', '#681fd6'];

export default class Picker {
  wrapperEl: HTMLElement;
  color: string;

  constructor() {}

  init(): void {
    this.create();
  }

  create(): void {
    this.wrapperEl = document.createElement('aside');
    this.wrapperEl.classList.add('picker');
    this.wrapperEl.innerHTML = component;

    const presetContainer = this.wrapperEl.querySelector('.picker__presets');
    presets.forEach((val) => {
      const btn = this.createPresetButton(val);
      btn.addEventListener('click', this.handlePresetClick.bind(this));
      presetContainer.appendChild(btn);
    });
    presetContainer.appendChild(this.createPicker());

    const main = document.querySelector('body > main');
    main.appendChild(this.wrapperEl);
  }

  createPresetButton(colour: string): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.dataset.colour = colour;
    btn.style.backgroundColor = colour;

    return btn;
  }

  createPicker(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('colorWrapper');
    const picker = document.createElement('input');
    picker.type = 'color';
    const icon = document.createElement('span');
    icon.innerHTML = feather.icons.edit.toSvg();

    wrapper.appendChild(picker);
    wrapper.appendChild(icon);

    return wrapper;
  }

  handlePresetClick(event: MouseEvent): void {
    event.preventDefault();

    if (event !== null && event.target instanceof HTMLButtonElement) {
      console.log(event.target.dataset.colour);
    }
  }
}
