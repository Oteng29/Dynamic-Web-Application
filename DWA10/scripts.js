import { css, html, customElement, property } from '@shoelace-style/shoelace';

@customElement('tally-app')
class TallyApp extends HTMLElement {
  @property({ type: Number }) count = 0;


  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
    }
  }

  reset() {
    this.count = 0;
    alert('Counter has been reset.');
  }

  render() {
    return html`
      <h1>Tally App</h1>
      <div class="count-display">${this.count}</div>
      <div class="button-container">
        <sl-button @click=${this.increment}>Add</sl-button>
        <sl-button @click=${this.decrement}>Subtract</sl-button>
        <sl-button @click=${this.reset}>Reset</sl-button>
      </div>
    `;
  }
}

customElements.define('tally-app', TallyApp);

const app = document.createElement('tally-app');
document.body.appendChild(app);
