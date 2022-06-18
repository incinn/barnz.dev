import ResponsiveHelpers from './helpers/responsive.helpers';

export default class ProjectItemEffect {
  private responsive: ResponsiveHelpers;
  private threshold = 10;
  private minScale = 1.2;
  private maxScale = 2;
  private scale = this.minScale;

  constructor() {
    this.responsive = new ResponsiveHelpers();
  }

  init(): void {
    const previews = document.querySelectorAll('.projectItem .window');

    previews.forEach((preview: HTMLElement) => {
      preview.addEventListener('mousemove', (ev: MouseEvent) => {
        this.effect(preview, ev);
      });

      preview.onwheel = this.handleZoom.bind(this);

      preview.addEventListener('click', () => {
        this.scale = this.minScale;
      });

      preview.addEventListener('mouseleave', () => {
        preview.removeAttribute('style');
        this.scale = this.minScale;
      });
    });
  }

  shouldHideEffect(): boolean {
    return this.responsive.isMobile() || this.responsive.isTablet();
  }

  map(
    val: number,
    minA: number,
    maxA: number,
    minB: number,
    maxB: number
  ): number {
    return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
  }

  effect(preview: HTMLElement, event: MouseEvent): void {
    if (this.shouldHideEffect()) return;

    const rect = preview.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    preview.style.transform = `perspective(1000px)
      scale(${this.scale}) 
      rotateY(${this.rotate(event.x, centerX)}deg)
      rotateX(${-this.rotate(event.y, centerY)}deg)`;
  }

  handleZoom(event): void {
    if (this.shouldHideEffect()) return;

    event.preventDefault();
    const newScale = this.scale + event.deltaY * -0.01;

    this.scale = Math.min(Math.max(newScale, this.minScale), this.maxScale);
  }

  rotate(cursorPosition: number, centerPosition: number): number {
    if (cursorPosition - centerPosition >= 0) {
      return cursorPosition - centerPosition >= this.threshold
        ? this.threshold
        : cursorPosition - centerPosition;
    } else {
      return cursorPosition - centerPosition <= -this.threshold
        ? -this.threshold
        : cursorPosition - centerPosition;
    }
  }
}
