export default class LightSwitch {
  wrapper: HTMLElement;
  inputEl: HTMLInputElement;
  toggle: boolean; // true = lightMode

  constructor() {
    this.wrapper = document.getElementById("js-lightswitch");

    if (!this.wrapper) {
      this.init = () => console.error("LightSwitch unable to start");
    }
  }

  init(): void {
    const switchEl = this.createSwitch();

    this.inputEl = switchEl.querySelector("input[type=checkbox]");
    this.inputEl.addEventListener("change", (e: InputEvent) => {
      this.toggle = (<HTMLInputElement>e.target).checked;
      this.handleToggle();
    });

    this.wrapper.appendChild(switchEl);

    this.setDefaultTheme();
  }

  setDefaultTheme(): void {
    let theme = localStorage.getItem("theme");

    if (!theme) {
      theme =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    }

    this.toggle = theme === "light" ? true : false;
    this.handleToggle();
    this.setThemeAttr();
  }

  createSwitch(): HTMLElement {
    const elId = "darkModeToggle";
    const wrapper = document.createElement("label");

    wrapper.classList.add("switch");
    wrapper.setAttribute("for", elId);

    const inputEl = document.createElement("input");
    inputEl.setAttribute("type", "checkbox");
    inputEl.classList.add("switch__input");
    inputEl.setAttribute("id", elId);

    const fillEl = document.createElement("div");
    fillEl.classList.add("switch__fill");

    wrapper.appendChild(inputEl);
    wrapper.appendChild(fillEl);

    return wrapper;
  }

  handleToggle(): void {
    this.inputEl.checked = this.toggle;

    this.setThemeAttr();
    this.storeTheme();
  }

  setThemeAttr(): void {
    document.documentElement.setAttribute("data-theme", this.getThemeName());
  }

  getThemeName(): string {
    return this.toggle ? "light" : "dark";
  }

  storeTheme(): void {
    localStorage.setItem("theme", this.getThemeName());
  }
}
