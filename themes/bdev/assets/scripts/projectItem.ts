import ResponsiveHelpers from './helpers/responsive.helpers';

export default class ProjectItemEffect {
  private _responsive: ResponsiveHelpers;
  private threshold = 10;
  private minScale = 1.2;
  private maxScale = 2;
  private rotateY = 0;
  private rotateX = 0;
  private scale = this.minScale;

  constructor(rh: ResponsiveHelpers) {
    this._responsive = rh;
  }

  init(): void {
    const previews = document.querySelectorAll('.projectItem .window');

    previews.forEach((preview: HTMLElement) => {
      preview.addEventListener('mousemove', (ev: MouseEvent) => {
        this.handleMove(preview, ev);
      });

      preview.addEventListener('wheel', (ev: WheelEvent) => {
        this.handleZoom(preview, ev);
      });

      preview.addEventListener('click', () => {
        this.handleClick(preview);
      });

      preview.addEventListener('mouseleave', () => {
        this.reset(preview);
      });
    });
  }

  shouldHideEffect(): boolean {
    return this._responsive.isMobile() || this._responsive.isTablet();
  }

  reset(el: HTMLElement): void {
    el.removeAttribute('style');
    this.scale = this.minScale;
    this.rotateX = 0;
    this.rotateY = 0;
  }

  handleMove(el: HTMLElement, event: MouseEvent): void {
    if (this.shouldHideEffect()) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.rotateX = -this.calcRotation(event.y, centerY);
    this.rotateY = this.calcRotation(event.x, centerX);

    this.updateStyle(el);
  }

  updateStyle(el: HTMLElement): void {
    el.style.transform = `
      perspective(1000px)
      scale(${this.scale}) 
      rotateY(${this.rotateY}deg)
      rotateX(${-this.rotateX}deg)`;
    el.style.zIndex = '999';
  }

  handleZoom(el: HTMLElement, event: WheelEvent): void {
    if (this.shouldHideEffect()) return;
    event.preventDefault();

    this.scale = Math.min(
      Math.max(this.scale + event.deltaY * -0.01, this.minScale),
      this.maxScale
    );

    this.updateStyle(el);
  }

  handleClick(el: HTMLElement): void {
    this.scale = this.minScale;
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
