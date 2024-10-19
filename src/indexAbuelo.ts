import './components/indexPadre'
import { addObserver } from './store/store';
class AppContainer extends HTMLElement {

constructor() {
        super()
        this.attachShadow({ mode: 'open' })
}

connectedCallback() {
        this.render()
}

    render() {
        if (this.shadowRoot) this.shadowRoot.innerHTML = '';

        switch (appState.screen) {
            case 'DASHBOARD':
                const dashboard = document.createElement('app-dashboard');
                this.shadowRoot?.appendChild(dashboard);
                break;
            
            default:
                console.log('Not found');
                break;
        }
    }
}

customElements.define("app-container", AppContainer)
export default AppContainer