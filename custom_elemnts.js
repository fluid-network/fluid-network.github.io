class spacer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if(this.hasAttribute('width') && this.hasAttribute('height')) {
            if(this.getAttribute('width').includes('% height')) {
                this.style.width = (extractNum(this.getAttribute('width')) * this.parentElement.clientHeight / 100) + "px";
                window.addEventListener('resize', (event) => {
                    this.style.width = (extractNum(this.getAttribute('width')) * this.parentElement.clientHeight / 100) + "px";
                });
            } else {
                this.style.width = this.getAttribute('width');
            }

            if(this.getAttribute('height').includes('% width')) {
                this.style.height = (extractNum(this.getAttribute('height')) * this.parentElement.clientWidth / 100) + "px";
                window.addEventListener('resize', (event) => {
                    this.style.height = (extractNum(this.getAttribute('height')) * this.parentElement.clientWidth / 100) + "px";
                });
            } else {
                this.style.height = this.getAttribute('height');
            }
        }
    }
}
customElements.define('spacer-', spacer);

class account extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.style.backgroundImage = 'url(unknown_user.png)';
        this.style.backgroundPosition = 'center';
        this.style.backgroundSize = '125%';
        this.style.backgroundRepeat = 'no-repeat';
        if(this.hasAttribute('width') && this.hasAttribute('height')) {
            throw new Error('cannot have both width and height attribute; only 1.');
        } else if(this.hasAttribute('width')) {
            this.style.width = this.getAttribute('width');
            this.style.aspectRatio = "1";
        } else {
            this.style.height = this.getAttribute('height');
            this.style.aspectRatio = "1";
        }
    }
}
customElements.define('account-', account);