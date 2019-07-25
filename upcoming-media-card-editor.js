if (!customElements.get("paper-input")) {
  console.log("imported", "paper-input");
  import("https://unpkg.com/@polymer/paper-input/paper-input.js?module");
}

const fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;

export class UpcomingMediaCardEditor extends LitElement {
  setConfig(config) {
    this._config = config;
  }

  static get properties() {
    return { hass: {}, _config: {} };
  }

  get _title() {
    return this._config.title || "";
  }

  get _entity() {
    return this._config.entity || "";
  }

  get _date() {
    return this._config.date || ""; // ddmm or mmdd
  }

  get _clock() {
    return this._config.clock || ""; // 24 or 12
  }

  get _max() {
    return this._config.max || "";
  }

  get _image_style() {
    return this._config.image_style || ""; // "card:poster" or "fanart"
  }

  get _hide_empty() {
    return this._config.hide_empty || false; // boolean
  }

  get _hide_flagged() {
    return this._config.hide_flagged || false; // boolean
  }

  get _hide_unflagged() {
    return this._config.hide_unflagged || false; // boolean
  }

  get _flag() {
    if (this._config.flag == undefined)
      return true;

    return this._config.flag;
  }

  get _text_shadows() {
    if (this._config.text_shadows == undefined)
      return true;

    return this._config.text_shadows;
  }

  get _box_shadows() {
    if (this._config.box_shadows == undefined)
      return true;

    return this._config.box_shadows;
  }


  render() {
    if (!this.hass) {
      return html``;
    }

    const entities = Object.keys(this.hass.states).filter(
      eid => eid.substr(0, eid.indexOf(".")) === "sensor"
    );

    const clocks = ["12", "24"];
    const image_styles = ["", "card:poster", "fanart"];

    return html`
      ${this.renderStyle()}
      <div class="card-config">
        <div class="side-by-side">
          <paper-input
            label="Title"
            .value="${this._title}"
            .configValue="${"title"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
          <paper-dropdown-menu
            label="Entity"
            @value-changed="${this._valueChanged}"
            .configValue="${"entity"}"
          >
            <paper-listbox
              slot="dropdown-content"
              .selected="${entities.indexOf(this._entity)}"
            >
              ${
                entities.map(entity => {
                  return html`
                    <paper-item>${entity}</paper-item>
                  `;
                })
              }
            </paper-listbox>
          </paper-dropdown-menu>
        </div>
        
        <div class="side-by-side">
          <paper-input
            label="Date"
            .value="${this._date}"
            .configValue="${"date"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
          
          <paper-dropdown-menu
            label="Clock"
            @value-changed="${this._valueChanged}"
            .configValue="${"clock"}"
          >
            <paper-listbox
              slot="dropdown-content"
              .selected="${clocks.indexOf(this._clock)}"
            >
              ${
                clocks.map(entity => {
                  return html`
                    <paper-item>${entity}</paper-item>
                  `;
                })
              }
            </paper-listbox>
          </paper-dropdown-menu>
        </div>

        <div class="side-by-side">
          <paper-input
            label="Max"
            type="number"
            .value="${this._max}"
            .configValue="${"max"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>

          <paper-dropdown-menu
            label="Image style"
            @value-changed="${this._valueChanged}"
            .configValue="${"image_style"}"
          >
            <paper-listbox
              slot="dropdown-content"
              .selected="${image_styles.indexOf(this._image_style)}"
            >
              ${
                image_styles.map(entity => {
                  return html`
                    <paper-item>${entity}</paper-item>
                  `;
                })
              }
            </paper-listbox>
          </paper-dropdown-menu>

        </div>
        
        <div class="side-by-side">
          <paper-toggle-button
            ?checked="${this._hide_empty}"
            .configValue="${"hide_empty"}"
            @change="${this._valueChanged}"
          >hide_empty</paper-toggle-button>

          <paper-toggle-button
            ?checked="${this._hide_flagged}"
            .configValue="${"hide_flagged"}"
            @change="${this._valueChanged}"
          >hide_flagged</paper-toggle-button>
        </div>

        <div class="side-by-side">
          <paper-toggle-button
            ?checked="${this._hide_unflagged}"
            .configValue="${"hide_unflagged"}"
            @change="${this._valueChanged}"
          >hide_unflagged</paper-toggle-button>
          
          <paper-toggle-button
            ?checked="${this._flag}"
            .configValue="${"flag"}"
            @change="${this._valueChanged}"
          >flag</paper-toggle-button>
        </div>
        
        <div class="side-by-side">
          <paper-toggle-button
            ?checked="${this._text_shadows}"
            .configValue="${"text_shadows"}"
            @change="${this._valueChanged}"
          >text_shadows</paper-toggle-button>

          <paper-toggle-button
            ?checked="${this._box_shadows}"
            .configValue="${"box_shadows"}"
            @change="${this._valueChanged}"
          >box_shadows</paper-toggle-button>
        </div>

        <br>
        <div>Use the YAML editor if you need to specify custom services</div>
      </div>
    `;
  }

  renderStyle() {
    return html`
      <style>
        paper-toggle-button {
          padding-top: 16px;
        }
        .side-by-side {
          display: flex;
        }
        .side-by-side > * {
          flex: 1;
          padding-right: 4px;
        }
        
        .test-card-section {
          margin-top: 1.25em;
          font-size: 1.25em;
        }
      </style>
    `;
  }

  _valueChanged(ev) {
    let isMultiLevel = false;

    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }

    if (target.configValue) {
      isMultiLevel = target.configValue.indexOf(".") > -1

      // if (target.value === "") {
      //   if (isMultiLevel) {
      //     delete this._config[target.configValue]
      //   }else  {
      //     delete this._config[target.configValue.split(".")[0]][target.configValue.split(".")[1]];
      //   }
      // } else {
        target.value = parseInt(target.value) || target.value;
        if (target.value == "0")
          target.value = 0

        if (isMultiLevel) {
          let multiLevelConfig = {
            ...this._config[target.configValue.split(".")[0]],
            [target.configValue.split(".")[1]]: target.value
          }

          this._config = {
            ...this._config,
            [target.configValue.split(".")[0]]: multiLevelConfig
          };
        }else  {
          
          this._config = {
            ...this._config,
            [target.configValue]: target.checked !== undefined ? target.checked : target.value
          };
        }        
      // }
    }
    fireEvent(this, "config-changed", { config: this._config });
  }
}

customElements.define("test-card-editor", TestCardEditor);
