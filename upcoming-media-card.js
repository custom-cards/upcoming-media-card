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
//Grab service name for later use in CSS classes (prevent style conflicts)
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
      const media = this.config.media_type;
      const txtshadows = this.config.text_shadows;
      const boxshadows = this.config.box_shadows;
      const exinfoconf = this.config.extra_info;
      const exinfocolor = this.config.extra_color;
//Get state (number of items) so we can loop through all items
      const state = hass.states[entityId].state;
      var loop = 0;
//We got style
      const style = document.createElement('style');
//Shadows on or off
      if (txtshadows == 'off'){
        var tshadows = '';
      } else {
        tshadows = 'text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);';
      }
      if (boxshadows == 'off'){
        var bshadow1 = '';
        var bshadow2 = '';  
        var bshadow3 = '';  
      } else {
        bshadow1 = 'box-shadow: 6px 10px 15px #111;';
        bshadow2 = 'box-shadow: 6px 10px 15px #000;';
        bshadow3 = 'box-shadow: 3px 2px 25px #111;';
      }
//12h or 24h
      if(clock == 24 || clock == '24'){
        var h12 = false;
      } else {
        h12 = true;
      }
//Set time formatting
        var timeform = {
          "hour12": h12,
          "hour": "2-digit",
          "minute": "2-digit"
        };
//Get days between now and airdate
      function getTween(day1, day2){
        var d1 = day1.valueOf();
        var d2 = day2.valueOf();
        var ndays = (d2 - d1) / 1000 / 86400;
        ndays = Math.round(ndays - 0.5);
        var tween = Math.abs(ndays);
        return tween;
      }
//Truncate text. Much better looking than wrapping
      function trunc(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
      }
//CSS for poster view
//Prefix CSS classes with service to prevent conflicts with
//other cards and multiples of this card.
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
              line-height: 1;
              margin-top:-10px;
              color:${subtitlecolor};
              ${tshadows}
            }
            .${service}_date {
              --max-font: 15;
              --min-font: 14;
              font-size: var(--responsive);
              line-height: 1;
              margin-top: -10px;
              ${tshadows}
            }
            .${service}_xtra {
              --max-font: 15;
              --min-font: 14;
              font-size: var(--responsive);
              line-height: 1.5;
              margin-top: -10px;
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
//CSS for banner view
        } else if (imgstyle == 'banner') {
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
        } else {
            style.textContent = `
          * {
              --responsive: calc((var(--min-font) * 1px) + (var(--max-font) - var(--min-font)) * ((100vw - 420px) / (1200 - 420)));
            }
            .${service}_clear_f {
            }
            .${service}_f {
              min-width:400px;
              padding-bottom: 10px;
            }
            .${service}_table_f {
              margin-left: auto;
              margin-right: auto;
              table-layout: fixed;
              border-collapse: collapse;
              margin-bottom:5px;
              ${bshadow3}
              outline-width: 2px;
              outline-style: solid;
              outline-color:${bordercolor};
            }
            .${service}_title_f {
              --max-font: 22;
              --min-font: 19;
              font-size: var(--responsive);
              padding-left:5px;
              margin-top:15px;
              font-weight: 500;
              line-height:0;
              color:${titlecolor};
              ${tshadows}
              
            }
            .${service}_sub_title_f{
              --max-font: 16;
              --min-font: 15;
              padding-left:5px;
              font-size: var(--responsive);
              font-weight: 500;
              line-height:0;
              ${tshadows}
            }
            .${service}_xtra${imgstyle}{
              padding-left:5px;
              --max-font: 16;
              --min-font: 15;
              font-size: var(--responsive);
              font-weight: 500;
              line-height:1;
              ${tshadows}
              
            }
            .${service}_fanart_f { 
              background-repeat:no-repeat;
              background-size:80% auto;
            &:before {
              content: '';
            	position: absolute;
            	top: 0;
            	right: 0;
            	bottom: 0;
            	left: 0;
            	background-image: linear-gradient(to bottom right,#002f4b,#dc4225);
            	opacity: 1; 
              }
            }`;
        }
