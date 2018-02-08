import {Element as PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@3.0.0-pre.7/polymer-element.js';

class ChildElement extends PolymerElement {
  static get properties () {
    return {
      childProp: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      }
    };
  }
  onChanged(event){
    this.childProp=!this.childProp;
  }
  static get template () {
    return html`
      <p>childProp is: <code>[[childProp]]</code></p>
      <button on-click="onChanged">Change childProp</button>
    `;
  }
}

customElements.define('child-element', ChildElement);