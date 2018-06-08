/*
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light.js';

class PwVersionSelector extends PolymerElement {
  static get template() {
    return html`
    <style>
      paper-dropdown-menu-light {
        width: 60px;
        margin-left: 20px;
        vertical-align: middle;
      }
    </style>

    <b>Version</b>
    <paper-dropdown-menu-light no-label-float>
      <paper-listbox slot="dropdown-content" selected="[[activeDocsVersion]]" attr-for-selected="name" on-iron-select="_listboxVersionChanged">
        <paper-item name="1.0">1.0</paper-item>
        <paper-item name="2.0">2.0</paper-item>
        <paper-item name="3.0">3.0</paper-item>
      </paper-listbox>
    </paper-dropdown-menu-light>
    `;
  }

  static get properties() {
    return {
      /**
       * The version of the docs we're looking at. Should be 1.0 or 2.0
       */
      activeDocsVersion: {
        type: String
      },

      /**
       * The starting link for a 1.0 section (for the start/docs/toolbox sections)
       */
      v1PageLink: {
        type: String
      },

      /**
       * The starting link for a 2.0 section (for the start/docs/toolbox sections)
       */
      v2PageLink: {
        type: String
      },

      /**
       * The starting link for a 3.0 section (for the start/docs/toolbox sections)
       */
      v3PageLink: {
        type: String
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.activeDocsVersion) {
      // Figure out which version we're displaying (1.0, 2.0, or 3.0).
      // pw-shell is the source of truth (the URL isn't).
      var pwShell = document.querySelector('pw-shell');
      this.activeDocsVersion = pwShell ? pwShell.activeDocsVersion : '2.0';
    }
  }

    // Update the version when the version selector is used.
  _listboxVersionChanged(event) {
    var newSelection = event.detail.item.textContent;
    if (newSelection === this.activeDocsVersion)
      return;

    var path = newSelection == '3.0' ? this.v3PageLink :
      newSelection == '2.0' ? this.v2PageLink :
      this.v1PageLink;
    // Don't bother updating activeDocsVersion, since this element will be destroyed once navigation completes.
    // this.activeDocsVersion = newSelection;
    if (!path) path = '/' + newSelection + '/start/';

    window.history.pushState({}, '', window.location.origin + path);
    window.dispatchEvent(new CustomEvent('location-changed'));
  }
}

customElements.define('pw-version-selector', PwVersionSelector);
