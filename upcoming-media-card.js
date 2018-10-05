class UpcomingMediaCard extends HTMLElement {

  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = this.config.title;
      this.content = document.createElement('div');
      this.content.style.padding = '5px 10px';
      card.appendChild(this.content);
      this.appendChild(card);
      var count = 1;
    }

    const style = document.createElement('style');
    const entity = 'sensor.' + this.config.service + '_upcoming_media';
    const state = hass.states[entity].state;
    const service = this.config.service;
    const view = this.config.image_style || 'poster';
    const dateform = this.config.date || 'mmdd';
    const accent = this.config.accent_color;
    const border = this.config.border_color;
    const downclr = this.config.download_color;
    const boxshdw = this.config.all_shadows || this.config.box_shadows || true;
    const txtshdw = this.config.all_shadows || this.config.text_shadows || true;
    const media = this.config.media_type;
          
    let txtSize = (size) => size == 'large' ? '18' : size == 'medium' ? '14' : '12';
    let getDate = (date,form) => date.toLocaleDateString([],form);
    let getTime = (date,form) => date.toLocaleTimeString([],form);
    let hours = this.config.clock != 24;
    let timeform = {"hour12":hours,"hour":"2-digit","minute":"2-digit"};
    let size = [txtSize(this.config.title_size),txtSize(this.config.line1_size),
                txtSize(this.config.line2_size),txtSize(this.config.line3_size)];
    // Get days between 2 dates
    function tween(day1,day2) {
      let tween = day1.valueOf() - day2.valueOf();
      tween = tween / 1000 / 86400;
      tween = Math.round(tween - 0.5);
      tween = Math.abs(tween);
      return tween;
    }
    // Truncate text...
    function trunc(txt, size) {
      // When to truncate depending on size
      size = size == 'large' ? 23 : size == 'medium' ? 28 : 35;
      // Remove parentheses & contents: "Shameless (US)" becomes "Shameless".
      txt = txt.replace(/ *\([^)]*\) */g, " ");
      // Truncate only at whole word w/ no punctuation or space before ellipsis.
      if (txt.length > size) {
        for (let i = size; i > 0; i--) {
          if (txt.charAt(i).match(/( |:|-|;|"|'|,)/) && txt.charAt(i-1).match(/[a-zA-Z0-9_]/)) {
            var truncated = txt.substring(0, i) + '...';
            return truncated;
          }
        }
      } else {
        return txt;
      }
    }

    let tshadows = txtshdw ? 'text-shadow:1px 1px 3px rgba(0,0,0,0.9);' : '';
    let bshadow = boxshdw ? view == 'poster' ? 'box-shadow:6px 10px 15px #111;' : 'box-shadow:3px 2px 25px #111;' : '';
    // Gradient for shadow effect on SVG rectangle
    let rshadow = boxshdw ? 'url(#grad1)': accent;

    if (view == 'poster') {
      style.textContent = `
          .${service}_${view} {
            width:100%;
            margin:20px auto;
          }
          .${service}_img_${view} {
            width:30%;
            margin-left:10px;
            outline:5px solid ${border};
            ${bshadow}
          }
          .${service}_svg_${view} {
            width:55%;
            margin-top:5%;
            margin-left:2px;
            vertical-align:top;
            overflow:visible;
          }
          .${service}_line0_${view} {
            font-weight:600;
            font-size:${size[0]}px;
            ${tshadows}
            ${'fill:'+this.config.title_color+';'}
          }
          .${service}_line1_${view} {
            font-size:${size[1]}px;
            ${tshadows}
            ${'fill:'+this.config.line1_color+';'}
          }
          .${service}_line2_${view} {
            font-size:${size[2]}px;
            ${tshadows}
            ${'fill:'+this.config.line2_color+';'}
          }
          .${service}_line3_${view} {
            font-size:${size[3]}px;
            ${tshadows}
            ${'fill:'+this.config.line3_color+';'}
          }
          .${service}_empty_${view} {
            fill:transparent !important;
            text-shadow:0 0 0 transparent !important;
          }
      `;
    } else {
      style.textContent = `
          .${service}_${view} {
            width:100%;
            overflow:hidden;
            margin:10px auto;
            background-repeat:no-repeat;
            background-size:auto 100%;
            ${bshadow}
          }
          .${service}_fan_${view} {
            width:100%;
            background:linear-gradient(to right, ${accent} 48%,
            transparent 70%,${accent} 100%);
            margin:auto;
            box-shadow:inset 0 0 0 3px ${border};
          }
          .${service}_svg_${view} {
            overflow:visible;
            width:55%;
            margin-top:1%;
            margin-left:2.5%;
            alignment-baseline:text-after-edge;
          }
          .${service}_line0_${view} {
            font-weight:600;
            font-size:${size[0]}px;
            ${tshadows}
            ${'fill:'+this.config.title_color+';'}
          }
          .${service}_line1_${view} {
            font-size:${size[1]}px;
            ${tshadows}
            ${'fill:'+this.config.line1_color+';'}
          }
          .${service}_line2_${view} {
            font-size:${size[2]}px;
            ${tshadows}
            ${'fill:'+this.config.line2_color+';'}
          }
          .${service}_line3_${view} {
            font-size:${size[3]}px;
            ${tshadows}
            ${'fill:'+this.config.line3_color+';'}
          }
          .${service}_empty_${view} {
            fill:transparent !important;
            text-shadow:0 0 0 transparent !important;
          }
      `;
    }

    let items = state > this.config.max + 1 ? this.config.max + 1 : state;

    for (; count < items; count++) {

      let attr = String(count);
      let airs = new Date(hass.states[entity].attributes['airdate'+ attr]);
      let imgurl = hass.states[entity].attributes[view + attr];
      let titltxt = hass.states[entity].attributes['title' + attr];
      let subtle = hass.states[entity].attributes['subtitle' + attr];
      let info = hass.states[entity].attributes['info' + attr];
      let hasFile = hass.states[entity].attributes['hasFile' + attr];
      let exinfo = hass.states[entity].attributes['extrainfo' + attr];
      let airdd = getDate(airs,{day: "2-digit"});
      let airmm = getDate(airs,{month: "2-digit"});
      let mmddstr = dateform=='ddmm' ? airdd+'/'+airmm : airmm+'/'+airdd;
      // If components can't find fan art then posters are used instead.
      // We need to shift the posters and fanart differently to look right.
      if (view == 'fanart') {
        var shiftimg = imgurl.match(/w500|posters|thumb/) ?
          'background-size: 54% auto;background-position:100% 35%;':
          'background-position:100% 0;';
      }
      // Display "Downloaded" when file exists
      if (hasFile) {
        var release = 'Downloaded';
      } else {
        // Display day of week if within a week, otherwise show date.
        if (media == 'tv') release = tween(airs, new Date()) <= 7 ?
          getDate(airs,{weekday:"long"}) + ', ' + getTime(airs,timeform):
          mmddstr + ', ' + airs.toLocaleTimeString([],timeform);
        // Use info attributes to display 'Arriving' or 'In Theaters' for movies
        else release = tween(airs, new Date()) <= 7 ?
          info + ' ' + getDate(airs,{weekday:"long"}) :
          info + ' ' + getDate(airs,{weekday:"short"}) + ', ' + mmddstr;
      }

      let datedl = !hasFile ? '' : downclr ? `fill:${downclr};` : '' ;
      let line = [this.config.title_text,this.config.line1_text,
                  this.config.line2_text,this.config.line3_text];
      let char = [this.config.title_size,this.config.line1_size,
                  this.config.line2_size,this.config.line3_size];

      for (let i = 0; i < line.length; i++) {
        // Shifting title around depending on view & size
        let svgshift, y;
        if (i==0) size[i].match(/18/) ? y='-5' : size[i].match(/14/) ? y='-2' : y='0';
        if (view=='fanart') svgshift = i == 0 ? `x="0" dy="1em"` : `x="0" dy="1.3em"`;
        else svgshift = i == 0 ? `x="10" y="${y}" dy="1.3em"` : `x="10" dy="1.3em"`;
        // Done shifting, build the text lines
        let empty = `<tspan class="${service}_line${i}_${view} ${service}_empty_${view}"${svgshift}>.</tspan>`;
        if (line[i] == 'title' && titltxt) line[i] = `<tspan class="${service}_line${i}_${view}" ${svgshift}>${trunc(titltxt,char[i])}</tspan>`;
        else if (line[i] == 'episode' && subtle) line[i] = `<tspan class="${service}_line${i}_${view}" ${svgshift}>${trunc(subtle,char[i])}</tspan>`;
        else if (line[i] == 'extra' && exinfo) line[i] = `<tspan class="${service}_line${i}_${view}" ${svgshift}>${trunc(exinfo,char[i])}</tspan>`;
        else if (line[i] == 'date' && release) line[i] = `<tspan class="${service}_line${i}_${view}" ${svgshift} style="${datedl}">${release}</tspan>`;
        // If any line has no data use an empty line
        else line[i] = empty;
      }
      // Build the HTML
      if (view == 'poster') {
        this.content.innerHTML += `
          <div class='${service}_${view}'>
          <img class="${service}_img_${view}" src="${imgurl}">
          <svg class='${service}_svg_${view}' viewBox="0 0 200 100">
          <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(20,20,20,1);stop-opacity:1" />
          <stop offset="2%" style="stop-color:${accent};stop-opacity:1" />
          </linearGradient></defs>
          <rect width="500px" height="23px" fill="${rshadow}"/><text>${line[0]}
          <tspan dy="1.3em" style="font-size:5px"class="${service}_empty_${view}">
          .</tspan>${line[1]+line[2]+line[3]}</text></svg></div></div>
        `;
      } else {
        this.content.innerHTML += `
          <div class="${service}_${view}"
          style="${shiftimg}background-image:url('${imgurl}')">
          <div class="${service}_fan_${view}">
          <svg class="${service}_svg_${view}"viewBox="0 0 200 100">
          <text>${line[0]+line[1]+line[2]+line[3]}</text></svg></div></div>
        `;
      }
      this.appendChild(style);
    }
  }
  setConfig(config) {
    let clrD = (post,fan) => config.image_style == 'poster' ? post : fan;
    if (!config.max) config.max = 5;
    if (!config.service) throw new Error('Define the service type.');
    if (!config.media_type) config.media_type = config.service == 'sonarr' ? 'tv' : 'movies';
    if (!config.title_text) config.title_text = 'title';
    if (!config.line1_text) config.line1_text = config.media_type == 'tv' ? 'episode' : 'date';
    if (!config.line2_text) config.line2_text = config.media_type == 'tv' ? 'date' : 'extra';
    if (!config.line3_text) config.line3_text = config.media_type == 'tv' ? 'extra' : 'empty';
    if (!config.title_size) config.title_size = 'large';
    if (!config.line1_size) config.line1_size = config.line_size || 'medium';
    if (!config.line2_size) config.line2_size = config.line_size || 'small';
    if (!config.line3_size) config.line3_size = config.line_size || 'small';
    if (!config.title_color) config.title_color = clrD('var(--primary-text-color)','#fff');
    if (!config.line1_color) config.line1_color = config.line_color || clrD('var(--primary-text-color)','#fff');
    if (!config.line2_color) config.line2_color = config.line_color || clrD('var(--primary-text-color)','#fff');
    if (!config.line3_color) config.line3_color = config.line_color || clrD('var(--primary-text-color)','#fff');
    if (!config.border_color) config.border_color = clrD('#fff','#000');
    if (!config.accent_color) config.accent_color = clrD('var(--primary-color)','#000');
    this.config = config;
  }
  getCardSize() {
    return 3;
  }
}
customElements.define('upcoming-media-card', UpcomingMediaCard);
