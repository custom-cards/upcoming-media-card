// ── Visual Editor ──────────────────────────────────────────────────
const UMC_EDITOR_SCHEMA = [
  {
    name: "title",
    selector: { text: {} }
  },
  {
    name: "image_style",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "poster", label: "Poster" },
          { value: "fanart", label: "Fanart" }
        ]
      }
    }
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "max",
        selector: { number: { min: 1, max: 50, mode: "box" } }
      },
      {
        name: "clock",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "12", label: "12-hour" },
              { value: "24", label: "24-hour" }
            ]
          }
        }
      }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "overflow",
        selector: { boolean: {} }
      },
      {
        name: "max_columns",
        selector: { number: { min: 0, max: 6, mode: "box" } }
      }
    ]
  },
  {
    name: "collapse",
    selector: { number: { min: 1, max: 50, mode: "box" } }
  },
  {
    type: "expandable",
    title: "Appearance",
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "date",
            selector: { text: {} }
          },
          {
            name: "corner_radius",
            selector: { number: { min: 0, max: 20, mode: "slider" } }
          }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "title_size",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "large", label: "Large" },
                  { value: "medium", label: "Medium" },
                  { value: "small", label: "Small" }
                ]
              }
            }
          },
          {
            name: "line_size",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "large", label: "Large" },
                  { value: "medium", label: "Medium" },
                  { value: "small", label: "Small" }
                ]
              }
            }
          }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "title_color", selector: { text: {} } },
          { name: "line1_color", selector: { text: {} } },
          { name: "line2_color", selector: { text: {} } },
          { name: "line3_color", selector: { text: {} } },
          { name: "line4_color", selector: { text: {} } },
          { name: "accent_color", selector: { text: {} } },
          { name: "border_color", selector: { text: {} } },
          { name: "flag_color", selector: { text: {} } },
          { name: "icon_color", selector: { text: {} } }
        ]
      }
    ]
  },
  {
    type: "expandable",
    title: "Text Lines",
    schema: [
      { name: "title_text", selector: { text: {} } },
      { name: "line1_text", selector: { text: {} } },
      { name: "line2_text", selector: { text: {} } },
      { name: "line3_text", selector: { text: {} } },
      { name: "line4_text", selector: { text: {} } }
    ]
  },
  {
    type: "expandable",
    title: "Features",
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "enable_tooltips", selector: { boolean: {} } },
          { name: "tooltip_delay", selector: { number: { min: 150, max: 3000, mode: "box" } } }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "enable_trailers", selector: { boolean: {} } },
          { name: "disable_hyperlinks", selector: { boolean: {} } }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "enable_transparency", selector: { boolean: {} } },
          { name: "hide_empty", selector: { boolean: {} } }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "hide_flagged", selector: { boolean: {} } },
          { name: "hide_unflagged", selector: { boolean: {} } }
        ]
      }
    ]
  },
  {
    type: "expandable",
    title: "Sorting & Filtering",
    schema: [
      {
        name: "sort_by",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "", label: "None (default order)" },
              { value: "title", label: "Title" },
              { value: "airdate", label: "Air Date" },
              { value: "rating", label: "Rating" },
              { value: "runtime", label: "Runtime" }
            ]
          }
        }
      },
      { name: "sort_ascending", selector: { boolean: {} } },
      { name: "filter", selector: { text: {} } }
    ]
  },
  {
    type: "expandable",
    title: "Advanced",
    schema: [
      { name: "url", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "flag", selector: { boolean: {} } },
      { name: "all_shadows", selector: { boolean: {} } },
      { name: "box_shadows", selector: { boolean: {} } },
      { name: "text_shadows", selector: { boolean: {} } }
    ]
  }
];

const UMC_EDITOR_LABELS = {
  entity: "Entity", title: "Card Title", image_style: "Image Style",
  max: "Maximum Items", clock: "Clock Format", overflow: "Overflow Columns",
  max_columns: "Maximum Columns", collapse: "Collapse After",
  date: "Date Format", corner_radius: "Corner Radius",
  title_size: "Title Size", line_size: "Line Size",
  title_color: "Title Color", line1_color: "Line 1 Color",
  line2_color: "Line 2 Color", line3_color: "Line 3 Color",
  line4_color: "Line 4 Color", accent_color: "Accent Color",
  border_color: "Border Color", flag_color: "Flag Color", icon_color: "Icon Color",
  title_text: "Title Line", line1_text: "Line 1", line2_text: "Line 2",
  line3_text: "Line 3", line4_text: "Line 4",
  enable_tooltips: "Enable Tooltips", tooltip_delay: "Tooltip Delay (ms)",
  enable_trailers: "Enable Trailers", disable_hyperlinks: "Disable Hyperlinks",
  enable_transparency: "Enable Transparency", hide_empty: "Hide When Empty",
  hide_flagged: "Hide Flagged", hide_unflagged: "Hide Unflagged",
  sort_by: "Sort By", sort_ascending: "Sort Ascending",
  filter: "Filter (attribute=value)", url: "Custom URL", icon: "Icon",
  flag: "Show Flag", all_shadows: "All Shadows",
  box_shadows: "Box Shadows", text_shadows: "Text Shadows"
};

class UpcomingMediaCardEditor extends HTMLElement {
  constructor() {
    super();
    this._config = {};
    this._hass = null;
    this._formReady = false;
    this._sensorOptions = [];
  }

  setConfig(config) {
    this._config = { ...config };
    this._yamlKeys = new Set(Object.keys(config));
    this._updateForm();
  }

  set hass(hass) {
    this._hass = hass;
    this._discoverSensors();
    if (this._form) this._form.hass = hass;
  }

  _discoverSensors() {
    if (!this._hass) return;
    const options = [];
    for (const [id, state] of Object.entries(this._hass.states)) {
      if (!id.startsWith('sensor.')) continue;
      const data = state.attributes?.data;
      if (!data) continue;
      try {
        const items = typeof data === 'object' ? data : JSON.parse(data);
        if (Array.isArray(items) && items.length > 0 && items[0].title_default !== undefined) {
          options.push({
            value: id,
            label: state.attributes.friendly_name || id
          });
        }
      } catch (_) {}
    }
    options.sort((a, b) => a.label.localeCompare(b.label));
    if (JSON.stringify(options) !== JSON.stringify(this._sensorOptions)) {
      this._sensorOptions = options;
      this._rebuildSchema();
    }
  }

  _rebuildSchema() {
    if (!this._form) return;
    const entityField = this._sensorOptions.length > 0
      ? { name: "entity", required: true, selector: { select: { mode: "dropdown", options: this._sensorOptions } } }
      : { name: "entity", required: true, selector: { entity: { filter: { domain: "sensor" } } } };
    this._form.schema = [entityField, ...UMC_EDITOR_SCHEMA];
  }

  async connectedCallback() {
    await this._ensureFormComponents();
    this._buildForm();
  }

  async _ensureFormComponents() {
    if (customElements.get('ha-form')) return;
    try {
      const helpers = await window.loadCardHelpers?.();
      if (helpers) await helpers.createCardElement({ type: 'entity', entity: 'sun.sun' });
    } catch (_) {}
    if (!customElements.get('ha-form')) await customElements.whenDefined('ha-form');
  }

  _buildForm() {
    if (this._formReady) return;
    this._form = document.createElement('ha-form');
    this._form.computeLabel = (schema) => UMC_EDITOR_LABELS[schema.name] || schema.name;

    // ── Canonical YAML key order: groups related settings together ──
    const KEY_ORDER = [
      'type', 'entity', 'title', 'image_style',
      'max', 'clock',
      'overflow', 'max_columns',
      'collapse',
      'date', 'corner_radius', 'title_size', 'line_size',
      'title_color', 'line1_color', 'line2_color', 'line3_color', 'line4_color',
      'accent_color', 'border_color', 'flag_color', 'icon_color',
      'title_text', 'line1_text', 'line2_text', 'line3_text', 'line4_text',
      'enable_tooltips', 'tooltip_delay',
      'enable_trailers', 'disable_hyperlinks',
      'enable_transparency', 'hide_empty',
      'hide_flagged', 'hide_unflagged',
      'sort_by', 'sort_ascending', 'filter',
      'url', 'icon', 'flag',
      'box_shadows', 'text_shadows'
    ];

    const CARD_DEFAULTS = {
      flag: true,
      enable_tooltips: false,
      enable_trailers: true,
      enable_transparency: false,
      disable_hyperlinks: false,
      hide_empty: false,
      hide_flagged: false,
      hide_unflagged: false,
      corner_radius: 12,
      overflow: false,
      sort_ascending: false,
      clock: 12,
      box_shadows: true,
      text_shadows: true
    };

    const orderAndStrip = (config) => {
      const yamlKeys = this._yamlKeys || new Set();
      const ordered = {};
      for (const key of KEY_ORDER) {
        if (!(key in config)) continue;
        const val = config[key];
        if (val === undefined || val === null || val === '') continue;
        if (key in CARD_DEFAULTS && val === CARD_DEFAULTS[key] && !yamlKeys.has(key)) continue;
        ordered[key] = val;
      }
      for (const key of Object.keys(config)) {
        if (key in ordered) continue;
        const val = config[key];
        if (val === undefined || val === null || val === '') continue;
        ordered[key] = val;
      }
      return ordered;
    };

    this._form.addEventListener('value-changed', (ev) => {
      ev.stopPropagation();
      const updated = { ...ev.detail.value };
      if (updated.clock !== undefined) updated.clock = parseInt(updated.clock, 10) || 12;

      const prevOC = this._prevOverflowCollapse || { overflow: false, collapse: undefined };
      const overflowJustEnabled = !!updated.overflow && !prevOC.overflow;
      const collapseJustSet = updated.collapse !== undefined && updated.collapse !== null
          && updated.collapse !== prevOC.collapse;
      if (overflowJustEnabled) {
        delete updated.collapse;
      } else if (collapseJustSet && updated.collapse >= 1) {
        updated.overflow = false;
      }

      // ── Shadow sync: all_shadows is a convenience master toggle ──
      const prev = this._prevShadowDisplay || { all: true, box: true, text: true };
      if (updated.all_shadows !== prev.all) {
        updated.box_shadows = updated.all_shadows;
        updated.text_shadows = updated.all_shadows;
      }
      delete updated.all_shadows;

      // ── Order keys and strip defaults not explicitly in YAML ──
      this._config = orderAndStrip(updated);

      this._updateForm();
      this.dispatchEvent(new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      }));
    });
    this.appendChild(this._form);
    this._formReady = true;
    this._rebuildSchema();
    this._updateForm();
  }

  _updateForm() {
    if (!this._form) return;
    const formData = { ...this._config };
    if (formData.clock !== undefined) formData.clock = String(formData.clock);

    // ── Display defaults: show the value the card actually renders ──
    if (formData.flag === undefined) formData.flag = true;
    if (formData.corner_radius === undefined) formData.corner_radius = 12;
    if (formData.enable_trailers === undefined) formData.enable_trailers = true;

    if (formData.overflow) {
      delete formData.collapse;
    }
    this._prevOverflowCollapse = {
      overflow: !!formData.overflow,
      collapse: formData.collapse
    };

    // ── Shadow display logic ──
    let effectiveBox, effectiveText;
    if (formData.all_shadows !== undefined) {
      effectiveBox = !!formData.all_shadows;
      effectiveText = !!formData.all_shadows;
    } else {
      effectiveBox = formData.box_shadows !== undefined ? !!formData.box_shadows : true;
      effectiveText = formData.text_shadows !== undefined ? !!formData.text_shadows : true;
    }
    formData.box_shadows = effectiveBox;
    formData.text_shadows = effectiveText;
    formData.all_shadows = effectiveBox && effectiveText;

    this._prevShadowDisplay = {
      all: formData.all_shadows,
      box: formData.box_shadows,
      text: formData.text_shadows
    };

    this._form.data = formData;
    if (this._hass) this._form.hass = this._hass;
  }
}
if (!customElements.get("upcoming-media-card-editor")) {
  customElements.define("upcoming-media-card-editor", UpcomingMediaCardEditor);
}

