class UpcomingMediaCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = this.config.title;
      this.content = document.createElement('div');
      this.content.style.padding = '0 0px 0px';
      card.appendChild(this.content);
      this.appendChild(card);
      var attcount = 0; 
    }
//Entity must be named like so: "sensor.sonarr_upcoming_media" 
//where sonarr is set by user in config: "service: sonarr"
      const entityId = 'sensor.' + this.config.service + '_upcoming_media';
      const service = this.config.service;
//Config options
      const imgstyle = this.config.image_style;
      const clock = this.config.clock;
      const dateformat = this.config.date;
      const max = this.config.max;
      const titlecolor = this.config.title_color;
      const subtitlecolor = this.config.subtitle_color;
      const timecolor = this.config.time_color;
      const dlcolor = this.config.downloaded_color;
      const ribboncolor = this.config.ribbon_color;
      const bordercolor = this.config.border_color;
//Locale does nothing currently
      const locale = this.config.locale;
      const media = this.config.media_type;
      const txtshadows = this.config.text_shadows;
      const boxshadows = this.config.box_shadows;
//Get state (number of items) so we can loop through all items
      const state = hass.states[entityId].state;
      var loop = 0;
//We got style
      const style = document.createElement('style');
//Get days between now and airdate
      function getTween(d1, d2){
        var ndays;
        var tv1 = d1.valueOf();
        var tv2 = d2.valueOf();
        ndays = (tv2 - tv1) / 1000 / 86400;
        ndays = Math.round(ndays - 0.5);
        var tween = Math.abs(ndays);
        return tween;
      }
//Truncate text. Much better looking than wrapping
      function trunc(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
      }
//Shadows on or off
      if (txtshadows == 'off'){
        var tshadows = '';
      } else {
        tshadows = 'text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);';
      }
      if (boxshadows == 'off'){
        var bshadow1 = '';
        var bshadow2 = '';        
      } else {
        bshadow1 = 'box-shadow: 6px 10px 15px #111;';
        bshadow2 = 'box-shadow: 6px 10px 15px #000;';
      }
//12h or 24h
      if(clock == 24 || clock == '24'){
        var h12 = false;
      } else {
        h12 = true;
      }
//CSS for poster view
//CSS element names must be unique in case our card is used multiple times with
//differnent services and different styles, so we give them the service name as a prefix.
      if (imgstyle == 'poster') {
        style.textContent = `
            * {
              --responsive: calc((var(--min-font) * 1px) + (var(--max-font) - var(--min-font)) * ((100vw - 420px) / (1200 - 420)));
            }
            .${service}_clear {
            }
            .${service}_title {
              --max-font: 23;
              --min-font: 21;
              font-size: var(--responsive);
              font-weight: 600;
              ${tshadows}
              color:${titlecolor};
            }
            .${service}_sub_title {
              --max-font: 18;
              --min-font: 16;
              font-size: var(--responsive);
              font-weight: 500;
              line-height: 0;
              margin-top:-4px;
              color:${subtitlecolor};
              ${tshadows}
            }
            .${service}_date {
              --max-font: 15;
              --min-font: 14;
              font-size: var(--responsive);
              line-height: 1.2;
              margin-top: 0px;
              ${tshadows}
            }
            .${service}ribbon {
              background-color:${ribboncolor};
              padding: 4px 17px;
              width: 100%;
              margin-left: -17px;
              margin-top: -65px;
              box-shadow: inset 12px 0 15px -7px rgba(0,0,0,0.8);
            }
            .${service} {
              min-width:400px;
            }
            .${service}img {
              width:100%;
              ${bshadow1}
              outline-width: 3px;
              outline-style: solid;
              outline-color:${bordercolor};
            }
            .${service}table {
              width:100%;
              border-collapse: collapse;
              margin-left: 10px;
            }
            .${service}td1 {
              padding:10px;
            }
            .${service}td2 {
              padding:10px;
              width:65%;
            }
        `;
//css for banner view
        } else {
            style.textContent = `
            * {
              --responsive: calc((var(--min-font) * 1px) + (var(--max-font) - var(--min-font)) * ((100vw - 420px) / (1200 - 420)));
            }
            .${service}_clear {
            }
            .${service}_sub_title_b {
              --max-font: 15;
              --min-font: 14;
              font-size: var(--responsive);
              font-weight: 500;
              ${tshadows}
              line-height:0;
              text-align:left;
              color:${subtitlecolor};
            }
            .${service}_date_b {
              --max-font: 15;
              --min-font: 14;
              font-size: var(--responsive);
              font-weight: 400;
              ${tshadows}
              line-height:0;
              text-align:right;
            }
            .${service}ribbon_b {
              background-color:${ribboncolor};
              box-shadow: inset 0px 30px 55px -7px rgba(0,0,0,0.8);
              height:32px;
              top:10px;
              width:96.2%;
              margin: 0 auto;
            }
            .${service}_b {
              min-width:350px;
              padding: 15px;
            }
            .${service}img_b  {
              width:95%;
              ${bshadow2}
              outline-width: 3px;
              outline-style: solid;
              outline-color:${bordercolor};
              display: block;
              margin: 0px auto;
            }
            .${service}table_b {
              width:100%;
              margin-left: auto;
              margin-right: auto;
              margin-top:0px;
              padding:0px 3px;
            }
        `;
        }
