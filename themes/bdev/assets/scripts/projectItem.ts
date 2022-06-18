import ResponsiveHelpers from './helpers/responsive.helpers';

export default class ProjectItemEffect {
  private responsive: ResponsiveHelpers;
  private threshold = 10;
  private minScale = 1.2;
  private maxScale = 2;
  private scale = this.minScale;

  constructor(rh: ResponsiveHelpers) {
    this.responsive = rh;
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

  handleZoom(event: WheelEvent): void {
    if (this.shouldHideEffect()) return;
    event.preventDefault();

    this.scale = Math.min(
      Math.max(this.scale + event.deltaY * -0.01, this.minScale),
      this.maxScale
    );
  }

  rotate(cursorPosition: number, center: number): number {
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