// ── Card ───────────────────────────────────────────────────────────
class UpcomingMediaCard extends HTMLElement {
  constructor() {
    super();
    this.uniqueId = 'umc-' + Math.random().toString(36).substr(2, 9);
    this._boundClickListener;
    this.deepLinkListeners = new Map();
    this.tooltipListeners = new Map();
  }
  connectedCallback() {
    this.style.position = 'relative';
    this.style.zIndex = '0';
    this.style.touchAction = 'manipulation'; // Remove 300ms tap delay; allow pan + pinch zoom
  }
  disconnectedCallback() {
    clearTimeout(this._overflowResizeTimer);
    clearTimeout(this._overflowImageTimer);
    if (this._overflowInitRAF) { cancelAnimationFrame(this._overflowInitRAF); this._overflowInitRAF = null; }
    if (this._overflowObserver) {
      this._overflowObserver.disconnect();
      this._overflowObserver = null;
    }
    if (this._overflowResizeHandler) {
      window.removeEventListener('resize', this._overflowResizeHandler);
      this._overflowResizeHandler = null;
    }
    this._recalcInProgress = false;
    this._recalcPending = false;
    this._opacityLocked = false;
    this._overflowMinCols = 0;
    this._overflowReducedColWidth = null;
    if (this._overflowIntersectionObs) {
      this._overflowIntersectionObs.disconnect();
      this._overflowIntersectionObs = null;
    }
  }
  cleanupDeepLinkListeners() {
    this.deepLinkListeners.forEach((listeners, element) => {
      element.removeEventListener('click', listeners.click);
      element.removeEventListener('touchstart', listeners.touchstart);
      element.removeEventListener('touchmove', listeners.touchmove);
      element.removeEventListener('touchend', listeners.touchend);
    });
    this.deepLinkListeners.clear();
  }
  cleanupTooltipListeners() {
    this.tooltipListeners.forEach((listeners, element) => {
      element.removeEventListener('mouseenter', listeners.mouseenter);
      element.removeEventListener('mouseleave', listeners.mouseleave);
      element.removeEventListener('touchstart', listeners.touchstart);
      element.removeEventListener('touchmove', listeners.touchmove);
      element.removeEventListener('touchend', listeners.touchend);
      if (listeners.cleanup) listeners.cleanup();
    });
    this.tooltipListeners.clear();
  }
  addDeepLinkListener(element, url, trailer) {
    if (this.config.disable_hyperlinks) return;
    const createOverlay = (videoId) => {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      overlay.style.zIndex = '9999';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      const iframeContainer = document.createElement('div');
      iframeContainer.style.width = '95%';
      iframeContainer.style.aspectRatio = '16 / 9';
      iframeContainer.style.maxWidth = '1600px';
      iframeContainer.style.maxHeight = 'min(900px, calc(100vh - 92px))';
      iframeContainer.style.position = 'relative';
      let checkVideoEndedInterval;
      const closeOverlayAndCleanup = () => {
        clearInterval(checkVideoEndedInterval);
        window.removeEventListener('message', handleMessage);
        window.removeEventListener('popstate', handlePopState);
        closeOverlay();
      };
      const handleMessage = (event) => {
        if (event.source === iframe.contentWindow) {
          try {
            const data = JSON.parse(event.data);
            if (data.event === 'infoDelivery' && data.info && data.info.playerState === 0) {
              closeOverlayAndCleanup();
            }
          } catch (e) {
            console.error('Error parsing message:', e);
          }
        }
      };
      const handlePopState = (event) => {
        closeOverlayAndCleanup();
      };
      window.addEventListener('message', handleMessage);
      window.addEventListener('popstate', handlePopState);
      const closeButton = document.createElement('button');
      const closeIcon = document.createElement('span');
      closeIcon.innerHTML = '&times;';
      closeIcon.style.background = 'linear-gradient(180deg, #ffffff 0%, #b0b0b0 55%, #707070 100%)';
      closeIcon.style.webkitBackgroundClip = 'text';
      closeIcon.style.backgroundClip = 'text';
      closeIcon.style.color = 'transparent';
      closeIcon.style.filter = 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 6px rgba(0, 0, 0, 0.5))';
      closeIcon.style.lineHeight = '1';
      closeButton.appendChild(closeIcon);
      closeButton.style.position = 'absolute';
      closeButton.style.top = '-40px';
      closeButton.style.right = '5px';
      closeButton.style.zIndex = '10000';
      closeButton.style.width = '36px';
      closeButton.style.height = '36px';
      closeButton.style.fontSize = '35px';
      closeButton.style.fontWeight = 'bold';
      closeButton.style.cursor = 'pointer';
      closeButton.style.backgroundColor = 'transparent';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '50%';
      closeButton.style.display = 'flex';
      closeButton.style.justifyContent = 'center';
      closeButton.style.alignItems = 'center';
      closeButton.style.padding = '0';
      closeButton.style.overflow = 'visible';
      closeButton.style.transition = 'none';
      closeButton.onmouseenter = () => {
        const glow = document.createElement('div');
        glow.className = 'close-glow';
        glow.style.position = 'absolute';
        glow.style.top = 'calc(50% - 2px)';
        glow.style.left = '50%';
        glow.style.transform = 'translate(-50%, -50%)';
        glow.style.width = '39px';
        glow.style.height = '39px';
        glow.style.borderRadius = '50%';
        glow.style.background = 'radial-gradient(circle at center, rgba(255, 255, 255, 0.62) 0%, rgba(255, 255, 255, 0.27) 35%, transparent 70%)';
        glow.style.pointerEvents = 'none';
        glow.style.zIndex = '-1';
        closeButton.appendChild(glow);
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Close';
        tooltip.className = 'close-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.top = '-30px';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '3px';
        tooltip.style.fontSize = '14px';
        tooltip.style.fontWeight = 'normal';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.filter = 'none';
        tooltip.style.webkitBackgroundClip = 'unset';
        tooltip.style.backgroundClip = 'unset';
        tooltip.style.background = 'rgba(0, 0, 0, 0.7)';
        closeButton.appendChild(tooltip);
      };
      closeButton.onmouseleave = () => {
        closeButton.style.background = 'transparent';
        const glow = closeButton.querySelector('.close-glow');
        if (glow) closeButton.removeChild(glow);
        const tooltip = closeButton.querySelector('.close-tooltip');
        if (tooltip) closeButton.removeChild(tooltip);
      };

      // ── YouTube Integration Controls (Thumbs + Profile Avatar) ──────
      // Only displayed when the youtube_recently_added integration is
      // installed, configured, running, and has registered its service.
      const hasYTIntegration = this._hass && this._hass.services
        && this._hass.services['youtube_recently_added']
        && this._hass.services['youtube_recently_added']['rate_video'];

      if (hasYTIntegration) {
        let avatarUrl = null;
        let channelUrl = null;
        try {
          const ytSensor = this._hass.states['sensor.youtube_recently_added'];
          if (ytSensor && ytSensor.attributes) {
            avatarUrl = ytSensor.attributes.profile_avatar_url || null;
            channelUrl = ytSensor.attributes.profile_channel_url || null;
          }
        } catch (e) { /* silently skip if entity unavailable */ }

        const controlBar = document.createElement('div');
        controlBar.style.position = 'absolute';
        controlBar.style.top = '-40px';
        controlBar.style.right = '57px'; // 5px (close right) + 36px (close) + 16px (gap)
        controlBar.style.zIndex = '10000';
        controlBar.style.display = 'flex';
        controlBar.style.alignItems = 'center';
        controlBar.style.flexDirection = 'row-reverse'; // rightmost item first in DOM

        if (avatarUrl) {
          const avatarImg = document.createElement('img');
          avatarImg.src = avatarUrl;
          avatarImg.referrerPolicy = 'no-referrer'; // Required for Google-hosted images
          avatarImg.style.width = '32px';
          avatarImg.style.height = '32px';
          avatarImg.style.borderRadius = '50%';
          avatarImg.style.objectFit = 'cover';
          avatarImg.style.border = '2px solid rgba(255, 255, 255, 0.20)';
          avatarImg.style.flexShrink = '0';
          avatarImg.style.marginLeft = '13px';
          avatarImg.style.transition = 'border-color 0.3s ease';
          avatarImg.onerror = () => { avatarImg.style.display = 'none'; }; // Hide on load failure
          if (channelUrl) {
            avatarImg.style.cursor = 'pointer';
            avatarImg.title = 'Open YouTube profile';
            avatarImg.onclick = (e) => {
              e.stopPropagation();
              window.open(channelUrl, '_blank', 'noopener,noreferrer');
            };
            avatarImg.onmouseenter = () => {
              avatarImg.style.borderColor = 'rgba(255, 255, 255, 0.35)';
            };
            avatarImg.onmouseleave = () => {
              avatarImg.style.borderColor = 'rgba(255, 255, 255, 0.20)';
            };
          } else {
            avatarImg.style.pointerEvents = 'none';
          }
          controlBar.appendChild(avatarImg);
        }

        const thumbsPair = document.createElement('div');
        thumbsPair.style.display = 'flex';
        thumbsPair.style.gap = '0px';
        thumbsPair.style.flexShrink = '0';

        const createThumbButton = (type) => {
          const btn = document.createElement('button');
          const thumbUpSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>`;
          const thumbDownSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/></svg>`;
          btn.innerHTML = type === 'like' ? thumbUpSVG : thumbDownSVG;
          btn.dataset.ratingType = type;
          btn.dataset.active = 'false';
          btn.style.display = 'inline-flex';
          btn.style.position = 'relative';
          btn.style.justifyContent = 'center';
          btn.style.alignItems = 'center';
          btn.style.width = '36px';
          btn.style.height = '36px';
          btn.style.cursor = 'pointer';
          btn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          btn.style.color = 'white';
          btn.style.border = 'none';
          btn.style.borderRadius = '50%';
          btn.style.padding = '0';
          btn.style.lineHeight = '1';
          btn.style.transition = 'background-color 0.3s ease, color 0.3s ease';
          btn.onmouseenter = () => {
            if (btn.dataset.active !== 'true') {
              btn.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            }
            const tooltip = document.createElement('div');
            tooltip.textContent = type === 'like' ? 'Like' : 'Dislike';
            tooltip.style.position = 'absolute';
            tooltip.style.top = '-30px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '3px';
            tooltip.style.fontSize = '14px';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.className = 'thumb-tooltip';
            btn.appendChild(tooltip);
          };
          btn.onmouseleave = () => {
            if (btn.dataset.active !== 'true') {
              btn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }
            const tooltip = btn.querySelector('.thumb-tooltip');
            if (tooltip) btn.removeChild(tooltip);
          };
          return btn;
        };

        const thumbUpBtn = createThumbButton('like');
        const thumbDownBtn = createThumbButton('dislike');

        const setActiveState = (btn, active) => {
          btn.dataset.active = active ? 'true' : 'false';
          if (active) {
            btn.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
            btn.style.color = '#3ea6ff';
            btn.querySelector('svg').setAttribute('fill', 'currentColor');
          } else {
            btn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            btn.style.color = 'white';
            btn.querySelector('svg').setAttribute('fill', 'none');
          }
        };

        const handleThumbClick = (rating, activeBtn, otherBtn) => {
          const isAlreadyActive = activeBtn.dataset.active === 'true';
          const effectiveRating = isAlreadyActive ? 'none' : rating;

          this._hass.callService('youtube_recently_added', 'rate_video', {
            video_id: videoId,
            rating: effectiveRating,
          });

          if (isAlreadyActive) {
            setActiveState(activeBtn, false);
          } else {
            setActiveState(activeBtn, true);
            setActiveState(otherBtn, false);
          }
        };

        thumbUpBtn.onclick = (e) => {
          e.stopPropagation();
          handleThumbClick('like', thumbUpBtn, thumbDownBtn);
        };
        thumbDownBtn.onclick = (e) => {
          e.stopPropagation();
          handleThumbClick('dislike', thumbDownBtn, thumbUpBtn);
        };

        // Pre-set thumb state from sensor my_rating
        const findMyRating = (entityId) => {
          try {
            const st = this._hass.states[entityId];
            if (!st || !st.attributes || !st.attributes.data) return null;
            const items = st.attributes.data;
            for (let i = 1; i < items.length; i++) {
              if (items[i] && items[i].id === videoId && items[i].my_rating) {
                return items[i].my_rating;
              }
            }
          } catch (e) { /* entity unavailable */ }
          return null;
        };
        const existingRating = findMyRating(this.config.entity)
          || findMyRating('sensor.youtube_recently_added')
          || findMyRating('sensor.youtube_recently_added_shorts')
          || findMyRating('sensor.youtube_recently_added_favorite_channels');
        if (existingRating === 'like') {
          setActiveState(thumbUpBtn, true);
        } else if (existingRating === 'dislike') {
          setActiveState(thumbDownBtn, true);
        }

        thumbsPair.appendChild(thumbUpBtn);
        thumbsPair.appendChild(thumbDownBtn);
        controlBar.appendChild(thumbsPair);
        iframeContainer.appendChild(controlBar);
      }
      // ── End YouTube Integration Controls ─────────────────────────────

      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&fs=1&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&playsinline=1`;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      checkVideoEndedInterval = setInterval(() => {
        iframe.contentWindow.postMessage('{"event":"listening"}', '*');
      }, 1000);
      iframeContainer.appendChild(iframe);
      iframeContainer.appendChild(closeButton);
      overlay.appendChild(iframeContainer);
      const closeOverlay = () => {
        clearInterval(checkVideoEndedInterval);
        window.removeEventListener('message', handleMessage);
        window.removeEventListener('popstate', handlePopState);
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
        if (history.state && history.state.overlayOpen) {
          history.back();
        }
      };
      closeButton.onclick = closeOverlay;
      const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
          closeOverlay();
        }
      };
      document.addEventListener('keydown', handleKeyPress);
      overlay.addEventListener('remove', () => {
        document.removeEventListener('keydown', handleKeyPress);
      });
      history.pushState({ overlayOpen: true }, '');
      return overlay;
    };
    let touchStartX, touchStartY, touchStartTime;
    const touchThreshold = 500;    // ms — long-press cancels tap
    const moveThresholdPx = 10;    // px — per Android touch slop / Mobiscroll standard
    let touchTimer;
    let preventClick = false;
    let isMoving = false;
    const handleTouchStart = (event) => {
      touchStartX = event.touches[0].pageX;
      touchStartY = event.touches[0].pageY;
      touchStartTime = Date.now();
      preventClick = false;
      isMoving = false;
      touchTimer = setTimeout(() => {
        preventClick = true;
      }, touchThreshold);
    };
    const handleTouchMove = (event) => {
      if (isMoving) return;
      const dx = event.touches[0].pageX - touchStartX;
      const dy = event.touches[0].pageY - touchStartY;
      if (Math.abs(dx) > moveThresholdPx || Math.abs(dy) > moveThresholdPx) {
        isMoving = true;
        preventClick = true;
        clearTimeout(touchTimer);
      }
    };
    const handleTouchEnd = (event) => {
      clearTimeout(touchTimer);
      if (!isMoving && !preventClick && (Date.now() - touchStartTime) < touchThreshold) {
        event.preventDefault();
        handleClick(event);
      }
    };
    const handleClick = (event) => {
      if (preventClick) return;
      event.preventDefault();
      const videoUrl = this.config.enable_trailers && trailer ? trailer : url;
      const videoId = this.getYouTubeVideoId(videoUrl);
      if (videoId) {
        const overlay = createOverlay(videoId);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
      } else {
        window.open(videoUrl, '_blank');
      }
    };
    element.addEventListener('click', handleClick);
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);
    this.deepLinkListeners.set(element, {
      click: handleClick,
      touchstart: handleTouchStart,
      touchmove: handleTouchMove,
      touchend: handleTouchEnd
    });
  }
  getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
  removeDeepLinkListener(element) {
    const listeners = this.deepLinkListeners.get(element);
    if (listeners) {
      element.removeEventListener('click', listeners.click);
      element.removeEventListener('touchstart', listeners.touchstart);
      element.removeEventListener('touchmove', listeners.touchmove);
      element.removeEventListener('touchend', listeners.touchend);
      this.deepLinkListeners.delete(element);
    }
  }

  set hass(hass) {
    this._hass = hass;
    this.classList.add(this.uniqueId);
    if (!this.content) {
      const card = document.createElement("ha-card");
      card.header = this.config.title;
      this.content = document.createElement("div");
      this.content.style.padding = "5px 10px";
      this.content.style.position = "relative";
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const entity = this.config.entity;
    if (!hass.states[entity]) return;
    let service = this.config.entity.slice(7, 11);
    let data = hass.states[entity].attributes.data;
    let json;


    // START: 'sort_by' and 'sort_ascending' features
    try {
      json = typeof(data) === "object" ? data : JSON.parse(data);
      if (this.config && this.config.sort_by) {
        const { sort_by, sort_ascending = true } = this.config;

        let sortType = null;

        const extractSortableValue = (item) => {
          let str = item[sort_by];

          if (str === undefined || str === null) {
            console.log(`Item ${sort_by} is undefined or null:`, str);  // Debugging statement
            return null;
          }

          if (typeof str === 'number') {
            sortType = 'numeric';
            return str;
          }

          str = str.toString();

          if (str === 'None' || str === 'none') {
            return null;
          }

          if (sort_by === 'title') {
            sortType = 'title';
            return str.toLowerCase();
          }

          let cleanStr = str.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, '');

          if (sort_by === 'airdate') {
            let dateValue = Date.parse(cleanStr);
            if (!isNaN(dateValue)) {
              sortType = 'airdate';
              return dateValue;
            }
          }

          let numericValue = parseFloat(cleanStr);
          if (!isNaN(numericValue) && isFinite(numericValue)) {
            sortType = 'numeric';
            return numericValue;
          }

          let complexNumericValue = cleanStr.match(/(?:\d+\u0336)+\d*\u0336*|\d+(\.\d+)?/g)?.map(n => n.replace(/[\u0336]/g, ''))
            .filter(n => n.trim() !== '').map(n => parseFloat(n)).sort((a, b) => a - b)[0];

          if (!isNaN(complexNumericValue)) {
            sortType = 'numeric';
            return complexNumericValue;
          }

          sortType = 'string';
          return cleanStr.toLowerCase();
        };

        const templateItem = json[0];
        const sortedItems = json.slice(1).sort((a, b) => {
          let valA = extractSortableValue(a);
          let valB = extractSortableValue(b);

          if (valA === null && valB === null) {
            return 0;
          }

          if (valA === null) {
            return sort_ascending ? 1 : -1;
          }

          if (valB === null) {
            return sort_ascending ? -1 : 1;
          }

          let comparison;
          if (sortType === 'numeric') {
            comparison = valA - valB;
          } else if (sortType === 'airdate') {
            comparison = valA - valB;
          } else {
            const strA = String(valA);
            const strB = String(valB);
            comparison = strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' });
          }

          return sort_ascending ? comparison : -comparison;
        });

        json = [templateItem, ...sortedItems];
      }
    } catch (e) {
      console.error("Error sorting data:", e);
    }
    // END: 'sort_by' and 'sort_ascending' features


    //Collapse filter (takes precedence over general filter)
    let collapseProcessed = false;
    let conditionalCollapse = typeof this.config.collapse === 'string' ? this.config.collapse.match(/(\w+)=(.*)/) : null;
    if (this.config.overflow) {
        this.collapse = Infinity;
    } else if (conditionalCollapse) {
        collapseProcessed = true;
        const attr = conditionalCollapse[1];
        const value = conditionalCollapse[2].toLowerCase();
        let filteredItems = json.slice(1).filter(item => String(item[attr]).toLowerCase().includes(value));
        let unmatchedItems = json.slice(1).filter(item => !String(item[attr]).toLowerCase().includes(value));
        json = [json[0], ...filteredItems, ...unmatchedItems];
        this.collapse = filteredItems.length;
    } else if (typeof this.config.collapse === 'number') {
        collapseProcessed = true;
        this.collapse = this.config.collapse;
    } else {
        this.collapse = Infinity;
    }


    // General filter
    if (this.config.filter && !collapseProcessed) {
      const filterParts = this.config.filter.split('=');
      if (filterParts.length === 2) {
          const filterKey = filterParts[0].trim();
          const filterValue = filterParts[1].trim().toLowerCase();
          const templateItem = json[0];
          const filteredItems = json.slice(1).filter(item => {
              const itemValue = item[filterKey];
              if (filterValue === '') {
                  return itemValue === null || itemValue === undefined || itemValue === '';
              }
              if (typeof itemValue === 'string') {
                  return itemValue.toLowerCase().includes(filterValue);
              } else if (itemValue !== null && itemValue !== undefined) {
                  return itemValue.toString().toLowerCase() === filterValue;
              }
              return false;
          });
          json = [templateItem, ...filteredItems];
      }
    }


    if (!json[1] && this.config.hide_empty) this.style.display = "none";
    if (!json || !json[1] || this.prev_json == JSON.stringify(json)) return;
    this.prev_json = JSON.stringify(json);
    const view = this.config.image_style || "poster";
    const dateform = this.config.date || "mmdd";
    const icon = this.config.icon || json[0]["icon"];
    const icon_hide = this.config.icon == "none" ? "display:none;" : "";
    const icon_color = this.config.icon_color || "white";
    const flag_color = this.config.flag_color || "var(--primary-color)";
    const flag = this.config.flag == undefined ? true : this.config.flag;
    const timeform = {
      hour12: this.config.clock != 24,
      hour: "2-digit",
      minute: "2-digit"
    };
    const title_text = this.config.title_text || json[0]["title_default"];
    const line1_text = this.config.line1_text || json[0]["line1_default"];
    const line2_text = this.config.line2_text || json[0]["line2_default"];
    const line3_text = this.config.line3_text || json[0]["line3_default"];
    const line4_text = this.config.line4_text || json[0]["line4_default"];
    const title_size = this.config.title_size || "large";
    const line1_size =
      this.config.line1_size || this.config.line_size || "medium";
    const line2_size =
      this.config.line2_size || this.config.line_size || "small";
    const line3_size =
      this.config.line3_size || this.config.line_size || "small";
    const line4_size =
      this.config.line4_size || this.config.line_size || "small";
    const tSize = size =>
      size == "large" ? "18" : size == "medium" ? "14" : "12";
    const size = [
      tSize(title_size),
      tSize(line1_size),
      tSize(line2_size),
      tSize(line3_size),
      tSize(line4_size)
    ];
    const defaultClr = (poster, fanart) => (view == "poster" ? poster : fanart);
    const title_color =
      this.config.title_color ||
      defaultClr("var(--primary-text-color)", "#fff");
    const line1_color =
      this.config.line1_color ||
      this.config.line_color ||
      defaultClr("var(--primary-text-color)", "#fff");
    const line2_color =
      this.config.line2_color ||
      this.config.line_color ||
      defaultClr("var(--primary-text-color)", "#fff");
    const line3_color =
      this.config.line3_color ||
      this.config.line_color ||
      defaultClr("var(--primary-text-color)", "#fff");
    const line4_color =
      this.config.line4_color ||
      this.config.line_color ||
      defaultClr("var(--primary-text-color)", "#fff");
    const accent =
      this.config.accent_color || defaultClr("var(--primary-color)", "#000");
    const border = this.config.border_color || defaultClr("#fff", "#000");
    const corner_radius = this.config.corner_radius;
    const shadows = conf =>
      this.config.all_shadows == undefined
        ? conf == undefined
          ? true
          : conf
        : this.config.all_shadows;
    const boxshdw = shadows(this.config.box_shadows)
      ? view == "poster"
        ? "5px 5px 10px"
        : "3px 2px 25px"
      : "";
    const svgshdw = shadows(this.config.box_shadows) ? "url(#grad1)" : accent;
    const txtshdw = shadows(this.config.text_shadows) ? "1px 1px 3px" : "";
    const overflowActive = this.config.overflow;
    const max = this.config.max
      ? Math.min(json.length - 1, this.config.max)
      : json.length - 1;
    this.cardSize = max;

    const createStyleElement = () => {
      let style = document.createElement("style");
      style.setAttribute("id", this.uniqueId + "_style");
      return style;
    };
    let style = createStyleElement();
    let existingStyle = this.querySelector(`[id="${this.uniqueId}_style"]`);
    if (!existingStyle) {
      if (view == "poster") {
        style.textContent = `
          .${this.uniqueId} .${service}_${view} {
            width:100%;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
            position: relative;
            display: inline-block;
            overflow: hidden;
            break-inside: avoid;
            ${corner_radius ? 'border-radius:' + corner_radius + 'px;' : ''}
          }
          .${this.uniqueId} .${service}_${view} ha-icon {
            top: -1%;
            right: 2%;
            z-index: 2;
            width: 17%;
            height: 17%;
            --mdc-icon-size: 100%;
            transform: scale(0.9);
            position:absolute;
            color:${icon_color};
            filter: drop-shadow( 0px 0px 1px rgba(0,0,0,1));
            ${icon_hide};
          }
          .${this.uniqueId} .${service}_${view} img {
            width:100%;
            visibility:hidden;
          }
          .${this.uniqueId} .${service}_svg_${view} {
            width:55%;
            margin-top:5%;
            margin-left:0;
            vertical-align:top;
            overflow:visible;
            z-index:1;
          }
          .${this.uniqueId} .${service}_container_${view} {
            position:relative;
            ${corner_radius ? '' : 'outline: 5px solid #fff;'}
            width:30%;
            ${corner_radius ? 'border:5px solid ' + border + '; box-sizing:border-box;' : 'outline:5px solid ' + border + ';'}
            box-shadow:${boxshdw} rgba(0,0,0,.8);
            float:left;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            margin:5px 0 15px 5px;
            ${corner_radius ? 'border-radius:' + corner_radius + 'px; overflow:hidden;' : ''}
          }
          .${this.uniqueId} .${service}_flag_${view} {
            z-index: 1;
            height: 100%;
            width: 100%;
            position: absolute;
            bottom: 0;
            right: 0;
            fill:${flag_color};
          }
          .${this.uniqueId} .${service}_flag_${view} svg{
            float:right;
            width: 100%;
            height: 100%;
            margin:0;
            filter: drop-shadow( -1px 1px 1px rgba(0,0,0,.5));
          }
          .${this.uniqueId} .${service}_line0_${view} {
            font-weight:600;
            font-size:${size[0]}px;
            text-shadow:${txtshdw} rgba(0,0,0,0.9);
            fill:${title_color};
          }
          .${this.uniqueId} .${service}_line1_${view} {
            font-size:${size[1]}px;
            text-shadow:${txtshdw} rgba(0,0,0,0.9);
            fill:${line1_color};
          }
          .${this.uniqueId} .${service}_line2_${view} {
            font-size:${size[2]}px;
            text-shadow:${txtshdw} rgba(0,0,0,0.9);
            fill:${line2_color};
          }
          .${this.uniqueId} .${service}_line3_${view} {
            font-size:${size[3]}px;
            text-shadow:${txtshdw} rgba(0,0,0,0.9);
            fill:${line3_color};
          }
          .${this.uniqueId} .${service}_line4_${view} {
            font-size:${size[4]}px;
            text-shadow:${txtshdw} rgba(0,0,0,0.9);
            fill:${line4_color};
          }
        `;
      } else {
        style.textContent = `
          .${this.uniqueId} .${service}_${view} {
            width:100%;
            overflow:hidden;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
            background-repeat:no-repeat;
            background-size: var(--background-size);
            box-shadow:${boxshdw} rgba(0,0,0,.8);
            position:relative;
            break-inside: avoid;
            ${corner_radius ? 'border-radius:' + corner_radius + 'px;' : ''}
          }
          .${this.uniqueId} .${service}_gap_wrapper_${view} {
            break-inside: avoid;
          }
          .${this.uniqueId} .${service}_${view} ha-icon {
            top: 4%;
            margin-right: -4%;
            right:0;
            z-index: 2;
            width: 15%;
            height: 15%;
            --mdc-icon-size: 100%;
            transform: scale(0.9);
            position:absolute;
            color:${icon_color};
            filter: drop-shadow( 0px 0px 1px rgba(0,0,0,1));
            ${icon_hide};
          }
          .${this.uniqueId} .${service}_svg_${view} {
            overflow:visible;
            width:55%;
            margin-top:1%;
            margin-left:2.5%;
            alignment-baseline:text-after-edge;
          }
          .${this.uniqueId} .${service}_fan_${view} {
            width:100%;
            background: ${this.config.enable_transparency ? `linear-gradient(to right, transparent 0%, ${accent} 47%, transparent 70%, ${accent} 100%)` : `linear-gradient(to right, ${accent} 47%, transparent 70%, ${accent} 100%)`};
            margin:auto;
            box-shadow:inset 0 0 0 3px ${border};
            ${corner_radius ? 'border-radius:' + corner_radius + 'px;' : ''}
          }
          ${this.config.enable_transparency ? `
          .${this.uniqueId} .${service}_fan_${view}::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            background: ${accent};
            backdrop-filter: blur(1px);
            -webkit-backdrop-filter: blur(1px);
            opacity: 0.1;
            z-index: 1;
          }
          .${this.uniqueId} .${service}_${view}.non-standard-aspect-ratio::before,
          .${this.uniqueId} .${service}_${view}.non-standard-aspect-ratio::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            z-index: 2;
          }
          .${this.uniqueId} .${service}_${view}.non-standard-aspect-ratio::before {
            top: 0;
            height: var(--gap-height);
            background: linear-gradient(to right, transparent 0%, transparent 47%, ${border} 55%, ${border} 100%);
            z-index: 2;
          }
          .${this.uniqueId} .${service}_${view}.non-standard-aspect-ratio::after {
            bottom: 0;
            height: var(--gap-height);
            background: linear-gradient(to right, transparent 0%, transparent 47%, ${border} 55%, ${border} 100%);
            z-index: 2;
          }
          .${this.uniqueId} .${service}_fan_${view} .text-content {
            position: relative;
            z-index: 3;
          }` : ''}
          .${this.uniqueId} .${service}_flag_${view} {
            z-index: 1;
            height: 100%;
            width: 100%;
            position: absolute;
            margin-top:3px;
            margin-right:3px;
            right: 0;
            fill:${flag_color};
            ${corner_radius ? 'border-radius:' + Math.max(0, corner_radius - 3) + 'px; overflow:hidden;' : ''}
          }
          .${this.uniqueId} .${service}_flag_${view} svg{
            float:right;
            width: 100%;
            height: 100%;
            margin:0;
            filter: drop-shadow( -1px 1px 1px rgba(0,0,0,.5));
          }
          .${this.uniqueId} .${service}_line0_${view} {
            font-weight:600;
            font-size:${size[0]}px;
            text-shadow:${txtshdw} rgba(0,0,0,0.9);
            fill:${title_color};
          }
          .${this.uniqueId} .${service}_line1_${view} {
            font-size:${size[1]}px;
            text-shadow:${txtshdw} rgba(0,0,0,0.9);
            fill:${line1_color};
          }
          .${this.uniqueId} .${service}_line2_${view} {
            font-size:${size[2]}px;
            text-shadow:${txtshdw} rgba(0,0,0,0.9);
            fill:${line2_color};
          }
          .${this.uniqueId} .${service}_line3_${view} {
            font-size:${size[3]}px;
            text-shadow:${txtshdw} rgba(0,0,0,0.9);
            fill:${line3_color};
          }
          .${this.uniqueId} .${service}_line4_${view} {
            font-size:${size[4]}px;
            text-shadow:${txtshdw} rgba(0,0,0,0.9);
            fill:${line4_color};
          }
          :host {
            cursor: pointer;
          }
        `;
      }
      style.textContent += `
        .${this.uniqueId} * {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }
        .${this.uniqueId} *:active {
          -webkit-tap-highlight-color: transparent;
        }
      `;
      this.appendChild(style);
    }
    this.cleanupDeepLinkListeners();
    this.cleanupTooltipListeners();
    this.content.innerHTML = "";

    // Truncate text...
    function truncate(text, chars, isTitle) {

      function decodeEntities(input) {
        var textarea = document.createElement('textarea');
        textarea.innerHTML = input;
        return textarea.value;
      }
      // When to truncate depending on size
      chars = chars == 'large' ? 23 : chars == 'medium' ? 25 : 32;
      text = decodeEntities(text);
      // Truncate only at whole word w/ no punctuation or space before ellipsis.
      if (text.length > chars) {
        for (let i = chars; i > 0; i--) {
          if (text.charAt(i).match(/( |\s|:|-|;|"|'|,)/) && text.charAt(i - 1).match(/[^\s:;-;"',]/)) {
            if (isTitle) return text.substring(0, i);
            return text.charAt(i) === ',' || text.charAt(i) === ' ' ? text.substring(0, i).replace(/\s+[-&]$/, '') : `${text.substring(0, i)}...`;
          }
        }
        // The cycle above had a really big single word, so we return it anyway
        return isTitle ? text.substring(0, chars) : `${text.substring(0, chars)}...`;
      } else {
        return text;
      }
    }

    function format_date(input_date, format = "mm/dd/yy") {
      let fd_day, fd_month, fd_year, fd_year4;
      format = String(format || "mm/dd/yy");
      const s = String(input_date);

      if ((format === "yyyy" || format === "(yyyy)") && s.match(/^\d{4}$/)) {
        return format === "(yyyy)" ? "(" + s + ")" : s;
      }

      if (s.match(/[T]\d+[:]\d+[:]\d+[Z]/)) {
        const dt = new Date(input_date);
        fd_day = dt.toLocaleDateString([], { day: "2-digit" });
        fd_month = dt.toLocaleDateString([], { month: "2-digit" });
        fd_year = dt.toLocaleDateString([], { year: "2-digit" });
        const y = dt.getFullYear();
        fd_year4 = isNaN(y) ? "" : String(y);
      } else if (s.match(/\d+[-]\d+[-]\d+/)) {
        input_date = s.split("-");
        fd_month = input_date[1];
        fd_day = input_date[2];
        fd_year = input_date[0].slice(-2);
        fd_year4 = input_date[0];
      } else {
        return "";
      }

      const dayInt = parseInt(fd_day, 10);
      const monthInt = parseInt(fd_month, 10);
      const fd_day1 = isNaN(dayInt) ? fd_day : String(dayInt);
      const fd_month1 = isNaN(monthInt) ? fd_month : String(monthInt);

      const formatMap = { dd: fd_day, d: fd_day1, mm: fd_month, m: fd_month1, yyyy: fd_year4, yy: fd_year };
      const mark = "\u0000";

      return format
        .replace(/yyyy|yy|mm|m|dd|d/g, matched => (formatMap[matched] ?? matched) + mark)
        .replace(new RegExp(mark + "(?=\\d)", "g"), "/")
        .replace(new RegExp(mark, "g"), "");
    }

    this.content.style.visibility = 'hidden';
    this.content.style.position = 'absolute';
    this.content.style.left = '-9999px';

    // Star brightness and saturation matching
    const resolveRGB = (colorStr) => {
      const t = document.createElement('div');
      t.style.color = colorStr;
      t.style.display = 'none';
      document.body.appendChild(t);
      const c = getComputedStyle(t).color;
      document.body.removeChild(t);
      const m = c.match(/(\d+),\s*(\d+),\s*(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : [255, 255, 255];
    };
    const perceivedBrightness = (rgb) => (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    const rgbToSat = (rgb) => {
      const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      if (max === min) return 0;
      const l = (max + min) / 2;
      return (max - min) / (l > 0.5 ? (2 - max - min) : (max + min)) * 100;
    };
    const defaultLine3 = defaultClr("var(--primary-text-color)", "#fff");
    const defRGB = resolveRGB(defaultLine3);
    const curRGB = resolveRGB(line3_color);
    const defBright = perceivedBrightness(defRGB);
    const curBright = perceivedBrightness(curRGB);
    const brightRatio = defBright > 0 ? curBright / defBright : 1;
    const defSat = rgbToSat(defRGB);
    const curSat = rgbToSat(curRGB);
    const satRatio = defSat > 5 ? curSat / defSat : (curSat > 5 ? curSat / 55 : 1);
    const adjustedStar = (() => {
      const h = 41;
      const brightnessAdjustment = 5;
      const saturationAdjustment = 29;
      const satCurveSteepness = 3.0; // TUNE THIS: higher = saturation ramps up faster with brightness (1.0 = linear, 2.0 = steep, 3.0 = very steep, 4.0+ = extreme)
      const brightBoost = Math.pow(brightRatio, 1.4) * (1 + Math.log1p(Math.pow(brightRatio, 2.5)) / Math.log(3));
      const satBoost = Math.pow(brightRatio, satCurveSteepness);
      let s = Math.min(100, Math.round(57 * satRatio * 1.07 * brightBoost * satBoost) + saturationAdjustment);
      let l = Math.min(100, Math.round(65 * brightRatio * 1.09) + brightnessAdjustment);
      const hsl2rgb = (h, s, l) => {
        s /= 100; l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return '#' + [f(0), f(8), f(4)].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
      };
      return hsl2rgb(h, s, l);
    })();

    const dividerBaseLightness = 44; // ← tune default divider brightness (0–100)
    const adjustedDividerL = Math.min(100, Math.round(dividerBaseLightness * brightRatio * 1.09));
    const adjustedDivider = `hsl(0, 0%, ${adjustedDividerL}%)`;

    // ── MDI thumb icon SVG paths (24×24 viewBox) ─────────────────────
    const MDI_THUMB_UP = 'M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.59C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z';
    const MDI_THUMB_UP_OUTLINE = 'M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.05C15.5,2.32 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z';
    const MDI_THUMB_DOWN = 'M19,15H23V3H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.95C8.5,21.68 8.33,21.3 8.33,20.89L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15Z';
    const MDI_THUMB_DOWN_OUTLINE = 'M19,15V3H23V15H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.95C8.5,21.68 8.33,21.3 8.33,20.89L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15M15,5H5.97L3,12V14H11.79L10.66,19.32L15,14.97V5Z';

    //Begin of loop iterating through each item in for json data
    for (let count = 1; count <= max; count++) {

      const item = key => json[count][key];
      if (!item("airdate")) continue;
      if (this.config.hide_flagged && item("flag")) continue;
      else if (this.config.hide_unflagged && !item("flag")) continue;
      let airdate = new Date(item("airdate"));
      let dflag = item("flag") && flag ? "" : "display:none;";
      let image =
        view == "poster" ? item("poster") : item("fanart") || item("poster");
      if (typeof image === 'string' && !image.includes("http")) {
          image = hass.hassUrl().substring(0, hass.hassUrl().length - 1) + image;
      }
      let daysBetween = Math.round(
        Math.abs(
          (new Date().getTime() - airdate.getTime()) / (24 * 60 * 60 * 1000)
        )
      );
      let day =
        daysBetween <= 7
          ? airdate.toLocaleDateString([], { weekday: "long" })
          : airdate.toLocaleDateString([], { weekday: "short" });

      // Convert 'runtime' to 'Xhr Ymin' format if it's a numeric value, otherwise exclude it.
      let runtime = item("runtime");
      if (runtime && /^\d+$/.test(runtime)) {
          let totalMinutes = parseInt(runtime, 10);
          let hrs = Math.floor(totalMinutes / 60);
          runtime = (hrs > 0 ? `${hrs}hr ` : "") + (totalMinutes % 60 > 0 ? `${totalMinutes % 60}min` : "");
      } else {
          runtime = "";
      }

      // Shifting images for fanart view since we use poster as fallback image.
      let shiftimg = item("fanart")
        ? "background-position:100% 0;"
        : "background-size: 54% auto;background-position:100% 35%;";

      // First item in card needs no top margin.
      let top;
      if (count == 1) top = "margin-top: 0px;";
      else top = view == "poster" ? "margin-top: 20px;" : "margin-top: 10px;";

      let line = [title_text, line1_text, line2_text, line3_text, line4_text];
      let char = [title_size, line1_size, line2_size, line3_size, line4_size];

      // Keyword map for replacement, return null if empty so we can hide empty sections.
      let keywords = /\$title|\$episode|\$genres|\$number|\$rating|\$release|\$runtime|\$studio|\$price|\$day|\$date|\$time|\$aired|\$album|\$artist|\$channel|\$views|\$likes|\$dislikes|\$live_status|\$tmdb_id|\$empty/g;
      const format = this.config.date || "mm/dd/yy";
      const releaseFormat = this.config.date || "mm/dd/yy";
      let keys = {
        $title: item("title") || null,
        $episode: item("episode") || null,
        $genres: (Array.isArray(item("genres")) ? item("genres").join(", ") : item("genres")) || null,
        $number: item("number") || null,
        $rating: item("rating") ? String(item("rating")).replace(/\d+\.\d+/, m => parseFloat(m).toFixed(1)) : null,
        $release: (item("release") || '').replace("$date", format_date(item("airdate"), releaseFormat)).replace("$year", format_date(item("airdate"), "yy")).replace(" $time", "&nbsp;&nbsp;$time") || null,
        $runtime: runtime || null,
        $studio: item("studio") || null,
        $price: item("price") || null,
        $day: day || null,
        $date: format_date(item("airdate"), format) || null,
        $time: airdate.toLocaleTimeString([], timeform) || null,
        $aired: format_date(item("aired"), format) || null,
        $album: item("album") || null,
        $artist: item("artist") || null,
        $channel: item("channel") || null,
        $views: item("views") || null,
        $likes: item("likes") || null,
        $dislikes: item("dislikes") || null,
        $live_status: item("live_status") || null,
        $tmdb_id: item("tmdb_id") || null,
        $empty: ''
      };

      // Replace keywords in lines
      for (let i = 0; i < line.length; i++) {
        line[i] = line[i].replace(" - ", "-");
        // Split at '-' so we can ignore entire contents if keyword returns null
        let text = line[i].replace(keywords, val => keys[val]).split("-");
        let filtered = [];
        // Rebuild lines, ignoring null
        for (let t = 0; t < text.length; t++) {
          if (text[t].match(null)) continue;
          else filtered.push(text[t]);
        }
        // Replacing twice to get keywords in component generated strings
        text = filtered.join(" - ").replace(keywords, val => keys[val]).trim();

        // Shifting header text around depending on view & size
        let svgshift, y;
        if (i == 0)
          size[i].match(/18/)
            ? (y = "-5")
            : size[i].match(/14/)
            ? (y = "-2")
            : (y = "0");
        if (view == "fanart")
          svgshift = i == 0 ? `x="0" dy="1.15em" ` : `x="0" dy="1.3em" `;
        else
          svgshift =
            i == 0 ? `x="15" y="${y}" dy="1.3em" ` : `x="15" dy="1.3em" `;

        // Build lines HTML or empty line
        line[i] = line[i].match("empty")
          ? `<tspan class="${service}_line${i}_${view}" style="fill:transparent;text-shadow:0 0 transparent;" ${svgshift}>.</tspan>`
          : `<tspan class="${service}_line${i}_${view}" ${svgshift}>${truncate(
              text,
              char[i],
              i === 0
            ).replace(/,\s[^,]*\.\.\.$/g, '').replace(/★(?=\s*\d)/g, `<tspan fill="${adjustedStar}">★</tspan>`)}</tspan>`;
      }

      let l4FOData = null;
      if (!this.config.line4_text || this.config.line4_text.includes('$likes')) {
        const l4Views = item("views");
        const l4Likes = item("likes");
        const l4Dislikes = item("dislikes");
        const l4Rating = item("my_rating") || "none";
        const thumbSpan = 'display:inline-flex;align-items:center;vertical-align:-0.15em;gap:0.25em;';
        const thumbIcon = (path, fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.15em" height="1.15em" style="fill:${fill};flex-shrink:0;"><path d="${path}"/></svg>`;
        const l4Parts = [];
        if (l4Views) l4Parts.push(l4Views + ' views');
        let thumbsHtml = '';
        if (l4Likes != null) {
          const upPath = l4Rating === 'like' ? MDI_THUMB_UP : MDI_THUMB_UP_OUTLINE;
          const upFill = l4Rating === 'like' ? adjustedStar : line4_color;
          thumbsHtml += `<span style="${thumbSpan}">${thumbIcon(upPath, upFill)}${l4Likes}</span>`;
        }
        if (l4Likes != null && l4Dislikes != null) {
          thumbsHtml += `<span style="display:inline-block;width:1.5px;height:1.15em;vertical-align:-0.15em;margin:0 calc(0.55em + 1px);background:${adjustedDivider};"></span>`;
        }
        if (l4Dislikes != null) {
          const dnPath = l4Rating === 'dislike' ? MDI_THUMB_DOWN : MDI_THUMB_DOWN_OUTLINE;
          const dnFill = l4Rating === 'dislike' ? adjustedStar : line4_color;
          thumbsHtml += `<span style="${thumbSpan}">${thumbIcon(dnPath, dnFill)}${l4Dislikes}</span>`;
        }
        if (thumbsHtml) l4Parts.push(thumbsHtml);
        const l4Html = l4Parts.join(' \u2009\u2013\u2009 ');
        if (l4Html) {
          const foX = view === "poster" ? 15 : 0;
          const l4Shadow = txtshdw ? `text-shadow:${txtshdw} rgba(0,0,0,0.9);` : '';
          line[4] = line[4].replace('<tspan ', '<tspan data-umc-l4 ');
          l4FOData = { l4Html, foX, l4Shadow, fontSize: size[4], color: line4_color };
        }
      }

