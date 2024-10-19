import { addObserver, dispatch } from "../../store/store";

export enum productItemAttributes {
	'uid' = 'uid',
    'productname' = 'productname',
	'price' = 'price',
	'category' = 'category',
    'description' = 'description',
    'image' = 'image',
    'stock' = 'stock',
}

class ProductItem extends HTMLElement {
    uid?: number;
	productname?: string;
	price?: number;
	category?: string;
    description?: string;
    image?: string;
    stock?: number;

    static get observedAttributes() {
        return Object.values(productItemAttributes)
    }
    attributeChangedCallback(propName: productItemAttributes, oldValue: string | undefined, newValue: string) {
       if (oldValue === newValue)
        if (propName === Attribute.price || propName === Attribute.rating ||  propName === Attribute.uid) {
            this[propName] = newValue ? Number(newValue) : undefined;
        } else {
            this[propName] = newValue;
        }
        this.render();
        
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.shadowRoot) return
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/components/product/product.css">
            <section>
            <div  class="card">
            <div id="product">
            <img id="img" src="${this.image ? this.image : 'Not found'}">
            <div class="text">
            <h2 class="name">${this.productname}</h2>
            <p>Description: ${this.description}</p>
            <p>Category: ${this.category}</p>
            <p>Price: $${this.price}</p>
            <p>Rating: ${this.stock}</p>
            <button id="add-button">Agregar</button>
            </div>
            </div>
</div>
            
            </section>
            `;

            const addButton = this.shadowRoot?.querySelector('#add-button');
        addButton?.addEventListener('click', () => {
            const product = {
                uid: this.uid,
                image: this.image,
                name: this.productname,
                description: this.description,
                category: this.category,
                price: this.price,
                rating: this.stock,
            };
            dispatch(addToCart(product)); 
        }); 
        
    }
}

customElements.define('card-product', ProductItem);
export default ProductItem;