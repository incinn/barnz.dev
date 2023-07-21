import ResponsiveHelpers from "../helpers/responsive.helpers";
import Plugin from "../plugin";

export default class ProjectItemEffect extends Plugin {
  private _responsive: ResponsiveHelpers;
  private threshold = 10;
  private minScale = 1.2;
  private maxScale = 2;
  private rotateY = 0;
  private rotateX = 0;
  private scale = this.minScale;

  constructor(rh: ResponsiveHelpers) {
    super();
    this._responsive = rh;
  }

  async init(): Promise<void> {
    const previews = document.querySelectorAll(".projectItem .window");

    previews.forEach((preview: HTMLElement) => {
      preview.addEventListener("mousemove", (ev: MouseEvent) => {
        this.handleMove(preview, ev.x, ev.y);
      });

      preview.addEventListener("wheel", (ev: WheelEvent) => {
        if (this.shouldHideEffect()) return;
        ev.preventDefault();
        this.handleZoom(preview, ev.deltaY);
      });

      preview.addEventListener("click", () => {
        this.handleClick(preview);
      });

      preview.addEventListener("mouseleave", () => {
        this.resetItem(preview);
      });
    });
  }

  reset(): void {}

  shouldHideEffect(): boolean {
    return this._responsive.isMobile() || this._responsive.isTablet();
  }

  resetItem(el: HTMLElement): void {
    el.removeAttribute("style");
    this.scale = this.minScale;
    this.rotateX = 0;
    this.rotateY = 0;
  }

  handleMove(el: HTMLElement, x: number, y: number): void {
    if (this.shouldHideEffect()) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.rotateX = this.calcRotation(y, centerY);
    this.rotateY = this.calcRotation(x, centerX);

    this.updateStyle(el);
  }

  updateStyle(el: HTMLElement): void {
    el.style.transform = `
      perspective(1000px)
      scale(${this.scale}) 
      rotateY(${this.rotateY}deg)
      rotateX(${-this.rotateX}deg)`;
    el.style.zIndex = "999";
  }

  handleZoom(el: HTMLElement, deltaY: number): void {
    if (this.shouldHideEffect()) return;

    this.scale = Math.min(
      Math.max(this.scale + deltaY * -0.01, this.minScale),
      this.maxScale
    );

    this.updateStyle(el);
  }

  handleClick(el: HTMLElement): void {
    if (this.shouldHideEffect()) return;
    const midway = (this.minScale + this.maxScale) / 2;
    if (this.scale < midway) this.scale = this.maxScale;
    else this.scale = this.minScale;
    this.updateStyle(el);
  }

  calcRotation(cursorPosition: number, center: number): number {
    if (cursorPosition - center >= 0) {
      return cursorPosition - center >= this.threshold
        ? this.threshold
        : cursorPosition - center;
    } else {
      return cursorPosition - center <= -this.threshold
        ? -this.threshold
        : cursorPosition - center;
    }
  }
}
