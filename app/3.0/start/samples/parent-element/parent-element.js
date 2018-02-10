import {Element as PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@3.0.0-pre.7/polymer-element.js';
import './child-element.js';

class ParentElement extends PolymerElement {
  static get properties () {
    return {
      parentProp: {
        type: Boolean,
        value: false
      }
    };
  }
  static get template () {
    return html`
      <p>parentProp is: <code>[[parentProp]]</code></p>
      <child-element child-prop="{{parentProp}}"></child-element>
    `;
  }
}

customElements.define('parent-element', ParentElement);