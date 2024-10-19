import { addObserver, appState } from "../../store/store";
import ProductItem from "../productItem/productItem";
import productItem, { productItemAttributes } from "../productItem/productItem";
import "../TaskItem/index";

class ProductList extends HTMLElement {
	productItems: productItem[] = []
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this)

		appState.tasks.forEach((product: any) => {
			const { id, pname, price, category, description, image } = product
			const productItem = this.ownerDocument.createElement('task-item') as ProductItem;
			productItem.setAttribute(productItemAttributes.uid, id);
			productItem.setAttribute(productItemAttributes.productname, pname);
			productItem.setAttribute(productItemAttributes.price, price);
            productItem.setAttribute(productItemAttributes.category, category);
            productItem.setAttribute(productItemAttributes.description, description);
            productItem.setAttribute(productItemAttributes.image, image);
			this.productItems.push(productItem);
		})
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.productItems.forEach((productItem) => {
				this.shadowRoot?.appendChild(productItem)
			})
		}



	}

}

customElements.define('product-list', ProductList);
export default ProductList;