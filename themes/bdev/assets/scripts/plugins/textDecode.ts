import Plugin from "../plugin";

export default class TextDecode extends Plugin {
  cyphers = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "01", "BARNZ", "-_.", "▒░", "¦|¡!"];
  targets: NodeListOf<HTMLElement>;

  constructor() {
    super();
    this.targets = document.querySelectorAll(".js-decode");

    if (!this.targets || this.targets.length < 1) {
      this.init = () => console.info("No decode-effect elements found");
    }
  }

  async init(): Promise<void> {
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

    const previousCypherIndex = el.dataset.previousCypher;
    const cypher = this.selectRandomCypher(+previousCypherIndex);
    el.dataset.previousCypher = cypher.index.toString();

    const initialText = el.innerText;

    if (infinite) el.addEventListener("mouseout", () => (infinite = false));

    let iterations = 0;
    const interval = setInterval(() => {
      el.innerText = el.innerText
        .split("")
        .map((_, index) => {
          if (index < iterations && !infinite) return initialText[index];

          return cypher.cypher[
            Math.floor(Math.random() * cypher.cypher.length)
          ];
        })
        .join("");

      if (iterations >= initialText.length) {
        el.classList.remove("animating");
        clearInterval(interval);
      }
      if (!infinite) iterations += initialText.length / 50;
    }, 55);
  }

  selectRandomCypher(previous: number): { index: number; cypher: string } {
    let index = 0;

    while (index === previous) {
      index = Math.floor(Math.random() * this.cyphers.length);
    }

    return { index, cypher: this.cyphers[index] };
  }
}
