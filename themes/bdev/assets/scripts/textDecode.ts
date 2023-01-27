import { debounce } from "./helpers/util.helpers";

export default class TextDecode {
  letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  targets: NodeListOf<HTMLElement>;

  constructor() {
    this.targets = document.querySelectorAll(".js-decode");

    if (!this.targets || this.targets.length < 1) {
      this.init = () => console.info("No decode elements found");
    }
  }

  init(): void {
    this.targets.forEach((target) => {
      this.handleEffect(target);

      target.addEventListener("mouseover", () =>
        this.handleEffect(target, true)
      );
    });
  }

  handleEffect(el: HTMLElement, hover = false): void {
    if (el.classList.contains("animating")) return;
    el.classList.add("animating");

    const initialText = el.innerText;
    let iterations = 0;

    if (hover) el.addEventListener("mouseout", () => (hover = false));

    const interval = setInterval(() => {
      el.innerText = el.innerText
        .split("")
        .map((_letter, index) => {
          if (index < iterations && !hover) return initialText[index];
          return this.letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= initialText.length) {
        el.classList.remove("animating");
        clearInterval(interval);
      }
      if (!hover) iterations += initialText.length / 50;
    }, 55);
  }
}
