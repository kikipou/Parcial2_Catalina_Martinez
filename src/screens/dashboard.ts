import { addObserver,appState,dispatch } from "../store/store";
import Product, {Attribute as productItemAttributes} from "../components/productItem/productItem";
import { getProductsState } from "../store/actions";

class Dashboard extends HTMLElement {
 
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        addObserver(this)
    }

    async connectedCallback() {
        console.log("Product");
        if (!appState.products || appState.products.length === 0) {
            const action = await getProductsState();
            dispatch(action);
            console.log('Products state after fetch:', appState.products);
        } else {
            console.log('Products already loaded:', appState.products);
        }
        
        this.render();
    }
    
    fetchProducts() {
        if (!appState.products || appState.products.length === 0) {
            console.log('No products available in the state.');
            return null;
        }
    
        const container = document.createElement('section');
        container.className = 'products-container';
    
        appState.products.forEach((product: any) => {
            const productItem = document.createElement('card-product') as Product;
            productItem.setAttribute(productItemAttributes.uid, product.id.toString());
            productItem.setAttribute(productItemAttributes.productname, product.productname);
            productItem.setAttribute(productItemAttributes.price, product.price);
            productItem.setAttribute(productItemAttributes.category, product.category);
            productItem.setAttribute(productItemAttributes.description, product.description);
            productItem.setAttribute(productItemAttributes.image, product.image);
            productItem.setAttribute(productItemAttributes.stock, product.stock.toString());
    
            container.appendChild(productItem);
        });
    
        console.log('Products rendered:', appState.products);
        return container;
    }
    

    renderShoppingCart() {
        const cartContainer = this.ownerDocument.createElement('section');
        cartContainer.className = 'cart-container';

        if (appState.cart.length === 0) {
            cartContainer.innerHTML = `<p>Your cart is empty</p>`;
        } else {
            appState.cart.forEach((item: Product) => {
                const cartItemComponent = this.ownerDocument.createElement('cart-component') as ShoppingCartItem;
                cartItemComponent.setAttribute(Shoppingcartitem.uid, item.uid?.toString() || ''); // Aquí se agrega el UID4
                cartItemComponent.setAttribute(Shoppingcartitem.utitle, item.description || '');
                cartItemComponent.setAttribute(Shoppingcartitem.price, item.price?.toString() || '');
                cartItemComponent.setAttribute(Shoppingcartitem.image, item.image || '');

                cartContainer.appendChild(cartItemComponent);
            });
        }

        return cartContainer;
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``; 

            const productsTitle = this.ownerDocument.createElement('h2');
            productsTitle.textContent = 'Product List';
            this.shadowRoot.appendChild(productsTitle);

            const productsContainer = this.fetchProducts();
            if (productsContainer) {
                this.shadowRoot.appendChild(productsContainer);
            } else {
                this.shadowRoot.innerHTML += `<p>no encontre los productos :( </p>`;
            }

            const cartTitle = this.ownerDocument.createElement('h2');
            cartTitle.textContent = 'Shopping Cart';
            this.shadowRoot.appendChild(cartTitle);

            const cartContainer = this.renderShoppingCart();
            if (cartContainer) {
                this.shadowRoot.appendChild(cartContainer);
            }
            console.log('Product', productsContainer);
            
        }  
}

}

customElements.define("app-dashboard", Dashboard)