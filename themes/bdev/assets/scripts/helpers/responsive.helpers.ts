export default class ResponsiveHelpers {
  private _breakpoints = {
    phone: 500,
    tablet: 768,
    desktop: 1024
  };

  isMobile(): boolean {
    return this._getWidth() <= this._breakpoints.phone;
  }

  isTablet(): boolean {
    return this._getWidth() > this._breakpoints.phone && this._getWidth() < this._breakpoints.desktop;
  }

  isDesktop(): boolean {
    return this._getWidth() >= this._breakpoints.desktop;
  }

  _getWidth(): number {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  _getHeight(): number {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }
} 
