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

    const entity = 'sensor.' + this.config.service + '_upcoming_media',
          state  = hass.states[entity].state,
          style  = document.createElement('style'),
          serv   = this.config.service,
          view   = this.config.image_style,
          datef  = this.config.date,
          media  = this.config.media_type,
          accent = this.config.accent_color,
          border = this.config.border_color,
          dlclr  = this.config.download_color,
          boxshd = this.config.box_shadows,
          txtshd = this.config.text_shadows;

    let hours = this.config.clock != 24,
        timef = {"hour12":hours,"hour":"2-digit","minute":"2-digit"};

    function daysBetween(day1,day2) {
      let tween = day1.valueOf() - day2.valueOf();
      tween = tween / 1000 / 86400;
      tween = Math.round(tween - 0.5);
      tween = Math.abs(tween);
      return tween;
    }

    function getDate(date,form){
      return date.toLocaleDateString([],form);
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
          if (txt.charAt(i).match(/( |:|-|;|"|'|,)/) 
          && txt.charAt(i-1).match(/[a-zA-Z0-9_]/)) {
            var truncated = txt.substring(0, i) + '...';
            return truncated;
          }
        }
      } else {
        return txt;
      }
    }

    function txtSize(size) {
      if(size=='large' )return`font-size: 18px;`;
      if(size=='medium')return`font-size: 14px;`;
      if(size=='small' )return`font-size: 12px;`;
    }

    let tshadows=txtshd ? 'text-shadow:1px 1px 3px rgba(0,0,0,0.9);' : '',
        bshadow1=boxshd ? 'box-shadow:6px 10px 15px #111;' : '',
        bshadow2=boxshd ? 'box-shadow:3px 2px 25px #111;' : '',
        bshadow3=boxshd ? 'url(#grad1)': accent,
        size=[txtSize(this.config.title_size),txtSize(this.config.line1_size),
              txtSize(this.config.line2_size),txtSize(this.config.line3_size)];

    if (view == 'poster') {
      style.textContent = `

          .${serv}_${view} {
            width:100%;
            margin:10px auto;
          }
          .${serv}_img_${view} {
            width:30%;
            margin-left:10px;
            outline:5px solid ${border};
            ${bshadow1}
          }
          .${serv}_svg_${view} {
            width:55%;
            margin-top:5%;
            margin-left:2px;
            vertical-align:top;
            overflow:visible;
          }
          .${serv}_line0_${view} {
            font-weight:600;
            ${size[0]}
            ${tshadows}
            ${'fill:'+this.config.title_color+';'}
          }
          .${serv}_line1_${view} {
            ${size[1]}
            ${tshadows}
            ${'fill:'+this.config.line1_color+';'}
          }
          .${serv}_line2_${view} {
            ${size[2]}
            ${tshadows}
            ${'fill:'+this.config.line2_color+';'}
          }
          .${serv}_line3_${view} {
            ${size[3]}
            ${tshadows}
            ${'fill:'+this.config.line3_color+';'}
          }
          .${serv}_empty_${view} {
            fill:transparent !important;
            text-shadow:0 0 0 transparent !important;
          }
      `;
    } else {
      style.textContent = `

          .${serv}_${view} {
            width:100%;
            overflow:hidden;
            margin:10px auto;
            background-repeat:no-repeat;
            background-size:auto 100%;
            ${bshadow2}
          }
          .${serv}_fan_${view} {
            width:100%;
            background:linear-gradient(to right, ${accent} 48%,
            transparent 70%,${accent} 100%);
            margin:auto;
            box-shadow:inset 0 0 0 3px ${border};
          }
          .${serv}_svg_${view} {
            overflow:visible;
            width:55%;
            margin-top:1%;
            margin-left:2.5%;
            alignment-baseline:text-after-edge;
          }
          .${serv}_line0_${view} {
            font-weight:600;
            ${size[0]}
            ${tshadows}
            ${'fill:'+this.config.title_color+';'}
          }
          .${serv}_line1_${view} {
            ${size[1]}
            ${tshadows}
            ${'fill:'+this.config.line1_color+';'}
          }
          .${serv}_line2_${view} {
            ${size[2]}
            ${tshadows}
            ${'fill:'+this.config.line2_color+';'}
          }
          .${serv}_line3_${view} {
            ${size[3]}
            ${tshadows}
            ${'fill:'+this.config.line3_color+';'}
          }
          .${serv}_empty_${view} {
            fill:transparent !important;
            text-shadow:0 0 0 transparent !important;
          }
      `;
    }

    let items = state > this.config.max + 1 ? this.config.max + 1 : state;
    for (; count < items; count++) {

      let attnum  = String(count),
          airdate = new Date(hass.states[entity].attributes['airdate'+ attnum]),
          imgurl  = hass.states[entity].attributes[view + attnum],
          titltxt = hass.states[entity].attributes['title' + attnum],
          subtle  = hass.states[entity].attributes['subtitle' + attnum],
          inform  = hass.states[entity].attributes['info' + attnum],
          hasFile = hass.states[entity].attributes['hasFile' + attnum],
          extinfo = hass.states[entity].attributes['extrainfo' + attnum];

      let airday   = getDate(airdate,{day: "2-digit"}),
          airmonth = getDate(airdate,{month: "2-digit"} ),
          datemd   = datef=='ddmm' ? airday+'/'+airmonth : airmonth+'/'+airday;
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
        var datedl = !dlclr ? '' : `fill:${dlclr};`;
      } else {
        datedl = '';
       // Display day of week if within a week, otherwise show date.
        if (media == 'tv') release = daysBetween(airdate, new Date()) <= 7 ?
          getDate(airdate,{weekday:"long"})+', '+airdate.toLocaleTimeString([],timef):
          datemd+', '+airdate.toLocaleTimeString([],timef);
        // Use info attributes to display 'Arriving' or 'In Theaters' for movies
        else release = daysBetween(airdate, new Date()) <= 7 ?
          inform+' '+getDate(airdate,{weekday:"long"}) :
          inform+' '+getDate(airdate,{weekday:"short"})+', '+datemd;
      }

      let line = [this.config.title_text,this.config.line1_text,
                  this.config.line2_text,this.config.line3_text],
          char = [this.config.title_size,this.config.line1_size,
                  this.config.line2_size,this.config.line3_size];

      for (let i = 0; i < line.length; i++) {
        // Shifting title around depending on view & size
        let tsp, y;
        if (size[i].match(/18/) && i==0) y='-5';
        else if (size[i].match(/14/) && i==0) y='-2';
        else if (size[i].match(/12/) && i==0) y='0';
        if (view=='fanart') tsp = i == 0 ? `x="0" dy="1em"` : `x="0" dy="1.3em"`;
        else if (view=='poster') tsp = i == 0 ? `x="10" y="${y}" dy="1.3em"` : `x="10" dy="1.3em"`;
        // Done shifting, build the text lines
        let empty = `<tspan class="${serv}_line${i}_${view} ${serv}_empty_${view}"${tsp}>.</tspan>`;
        if (line[i] == 'title' && titltxt) line[i] = `<tspan class="${serv}_line${i}_${view}" ${tsp}>${trunc(titltxt,char[i])}</tspan>`;
        else if (line[i] == 'episode' && subtle) line[i] = `<tspan class="${serv}_line${i}_${view}" ${tsp}>${trunc(subtle,char[i])}</tspan>`;
        else if (line[i] == 'extra' && extinfo) line[i] = `<tspan class="${serv}_line${i}_${view}" ${tsp}>${trunc(extinfo,char[i])}</tspan>`;
        else if (line[i] == 'date' && release) line[i] = `<tspan class="${serv}_line${i}_${view}" ${tsp} style="${datedl}">${release}</tspan>`;
        // If any line has no data use an empty line
        else line[i] = empty;
      }
      // Build the HTML
      if (view == 'poster') {
        this.content.innerHTML += `
          <div class='${serv}_${view}'>
          <img class="${serv}_img_${view}" src="${imgurl}">
          <svg class='${serv}_svg_${view}' viewBox="0 0 200 100">
          <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(20,20,20,1);stop-opacity:1" />
          <stop offset="2%" style="stop-color:${accent};stop-opacity:1" />
          </linearGradient></defs>
          <rect width="500px" height="23px" fill="${bshadow3}"/><text>${line[0]}
          <tspan dy="1.3em" style="font-size:5px"class="${serv}_empty_${view}">
          .</tspan>${line[1]+line[2]+line[3]}</text></svg></div></div>
        `;
      } else {
        this.content.innerHTML += `
          <div class="${serv}_${view}"
          style="${shiftimg}background-image:url('${imgurl}')">
          <div class="${serv}_fan_${view}">
          <svg class="${serv}_svg_${view}"viewBox="0 0 200 100">
          <text>${line[0]+line[1]+line[2]+line[3]}</text></svg></div></div>
        `;
      }
      this.appendChild(style);
    }
  }
  // The Great Wall of Defaults
  setConfig(config) {
    if (!config.service) throw new Error('Define the service type.');
    if (!config.media_type && config.service=='sonarr')config.media_type='tv';
    if (!config.media_type && config.service=='radarr')config.media_type='movies';
    if (!config.image_style) config.image_style = 'poster';
    if (!config.date) config.date = 'mmdd';
    if (!config.max) config.max = 5;
    // Color Defaults as a function 'cause why not?
    function defColor(option) {
      if (!option && config.line_color) return config.line_color;
      else return config.image_style=='poster'?'var(--primary-text-color)':'#fff';
    }
    if (!config.title_color) config.title_color = defColor(config.title_color);
    if (!config.line1_color) config.line1_color = defColor(config.line1_color);
    if (!config.line2_color) config.line2_color = defColor(config.line2_color);
    if (!config.line3_color) config.line3_color = defColor(config.line3_color);
    if (!config.title_size)  config.title_size  = 'large';
    if (!config.line1_size)  config.line1_size  = !config.line_size ? 'medium': config.line_size;
    if (!config.line2_size)  config.line2_size  = !config.line_size ? 'small' : config.line_size;
    if (!config.line3_size)  config.line3_size  = !config.line_size ? 'small' : config.line_size;
    if (!config.title_text) config.title_text = 'title';
    if (!config.line1_text && config.media_type == 'tv') config.line1_text = 'episode';
    if (!config.line2_text && config.media_type == 'tv') config.line2_text = 'date';
    if (!config.line3_text && config.media_type == 'tv') config.line3_text = 'extra';
    if (!config.line1_text && config.media_type != 'tv') config.line1_text = 'date';
    if (!config.line2_text && config.media_type != 'tv') config.line2_text = 'extra';
    if (!config.line3_text && config.media_type != 'tv') config.line3_text = 'empty';
    if (!config.accent_color && config.image_style == 'poster') config.accent_color = 'var(--primary-color)';
    else if (!config.accent_color) config.accent_color = '#000';
    if (!config.border_color && config.image_style == 'poster') config.border_color = '#fff';
    else if (!config.border_color) config.border_color = '#000';
    // Since booleans are used for shadow config, check against 'undefined'
    if (typeof config.all_shadows == 'undefined') {
      if (typeof config.text_shadows == 'undefined') config.text_shadows = true;
      if (typeof config.box_shadows == 'undefined') config.box_shadows = true;
    } else {
      if (typeof config.text_shadows == 'undefined') config.text_shadows = config.all_shadows;
      if (typeof config.box_shadows == 'undefined') config.box_shadows = config.all_shadows;
    }
    this.config = config;
  }
  getCardSize() {
    return 3;
  }
}
customElements.define('upcoming-media-card', UpcomingMediaCard);