      const applyLine4FO = (container) => {
        if (!l4FOData) return;
        requestAnimationFrame(() => {
          const wasHidden = container.style.display === 'none';
          if (wasHidden) { container.style.visibility = 'hidden'; container.style.display = ''; }
          try {
            const svg = container.querySelector('svg[class*="_svg_"]');
            const tspan = svg && svg.querySelector('[data-umc-l4]');
            if (!tspan || !svg) return;
            const bbox = tspan.getBBox();
            if (bbox.height < 1) return;
            const ns = 'http://www.w3.org/2000/svg';
            const fo = document.createElementNS(ns, 'foreignObject');
            fo.setAttribute('x', l4FOData.foX);
            fo.setAttribute('y', bbox.y);
            fo.setAttribute('width', 200 - l4FOData.foX);
            fo.setAttribute('height', bbox.height * 1.5);
            fo.innerHTML = `<body xmlns="http://www.w3.org/1999/xhtml" style="margin:0;padding:0;background:transparent;"><div style="font-size:${l4FOData.fontSize}px;color:${l4FOData.color};${l4FOData.l4Shadow}white-space:nowrap;line-height:1;">${l4FOData.l4Html}</div></body>`;
            svg.appendChild(fo);
            tspan.style.fill = 'transparent';
            tspan.style.textShadow = '0 0 transparent';
          } catch(e) {} finally {
            if (wasHidden) { container.style.display = 'none'; container.style.visibility = ''; }
          }
        });
      };

