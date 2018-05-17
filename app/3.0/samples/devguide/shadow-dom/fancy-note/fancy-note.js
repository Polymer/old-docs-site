import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

class FancyNote extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: Roboto, sans-serif;
        }
      </style>
      <!-- named slot matches node with attribute slot="icon" -->
      <slot name="icon">
        <!-- fallback content for this slot -->
        <iron-icon icon="announcement"></iron-icon>
      </slot>
      
      <!-- default slot matches any unnamed child node -->
      <slot></slot>
    `;
  }
}
customElements.define('fancy-note', FancyNote);

