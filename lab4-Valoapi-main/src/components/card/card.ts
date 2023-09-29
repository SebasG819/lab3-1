import styles from "./card.css";

export enum Attribute {
    "name" = "name",
    "othername" = "othername",
    "character" = "character",
    "description" = "description",
}

class Card extends HTMLElement {
    
    name?: string;
    othername?: string;
    character?: string;
    description?: string;

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
           
            name: null,
            othername: null,
            character: null,
            description: null,
        };
        return Object.keys(attrs);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {

                default:
                this[propName] = newValue;
                break;
            }

            this.render();
        }

        render() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``

                const css = this.ownerDocument.createElement("style");
                css.innerHTML = styles;
                this.shadowRoot?.appendChild(css);

                this.shadowRoot.innerHTML += `
                <section>
                    
                    <h1>${this.name}</h1>
                    <h4>${this.othername}</h4>
                    <img src="${this.character}">
                    <p>${this.description}</p>
                </section>
                `;
            }
        }
    }

customElements.define("my-card", Card);
export default Card;