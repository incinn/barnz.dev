export default class Blurb {
  letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  container: HTMLElement;

  constructor() {
    this.container = document.getElementById("blurb-js");
    if (!this.container) {
      this.init = () => console.error("Blurb unable to start");
    }
  }

  init(): void {
    const targets = this.container.querySelectorAll("em");

    targets.forEach((target) => this.handleEffect(target));
  }

  handleEffect(el: HTMLElement): void {
    const initialText = el.innerText;
    let iterations = 0;

    const interval = setInterval(() => {
      el.innerText = el.innerText
        .split("")
        .map((letter, index) => {
          if (index < iterations) return initialText[index];
          return this.letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= initialText.length) clearInterval(interval);

      iterations += initialText.length / 70;
    }, 50);
  }
}
