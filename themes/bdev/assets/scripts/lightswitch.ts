const feather = require('feather-icons');

class LightSwitch {
    private switchEl: HTMLButtonElement;
    private navEl: HTMLElement;
    private toggle: boolean = true;

    constructor() {
        this.navEl = document.getElementById('js-nav');

        if (!this.navEl || !feather) {
            this.init = () => {};
            console.error('LightSwitch unable to start');
        }
    }

    init(): void {
        this.switchEl = this.createSwitch();

        this.switchEl.addEventListener('click', this.handleToggle.bind(this));
        this.navEl.appendChild(this.switchEl);

        this.setToggleIcon();
        this.setThemeAttr();
    }

    createSwitch(): HTMLButtonElement {
        let btn = document.createElement('button');

        btn.classList.add('lightSwitch');
        btn.innerHTML = feather.icons.sun.toSvg();

        return btn;
    }

    handleToggle(): void {
        this.toggle = !this.toggle;

        this.setToggleIcon();
        this.setThemeAttr();
    }

    setToggleIcon(): void {
        this.switchEl.innerHTML = this.toggle
            ? feather.icons.sun.toSvg()
            : feather.icons.moon.toSvg();
    }

    setThemeAttr(): void {
        document.documentElement.setAttribute(
            'data-theme',
            this.toggle ? 'light' : 'dark'
        );
    }
}

const lightSwitch = new LightSwitch();
lightSwitch.init();