//Loop through attributes and spit out HTML for each item
      while (attcount < state) {
        attcount += 1;
        var timeop = {
          "hour12": h12,
          "weekday": "long",
          "hour": "2-digit",
          "minute": "2-digit"
        };
        var dateop = {
          "day": "2-digit",
          "month": "2-digit"
        };
        var datetimeop = {
          "month": "2-digit",
          "day": "2-digit",
          "hour": "2-digit",
          "minute": "2-digit"
        };
        var wkday = {
          "weekday": "short"
        };
        var img = hass.states[entityId].attributes[imgstyle + String(attcount)];
        var titletxt = hass.states[entityId].attributes['title' + String(attcount)];
        var subtitletxt = hass.states[entityId].attributes['subtitle' + String(attcount)];
        var info = hass.states[entityId].attributes['info' + String(attcount)];
        var airdate = new Date(hass.states[entityId].attributes['airdate' + String(attcount)]);
        var hasFile = hass.states[entityId].attributes['hasFile' + String(attcount)];
        var daysBetween = getTween(new Date(airdate), new Date());
        if (dateformat == 'ddmm'){
          var datemmdd = "en-gb";
        } else {
          datemmdd = [];
        }
//Show air day and time or "Downloaded" if it has been & change color accordingly
        if(hasFile == true){
          var downloaded = 'Downloaded';
          var datedl = dlcolor;
//If airdate is a week or more away, show date instead of day
        } else if (daysBetween <= 7 && media == 'tv') {
          downloaded = airdate.toLocaleTimeString([],timeop);
          datedl = timecolor;
        } else if (daysBetween > 7 && media == 'tv'){
          downloaded = airdate.toLocaleTimeString(datemmdd,datetimeop);
        } else if (daysBetween <= 7 && media == 'movies') {
          downloaded = info + ' ' + airdate.toLocaleDateString([], { wkday });
          datedl = timecolor;
        } else if (daysBetween > 7 && media == 'movies'){
          downloaded = info + ' ' + airdate.toLocaleDateString(datemmdd, dateop);
        }
//HTML for movie service        
        if (media == 'movies'){
//Movie poster view
          if (imgstyle == 'poster'){
            this.content.innerHTML += `
              <div class="${service}">
              <table class="${service}table">
              <tr class="${service}_clear"><td class="${service}td1">
              <img class="${service}img" src="${img}"></td><td class="${service}td2">
              <p class="${service}_title ${service}ribbon">${trunc(titletxt,22)}</p>
              <p class="${service}_sub_title" style="color:${datedl}">${downloaded}</p>
              </td></tr></table></div>
            `
//Movie banner view "coming soon"
          } else {
            this.content.innerHTML += `
              <div style="background-color:#000">
              <h2 style="color:#fff;padding:10px">Banner view for movies coming soon!</h2></div>
            `            
          }
        }
//HTML for tv service
        if (media == 'tv'){
//TV poster view
          if (imgstyle == 'poster'){
            this.content.innerHTML += `
              <div class="${service}">
              <table class="${service}table">
              <tr class="${service}_clear"><td class="${service}td1">
              <img class="${service}img" src="${img}"></td><td class="${service}td2">
              <p class="${service}_title ${service}ribbon">${trunc(titletxt,22)}</p>
              <p class="${service}_sub_title">${trunc(subtitletxt,24)}</p>
              <p class="${service}_date" style="color:${datedl}">${downloaded}</p>
              </td></tr></table></div>
            `    
//TV banner view
          } else {
              this.content.innerHTML += `
                <div class="${service}_b">
                <img class="${service}img_b" src="${img}">
                <div class="${service}ribbon_b"><table class="${service}table_b"><tr class="${service}_clear"><th class="${service}_clear">
                <p class="${service}_sub_title_b">${trunc(subtitletxt,24)}</p></th>
                <th class="${service}_clear"><p class="${service}_date_b" style="color:${datedl}">${downloaded}</p></th></tr>
                </div></div>
              `
          }
        }
//We're dripping with style!
        this.appendChild(style);
//Stop once we hit the max set in config
        loop += 1;
        if (loop == max){
          break;
        }
      }
   }
  setConfig(config) {
    if (!config.service) {
      throw new Error('Please define service type');
    }
//Set default views if not in config
    if (!config.image_style) config.image_style = 'poster';
    if (!config.text_shadows) config.text_shadows = 'on';
    if (!config.box_shadows) config.box_shadows = 'on';
    if (!config.date) config.date = 'mmdd';
//Locale does nothing currently
    if (!config.locale) config.locale = 'en-US';
    if (!config.max) config.max = 10;
//Defauts for banner view
    if (config.image_style == 'banner') {
        if (!config.subtitle_color) config.subtitle_color = '#fff';
        if (!config.time_color) config.time_color = '#fff';
        if (!config.downloaded_color) config.downloaded_color = '#fff';
        if (!config.ribbon_color) config.ribbon_color = '#000';
        if (!config.border_color) config.border_color = '#000';
//Defaults for poster view
    } else {
        if (!config.title_color) config.title_color = 'var(--primary-text-color)';
        if (!config.subtitle_color) config.subtitle_color = 'var(--primary-text-color)';
        if (!config.time_color) config.time_color = 'var(--primary-text-color)';
        if (!config.downloaded_color) config.downloaded_color = 'var(--primary-color)';
        if (!config.ribbon_color) config.ribbon_color = 'var(--primary-color)';
        if (!config.border_color) config.border_color = '#fff';
    }
    this.config = config;
//Set media type for known components
      if (this.config.service == 'sonarr'){
        if (!config.media_type) config.media_type = 'tv';
      } else if (this.config.service == 'radarr'){
        if (!config.media_type) config.media_type = 'movies';
      }
  }
  getCardSize() {
    return 3;
  }
}

customElements.define('upcoming-media-card', UpcomingMediaCard);