      let deepLink = item("deep_link");
      // Replace keywords in custom url if configured
      if (this.url) {
        deepLink = this.url.replace(keywords, val => keys[val]);
      }

      // Mouse & touch event listeners
      function addDeepLinkListener(element, link) {
        let startX = 0, startY = 0, moveThresholdPx = 10, longPressThresholdMs = 500;
        let isMoving = false, timer, startTime;
        element.addEventListener('touchstart', function(event) {
            startX = event.touches[0].pageX; startY = event.touches[0].pageY;
            isMoving = false; startTime = Date.now();
            timer = setTimeout(() => { isMoving = true; }, longPressThresholdMs);
        }, { passive: true });
        element.addEventListener('touchmove', function(event) {
            if (isMoving) return;
            const moveX = event.touches[0].pageX, moveY = event.touches[0].pageY;
            if (Math.abs(moveX - startX) > moveThresholdPx || Math.abs(moveY - startY) > moveThresholdPx) {
                isMoving = true; clearTimeout(timer);
            }
        }, { passive: true });
        element.addEventListener('touchend', function() {
            clearTimeout(timer);
            if (!isMoving && (Date.now() - startTime) < longPressThresholdMs) {
                window.open(link, '_blank');
            }
            isMoving = false;
        }, { passive: true });
        element.style.cursor = 'pointer';
        element.addEventListener('click', function() { window.open(link, '_blank'); });
      }

