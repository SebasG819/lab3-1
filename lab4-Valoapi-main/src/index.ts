import "./components/export";
import {traer_api} from "./components/data"
import Card, { Attribute } from "./components/card/card"

class AppContainer extends HTMLElement {
    ValList: Card[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const dataVal = await traer_api();
        dataVal.forEach((data: any) => {
            console.log(data);
        });

        dataVal.forEach((data: any) => {
            const ValCard = this.ownerDocument.createElement("my-card") as Card;
             ValCard.setAttribute(Attribute.name, data.displayName);
             ValCard.setAttribute(Attribute.othername, data.developerName);
             ValCard.setAttribute(Attribute.character, data.fullPortrait);
             ValCard.setAttribute(Attribute.description, data.description);  

                this.ValList.push(ValCard);
        });
        this.render(this.ValList);
    }

    render(ValList:any) {

        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/src/index.css">
            
        `;
        }
        const ValCards = this.ownerDocument.createElement("section")
        const container = this.ownerDocument.createElement("section")
        ValCards.className = "ValSection"
        this.ValList.forEach((ValCard) => {
            ValCards.appendChild(ValCard)
        });
        this.shadowRoot?.appendChild(ValCards);

        const search = this.ownerDocument.createElement("input")
        search.value = "busqueda"
        container.appendChild(search);

        const button = this.ownerDocument.createElement("button")
        button.value = "buscar"
        container.appendChild(button);
        button.addEventListener ("click", function(){console.log("funciona el boton")})
        this.shadowRoot?.appendChild(container)
        
    }
    


}

customElements.define("app-container", AppContainer);