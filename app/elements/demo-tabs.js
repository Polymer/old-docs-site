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
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';

class DemoTabs extends PolymerElement {
  static get template() {
    return html`
    <style include="iron-flex">
      :host {
        display: block;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      paper-tabs {
        color: black;
        font-size: 16px;
        --paper-tabs-selection-bar-color: black;
        --paper-tab-ink: #1e88e5;
      }

      iron-selector {
        width: 100%;
      }

      iron-selector ::slotted(*) {
        display: none;
      }

      iron-selector ::slotted(.iron-selected) {
        display: block;
        margin: 0;
      }

      .results {
        padding: 20px;
        background: #fafafa;
        border-top: 1px solid #e0e0e0;
      }

      paper-button {
        color: white;
        background: #1e88e5;  /* blue-600 */
        font-size: 13px;
        vertical-align: middle;
      }

      .tabstrip a {
        text-decoration: none;
      }

      [display="loading"] {
        width: 100%;
        height: 500px;
        line-height: 500px;
        background-color: #f5f5f5;
        font-size: 2em;
        text-align: center;
        vertical-align: middle;
      }
    </style>
    <iron-pages selected="{{_displaySelected}}" attr-for-selected="display">
      <div display="static">
        <div class="tabstrip layout horizontal center">
          <paper-tabs selected="{{_selected}}" class="flex">
            <slot name="tabs"></slot>
          </paper-tabs>
          <a href="[[src]]" target="_blank" hidden$="[[_hideEditorButton]]">
            <paper-button id="editButton" on-tap="_launchEditor" raised>
              Edit and Preview
            </paper-button>
          </a>
        </div>

        <iron-selector selected="[[_selected]]">
          <slot></slot>
        </iron-selector>

        <div class="results" hidden$=[[_iframeHidden]]>
          <slot name="results"></slot>
        </div>
      </div>
      <div display="loading">
        Loading...
      </div>
      <stack-blitz
          id="editor"
          display="editor"
          no-auto-embed
          open-file="[[editorOpenFile]]"
          project-path="[[projectPath]]">
      </stack-blitz>
    </iron-pages>
    `;
  }

  static get properties() {
    return {
      /**
       * URL of the Plunker demo
       */
      src: {
        type: String
      },
      /**
       * Name of the demo, for analytics
       */
      name: {
        type: String
      },

      editorOpenFile: {
        type: String,
        value: 'index.html',
      },

      /**
       * absolute path to the project directory
       *
       * e.g. /3.0/start/samples/custom-element
       *     or /3.0/start/samples/employee-list
       */
        projectPath: {
        type: String,
      },

      _displaySelected: {
        type: String,
        value: 'static',
      },

      _iframeHidden: {
        type: Boolean,
      },

      _hideEditorButton: {
        type: Boolean,
      },
    };
  }

  static get observers() {
    return ['_srcProjectPathChanged(src, projectPath)'];
  }

  connectedCallback() {
    super.connectedCallback();
    this._selected = 0;
  }

  _srcProjectPathChanged(src, projectPath) {
    const isPlunkr = !!this.src;
    const isStackBlitz = !!this.projectPath;
    this._iframeHidden = !isPlunkr;
    this._hideEditorButton = !isPlunkr && !isStackBlitz;
  }

  _launchEditor() {
    if (!!this.projectPath) {
      this._launchInlineEditor();
    } else if (!!this.src) {
      this._launchPlunkr();
    }
  }

  _launchPlunkr() {
    if (window.recordPlunker) {
      window.recordPlunker(this.name);
    }
  }

  // Call out to a global method defined by app.js
  _launchInlineEditor() {
    this._displaySelected = 'loading';

    // Ignore jshint for dynamic import().
    import('./stack-blitz.js').then(() => { // jshint ignore:line
      return this.$.editor.embed().then(() => {
        this._displaySelected = 'editor';
      });
    }).catch(() => {
      this.$.editButton.disabled = true;
      this.$.editButton.innerText = 'Error loading editor';
      this._displaySelected = 'static';
    });
  }
}

customElements.define('demo-tabs', DemoTabs);
