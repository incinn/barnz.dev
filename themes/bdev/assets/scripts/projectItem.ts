export default class ProjectItemEffect {
  private threshold = 10;

  constructor() {}

  init(): void {
    const previews = document.querySelectorAll('.projectItem .window');

    previews.forEach((preview: HTMLElement) => {
      preview.addEventListener('mousemove', (ev: MouseEvent) => {
        this.effect(preview, ev);
      });

      preview.addEventListener('mouseleave', () => {
        preview.style.transform = 'rotateX(0deg) rotateY(0deg)';
        preview.style.filter = 'brightness(1)';
      });
    });
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

  effect(preview: HTMLElement, event: MouseEvent) {
    const rect = preview.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    preview.style.transform = `perspective(1000px) scale(1.2) 
      rotateY(${this.rotate(event.x, centerX)}deg)
      rotateX(${-this.rotate(event.y, centerY)}deg)`;
  }

  rotate(cursorPosition: number, centerPosition: number) {
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
