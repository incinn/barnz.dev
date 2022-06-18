export default class ProjectItemEffect {
  private threshold = 10;
  private defaultScale = 1.2;

  private scale = this.defaultScale;


  init(): void {
    const previews = document.querySelectorAll('.projectItem .window');

    previews.forEach((preview: HTMLElement) => {
      preview.addEventListener('mousemove', (ev: MouseEvent) => {
        this.effect(preview, ev);
      });

      preview.onwheel = this.handleZoom.bind(this);

      preview.addEventListener('click', () => {
        this.handleClick();
      });
  
      preview.addEventListener('mouseleave', () => {
        preview.removeAttribute('style');
        this.scale = this.defaultScale;
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

    preview.style.transform = `perspective(1000px)
      scale(${this.scale}) 
      rotateY(${this.rotate(event.x, centerX)}deg)
      rotateX(${-this.rotate(event.y, centerY)}deg)`;
  }

  handleZoom(event): void {
    event.preventDefault();
    const newScale = this.scale + (event.deltaY * -0.01);

    this.scale = Math.min(Math.max(newScale, 1.2), 2);
  }

  handleClick(): void {
    this.scale = 1.2;
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