//Loop through attributes and spit out HTML for each item
      while (attcount < state) {
        attcount += 1;
//Get attributes from sensor
        var airdate = new Date(hass.states[entityId].attributes['airdate' + String(attcount)]);
        var img = hass.states[entityId].attributes[imgstyle + String(attcount)];
        var titletxt = hass.states[entityId].attributes['title' + String(attcount)];
        var subtitletxt = hass.states[entityId].attributes['subtitle' + String(attcount)];
        var info = hass.states[entityId].attributes['info' + String(attcount)];
        var hasFile = hass.states[entityId].attributes['hasFile' + String(attcount)];
        var extrainfo = hass.states[entityId].attributes['extrainfo' + String(attcount)];
//Day and month formatting
        var airday = airdate.toLocaleDateString([], {day: "2-digit"});
        var airmonth = airdate.toLocaleDateString([], {month: "2-digit"} );
        if (dateformat == 'ddmm'){
          var datemmdd = airday + '/' + airmonth;
        } else {
          datemmdd = airmonth + '/' + airday;
        }
//If the components can't find fanart then poster is used, but we need to shift it to look right
        if (img.includes("w500")||img.includes('posters')) {
          var shifimg = 'background-position:right center;';
        }else{
          shifimg = 'background-position:top right;';
        }
//Adjust extra info line to look okay in all views
        if (exinfoconf=='on' && imgstyle == 'fanart'){
          var xinfo = '<p class="'+service+'_xtra'+imgstyle+'" ' +'style="white-space:nowrap;line-height:.4;color:'+exinfocolor+';">'+trunc(extrainfo,28)+'</p>';
        // }else if (exinfoconf=='on' && media == 'tv' ** imgstyle == 'fanart'){
        //   xinfo = '<p class="'+service+'_xtra'+imgstyle+'" ' +'style="white-space:nowrap;line-height:.4;color:'+exinfocolor+';">'+trunc(extrainfo,28)+'</p>';
        }else if (exinfoconf=='on' && imgstyle != 'fanart'){
          xinfo = '<p class="'+service+'_xtra'+imgstyle+'" ' +'style="line-height:0;color:'+exinfocolor+';">'+extrainfo+'</p>';
        }else{
          xinfo = '';
        }
//Get days between now and release 
        var daysBetween = getTween(airdate, new Date());
//Show "Downloaded" if file has been & change color accordingly
        if(hasFile == true){
          var release = 'Downloaded';
          var datedl = dlcolor;
//If airdate is a week or more away, show date instead of day
        } else if (daysBetween <= 7 && media == 'tv') {
          release = airdate.toLocaleDateString([], {weekday: "long"}) + ', ' + airdate.toLocaleTimeString([],timeform);
          datedl = timecolor;
        } else if (daysBetween > 7 && media == 'tv'){
          release = datemmdd + ', ' + airdate.toLocaleTimeString([],timeform);
          datedl = timecolor;
        } else if (daysBetween <= 7 && media == 'movies') {
          release = info+' '+airdate.toLocaleDateString([], {weekday: "long"});
          datedl = timecolor;
        } else if (daysBetween > 7 && media == 'movies'){
          release = info+' '+airdate.toLocaleDateString([], {weekday: "short"})+', '+datemmdd;
          datedl = timecolor;
        }
//HTML
//Movie poster view
        if (media == 'movies'){
          if (imgstyle == 'poster'){
            this.content.innerHTML += `
              <div class="${service}">
              <table class="${service}table">
              <tr class="${service}_clear"><td class="${service}td1">
              <img class="${service}img" src="${img}"></td><td class="${service}td2">
              <p class="${service}_title ${service}ribbon">${trunc(titletxt,22)}</p>
              <p class="${service}_sub_title" style="color:${datedl}">${release}</p>
              ${xinfo}
              </td></tr></table></div>
            `;
//Movie fanart view.
          } else if (imgstyle=='fanart'){
            this.content.innerHTML += `
              <div class="${service}_f">
              <table class="${service}_table_f" style="width:95%;height:100px;background-color:${ribboncolor}">
              <tr class="${service}_clear_f"><td class="${service}_clear_f" style="border-right: 5px solid ${ribboncolor}; vertical-align:top;width:30%;">
              <p style="white-space: nowrap;" class="${service}_title_f">${titletxt}</p>
              <p style="color:${datedl};white-space:nowrap;" class="${service}_sub_title_f">${release}</p>
              ${xinfo}
              </td><td class="${service}_fanart_f" style="${shifimg}width:70%;background-image:linear-gradient(to right,
              ${ribboncolor} 3%,transparent 80%,${ribboncolor} 113% ),url('${img}');">
              </td></tr></table></div>
            `;
//Movie banner view placeholder
          } else {
            this.content.innerHTML += `
              <img style="width:95%;outline-width:3px;outline-style:solid;outline-color:#000;display:block;
              margin: 0px auto;" src="https://i.imgur.com/fxX01Ic.jpg">
              <div style="background-color:#000;top:10px;width:96.2%;margin:0 auto;">
              <table style="width:100%;margin-left:auto;margin-right:auto;margin-top:0px;padding:0px;"><tr><th>
              <h3>Unfortunately, there is no banner view for this content. I can't seem to find a reliable source for 
              them, yet.</th></th></tr></div>
            `;
            break;
          }
        }
//TV poster view
        if (media == 'tv'){
          if (imgstyle == 'poster'){
            this.content.innerHTML += `
              <div class="${service}">
              <table class="${service}table">
              <tr class="${service}_clear"><td class="${service}td1">
              <img class="${service}img" src="${img}"></td><td class="${service}td2">
              <p class="${service}_title ${service}ribbon">${trunc(titletxt,22)}</p>
              <p class="${service}_sub_title">${trunc(subtitletxt,24)}</p>
              <p class="${service}_date" style="color:${datedl}">${release}</p>
              ${xinfo}
              </td></tr></table></div>
            `;
//TV fanart view
          } else if (imgstyle=='fanart'){
            this.content.innerHTML += `
              <div class="${service}_f">
              <table class="${service}_table_f" style="width:95%;height:100px;background-color:${ribboncolor}">
              <tr class="${service}_clear_f"><td class="${service}_clear_f" style="border-right: 5px solid ${ribboncolor}; vertical-align:top;width:30%;">
              <p style="white-space: nowrap;" class="${service}_title_f">${titletxt}</p>
              <p style="color:${datedl};white-space:nowrap;" class="${service}_sub_title_f">${release}</p>
              ${xinfo}
              </td><td class="${service}_fanart_f" style="${shifimg}width:70%;background-image:linear-gradient(to right,
              ${ribboncolor} 3%,transparent 80%,${ribboncolor} 113% ),url('${img}');">
              </td></tr></table></div>
            `;
//TV banner view
          } else {
              this.content.innerHTML += `
                <div class="${service}_b">
                <img class="${service}img_b" src="${img}">
                <div class="${service}ribbon_b"><table class="${service}table_b"><tr class="${service}_clear"><th class="${service}_clear">
                <p class="${service}_sub_title_b">${trunc(subtitletxt,24)}</p></th>
                <th class="${service}_clear"><p class="${service}_date_b" style="color:${datedl}">${release}</p></th></tr>
                </div></div>
              `;
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
    if (!config.max) config.max = 10;
    if (!config.extra_info) config.extra_info = 'on';
//Defauts for banner and fanart views
    if (config.image_style == 'banner' || config.image_style == 'fanart' ) {
        if (!config.title_color) config.title_color = '#fff';
        if (!config.extra_color) config.extra_color = '#fff';
        if (!config.subtitle_color) config.subtitle_color = '#fff';
        if (!config.time_color) config.time_color = '#fff';
        if (!config.downloaded_color) config.downloaded_color = '#fff';
        if (!config.ribbon_color) config.ribbon_color = '#000';
        if (!config.border_color) config.border_color = '#000';
//Defaults for poster view
    } else {
        if (!config.title_color) config.title_color = 'var(--primary-text-color)';
        if (!config.subtitle_color) config.subtitle_color = 'var(--primary-text-color)';
        if (!config.extra_color) config.extra_color = 'var(--primary-text-color)';
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
