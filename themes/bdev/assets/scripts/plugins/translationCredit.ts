import Plugin from "../plugin";

document.addEventListener('loadPlugins', async () => {
  new TranslationCredit();
});

export default class TranslationCredit extends Plugin {
  buttons: NodeListOf<HTMLButtonElement>;

  constructor() {
    super();
    
    this.buttons = document.querySelectorAll('.translationCredit__vote button');
    if(!this.buttons || this.buttons.length === 0) {
      this.init = () => (Promise.resolve());
    }
    
    this.init();
  }

  async init(): Promise<void> {
    this.buttons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => this.handleClick(button));
    });
  }

  reset(): void {}

  handleClick(button: HTMLButtonElement): void {
    if(button.classList.contains('voteNo')) {
      button.classList.add('voteNo--yes');
    }
    
    let i = 0;
    this.createEffect(button);
    const interval = setInterval(() => {
      if(i === 1) clearInterval(interval);

      this.createEffect(button);
      i++;
    }, 200)
  }

  createHeartElement(): HTMLElement {
    const heartEl = document.createElement('span');
    heartEl.innerHTML = '❤️';
    heartEl.classList.add('heart');

    return heartEl;
  }

  createEffect(button: HTMLButtonElement): void {
    const heart = this.createHeartElement();
    heart.style.setProperty('--heart-random-1', this.randomNumber(-25, 15) + 'px');
    heart.style.setProperty('--heart-random-2', this.randomNumber(-15, 5) + 'px');
    heart.style.setProperty('--heart-random-3', this.randomNumber(-25, 15) + 'px');
    heart.style.setProperty('--heart-random-4', this.randomNumber(-15, 5) + 'px');
    button.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 990)
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

