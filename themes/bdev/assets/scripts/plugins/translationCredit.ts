import Plugin from "../plugin";

export default class TranslationCredit extends Plugin {
  buttons: NodeListOf<HTMLButtonElement>;

  constructor() {
    super();
    
    this.buttons = document.querySelectorAll('.translationCredit__vote button');
    if(!this.buttons || this.buttons.length === 0) {
      this.init = undefined;
    }
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

    const heart = this.createHeart();
    heart.style.setProperty('--heart-random-1', this.randomNumber(-20, 10) + 'px');
    heart.style.setProperty('--heart-random-2', this.randomNumber(-10, 20) + 'px');
    heart.style.setProperty('--heart-random-3', this.randomNumber(-25, 25) + 'px');
    heart.style.setProperty('--heart-random-4', this.randomNumber(-30, 30) + 'px');
    button.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000)
  }

  createHeart(): HTMLElement {
    const heartEl = document.createElement('span');
    heartEl.innerHTML = '❤️';
    heartEl.classList.add('heart');

    return heartEl;
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
