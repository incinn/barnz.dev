import feather = require('feather-icons');

interface UserChangedResponse {
  text: string;
  postText: string;
}

const component = `
  <div class="picker__container">
    <div class="picker__inner">
      <h1>
        <span class="picker__titleText">Hate</span>
        <span class="picker__titleColor">#df1155</span>
        <span class="picker__titleTextPost">?</span>
      </h1>
      <p>
        Select an accent colour below, or choose your own with the picker on the right.
      </p>
      <div class="picker__presets"></div>
      <small>Changing the accent colour may impact readability in some areas.</small>
      <button class="picker__reset" title="I made a mistake, put it back to how it was"></button>
    </div>
  </div>
`;

const presets = ['#26bf80', '#df1155', '#457dd3', '#c18f34', '#834ed3'];

export default class Picker {
  wrapperEl: HTMLElement;
  color: string;

  userChangedResponses: UserChangedResponse[] = [
    {
      text: 'Hmmm',
      postText: '...',
    },
    {
      text: '',
      postText: '👀',
    },
    {
      text: '😍',
      postText: 'is much nicer!',
    },
    {
      text: '🤢',
      postText: '',
    },
    {
      text: '',
      postText: 'if you insist...',
    },
    {
      text: '',
      postText: 'wouldn\'t be my first choice',
    },
    {
      text: '',
      postText: '❤️',
    },
    {
      text: '',
      postText: 'reminds me of Comic Sans',
    },
    {
      text: '',
      postText: 'perfect!',
    },
  ];

  init(): void {
    this.create();

    const savedAccent = this.loadValueFromStore();
    if(savedAccent) this.update(savedAccent);
  }

  create(): void {
    const container = document.getElementById('picker');
    if(!container) return;

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

    const pickerInner = this.wrapperEl.querySelector('.picker__inner');
    const resetButton = this.createResetButton();
    pickerInner.appendChild(resetButton);

    container.appendChild(this.wrapperEl);
  }

  createPresetButton(colour: string): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.dataset.colour = colour;
    btn.style.backgroundColor = colour;
    btn.setAttribute('aria-label', `Set accent colour ${colour}`);

    return btn;
  }

  createPicker(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('colorWrapper');
    const picker = document.createElement('input');
    picker.type = 'color';
    const icon = document.createElement('span');
    icon.innerHTML = feather.icons.edit.toSvg();

    picker.addEventListener('change', this.handleInputChange.bind(this));

    wrapper.appendChild(picker);
    wrapper.appendChild(icon);

    return wrapper;
  }

  createResetButton(): HTMLButtonElement {
    const button = this.wrapperEl.querySelector('.picker__reset') as HTMLButtonElement;
    const icon = document.createElement('span');
    icon.innerHTML = feather.icons['refresh-cw'].toSvg();

    button.addEventListener('click', this.reset.bind(this));
    button.appendChild(icon);

    return button;
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
    if(this.color === colour) return;

    this.color = colour;
    this.setValueInStore();
    this.setColour();
    this.updateText();
  }

  updateText(): void {
    const colorText = this.wrapperEl.querySelector('.picker__titleColor');
    const text = this.wrapperEl.querySelector('.picker__titleText');
    const textPost = this.wrapperEl.querySelector('.picker__titleTextPost');

    colorText.innerHTML = this.color;

    const random = Math.floor(Math.random() * this.userChangedResponses.length);
    const response = this.userChangedResponses[random];

    text.innerHTML = response.text;
    textPost.innerHTML = response.postText;
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