      if (view == "poster") {
        let containerDiv = document.createElement('div');
        if (this.config.enable_tooltips) {
          this.addTooltipHandlers(containerDiv, item("summary"));
        }
        containerDiv.id = 'main';
        containerDiv.className = `${service}_${view}`;
        containerDiv.style.cssText = top;
        let containerDivInnerHTML = `
          <div class="${service}_container_${view}" style="background-image:url('${image}');">
            <img src="${image}"/>
            <ha-icon icon="${icon}" style="${dflag}"></ha-icon>
            <div class="${service}_flag_${view}" style="${dflag}">
              <svg style="${dflag}" preserveAspectRatio="none" viewBox="0 0 100 100">
                <polygon points="100 25,65 0,100 0"></polygon>
              </svg>
            </div>
          </div>
          <svg class='${service}_svg_${view}' viewBox="0 0 200 100">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(20,20,20,1);stop-opacity:1" />
                <stop offset="2%" style="stop-color:${accent};stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="500px" height="23px" fill="${svgshdw}"/>
            <text>
              ${line[0]}
              <tspan dy="1.3em" style="font-size:3px;fill:transparent;text-shadow:0 0 transparent;">.</tspan>
              ${line[1]}${line[2]}${line[3]}${line[4]}
            </text>
          </svg>
        `;
        containerDiv.innerHTML = containerDivInnerHTML;
        let clickableAreaDiv = document.createElement('div');
        clickableAreaDiv.style.position = 'absolute';
        clickableAreaDiv.style.top = '3px';
        clickableAreaDiv.style.right = '3px';
        clickableAreaDiv.style.bottom = '3px';
        clickableAreaDiv.style.left = '3px';
        clickableAreaDiv.style.borderRadius = '3px';
        clickableAreaDiv.style.pointerEvents = 'auto';
        clickableAreaDiv.style.zIndex = '5';
        containerDiv.style.overflow = 'hidden';
        containerDiv.appendChild(clickableAreaDiv);
        if (!this.config.disable_hyperlinks && (deepLink || (this.config.enable_trailers && item("trailer")))) {
          if (this.config.enable_trailers && item("trailer") && !this.url) {
            this.addDeepLinkListener(clickableAreaDiv, deepLink, item("trailer"));
          } else if (deepLink) {
            this.addDeepLinkListener(clickableAreaDiv, deepLink);
          }
          clickableAreaDiv.style.cursor = 'pointer';
        } else {
          clickableAreaDiv.style.cursor = 'default';
        }
        if (count <= this.collapse) {
          this.content.appendChild(containerDiv);
        } else {
          containerDiv.style.display = 'none';
          containerDiv.classList.add('collapsed');
          this.content.appendChild(containerDiv);
        }
        applyLine4FO(containerDiv);
      } else {
        let fanartContainerDiv = document.createElement('div');
        if (this.config.enable_tooltips) {
          this.addTooltipHandlers(fanartContainerDiv, item("summary"));
        }
        fanartContainerDiv.className = `${service}_${view}`;
        fanartContainerDiv.style.cssText = `${top} ${shiftimg}background-image:url('${image}');background-position:100% center;`;
        fanartContainerDiv.style.setProperty('--background-size', '53% auto');
        let img = new Image();
        img.onload = function() {
          let aspectRatio = img.width / img.height;
          if (aspectRatio > 1.78) {
            fanartContainerDiv.classList.add('non-standard-aspect-ratio');
            let heightAdjustmentFactor = (aspectRatio - 1.78) / 2;
            let heightPercentage = 100 - (heightAdjustmentFactor * 100 / 1.78);
            let backgroundSize = `54% ${Math.round(Math.max(heightPercentage, 50))}%`;
            fanartContainerDiv.style.setProperty('--background-size', backgroundSize);
            let gapHeightCalcExpression = `calc((100% - ${Math.round(Math.max(heightPercentage, 50))}%) / 2)`;
            fanartContainerDiv.style.setProperty('--gap-height', gapHeightCalcExpression);
          }
        };
        img.src = image;

        let fanartContainerInnerHTML = `
          <div class="${service}_fan_${view}">
            <ha-icon icon="${icon}" style="${dflag}"></ha-icon>
            <div class="${service}_flag_${view}" style="${dflag}">
              <svg style="${dflag}" preserveAspectRatio="none" viewBox="0 0 100 100">
                <polygon points="100 30,90 0,100 0"></polygon>
              </svg>
                </div>
                <svg class="${service}_svg_${view}"viewBox="0 0 200 100">
                   <text>${line[0]}${line[1]}${line[2]}${line[3]}${line[4]}</text>
                </svg>
            </div>
        `;
        fanartContainerDiv.innerHTML = fanartContainerInnerHTML;
        let clickableAreaDivFanart = document.createElement('div');
        clickableAreaDivFanart.style.position = 'absolute';
        clickableAreaDivFanart.style.top = '3px';
        clickableAreaDivFanart.style.right = '3px';
        clickableAreaDivFanart.style.bottom = '3px';
        clickableAreaDivFanart.style.left = '3px';
        clickableAreaDivFanart.style.pointerEvents = 'auto';
        clickableAreaDivFanart.style.zIndex = '5';
        fanartContainerDiv.style.overflow = 'hidden';
        fanartContainerDiv.appendChild(clickableAreaDivFanart);
        if (!this.config.disable_hyperlinks && (deepLink || (this.config.enable_trailers && item("trailer")))) {
          if (this.config.enable_trailers && item("trailer") && !this.url) {
            this.addDeepLinkListener(clickableAreaDivFanart, deepLink, item("trailer"));
          } else if (deepLink) {
            this.addDeepLinkListener(clickableAreaDivFanart, deepLink);
          }
          clickableAreaDivFanart.style.cursor = 'pointer';
        } else {
          clickableAreaDivFanart.style.cursor = 'default';
        }
        let gapWrapperDiv = document.createElement('div');
        gapWrapperDiv.className = `${service}_gap_wrapper_${view}`;
        this.content.appendChild(gapWrapperDiv);
        gapWrapperDiv.appendChild(fanartContainerDiv);

        if (count <= this.collapse) {
          gapWrapperDiv.appendChild(fanartContainerDiv);
        } else {
          fanartContainerDiv.style.display = 'none';
          fanartContainerDiv.classList.add('collapsed');
          gapWrapperDiv.appendChild(fanartContainerDiv);
        }
        this.content.appendChild(gapWrapperDiv);
        applyLine4FO(fanartContainerDiv);
      }
      if (!this.querySelector(`[id="${this.uniqueId}_style"]`)) this.appendChild(style);
      this.style.cursor = this.url && this.url.trim() !== '' ? 'pointer' : 'default';
      this.removeEventListener('click', this._boundClickListener);
      const hasDeepLinks = json.some(item => item.deep_link);
      if (!hasDeepLinks && this.url && this.url.trim() !== '') {
        this.style.cursor = 'pointer';
        this._boundClickListener = () => window.open(this.url, '_blank');
        this.addEventListener('click', this._boundClickListener);
      } else {
        this.style.cursor = 'default';
      }
    }
    this.content.style.position = 'relative';
    this.content.style.left = '';

    // START: Overflow columns feature
    if (overflowActive) {
      this.content.style.height = Math.max(200, window.innerHeight - 120) + 'px';
      this.content.style.overflowY = 'hidden';
      this._applyOverflow();
    } else {
      this._clearOverflow();
      this.content.style.visibility = '';
    }
    // END: Overflow columns feature

    // START: Expand/Collapse feature
    let hasUnmatchedItems = json.length > (this.collapse + 1);
    if (hasUnmatchedItems && !this.querySelector('.expand-control')) {
      const controlContainer = document.createElement('div');
      controlContainer.classList.add('control-container');
      controlContainer.style.display = 'flex';
      controlContainer.style.flexDirection = 'column';
      controlContainer.style.alignItems = 'flex-end';
      const firstCollapsedEl = this.content.querySelector('.collapsed');
      if (firstCollapsedEl) {
        let insertRef = firstCollapsedEl;
        while (insertRef.parentNode !== this.content) insertRef = insertRef.parentNode;
        this.content.insertBefore(controlContainer, insertRef);
      } else {
        this.content.appendChild(controlContainer);
      }

      if (typeof this.config.collapse === 'string' && this.config.collapse.includes('=')) {
        const [attribute, expectedValue] = this.config.collapse.split('=').map(part => part.trim());
        if (!json.slice(1).some(item => item[attribute] && item[attribute].toString().toLowerCase().includes(expectedValue.toLowerCase()))) {
          if (!controlContainer.querySelector('.placeholder')) {
            let placeholderContainer = document.createElement('div');
            placeholderContainer.classList.add('placeholder-container');
            placeholderContainer.style.position = 'relative';
            placeholderContainer.style.width = '100%';
            placeholderContainer.style.boxSizing = 'border-box';
            placeholderContainer.style.padding = '0 18px 0 0';
            placeholderContainer.style.lineHeight = '20px';
            placeholderContainer.style.textAlign = 'right';
            placeholderContainer.style.marginTop = '21px';
            let placeholder = document.createElement('div');
            placeholder.classList.add('placeholder');
            placeholder.textContent = "No uncollapsed items";
            placeholder.style.color = '#929292';
            placeholder.style.whiteSpace = 'nowrap';
            placeholder.style.overflow = 'hidden';
            placeholder.style.textOverflow = 'ellipsis';
            placeholder.style.display = 'inline-block';
            placeholder.style.maxWidth = '100%';
            placeholderContainer.appendChild(placeholder);
            controlContainer.style.marginTop = '10px';
            controlContainer.insertBefore(placeholderContainer, controlContainer.firstChild);
          }
        }
      }

      const expandControl = document.createElement('div');
      expandControl.classList.add('expand-control');
      expandControl.style = `
        position: relative;
        width: 50px;
        height: 6px;
        z-index: 6;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: visible;
      `;

      const touchShield = document.createElement('div');
      touchShield.classList.add('expand-touch-shield');
      touchShield.style = `
        position: absolute;
        width: 44px;
        height: 44px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        clip-path: circle(50%);
        -webkit-clip-path: circle(50%);
        z-index: 7;
        cursor: pointer;
        background: transparent;
      `;

      const chevronWrapper = document.createElement('div');
      chevronWrapper.style = `
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        pointer-events: none;
      `;
      chevronWrapper.innerHTML = '<div class="rotate-icon" style="opacity: 1; transform: rotate(90deg) scaleX(0.65) scaleY(1.27); transition: transform 0.2s ease-in-out; margin-top: -2px; margin-left: -2px; line-height: 0; display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 7 14" width="6" height="11" style="display:block;"><polyline points="1,1 6,7 1,13" fill="none" stroke="#fff" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';

      expandControl.appendChild(touchShield);
      expandControl.appendChild(chevronWrapper);
      controlContainer.appendChild(expandControl);

      const toggleExpand = () => {
        this.isExpanded = !this.isExpanded;
        const rotateIcon = expandControl.querySelector('.rotate-icon');
        rotateIcon.style.transition = 'transform 0.2s ease-in-out';
        rotateIcon.style.transform = this.isExpanded ? 'rotate(270deg) scaleX(0.65) scaleY(1.27)' : 'rotate(90deg) scaleX(0.65) scaleY(1.27)';
        setTimeout(() => {
          const collapsedItems = this.querySelectorAll('.collapsed');
          collapsedItems.forEach(item => {
            item.style.display = this.isExpanded ? 'block' : 'none';
          });
        }, 60);
      };

      touchShield.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleExpand();
      });
      touchShield.addEventListener('touchstart', (e) => {
        e.stopPropagation();
      });
      touchShield.addEventListener('touchend', (e) => {
        e.stopPropagation();
      });
    }
    // END: Expand/Collapse feature
  }

    // Tooltip feature
    addTooltipHandlers(element, summary) {
      if (!summary) return;
      element.style.webkitTapHighlightColor = 'transparent';
      element.style.webkitUserSelect = 'none';
      element.style.userSelect = 'none';
      let tooltipTimeoutId;
      let tooltip;
      let removalTimeoutId;
      const removeTooltip = () => {
        if (tooltip) {
          const el = tooltip;
          tooltip = null;
          el.style.opacity = '0';
          const fallbackTimer = setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
          }, 600);
          el.addEventListener('transitionend', function() {
            clearTimeout(fallbackTimer);
            if (el.parentNode) el.parentNode.removeChild(el);
          }, { once: true });
        }
      };
      const desiredDistance = 20; // Base distance from the cursor to tooltip
      const calculatePosition = (x, y, rect, windowWidth, windowHeight, isTouch = false, scaleFactor = 1) => {
        const touchMultiplier = 2.5; // 250% increase for touch
        const baseDistance = desiredDistance * scaleFactor;
        const scaledDistance = baseDistance * (isTouch ? touchMultiplier : 1);
        let finalX = x + scaledDistance;
        if (finalX + rect.width > windowWidth) {
          finalX = x - rect.width - scaledDistance;
        }
        let finalY = y - rect.height - scaledDistance;
        if (finalY < 0) {
          finalY = y + scaledDistance;
        }
        if (finalY + rect.height > windowHeight) {
          finalY = windowHeight - rect.height - scaledDistance;
          if (finalY < 0) {
            finalY = 0;
          }
        }
        return { finalX, finalY };
      };
      const showTooltip = (x, y, isTouch = false) => {
        clearTimeout(removalTimeoutId);
        if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);
        tooltipTimeoutId = setTimeout(() => {
          if (tooltip) removeTooltip();
          tooltip = document.createElement('div');
          tooltip.style.position = 'fixed';
          tooltip.style.opacity = '0';
          tooltip.style.transition = 'opacity 0.5s';
          tooltip.style.visibility = 'hidden';
          let elementWidth = element.offsetWidth;
          let elementHeight = element.offsetHeight;
          const isPoster = element.className.includes('_poster');
          const heightRatio = isPoster ? 102 / 178 : 1;
          let adjustedHeight = elementHeight * heightRatio;
          const scaleFactor = Math.sqrt(elementWidth * adjustedHeight) / 200;
          const scaleFactorPadding = 10 * scaleFactor;
          tooltip.style.padding = `${scaleFactorPadding}px`;
          tooltip.style.zIndex = '1000';
          tooltip.style.whiteSpace = 'pre-wrap';
          tooltip.style.background = 'rgba(0, 0, 0, 0.50)';
          tooltip.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.90)';
          tooltip.style.color = 'white';
          tooltip.style.backdropFilter = 'blur(4px)';
          const tooltipText = document.createElement('div');
          tooltipText.textContent = summary;
          tooltip.appendChild(tooltipText);
          tooltip.style.left = `-9999px`;
          tooltip.style.top = `-9999px`;
          document.body.appendChild(tooltip);
          requestAnimationFrame(() => {
            tooltip.style.fontSize = `${14 * scaleFactor}px`;
            tooltip.style.maxWidth = `${300 * scaleFactor}px`;
            tooltip.style.minWidth = `${200 * scaleFactor}px`;
            tooltip.style.borderRadius = `${8 * scaleFactor}px`;
            requestAnimationFrame(() => {
              const rect = tooltip.getBoundingClientRect();
              const windowWidth = window.innerWidth;
              const windowHeight = window.innerHeight;
              let { finalX, finalY } = calculatePosition(x, y, rect, windowWidth, windowHeight, isTouch, scaleFactor);
              tooltip.style.left = `${Math.max(0, Math.min(finalX, windowWidth - rect.width))}px`;
              tooltip.style.top = `${Math.max(0, Math.min(finalY, windowHeight - rect.height))}px`;
              setTimeout(() => {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
              }, 50);
            });
          });
        }, isTouch ? this.config.tooltip_delay : Math.round(this.config.tooltip_delay * 1.5));
      };
      const handleMouseMove = (e) => showTooltip(e.clientX, e.clientY);
      const listeners = {
        mouseenter: (e) => {
          if (listeners._touchActive) return;
          showTooltip(e.clientX, e.clientY);
          element.addEventListener('mousemove', handleMouseMove);
        },
        mouseleave: () => {
          if (listeners._touchActive) return;
          if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);
          removalTimeoutId = setTimeout(removeTooltip, 300);
          element.removeEventListener('mousemove', handleMouseMove);
        },
        touchstart: (e) => {
          listeners._touchActive = true;
          listeners._touchX = e.touches[0].pageX;
          listeners._touchY = e.touches[0].pageY;
          listeners._touchCancelled = false;
          showTooltip(e.touches[0].clientX, e.touches[0].clientY, true);
        },
        touchmove: (e) => {
          if (listeners._touchCancelled) return;
          const dx = e.touches[0].pageX - listeners._touchX;
          const dy = e.touches[0].pageY - listeners._touchY;
          if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            listeners._touchCancelled = true;
            if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);
            removeTooltip();
          }
        },
        touchend: () => {
          setTimeout(() => { listeners._touchActive = false; }, 400);
          if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);
          removalTimeoutId = setTimeout(removeTooltip, 300);
        },
      };
      const cleanup = () => {
        clearTimeout(tooltipTimeoutId);
        clearTimeout(removalTimeoutId);
        if (tooltip) {
          if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
          tooltip = null;
        }
      };
      element.addEventListener('mouseenter', listeners.mouseenter);
      element.addEventListener('mouseleave', listeners.mouseleave);
      element.addEventListener('touchstart', listeners.touchstart, { passive: true });
      element.addEventListener('touchmove', listeners.touchmove, { passive: true });
      element.addEventListener('touchend', listeners.touchend);
      this.tooltipListeners.set(element, { ...listeners, cleanup });
    }

  _applyOverflow() {
    clearTimeout(this._overflowResizeTimer);
    clearTimeout(this._overflowImageTimer);
    if (this._overflowInitRAF) { cancelAnimationFrame(this._overflowInitRAF); this._overflowInitRAF = null; }
    if (this._deferredTrimRAF2) { cancelAnimationFrame(this._deferredTrimRAF2); this._deferredTrimRAF2 = null; }
    if (this._deferredTrimRAF1) { cancelAnimationFrame(this._deferredTrimRAF1); this._deferredTrimRAF1 = null; }

    const gap = 16;
    const haCard = this.querySelector('ha-card');
    if (haCard) haCard.style.overflow = 'visible';

    const recalculate = (fromRecovery) => {
      if (!fromRecovery) {
        this._overflowRecoveryCount = 0;
      }

      this._recalcInProgress = true;

      if (!this._opacityLocked) {
        this._opacityLocked = true;
        this.style.transition = 'none';
        this.style.opacity = '0';
      }

      const unlockAndReveal = () => {
        this._recalcInProgress = false;
        this._opacityLocked = false;
        this.style.opacity = '';
        this.style.transition = '';
        this.content.style.visibility = '';
        if (this._recalcPending) {
          this._recalcPending = false;
          clearTimeout(this._overflowResizeTimer);
          this._overflowResizeTimer = setTimeout(recalculate, 60);
        }
      };

      if (this._deferredTrimRAF2) { cancelAnimationFrame(this._deferredTrimRAF2); this._deferredTrimRAF2 = null; }
      if (this._deferredTrimRAF1) { cancelAnimationFrame(this._deferredTrimRAF1); this._deferredTrimRAF1 = null; }

      this.content.querySelectorAll('.umc-overflow-col').forEach(col => {
        Array.from(col.children).forEach(child => {
          if (child._umcOverflowHidden) {
            child.style.display = '';
            delete child._umcOverflowHidden;
          }
          if (child._umcOriginalMarginTop !== undefined) {
            child.style.marginTop = child._umcOriginalMarginTop;
            delete child._umcOriginalMarginTop;
          }
          const inner = child.firstElementChild;
          if (inner && inner._umcOriginalMarginTop !== undefined) {
            inner.style.marginTop = inner._umcOriginalMarginTop;
            delete inner._umcOriginalMarginTop;
          }
          this.content.insertBefore(child, col);
        });
        col.remove();
      });
      this.content.style.display = '';
      this.content.style.gap = '';
      this.content.style.height = '';
      this.content.style.overflowY = '';
      this.content.style.alignItems = '';
      this.content.style.justifyContent = '';
      if (haCard) {
        haCard.style.maxWidth = '';
        haCard.style.marginLeft = '';
        haCard.style.marginRight = '';
      }

      const items = Array.from(this.content.children);
      if (items.length === 0) { unlockAndReveal(); return 'empty'; }
      const firstH = items[0].offsetHeight;
      if (firstH < 10 || this.offsetWidth < 50) {
        this.content.style.height = Math.max(200, window.innerHeight - 120) + 'px';
        this.content.style.overflowY = 'hidden';
        return 'no-dimensions';
      }

      let visibleBottom = window.innerHeight;
      const _ancestorLog = [];
      let ancestor = this;
      while (ancestor) {
        if (ancestor !== this) {
          try {
            const cs = getComputedStyle(ancestor);
            const oy = cs.overflowY || cs.overflow;
            const aRect = ancestor.getBoundingClientRect();
            const hasOverflowClip = (oy === 'hidden');
            const hasExplicitHeight = (cs.height && cs.height !== 'auto' && cs.height !== '');
            const hasMaxHeight = (cs.maxHeight && cs.maxHeight !== 'none' && cs.maxHeight !== '');
            const gridRows = cs.gridTemplateRows || cs.gridAutoRows;
            const isGridConstrained = gridRows && gridRows !== 'none' && gridRows !== 'auto';
            const isBounded = hasOverflowClip || hasExplicitHeight || hasMaxHeight || isGridConstrained;
            if (isBounded && aRect.bottom < visibleBottom - 1) {
              _ancestorLog.push({
                tag: ancestor.tagName, id: ancestor.id, cls: (ancestor.className || '').toString().slice(0, 40),
                overflow: oy, height: cs.height, maxH: cs.maxHeight, gridRows: gridRows || '', bottom: Math.round(aRect.bottom)
              });
              visibleBottom = Math.min(visibleBottom, aRect.bottom);
            }
          } catch (e) { /* skip inaccessible elements */ }
        }
        if (ancestor.parentElement) {
          ancestor = ancestor.parentElement;
        } else if (ancestor.getRootNode() instanceof ShadowRoot) {
          ancestor = ancestor.getRootNode().host;
        } else {
          break;
        }
      }

      const contentRect = this.content.getBoundingClientRect();
      const contentCS = getComputedStyle(this.content);
      const contentPadTop = parseFloat(contentCS.paddingTop) || 0;
      const contentPadBottom = parseFloat(contentCS.paddingBottom) || 0;
      const bottomSafetyMargin = 8;
      const availableHeight = visibleBottom - contentRect.top - contentPadTop - contentPadBottom - bottomSafetyMargin;

      console.warn('🔲 UMC recalculate:', {
        windowInnerH: window.innerHeight,
        visibleBottom: Math.round(visibleBottom),
        contentTop: Math.round(contentRect.top),
        padTop: contentPadTop, padBot: contentPadBottom,
        availableHeight: Math.round(availableHeight),
        itemCount: items.length,
        ancestors: _ancestorLog
      });
      if (availableHeight < 100) {
        this.content.style.height = Math.max(200, window.innerHeight - 120) + 'px';
        this.content.style.overflowY = 'hidden';
        return 'no-height';
      }

      const containerWidth = this.content.offsetWidth;
      const baseMaxColWidth = this._overflowReducedColWidth
          ? this._overflowReducedColWidth
          : (fromRecovery && this._overflowProvenColWidth)
              ? this._overflowProvenColWidth : 500;
      let maxColWidth = Math.min(containerWidth, baseMaxColWidth);
      const originalMaxColWidth = maxColWidth;
      const isWidthUnconstrained = containerWidth > maxColWidth;

      if (!fromRecovery) {
        const dimsChanged =
            this._overflowProvenAvailH == null
            || Math.abs(availableHeight - this._overflowProvenAvailH) > 10
            || Math.abs(containerWidth - (this._overflowProvenWidth || 0)) > 10
            || Math.abs(maxColWidth - (this._overflowProvenColWidth || maxColWidth)) > 10;
        if (dimsChanged) {
          this._overflowMinCols = 0;
          this._overflowReducedColWidth = null;
          this._overflowProvenCapacity = null;
          this._overflowProvenAvailH = null;
          this._overflowProvenWidth = null;
          this._overflowProvenColWidth = null;
          console.warn('🔲 UMC overflow state RESET (dims changed)');
        } else {
          console.warn('🔲 UMC overflow state PRESERVED (dims stable)', {
            minCols: this._overflowMinCols,
            provenCap: this._overflowProvenCapacity,
            reducedColWidth: this._overflowReducedColWidth
          });
        }
      }

      let itemGap = 0;
      if (items.length > 1) {
        itemGap = items[1].offsetTop - (items[0].offsetTop + items[0].offsetHeight);
      }
      if (itemGap < 0) itemGap = 0;
      if (!isWidthUnconstrained) {
        let totalFlatHeight = 0;
        items.forEach((item, i) => {
          totalFlatHeight += item.offsetHeight + (i > 0 ? itemGap : 0);
        });
        if (totalFlatHeight <= availableHeight) { unlockAndReveal(); return 'fits'; }
      }

      const applyPartition = (partition) => {
        this.content.querySelectorAll('.umc-overflow-col').forEach(col => {
          Array.from(col.children).forEach(child => {
            if (child._umcOverflowHidden) {
              child.style.display = '';
              delete child._umcOverflowHidden;
            }
            if (child._umcOriginalMarginTop !== undefined) {
              child.style.marginTop = child._umcOriginalMarginTop;
              delete child._umcOriginalMarginTop;
            }
            const inner = child.firstElementChild;
            if (inner && inner._umcOriginalMarginTop !== undefined) {
              inner.style.marginTop = inner._umcOriginalMarginTop;
              delete inner._umcOriginalMarginTop;
            }
            this.content.insertBefore(child, col);
          });
          col.remove();
        });

        this.content.style.display = 'flex';
        this.content.style.alignItems = 'flex-start';
        this.content.style.justifyContent = 'center';
        this.content.style.gap = partition.length > 1 ? gap + 'px' : '0px';
        this.content.style.height = availableHeight + 'px';
        this.content.style.overflowY = 'hidden';

        partition.forEach((colIndices, colIndex) => {
          const colDiv = document.createElement('div');
          colDiv.className = 'umc-overflow-col';
          colDiv.style.cssText = 'flex:1 1 0;min-width:0;max-width:' + maxColWidth + 'px;overflow:visible';
          colIndices.forEach((idx, posInCol) => {
            const item = items[idx];
            if (posInCol === 0) {
              item._umcOriginalMarginTop = item.style.marginTop;
              item.style.marginTop = '0px';
              const inner = item.firstElementChild;
              if (inner) {
                inner._umcOriginalMarginTop = inner.style.marginTop;
                inner.style.marginTop = '0px';
              }
            }
            colDiv.appendChild(item);
          });
          this.content.appendChild(colDiv);
        });

        const numCols = partition.length;
        const contentPadX = 20;
        const totalGaps = numCols > 1 ? (numCols - 1) * gap : 0;
        const cardMaxWidth = (numCols * maxColWidth) + totalGaps + contentPadX;
        if (haCard) {
          haCard.style.maxWidth = cardMaxWidth + 'px';
          haCard.style.marginLeft = 'auto';
          haCard.style.marginRight = 'auto';
        }
      };

      const buildPackedPartition = (total, cols, perCol) => {
        const partition = [];
        let idx = 0;
        for (let c = 0; c < cols; c++) {
          const size = (c < cols - 1)
            ? Math.min(perCol, total - idx)
            : total - idx;
          const indices = [];
          for (let i = 0; i < size; i++) indices.push(idx++);
          if (indices.length > 0) partition.push(indices);
        }
        return partition;
      };

      const measureCapacity = (targetCols) => {
        if (targetCols <= 1) {
          applyPartition([items.map((_, i) => i)]);
        } else {
          const measurePartition = [];
          const firstColCount = items.length - (targetCols - 1);
          let idx = 0;
          measurePartition.push(Array.from({length: firstColCount}, () => idx++));
          for (let c = 1; c < targetCols; c++) {
            measurePartition.push([idx++]);
          }
          applyPartition(measurePartition);
        }
        void this.content.offsetHeight;

        const cBCR = this.content.getBoundingClientRect();
        const cPadBot = parseFloat(getComputedStyle(this.content).paddingBottom) || 0;
        const clipBottom = Math.min(cBCR.bottom - cPadBot, window.innerHeight);

        const firstCol = this.content.querySelector('.umc-overflow-col');
        if (!firstCol) return 1;
        const children = Array.from(firstCol.children);
        const safeClip = clipBottom - 2;
        let capacity = 0;
        for (let i = 0; i < children.length; i++) {
          if (children[i].getBoundingClientRect().bottom <= safeClip) {
            capacity++;
          } else break;
        }
        console.warn('🔲 UMC measureCapacity:', {
          targetCols,
          measured: capacity,
          clipBottom: Math.round(clipBottom),
          safeClip: Math.round(safeClip),
          cBCR_bottom: Math.round(cBCR.bottom),
          cPadBot,
          firstItemBot: children.length > 0 ? Math.round(children[0].getBoundingClientRect().bottom) : 'N/A',
          lastFitBot: capacity > 0 ? Math.round(children[capacity - 1].getBoundingClientRect().bottom) : 'N/A',
          firstRejectBot: capacity < children.length ? Math.round(children[capacity].getBoundingClientRect().bottom) : 'all fit'
        });
        const provenCap = this._overflowProvenCapacity;
        const provenStale = !provenCap
          || Math.abs(availableHeight - (this._overflowProvenAvailH || 0)) > 10
          || Math.abs(containerWidth - (this._overflowProvenWidth || 0)) > 10
          || Math.abs(maxColWidth - (this._overflowProvenColWidth || maxColWidth)) > 10;
        if (!provenStale && capacity > provenCap) {
          console.warn('🔲 UMC measureCapacity: capped', capacity, '→', provenCap, '(proven)');
          capacity = provenCap;
        }
        return Math.max(capacity, 1);
      };

      const trimOverflow = (label) => {
        const cBCR = this.content.getBoundingClientRect();
        const cPadBot = parseFloat(getComputedStyle(this.content).paddingBottom) || 0;
        const clipBottom = Math.min(cBCR.bottom - cPadBot, window.innerHeight);
        const tolerantClip = clipBottom + 2;
        const trimLog = [];
        this.content.querySelectorAll('.umc-overflow-col').forEach((col, ci) => {
          const children = Array.from(col.children);
          let hiding = false;
          for (let i = 0; i < children.length; i++) {
            if (children[i]._umcOverflowHidden) continue;
            const itemBot = children[i].getBoundingClientRect().bottom;
            if (hiding || itemBot > tolerantClip) {
              hiding = true;
              trimLog.push({ col: ci, item: i, bottom: Math.round(itemBot), clip: Math.round(clipBottom), tolerantClip: Math.round(tolerantClip) });
              children[i].style.display = 'none';
              children[i]._umcOverflowHidden = true;
            }
          }
        });
        if (trimLog.length > 0) {
          console.warn('🔲 UMC trimOverflow [' + (label || 'sync') + ']:', { clipBottom: Math.round(clipBottom), tolerantClip: Math.round(tolerantClip), cBCR_bottom: Math.round(cBCR.bottom), cPadBot, trimCount: trimLog.length, trimmed: trimLog.map(t => 'c' + t.col + 'i' + t.item + ':bot=' + t.bottom + '>clip=' + t.tolerantClip).join(', ') });
        } else {
          console.warn('🔲 UMC trimOverflow [' + (label || 'sync') + ']: nothing trimmed', { clipBottom: Math.round(clipBottom), tolerantClip: Math.round(tolerantClip), cBCR_bottom: Math.round(cBCR.bottom), cPadBot });
        }
        return trimLog.length;
      };

      const tightenHeight = () => {
        const tCols = this.content.querySelectorAll('.umc-overflow-col');
        if (tCols.length === 0) return;
        let tallestH = 0;
        tCols.forEach(c => {
          const kids = Array.from(c.children).filter(k => !k._umcOverflowHidden);
          if (kids.length === 0) return;
          const last = kids[kids.length - 1];
          const colTop = c.getBoundingClientRect().top;
          const lastBot = last.getBoundingClientRect().bottom;
          tallestH = Math.max(tallestH, lastBot - colTop);
        });
        if (tallestH <= 0) return;
        const physicalMax = visibleBottom - contentRect.top - contentPadTop - contentPadBottom;
        const maxHeight = Math.min(availableHeight + 8, physicalMax);
        const newHeight = Math.min(tallestH, maxHeight);
        if (Math.abs(newHeight - availableHeight) > 0.5) {
          this.content.style.height = newHeight + 'px';
          console.warn('🔲 UMC tightenHeight:', {
            tallestH: Math.round(tallestH),
            availableHeight: Math.round(availableHeight),
            newHeight: Math.round(newHeight),
            action: newHeight < availableHeight ? 'shrunk' : 'expanded'
          });
        }
      };

      const maxPossibleCols = Math.min(items.length, 6, this.config.max_columns || 6);
      const effectiveMinCols = this._overflowMinCols || 0;
      const startCols = Math.max(1, effectiveMinCols);

      const scheduleDeferredTrim = () => {
        let prevColHeight = -1;
        let stableCount = 0;
        let attempts = 0;
        const maxAttempts = 20; // ~320ms at 60fps
        const neededStable = 2;  // require 2 consecutive stable reads
        const pollUntilStable = () => {
          this._deferredTrimRAF1 = requestAnimationFrame(() => {
            this._deferredTrimRAF1 = null;
            this._deferredTrimRAF2 = requestAnimationFrame(() => {
              this._deferredTrimRAF2 = null;
              attempts++;
              const firstCol = this.content.querySelector('.umc-overflow-col');
              const curHeight = firstCol ? firstCol.scrollHeight : 0;
              if (curHeight === prevColHeight) {
                stableCount++;
              } else {
                stableCount = 0;
                prevColHeight = curHeight;
              }
              trimOverflow('deferred-rAF-' + attempts);
              if (stableCount < neededStable && attempts < maxAttempts) {
                pollUntilStable();
                return;
              }
              const cols = this.content.querySelectorAll('.umc-overflow-col');
              let maxVisible = 0;
              let totalHiddenDeferred = 0;
              const colInfo = Array.from(cols).map((c, i) => {
                const kids = Array.from(c.children);
                const visible = kids.filter(k => !k._umcOverflowHidden);
                const lastVis = visible.length > 0 ? visible[visible.length - 1] : null;
                if (visible.length > maxVisible) maxVisible = visible.length;
                totalHiddenDeferred += kids.filter(k => k._umcOverflowHidden).length;
                return { col: i, total: kids.length, visible: visible.length,
                  lastVisBot: lastVis ? Math.round(lastVis.getBoundingClientRect().bottom) : 'none' };
              });
              if (maxVisible > 0) {
                this._overflowProvenCapacity = maxVisible;
                this._overflowProvenAvailH = availableHeight;
                this._overflowProvenWidth = containerWidth;
                this._overflowProvenColWidth = maxColWidth;
              }
              console.warn('🔲 UMC POST-PAINT state:', { cols: colInfo, provenCap: this._overflowProvenCapacity, stableAfter: attempts, contentHeight: this.content.style.height });

              if (totalHiddenDeferred > 0
                  && this._overflowRecoveryCount < maxPossibleCols + 5) {
                this._overflowRecoveryCount++;

                const currentColCount = cols.length;
                const neededPerCol = Math.ceil(items.length / currentColCount);

                const minNarrowWidth = 250;
                if (maxVisible > 0 && maxVisible < neededPerCol
                    && totalHiddenDeferred <= 3) {
                  const firstCol = this.content.querySelector('.umc-overflow-col');
                  const actualColWidth = firstCol ? firstCol.offsetWidth : maxColWidth;
                  const heightRatio = maxVisible / neededPerCol;
                  const targetColWidth = Math.round(actualColWidth * heightRatio * 0.95);

                  if (targetColWidth >= minNarrowWidth
                      && targetColWidth < actualColWidth - 10) {
                    this._overflowReducedColWidth = targetColWidth;
                    this._overflowProvenCapacity = null;
                    console.warn('🔲 UMC RECOVERY: trying narrower columns before escalating', {
                      attempt: this._overflowRecoveryCount,
                      currentCols: currentColCount,
                      actualColWidth,
                      targetColWidth,
                      maxVisible,
                      neededPerCol,
                      hidden: totalHiddenDeferred
                    });
                    recalculate(true);
                    return;
                  }
                }

                this._overflowReducedColWidth = null;
                if (!this._overflowMinCols || currentColCount >= this._overflowMinCols) {
                  this._overflowMinCols = currentColCount + 1;
                }
                this._overflowProvenCapacity = null;
                console.warn('🔲 UMC RECOVERY: items hidden after paint, need more columns', {
                  attempt: this._overflowRecoveryCount,
                  nextMinCols: this._overflowMinCols,
                  hidden: totalHiddenDeferred,
                  totalItems: items.length
                });
                recalculate(true);
                return;
              }

              tightenHeight();
              unlockAndReveal();
            });
          });
        };
        pollUntilStable();
      };

      for (let targetCols = startCols; targetCols <= maxPossibleCols; targetCols++) {
        const perCol = Math.ceil(items.length / targetCols);

        const capacity = measureCapacity(targetCols);
        if (capacity < perCol) {
          console.warn('🔲 UMC pre-check SKIP:', { targetCols, perCol, capacity });
          continue;
        }

        const packed = buildPackedPartition(items.length, targetCols, perCol);
        applyPartition(packed);
        void this.content.offsetHeight;

        const syncTrimmed = trimOverflow('sync');

        if (syncTrimmed > 0) {
          console.warn('🔲 UMC sync verify REJECTED:', { targetCols, perCol, trimmed: syncTrimmed, items: items.length, capacity });
          continue;
        }

        const cols = this.content.querySelectorAll('.umc-overflow-col');
        const colInfo = Array.from(cols).map((c, i) => {
          const kids = Array.from(c.children);
          const visible = kids.filter(k => !k._umcOverflowHidden);
          const lastVis = visible.length > 0 ? visible[visible.length - 1] : null;
          return { col: i, total: kids.length, visible: visible.length,
            lastVisBot: lastVis ? Math.round(lastVis.getBoundingClientRect().bottom) : 'none' };
        });
        console.warn('🔲 UMC FINAL layout [sync]:', { cols: colInfo, maxColWidth, contentHeight: this.content.style.height });

        scheduleDeferredTrim();
        this._overflowPending = false;
        return 'applied';
      }

      const minColWidth = 300;
      if (isWidthUnconstrained && originalMaxColWidth > minColWidth) {
        for (let targetCols = startCols; targetCols <= maxPossibleCols; targetCols++) {
          const perCol = Math.ceil(items.length / targetCols);
          for (let tryWidth = originalMaxColWidth - 50; tryWidth >= minColWidth; tryWidth -= 50) {
            maxColWidth = tryWidth;
            const capacity = measureCapacity(targetCols);
            if (capacity < perCol) {
              console.warn('🔲 UMC width-reduce pre-check SKIP:', { targetCols, maxColWidth, perCol, capacity });
              continue;
            }
            const packed = buildPackedPartition(items.length, targetCols, perCol);
            applyPartition(packed);
            void this.content.offsetHeight;
            const syncTrimmed = trimOverflow('sync-narrowed');

            if (syncTrimmed > 0) {
              console.warn('🔲 UMC sync verify REJECTED [narrowed]:', { targetCols, maxColWidth, perCol, trimmed: syncTrimmed, items: items.length });
              continue;
            }

            const cols = this.content.querySelectorAll('.umc-overflow-col');
            const colInfo = Array.from(cols).map((c, i) => {
              const kids = Array.from(c.children);
              const visible = kids.filter(k => !k._umcOverflowHidden);
              const lastVis = visible.length > 0 ? visible[visible.length - 1] : null;
              return { col: i, total: kids.length, visible: visible.length,
                lastVisBot: lastVis ? Math.round(lastVis.getBoundingClientRect().bottom) : 'none' };
            });
            console.warn('🔲 UMC FINAL layout [sync-narrowed]:', { cols: colInfo, maxColWidth, contentHeight: this.content.style.height });
            scheduleDeferredTrim();
            this._overflowPending = false;
            return 'applied';
          }
        }
        maxColWidth = originalMaxColWidth;
      }

      const finalPerCol = Math.ceil(items.length / maxPossibleCols);
      const finalPacked = buildPackedPartition(items.length, maxPossibleCols, finalPerCol);
      applyPartition(finalPacked);
      void this.content.offsetHeight;
      trimOverflow('sync-fallback');
      const fallbackCols = this.content.querySelectorAll('.umc-overflow-col');
      let fallbackVisible = 0;
      fallbackCols.forEach(c => {
        fallbackVisible += Array.from(c.children).filter(k => !k._umcOverflowHidden).length;
      });
      console.warn('🔲 UMC FALLBACK layout:', { cols: fallbackCols.length, visible: fallbackVisible, total: items.length, maxColWidth });
      scheduleDeferredTrim();
      this._overflowPending = false;
      return 'applied';
    };

    let attempts = 0;
    const tryRecalculate = () => {
      this._overflowInitRAF = null;
      attempts++;
      const result = recalculate();
      if ((result === 'no-dimensions' || result === 'no-height') && attempts < 300) {
        this._overflowInitRAF = requestAnimationFrame(tryRecalculate);
      } else if (result === 'no-dimensions' || result === 'no-height') {
        this._overflowPending = true;
        this._recalcInProgress = false;
        this._opacityLocked = false;
        this.style.opacity = '';
        this.style.transition = '';
        this.content.style.visibility = '';
      }
    };
    this._overflowInitRAF = requestAnimationFrame(() => {
      this._overflowInitRAF = requestAnimationFrame(tryRecalculate);
    });

    const unloaded = Array.from(this.content.querySelectorAll('img')).filter(img => !img.complete);
    if (unloaded.length > 0) {
      let pending = unloaded.length;
      let done = false;
      const onReady = () => {
        if (done) return;
        if (--pending <= 0) {
          done = true;
          if (this._recalcInProgress) { this._recalcPending = true; return; }
          recalculate();
        }
      };
      unloaded.forEach(img => {
        img.addEventListener('load', onReady, { once: true });
        img.addEventListener('error', onReady, { once: true });
      });
      this._overflowImageTimer = setTimeout(() => {
        if (!done) {
          done = true;
          if (this._recalcInProgress) { this._recalcPending = true; return; }
          recalculate();
        }
      }, 3000);
    }

    if (this._overflowResizeHandler) window.removeEventListener('resize', this._overflowResizeHandler);
    this._overflowResizeHandler = () => {
      if (this._recalcInProgress) { this._recalcPending = true; return; }
      clearTimeout(this._overflowResizeTimer);
      this._overflowResizeTimer = setTimeout(recalculate, 60);
    };
    window.addEventListener('resize', this._overflowResizeHandler);

    if (this._overflowObserver) this._overflowObserver.disconnect();
    this._overflowLastWidth = null;
    this._overflowLastObsHeight = null;
    this._overflowObserver = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const h = entries[0].contentRect.height;
      const widthChanged = this._overflowLastWidth !== null && this._overflowLastWidth !== w;
      const heightChanged = this._overflowLastObsHeight !== null && Math.abs(this._overflowLastObsHeight - h) > 10;
      this._overflowLastWidth = w;
      this._overflowLastObsHeight = h;
      if (!widthChanged && !heightChanged) return;
      if (this._recalcInProgress) { this._recalcPending = true; return; }
      clearTimeout(this._overflowResizeTimer);
      this._overflowResizeTimer = setTimeout(recalculate, 60);
    });
    this._overflowObserver.observe(this);

    // Detect card becoming visible after section visibility toggle (GitHub #117)
    if (this._overflowIntersectionObs) this._overflowIntersectionObs.disconnect();
    this._overflowIntersectionObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && this._overflowPending) {
        if (this._recalcInProgress) { this._recalcPending = true; return; }
        clearTimeout(this._overflowResizeTimer);
        this._overflowResizeTimer = setTimeout(recalculate, 100);
      }
    }, { threshold: 0.01 });
    this._overflowIntersectionObs.observe(this);
  }

  _clearOverflow() {
    clearTimeout(this._overflowResizeTimer);
    clearTimeout(this._overflowImageTimer);
    if (this._overflowInitRAF) { cancelAnimationFrame(this._overflowInitRAF); this._overflowInitRAF = null; }
    if (this._deferredTrimRAF2) { cancelAnimationFrame(this._deferredTrimRAF2); this._deferredTrimRAF2 = null; }
    if (this._deferredTrimRAF1) { cancelAnimationFrame(this._deferredTrimRAF1); this._deferredTrimRAF1 = null; }
    this._overflowProvenCapacity = null;
    this._overflowProvenAvailH = null;
    this._overflowProvenWidth = null;
    this._overflowProvenColWidth = null;
    this._overflowRecoveryCount = 0;
    this._overflowMinCols = 0;
    this._overflowReducedColWidth = null;
    this._recalcInProgress = false;
    this._recalcPending = false;
    this._opacityLocked = false;
    this._overflowPending = false;
    this.style.opacity = '';
    this.style.transition = '';
    const haCard = this.querySelector('ha-card');
    if (haCard) haCard.style.overflow = '';
    if (haCard) {
      haCard.style.maxWidth = '';
      haCard.style.marginLeft = '';
      haCard.style.marginRight = '';
    }
    this.content.style.display = '';
    this.content.style.gap = '';
    this.content.style.height = '';
    this.content.style.overflowY = '';
    this.content.style.alignItems = '';
    this.content.style.justifyContent = '';
    if (this._overflowObserver) {
      this._overflowObserver.disconnect();
      this._overflowObserver = null;
    }
    if (this._overflowResizeHandler) {
      window.removeEventListener('resize', this._overflowResizeHandler);
      this._overflowResizeHandler = null;
    }
    if (this._overflowIntersectionObs) {
      this._overflowIntersectionObs.disconnect();
      this._overflowIntersectionObs = null;
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Define entity.");
    }
    this.config = {...config};
    this.url = config.url;
    this.collapse = config.collapse || Infinity;
    this.config.enable_tooltips = config.enable_tooltips !== undefined ? config.enable_tooltips : false;
    this.config.tooltip_delay = (config.tooltip_delay !== undefined && config.tooltip_delay !== null) ? Math.max(150, config.tooltip_delay) : 500;
    this.config.enable_trailers = config.enable_trailers !== undefined ? config.enable_trailers : true;
    this.config.disable_hyperlinks = config.disable_hyperlinks !== undefined ? config.disable_hyperlinks : false;
    this.config.corner_radius = config.corner_radius !== undefined ? config.corner_radius : 12;
    this.config.overflow = config.overflow !== undefined ? config.overflow : false;
    const _mc = config.max_columns !== undefined ? parseInt(config.max_columns, 10) : NaN;
    this.config.max_columns = !isNaN(_mc) ? Math.max(0, Math.min(6, _mc)) : undefined;
  }

  getCardSize() {
    let view = this.config.image_style || "poster";
    return view == "poster" ? this.cardSize * 5 : this.cardSize * 3;
  }

  getGridOptions() {
    const overflowActive = this.config && this.config.overflow;
    if (overflowActive) {
      return {
        columns: "full",
        rows: "auto",
        min_columns: 6,
        min_rows: 3
      };
    }
    const view = this.config.image_style || "poster";
    const itemCount = this.cardSize || 5;
    const itemHeight = view === "poster" ? 180 : 100;
    const estimatedHeight = itemCount * itemHeight;
    const rowUnit = 64;
    const estimatedRows = Math.max(2, Math.ceil(estimatedHeight / rowUnit));
    return {
      columns: 12,
      min_columns: 6,
      rows: estimatedRows,
      min_rows: 2
    };
  }

  static getStubConfig(hass) {
    const sensors = Object.keys(hass.states)
      .filter(e => e.startsWith('sensor.') && hass.states[e].attributes && hass.states[e].attributes.data);
    const exists = (e) => hass.states[e] && hass.states[e].attributes && hass.states[e].attributes.data;
    const preferredFanart = [
      'sensor.plex_recently_added',
      'sensor.sonarr_upcoming_media',
      'sensor.radarr_upcoming_media',
      'sensor.youtube_recently_added'
    ].find(exists);
    const hasFanart = preferredFanart || sensors.find(e => {
      if (e.includes('_shorts')) return false;
      try {
        const d = hass.states[e].attributes.data;
        const items = typeof d === 'object' ? d : JSON.parse(d);
        return Array.isArray(items) && items.length > 1 && items[1] && items[1].fanart;
      } catch (_) { return false; }
    });
    const defaultEntity = hasFanart
      || sensors[0]
      || Object.keys(hass.states).find(e => e.startsWith('sensor.'))
      || "sensor.example";
    return {
      entity: defaultEntity,
      image_style: "fanart"
    };
  }

  static getConfigElement() {
    return document.createElement("upcoming-media-card-editor");
  }
}
if (customElements.get("upcoming-media-card")) console.warn("upcoming-media-card already defined; skipping duplicate registration"); else customElements.define("upcoming-media-card", UpcomingMediaCard);

// Configure the preview in the Lovelace card picker
window.customCards = window.customCards || [];
if (!window.customCards.some(card => card.type === 'upcoming-media-card')) {
  window.customCards.push({
    type: 'upcoming-media-card',
    name: 'Upcoming Media Card',
    preview: true,
    description: 'The Upcoming Media card displays upcoming episodes and movies from services like: Plex, Kodi, Radarr, Sonarr, and Trakt.',
    previewImage: 'https://github.com/custom-cards/upcoming-media-card/blob/master/image.png?raw=true',
  });
}
