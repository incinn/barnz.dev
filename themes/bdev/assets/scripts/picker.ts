import feather = require('feather-icons');

interface UserChangedResponse {
  text: string;
  postText: string;
}

const component = `
  <div class="picker__inner">
    <h1>
      <span class="picker__titleText">Hate</span>
      <span class="picker__titleColor">#000000</span>
      <span class="picker__titleTextPost">?</span>
    </h1>
    <p>Yeah, me too 👀 Change below, or select a custom colour.</p>
    <div class="picker__presets">
    </div>
  </div>
`;

const presets = ['#df1155', '#26bf80', '#457dd3', '#c18f34', '#681fd6'];

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
      postText: 'is much nicer!',
    },
    {
      text: 'Isn\'t',
      postText: 'gross!',
    },
    {
      text: '',
      postText: 'is alright I guess...'
    },
    {
      text: '',
      postText: 'would not be my first choice...'
    },
    {
      text: 'I like',
      postText: '!'
    },
    {
      text: '',
      postText: 'reminds me of Comic Sans'
    }
    
  ];

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

    picker.addEventListener('change', this.handleInputChange.bind(this));

    wrapper.appendChild(picker);
    wrapper.appendChild(icon);

    return wrapper;
  }

  update(colour: string): void {
    this.color = colour;

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
      this.update(event.target.value);
    }
  }

  setColour(): void {
    const root = document.querySelector(':root');

    root.style.setProperty('--accent', this.color);
  }
}
