import {Element as PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@3.0.0-pre.7/polymer-element.js';
import 'https://unpkg.com/@polymer/iron-input@3.0.0-pre.7/iron-input.js';

class EditableNameTag extends PolymerElement {
  static get properties () {
    return {
      owner: {
        type: String,
        value: 'Daniel'
      }
    };
  }
  static get template () {
    return html`
      <!-- bind to the 'owner' property -->
      <p>This is <b>[[owner]]</b>'s name-tag element.</p>
    
      <!-- iron-input exposes a two-way bindable input value -->
      <iron-input bind-value="{{owner}}">
        <!-- 
          TODO: Edit the placeholder text to see two-way data
          binding at work.
        --> 
      <input is="iron-input" placeholder="Your name here...">
      </iron-input>
    `;
  }
}

customElements.define('editable-name-tag', EditableNameTag);