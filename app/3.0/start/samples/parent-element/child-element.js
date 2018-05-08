import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

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
