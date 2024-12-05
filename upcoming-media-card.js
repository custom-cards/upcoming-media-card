class UpcomingMediaCard extends HTMLElement {
  constructor() {
    super();
    this.uniqueId = 'umc-' + Math.random().toString(36).substr(2, 9);
    this.adjustZIndex = this.adjustZIndex.bind(this);
    this._boundClickListener;
    this.deepLinkListeners = new Map();
    this.tooltipListeners = new Map();
  }
  connectedCallback() {
    this.adjustZIndex();
    window.addEventListener('scroll', this.adjustZIndex);
  }
  disconnectedCallback() {
    window.removeEventListener('scroll', this.adjustZIndex);
    this.cleanupDeepLinkListeners();
  }
  cleanupDeepLinkListeners() {
    this.deepLinkListeners.forEach((listener, element) => {
      element.removeEventListener('click', listener);
    });
    this.deepLinkListeners.clear();
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
      iframeContainer.style.height = '90%';
      iframeContainer.style.maxWidth = '1600px';
      iframeContainer.style.maxHeight = '900px';
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
      closeButton.innerHTML = '&times;';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '-40px';
      closeButton.style.right = '5px';
      closeButton.style.zIndex = '10000';
      closeButton.style.width = '40px';
      closeButton.style.height = '40px';
      closeButton.style.fontSize = '32px';
      closeButton.style.fontWeight = 'bold';
      closeButton.style.cursor = 'pointer';
      closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      closeButton.style.color = 'white';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '50%';
      closeButton.style.display = 'flex';
      closeButton.style.justifyContent = 'center';
      closeButton.style.alignItems = 'center';
      closeButton.style.padding = '0';
      closeButton.style.lineHeight = '1';
      closeButton.style.transition = 'background-color 0.3s ease';
      closeButton.onmouseenter = () => {
        closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Close';
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
        closeButton.appendChild(tooltip);
      };
      closeButton.onmouseleave = () => {
        closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        const tooltip = closeButton.querySelector('div');
        if (tooltip) closeButton.removeChild(tooltip);
      };
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&fs=1&modestbranding=1&enablejsapi=1`;
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
    let touchStartTime;
    const touchThreshold = 500;
    let touchTimer;
    let preventClick = false;
    const handleTouchStart = () => {
      touchStartTime = new Date().getTime();
      preventClick = false;
      touchTimer = setTimeout(() => {
        preventClick = true;
      }, touchThreshold);
    };
    const handleTouchEnd = (event) => {
      clearTimeout(touchTimer);
      const touchEndTime = new Date().getTime();
      const touchDuration = touchEndTime - touchStartTime;
      if (touchDuration < touchThreshold && !preventClick) {
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
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    this.deepLinkListeners.set(element, {
      click: handleClick,
      touchstart: handleTouchStart,
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
      element.removeEventListener('touchend', listeners.touchend);
      this.deepLinkListeners.delete(element);
    }
  }
  // Ensure HA's toolbar takes precedence over UMC's clickable elements if overlapped
  adjustZIndex() {
    clearTimeout(this.adjustZIndexTimer);
    this.adjustZIndexTimer = setTimeout(() => {
      const toolbar = document.querySelector('app-toolbar') || document.querySelector('.toolbar');
      const cardTop = this.getBoundingClientRect().top;
      const toolbarBottom = toolbar ? toolbar.getBoundingClientRect().bottom : 0;
      this.style.zIndex = cardTop < toolbarBottom ? '1' : '';
    }, 50);
  }

  set hass(hass) {
    this.classList.add(this.uniqueId);
    if (!this.content) {
      const card = document.createElement("ha-card");
      card.header = this.config.title;
      this.content = document.createElement("div");
      this.content.style.padding = "5px 10px";
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
    if (conditionalCollapse) {
        collapseProcessed = true; // Set flag to true if collapse condition is found
        const attr = conditionalCollapse[1];
        const value = conditionalCollapse[2].toLowerCase();
        let filteredItems = json.slice(1).filter(item => String(item[attr]).toLowerCase().includes(value));
        let unmatchedItems = json.slice(1).filter(item => !String(item[attr]).toLowerCase().includes(value));
        json = [json[0], ...filteredItems, ...unmatchedItems];
        this.collapse = filteredItems.length;
    } else if (typeof this.config.collapse === 'number') {
        collapseProcessed = true; // Set flag to true if collapse is a number
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
    const max = Math.min(json.length - 1, this.config.max || 5);
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
          }
          .${this.uniqueId} .${service}_${view} ha-icon {
            top: -2px;
            right: 3px;
            z-index: 2;
            width: 17%;
            height: 17%;
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
            outline: 5px solid #fff;
            width:30%;
            outline:5px solid ${border};
            box-shadow:${boxshdw} rgba(0,0,0,.8);
            float:left;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            margin:5px 0 15px 5px;
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
          }
          .${this.uniqueId} .${service}_${view} ha-icon {
            top: 5px;
            margin-right: -19px;
            right:0;
            z-index: 2;
            width: 15%;
            height: 15%;
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
      this.appendChild(style);
    }
    this.content.innerHTML = "";

    // Truncate text...
    function truncate(text, chars) {

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
            return `${text.substring(0, i)}...`;
          }
        }
        // The cycle above had a really big single word, so we return it anyway
        return `${text.substring(0, chars)}...`;
      } else {
        return text;
      }
    }

    function format_date(input_date, format = "mm/dd/yy") {
      let fd_day, fd_month, fd_year;
      if (String(input_date).match(/[T]\d+[:]\d+[:]\d+[Z]/)) {
        fd_day = new Date(input_date).toLocaleDateString([], { day: "2-digit" });
        fd_month = new Date(input_date).toLocaleDateString([], { month: "2-digit" });
        fd_year = new Date(input_date).toLocaleDateString([], { year: "2-digit" });
      } else if (String(input_date).match(/\d+[-]\d+[-]\d+/)) {
        input_date = input_date.split("-");
        fd_month = input_date[1];
        fd_day = input_date[2];
        fd_year = input_date[0].slice(-2);
      } else {
        return "";
      }
      const formatMap = { dd: fd_day, mm: fd_month, yy: fd_year };
      return format.replace(/dd|mm|yy/g, matched => formatMap[matched]).replace(/(\d{2})(?=\d)/g, '$1/');
    }

    // Hide card while we prepare to display the content
    this.content.style.visibility = 'hidden';
    this.content.style.position = 'absolute';
    this.content.style.left = '-9999px';

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
      let keywords = /\$title|\$episode|\$genres|\$number|\$rating|\$release|\$runtime|\$studio|\$price|\$day|\$date|\$time|\$aired|\$album|\$artist|\$channel|\$views|\$likes|\$live_status|\$empty/g;
      const format = this.config.date || "mm/dd/yy";
      const releaseFormat = this.config.date || "mm/dd/yy";
      let keys = {
        $title: item("title") || null,
        $episode: item("episode") || null,
        $genres: item("genres") || null,
        $number: item("number") || null,
        $rating: item("rating") || null,
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
        $live_status: item("live_status") || null,
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
          svgshift = i == 0 ? `x="0" dy="1em" ` : `x="0" dy="1.3em" `;
        else
          svgshift =
            i == 0 ? `x="15" y="${y}" dy="1.3em" ` : `x="15" dy="1.3em" `;

        // Build lines HTML or empty line
        line[i] = line[i].match("empty")
          ? `<tspan class="${service}_line${i}_${view}" style="fill:transparent;text-shadow:0 0 transparent;" ${svgshift}>.</tspan>`
          : `<tspan class="${service}_line${i}_${view}" ${svgshift}>${truncate(
              text,
              char[i]
            )}</tspan>`;
      }
      let deepLink = item("deep_link");

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
        // Prevent clicking poster border
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
        if (!this.config.disable_hyperlinks && (this.url || deepLink || (this.config.enable_trailers && item("trailer")))) {
          if (this.config.enable_trailers && item("trailer")) {
            this.addDeepLinkListener(clickableAreaDiv, deepLink || this.url, item("trailer"));
          } else if (this.url) {
            this.addDeepLinkListener(clickableAreaDiv, this.url);
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
      } else {
        let fanartContainerDiv = document.createElement('div');
        if (this.config.enable_tooltips) {
          this.addTooltipHandlers(fanartContainerDiv, item("summary"));
        }
        fanartContainerDiv.className = `${service}_${view}`;
        fanartContainerDiv.style.cssText = `${top} ${shiftimg}background-image:url('${image}');background-position:100% center;`;
        // Code to handle non-standard aspect ratio fanart backgrounds
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
        let fanartDeepLink = item("deep_link");
        let clickableAreaDivFanart = document.createElement('div');
        // Prevent clicking fanart border
        clickableAreaDivFanart.style.position = 'absolute';
        clickableAreaDivFanart.style.top = '3px';
        clickableAreaDivFanart.style.right = '3px';
        clickableAreaDivFanart.style.bottom = '3px';
        clickableAreaDivFanart.style.left = '3px';
        clickableAreaDivFanart.style.pointerEvents = 'auto';
        clickableAreaDivFanart.style.zIndex = '5';
        fanartContainerDiv.style.overflow = 'hidden';
        fanartContainerDiv.appendChild(clickableAreaDivFanart);
        if (!this.config.disable_hyperlinks && (this.url || fanartDeepLink || (this.config.enable_trailers && item("trailer")))) {
          if (this.config.enable_trailers && item("trailer")) {
            this.addDeepLinkListener(clickableAreaDivFanart, fanartDeepLink || this.url, item("trailer"));
          } else if (this.url) {
            this.addDeepLinkListener(clickableAreaDivFanart, this.url);
          } else if (fanartDeepLink) {
            this.addDeepLinkListener(clickableAreaDivFanart, fanartDeepLink);
          }
          clickableAreaDivFanart.style.cursor = 'pointer';
        } else {
          clickableAreaDivFanart.style.cursor = 'default';
        }
        // Gap-fill for fanart backgrounds with >1.78 aspect ratio
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
    // Display card after content is ready
    this.content.style.visibility = '';
    this.content.style.position = '';
    this.content.style.left = '';

    // START: Expand/Collapse feature
    let hasUnmatchedItems = json.length > (this.collapse + 1);
    if (hasUnmatchedItems && !this.querySelector('.expand-control')) {
      // Create a container div for the placeholder and expand control
      const controlContainer = document.createElement('div');
      controlContainer.classList.add('control-container');
      controlContainer.style.position = 'absolute';
      controlContainer.style.top = '0';
      controlContainer.style.right = '0';
      controlContainer.style.display = 'flex';
      controlContainer.style.flexDirection = 'column';
      controlContainer.style.alignItems = 'flex-end';
      this.content.appendChild(controlContainer);

      // Check if there are items that are not collapsed; if none, display the placeholder.
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
            placeholderContainer.style.marginTop = '21px'; // Adjust this value to change the vertical position of the placeholder
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
            const topOffsetPixels = 10;
            function adjust() {
              controlContainer.style.top = `${topOffsetPixels}px`;
              controlContainer.style.height = '20px';
            }
            adjust();
            window.addEventListener('resize', adjust);
            controlContainer.insertBefore(placeholderContainer, controlContainer.firstChild);
          }
        } else {
          controlContainer.style.height = 'auto';
        }
      }

      const setExpandControlContainerHeight = () => {
        if (controlContainer.querySelector('.expand-control')) {
          controlContainer.style.height = '50px';
        }
      };

      setExpandControlContainerHeight();
      window.addEventListener('resize', setExpandControlContainerHeight);

      const expandControl = document.createElement('div');
      expandControl.classList.add('expand-control');
      expandControl.style = `
        width: 50px;
        height: 50px;
        cursor: pointer;
        z-index: 6;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      `;
      const setExpandControlPosition = () => {
        let verticalOffset = 56;
        if (!this.content.children[this.collapse - 1]) {
          let placeholderExists = controlContainer.querySelector('.placeholder');
          expandControl.style.position = 'absolute';
          if (placeholderExists) {
            expandControl.style.top = '41px';
          }
          expandControl.style.right = '1px';
        } else {
          let targetItem = this.content.children[this.collapse - 1];
          let containerRect = this.content.getBoundingClientRect();
          let targetRect = targetItem.getBoundingClientRect();
          expandControl.style.position = 'absolute';
          expandControl.style.top = `${targetRect.bottom - containerRect.top + verticalOffset}px`;
          expandControl.style.right = '1px';
        }
      };
      setTimeout(setExpandControlPosition, 0);
      expandControl.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
          <div class="rotate-icon" style="opacity: 1; transform: rotate(90deg); transition: transform 0.2s ease-in-out;">⟩</div>
        </div>`;

      controlContainer.appendChild(expandControl);

      expandControl.addEventListener('click', () => {
        this.isExpanded = !this.isExpanded;
        const rotateIcon = expandControl.querySelector('.rotate-icon');
        rotateIcon.style.transition = 'transform 0.2s ease-in-out';
        rotateIcon.style.transform = this.isExpanded ? 'rotate(270deg)' : 'rotate(90deg)';
        setTimeout(() => {
          const collapsedItems = this.querySelectorAll('.collapsed');
          collapsedItems.forEach(item => {
            item.style.display = this.isExpanded ? 'block' : 'none';
          });
        }, 60);
      });
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      this.resizeObserver = new ResizeObserver(() => {
        setExpandControlPosition();
      });
      this.resizeObserver.observe(this);
    }
    // END: Expand/Collapse feature
    this.adjustZIndex();
  }

    // Tooltip feature
    addTooltipHandlers(element, summary) {
      if (!summary) return;
      let tooltipTimeoutId;
      let tooltip;
      let removalTimeoutId;
      const removeTooltip = () => {
        if (tooltip) {
          tooltip.style.opacity = '0';
          tooltip.addEventListener('transitionend', function() {
            if (tooltip) {
              document.body.removeChild(tooltip);
              tooltip = null;
            }
          }, { once: true });
        }
      };
      const desiredDistance = 20; // Base distance from the cursor to tooltip
      const calculatePosition = (x, y, rect, windowWidth, windowHeight, isTouch = false, scaleFactor = 1) => {
        const touchMultiplier = 2.5; // 250% increase for touch
        const baseDistance = desiredDistance * scaleFactor; // Apply scaleFactor to base distance
        const scaledDistance = baseDistance * (isTouch ? touchMultiplier : 1); // Apply touchMultiplier
        let finalX = x + scaledDistance; // Assume right position initially
        if (finalX + rect.width > windowWidth) { // Adjust for left position if overflow
          finalX = x - rect.width - scaledDistance;
        }
        let finalY = y - rect.height - scaledDistance; // Assume top position initially
        if (finalY < 0) { // Adjust below if overflow above
          finalY = y + scaledDistance;
        }
        if (finalY + rect.height > windowHeight) { // Adjust above position if overflow below
          finalY = windowHeight - rect.height - scaledDistance;
          if (finalY < 0) { // Adjust above position if still overflow below
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
          tooltip.style.visibility = 'hidden'; // Hide tooltip during positioning calculations
          let elementWidth = element.offsetWidth;
          let elementHeight = element.offsetHeight;
          const isPoster = element.className.includes('_poster');
          const heightRatio = isPoster ? 102 / 178 : 1;
          let adjustedHeight = elementHeight * heightRatio;
          const scaleFactor = Math.sqrt(elementWidth * adjustedHeight) / 200;
          const scaleFactorPadding = 10 * scaleFactor; // Correctly apply scaleFactor to padding
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
          tooltip.style.left = `-9999px`; // Initially offscreen
          tooltip.style.top = `-9999px`;
          document.body.appendChild(tooltip);
          requestAnimationFrame(() => {
            tooltip.style.fontSize = `${14 * scaleFactor}px`; // Apply scaleFactor
            tooltip.style.maxWidth = `${300 * scaleFactor}px`;
            tooltip.style.minWidth = `${200 * scaleFactor}px`;
            tooltip.style.borderRadius = `${8 * scaleFactor}px`;
            requestAnimationFrame(() => {
              const rect = tooltip.getBoundingClientRect();
              const windowWidth = window.innerWidth;
              const windowHeight = window.innerHeight;
              let { finalX, finalY } = calculatePosition(x, y, rect, windowWidth, windowHeight, isTouch, scaleFactor);
              // Apply calculated positions
              tooltip.style.left = `${Math.max(0, Math.min(finalX, windowWidth - rect.width))}px`;
              tooltip.style.top = `${Math.max(0, Math.min(finalY, windowHeight - rect.height))}px`;
              setTimeout(() => {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1'; // Make tooltip visible after positioning calculations
              }, 50);
            });
          });
        }, this.config.tooltip_delay);
      };
      // Define a function to handle mouse move events
      const handleMouseMove = (e) => showTooltip(e.clientX, e.clientY);
      const listeners = {
        mouseenter: (e) => {
          showTooltip(e.clientX, e.clientY);
          element.addEventListener('mousemove', handleMouseMove);
        },
        mouseleave: () => {
          if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);
          removalTimeoutId = setTimeout(removeTooltip, 300);
          element.removeEventListener('mousemove', handleMouseMove);
        },
        touchstart: (e) => {
          e.preventDefault();
          showTooltip(e.touches[0].clientX, e.touches[0].clientY, true);
        },
        touchend: () => {
          if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);
          removalTimeoutId = setTimeout(removeTooltip, 300);
        },
      };
      element.addEventListener('mouseenter', listeners.mouseenter);
      element.addEventListener('mouseleave', listeners.mouseleave);
      element.addEventListener('touchstart', listeners.touchstart);
      element.addEventListener('touchend', listeners.touchend);
      this.tooltipListeners.set(element, listeners);
    }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Define entity.");
    }
    this.config = {...config};
    this.url = config.url;
    this.collapse = config.collapse || Infinity;
    this.config.enable_tooltips = config.enable_tooltips !== undefined ? config.enable_tooltips : false;
    this.config.tooltip_delay = (config.tooltip_delay !== undefined && config.tooltip_delay !== null) ? Math.max(150, config.tooltip_delay) : 750;
    this.config.enable_trailers = config.enable_trailers !== undefined ? config.enable_trailers : false;
    this.config.disable_hyperlinks = config.disable_hyperlinks !== undefined ? config.disable_hyperlinks : false;
  }

  getCardSize() {
    let view = this.config.image_style || "poster";
    return view == "poster" ? this.cardSize * 5 : this.cardSize * 3;
  }
}
customElements.define("upcoming-media-card", UpcomingMediaCard);

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
