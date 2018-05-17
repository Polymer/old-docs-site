import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class ContentElement extends PolymerElement {
  static get properties() {
    return {
      outputMessage: {
        type: String,
        value: ''
      },
      name: {
        type: String,
        value: 'I have no name'
      }
    };
  }
  getInfo() {
    this.outputMessage = this.name + ' is in ' + this.assignedSlot.name + '.';
  }
  static get template() {
    return html`
      <style>
        :host { 
            display: block;
        }
      </style>
      <p>I am [[name]].</p>
      <p><button on-click="getInfo">Get [[name]]'s slot info</button>
      <p>[[outputMessage]]</p>
    `;
  }
}
customElements.define('content-element', ContentElement);
