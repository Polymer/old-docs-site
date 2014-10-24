(function () {
    var KEY = {
            ENTER: 13,
            SPACE: 32
        };
    function keydownHandler(e) {
        if (e.keyCode === KEY.ENTER || e.keyCode === KEY.SPACE) {
            this.toggle();
        }
    }
    ;
    var BToggleButtonPrototype = Object.create(HTMLElement.prototype, {
            noCaption: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('nocaption') || this.getAttribute('nocaption') === 'true';
                }
            },
            onCaption: {
                enumerable: true,
                get: function () {
                    return this.getAttribute('oncaption') || 'ON';
                }
            },
            offCaption: {
                enumerable: true,
                get: function () {
                    return this.getAttribute('offcaption') || 'OFF';
                }
            },
            value: {
                enumerable: true,
                get: function () {
                    return this.checked;
                }
            },
            checked: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('checked');
                },
                set: function (value) {
                    if (value) {
                        this.querySelector('.b-toggle-button').classList.add('on');
                        this.classList.add('on');
                        this.setAttribute('aria-checked', 'true');
                        this.setAttribute('checked', '');
                    } else {
                        this.querySelector('.b-toggle-button').classList.remove('on');
                        this.classList.remove('on');
                        this.setAttribute('aria-checked', 'false');
                        this.removeAttribute('checked');
                    }
                }
            },
            createdCallback: {
                enumerable: true,
                value: function () {
                    this.appendChild(this.template.content.cloneNode(true));
                    if (!this.noCaption) {
                        this.querySelector('.b-toggle-on').textContent = this.onCaption;
                        this.querySelector('.b-toggle-off').textContent = this.offCaption;
                    }
                    this.setAttribute('role', 'checkbox');
                    this.setAttribute('tabindex', '0');
                    this.checked ? this.activate() : this.deactivate();
                    this.addEventListener('click', this.toggle, false);
                    this.addEventListener('keydown', keydownHandler.bind(this), false);
                }
            },
            activate: {
                enumerable: true,
                value: function () {
                    this.checked = true;
                }
            },
            deactivate: {
                enumerable: true,
                value: function () {
                    this.checked = false;
                }
            },
            toggle: {
                enumerable: true,
                value: function () {
                    this.checked = !this.checked;
                }
            }
        });
    window.BToggleButton = document.registerElement('b-toggle-button', { prototype: BToggleButtonPrototype });
    Object.defineProperty(BToggleButtonPrototype, 'template', {
        get: function () {
            var fragment = document.createDocumentFragment();
            var div = fragment.appendChild(document.createElement('div'));
            div.innerHTML = ' <style> .b-toggle-button { position: absolute; left: -webkit-calc(-100% + 24px); left: -moz-calc(-100% + 24px); left: calc(-100% + 24px); width: -webkit-calc(200% - 24px); width: -moz-calc(200% - 24px); width: calc(200% - 24px); height: 100%; overflow: hidden; white-space: nowrap; transition: left 0.130s ease-out; } .b-toggle-button.on { left: 0; } .b-toggle-button > * { float: left; } .b-toggle-on, .b-toggle-off { width: 50%; height: 100%; text-align: center; box-sizing: border-box; -moz-box-sizing: border-box; line-height: 24px; } .b-toggle-on { padding-right: 12px; background-color: #48985f; color: white; } .b-toggle-off { padding-left: 12px; background-color: #bfbfbf; color: #716f6f; } .b-toggle-thumb { position: absolute; left: -webkit-calc(50% - 12px); left: -moz-calc(50% - 12px); left: calc(50% - 12px); width: 24px; height: 100%; border-radius: 1px; background-color: white; } </style> <div class="b-toggle-button"> <span class="b-toggle-on"></span> <span class="b-toggle-thumb"></span> <span class="b-toggle-off"></span> </div> ';
            while (child = div.firstChild) {
                fragment.insertBefore(child, div);
            }
            fragment.removeChild(div);
            return { content: fragment };
        }
    });
}());