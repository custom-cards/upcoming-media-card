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

const defaultConfig = {
  title: "Upcoming Media",
  entity: "",
  date: "mmdd",
  clock: "12",
  max: "5",
  image_style: "poster",
  hide_empty: false,
  hide_flagged: false,
  hide_unflagged: false,
  flag: true,
  text_shadows: true,
  box_shadows: true
};

export class UpcomingMediaCardEditor extends LitElement {
  setConfig(config) {
    this._config = config;
  }

  static get properties() {
    return { hass: {}, _config: {} };
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    const entities = Object.keys(this.hass.states).filter(
      eid =>
        this.hass.states[eid].attributes.data &&
        this.hass.states[eid].attributes.data.includes("title_default")
    );

    const clocks = ["12", "24"];
    const image_styles = ["poster", "fanart"];

    return html`
      ${this.renderStyle()}
      <div class="card-config">
        <div class="side-by-side">
          <paper-input
            label="Title"
            .value="${this._getConfig("title")}"
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
              .selected="${entities.indexOf(this._getConfig("entity"))}"
            >
              ${entities.map(entity => {
                return html`
                  <paper-item>${entity}</paper-item>
                `;
              })}
            </paper-listbox>
          </paper-dropdown-menu>
        </div>

        <div class="side-by-side">
          <paper-input
            label="Date Format"
            .value="${this._getConfig("date")}"
            .configValue="${"date"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>

          <paper-dropdown-menu
            label="Clock Format"
            @value-changed="${this._valueChanged}"
            .configValue="${"clock"}"
          >
            <paper-listbox
              slot="dropdown-content"
              .selected="${clocks.indexOf(String(this._getConfig("clock")))}"
            >
              ${clocks.map(entity => {
                return html`
                  <paper-item>${entity}</paper-item>
                `;
              })}
            </paper-listbox>
          </paper-dropdown-menu>
        </div>

        <div class="side-by-side">
          <paper-input
            label="Max Items"
            type="number"
            .value="${this._getConfig("max")}"
            .configValue="${"max"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>

          <paper-dropdown-menu
            label="Image Style"
            @value-changed="${this._valueChanged}"
            .configValue="${"image_style"}"
          >
            <paper-listbox
              slot="dropdown-content"
              .selected="${image_styles.indexOf(
                this._getConfig("image_style")
              )}"
            >
              ${image_styles.map(entity => {
                return html`
                  <paper-item>${entity}</paper-item>
                `;
              })}
            </paper-listbox>
          </paper-dropdown-menu>
        </div>

        <div class="side-by-side">
          <paper-toggle-button
            ?checked="${this._getConfig("hide_empty")}"
            .configValue="${"hide_empty"}"
            @change="${this._valueChanged}"
            >Hide Card When Empty</paper-toggle-button
          >

          <paper-toggle-button
            ?checked="${this._getConfig("hide_flagged")}"
            .configValue="${"hide_flagged"}"
            @change="${this._valueChanged}"
            >Hide Flagged Items</paper-toggle-button
          >
        </div>

        <div class="side-by-side">
          <paper-toggle-button
            ?checked="${this._getConfig("hide_unflagged")}"
            .configValue="${"hide_unflagged"}"
            @change="${this._valueChanged}"
            >Hide Unflagged Items</paper-toggle-button
          >

          <paper-toggle-button
            ?checked="${this._getConfig("flag")}"
            .configValue="${"flag"}"
            @change="${this._valueChanged}"
            >Indicator Flag</paper-toggle-button
          >
        </div>

        <div class="side-by-side">
          <paper-toggle-button
            ?checked="${this._getConfig("text_shadows")}"
            .configValue="${"text_shadows"}"
            @change="${this._valueChanged}"
            >Text Shadows</paper-toggle-button
          >

          <paper-toggle-button
            ?checked="${this._getConfig("box_shadows")}"
            .configValue="${"box_shadows"}"
            @change="${this._valueChanged}"
            >Box Shadows</paper-toggle-button
          >
        </div>

        <br />
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

  _getConfig(item) {
    return this._config[item] !== undefined
      ? this._config[item]
      : defaultConfig[item];
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
      isMultiLevel = target.configValue.indexOf(".") > -1;

      // if (target.value === "") {
      //   if (isMultiLevel) {
      //     delete this._config[target.configValue]
      //   }else  {
      //     delete this._config[target.configValue.split(".")[0]][target.configValue.split(".")[1]];
      //   }
      // } else {
      target.value = parseInt(target.value) || target.value;
      if (target.value == "0") target.value = 0;

      if (isMultiLevel) {
        let multiLevelConfig = {
          ...this._config[target.configValue.split(".")[0]],
          [target.configValue.split(".")[1]]: target.value
        };

        this._config = {
          ...this._config,
          [target.configValue.split(".")[0]]: multiLevelConfig
        };
      } else {
        this._config = {
          ...this._config,
          [target.configValue]:
            target.checked !== undefined ? target.checked : target.value
        };
      }
      // }
    }
    fireEvent(this, "config-changed", { config: this._config });
  }
}

customElements.define("upcoming-media-card-editor", UpcomingMediaCardEditor);
