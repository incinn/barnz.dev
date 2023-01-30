import Plugin from "../plugin";

export default class TextDecode extends Plugin {
  cyphers = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "01", "BARNZ", "-_."];
  targets: NodeListOf<HTMLElement>;

  constructor() {
    super();
    this.targets = document.querySelectorAll(".js-decode");

    if (!this.targets || this.targets.length < 1) {
      this.init = () => console.info("No decode-effect elements found");
    }
  }

  init(): void {
    this.targets.forEach((target: HTMLElement) => {
      this.handleEffect(target);

      target.addEventListener("mouseover", () =>
        this.handleEffect(target, true)
      );
    });
  }

  reset(): void {}

  handleEffect(el: HTMLElement, infinite = false): void {
    if (el.classList.contains("animating")) return;
    el.classList.add("animating");

    const source: string =
      this.cyphers[Math.floor(Math.random() * this.cyphers.length)];
    const initialText = el.innerText;
    let iterations = 0;

    if (infinite) el.addEventListener("mouseout", () => (infinite = false));

    const interval = setInterval(() => {
      el.innerText = el.innerText
        .split("")
        .map((_letter, index) => {
          if (index < iterations && !infinite) return initialText[index];
          return source[Math.floor(Math.random() * source.length)];
        })
        .join("");

      if (iterations >= initialText.length) {
        el.classList.remove("animating");
        clearInterval(interval);
      }
      if (!infinite) iterations += initialText.length / 50;
    }, 55);
  }
}
