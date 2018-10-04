# Upcoming-Media-Card

**Requires an "upcoming-media" custom component**
This card will only work if you've installed one of the upcoming-media components found here:

* [Sonarr](https://github.com/custom-components/sensor.sonarr_upcoming_media)
* [Radarr](https://github.com/custom-components/sensor.radarr_upcoming_media)

<br>
<link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/FgwNR2l"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">If you feel I deserve it, you can buy me a coffee</span></a></br></br></br>

| Poster View | Fan Art View
| ---- | ---- 
| <img src="https://imgur.com/gKHbplv.jpg" alt="Screenshot 1" width="250"> | <img src="https://i.imgur.com/noB7Hub.jpg" alt="Screenshot 1" width="250"> 

## Features:
* Poster and Fan Art views
* All text can have its contents, color, and size customized.
* Most design elements can be hidden or have color changed.
* 12 or 24 hour display for times and month/day or day/month for dates.
* Anything beyond a week will display the date, otherwise day of week shown.
* Indicator if file has already been downloaded with color customization.
* Can limit the number of episodes/movies shown.
* Uses responsive design to scale elegantly 

## Installation:

Install the custom component by following it's instructions.
Install this card by copying to your `www/custom-lovelace/` folder.
Include it in its own folder like so: `www/custom-lovelace/upcoming-media-card/upcoming-media-card.js`

This goes into ui-lovelace.yaml under "resources:"

```
- url: /local/custom-lovelace/upcoming-media-card/upcoming-media-card.js
  type: js
```

This goes into one of your views under "cards:" in the same file

```
  - type: custom:upcoming-media-card
    service: sonarr  
```

If you're not updating using [tracker-card](https://github.com/custom-cards/tracker-card) and/or [custom-updater](https://github.com/custom-components/custom_updater) be sure that you are adding to a version number at the end of your lovelace resources when you update your cards, like so:

```
resources:
- url: /local/custom-lovelace/upcoming-media-card/upcoming-media-card.js?v=0.1.2
  type: js
```

You may need to have `javascript_version: latest` in your `configuration.yaml` under `frontend:`.

## Options:

This card has many customization options, but none are required to use the card. The card is fully functional with minimal configuration, like the installation example above.

There are a few configuration "skins" at the end of this readme for your inspiration or copy and paste needs.

<table>
  <tbody>
    <tr>
      <th>NAME</th>
      <th>TYPE</th>
      <th>DEFAULT</th>
      <th>DESCRIPTION</th>
    </tr>
    <tr>
      <td>type</td>
      <td>string</td>
      <td><b>REQUIRED</b></td>
      <td><code>custom:upcoming-media-card</code></td>
    </tr>
    <tr>
      <td>service</td>
      <td>string</td>
      <td><B>REQUIRED</b></td>
      <td>Name of the service from custom component. If using the "sonarr_upcoming_media" component this would be: <br><code>service: sonarr</code></td>
    </tr>
    <tr>
      <td>title</td>
      <td>string</td>
      <td>optional</td>
      <td>Title displayed at top of card.</td>
    </tr>
    <tr>
      <td>image_style</td>
      <td>string</td>
      <td>poster</td>
      <td>There are currently two different styles for the card:<br>poster and fanart.</td>
    </tr>
    <tr>
      <td>date</td>
      <td>string</td>
      <td>mmdd</td>
      <td>How to display dates. If the date were September 24th:<br><code>date: ddmm  </code>  would be 24/09 and <code>date: mmdd  </code>would be 09/24</td>
    </tr>
    <tr>
      <td>clock</td>
      <td>number</td>
      <td>12</td>
      <td>Display times as either 12 hour <code>clock: 12  </code>  or 24 hour <code>clock: 24  </code></td>
    </tr>
    <tr>
      <td>max</td>
      <td>number</td>
      <td>5</td>
      <td>Maximum number of items to show.</td>
    </tr>
  </tbody>
</table>
<br><br>

# Style Options

<table>
  <tbody>
    <tr>
      <th align="left">NAME</th>
      <th align="left">POSTER<br>DEFAULT</th>
      <th align="left">FANART<br>DEFAULT</th>
      <th align="left">DESCRIPTION</th>
    </tr>
    <tr>
      <td>title_text<br>line1_text<br>line2_text<br>line3_text</td>
      <td>title<br>episode<br>date<br>extra</td>
      <td>title<br>date<br>extra<br>empty</td>
      <td>The text contents for the line: <b>title, episode</b>,<b> extra</b>, & <b>empty</b>. More info below.</td>
    </tr>
    <tr>
      <td>title_size<br>line1_size<br>line2_size<br>line3_size</td>
      <td>large<br>medium<br>small<br>small</td>
      <td>large<br>medium<br>small<br>small</td>
      <td>Text size for each line. <b>small, medium, </b>or<b> large</b></td>
    </tr>
    <tr>
      <td>line_size</td>
      <td>no default</td>
      <td>no default</td>
      <td>Text size of lines below title.</b> More info below.</td>
    </tr>
    <tr>
      <td>title_color<br>line1_color<br>line2_color<br>line3_color</td>
      <td>var(--primary-text-color)<br>var(--primary-text-color)<br>var(--primary-text-color)<br>var(--primary-text-color)<br>var(--primary-text-color)</td>
      <td>'#fff'<br>'#fff'<br>'#fff'<br>'#fff'<br>'#fff'<br></td>
      <td>The color of each line. Any valid CSS color.<b> Hex values must be in quotes</b>.</td>
    </tr>
    <tr>
      <td>line_color</td>
      <td>no default</td>
      <td>no default</td>
      <td>Color of lines below title. Any valid CSS color. <b>Hex values must be in quotes.</b> More info below.</td>
    </tr>
     <tr>
      <td>border_color</td>
      <td>'#fff'</td>
      <td>'#000'</td>
      <td>Color of the outside border in fanart view and border around image in poster view.</td>
    <tr>
    <tr>
      <td>accent_color</td>
      <td>var(--primary-color)</td>
      <td>'#000'</td>
      <td>Color of the ribbon in poster view and background in fanart view.</td>
    <tr>
      <td>download_color</td>
      <td>var(--primary-color)</td>
      <td>var(--primary-color)</td>
      <td>Changes the color of "Downloaded" text.</td></tr>
    <tr>
      <tr>
      <td>text_shadows</td>
      <td>boolean</td>
      <td>true</td>
      <td>Display or hide shadows behind text.</td>
    </tr>
    <tr>
      <td>box_shadows</td>
      <td>boolean</td>
      <td>true<br></td>
      <td>Display or hide shadows behind objects.</td>
    </tr>
    <tr>
      <td>all_shadows</td>
      <td>boolean</td>
      <td>no default</td>
      <td>Turns both text and object shadows on or off.</td>
    </tr>
      <td>*******************</td>
      <td>****************************</td>
      <td>***********************</td>
    <td></td></tr>
  </tbody>
</table>
<br>

The text content options are title, episode, extra, and empty (more to come soon). Episode only works for television and is blank for movies. Empty gives you an empty line of text which can be sized and used as a seperator. 

Text color options can be any valid CSS value. This includes color names like <code>red</code>, rgb values like <code>rgba(255, 0, 0, 0.6)</code>, variable names for HA like <code>var(--primary-color)</code>, and hex values like <code>'#ff6347'</code>. If using hex values, encase in quotes. This is the only time quotes are required in the cards configuration.

There are 2 space saving configuration options: <code>line_color</code> and <code>line_size</code>. These two options affect all lines of text below the title. These options can be overwritten as well. For example: if you set <code>line_color: white</code> and <code>line2_color: blue</code> then lines 1 & 3 will be white while line 2 will be blue.

## Customization Examples

These examples are just to illustrate a bit of what you can do. The advanced options show a side effect of the color configuration where if you enclose the setting in quotes and use a semi colon after the color you can insert CSS to style the text even more. This of course isn't a "supported" option, but it is fun to tinker with if you know a bit of CSS. The advanced samples just show a bit of that with text-shadows, image filters, border radius, etc. But you're not limited to just those. Experiment and show off your results.
<table>
  <tbody>
    <tr>
      <th align="left">Default Fan Art</th>
      <th align="left">Default Poster</th>
    </tr>
      <td><img src="https://i.imgur.com/m0MjfiF.jpg" width="400px"></td>
      <td><img src="https://i.imgur.com/FB59x9X.jpg" width="400px"></td>
    </tr>
      <td><pre><code>  - type: custom:upcoming-media-card-beta
        service: sonarr
        image_style: fanart</code></pre></td>
      <td><pre><code>  - type: custom:upcoming-media-card-beta
    service: sonarr
    image_style: poster
</code></pre></td>
    </tr>
  </tbody>
</table>
<table>
  <tbody>
    <tr>
      <th align="left">Customized</th>
      <th align="left">Advanced</th>
    </tr>
      <td><img src="https://i.imgur.com/2tLQcYJ.jpg" width="400px"></td>
      <td><img src="https://i.imgur.com/Qx1ME3u.jpg" width="400px"></td>
    </tr>
      <td><pre><code>  - type: custom:upcoming-media-card-beta
        service: sonarr
        image_style: fanart
        accent_color: '#001E1B'
        title_color: '#bfead3'
        line1_color: '#e1d99c'
        line2_color: '#f6c98a'
        line3_color: '#f48a78'
        border_color: '#00695f'</code></pre></td>
      <td><pre><code>  - type: custom:upcoming-media-card-beta
    service: radarr
    image_style: fanart
    accent_color: '#000'
    title_color: 'white;text-shadow: 1px 1px 0 #ff6600,2px 2px 0 #ff6600 , 3px 3px 0 #ff6600,4px 4px 0 #ff6600 , 5px 5px 0 #ff6600'
    line_color: 'white;text-shadow: 1px 1px 0 #ff6600,2px 2px 0 #ff6600 , 3px 3px 0 #ff6600,4px 4px 0 #ff6600 , 5px 5px 0 #ff6600'
    border_color: '#fff;outline-style:solid;outline-color:#ff6600'</code></pre></td>
    </tr>
      <td><img src="https://i.imgur.com/zT3iwDw.jpg" width='400px'></td>
      <td><img src="https://i.imgur.com/SkyR0OO.jpg" width='400px'></td>
    </tr>
      <td><pre><code>  - type: custom:upcoming-media-card
    service: sonarr
    image_style: poster
    accent_color: 'cyan'
    title_color: '#00695f'
    line1_color: '#e1d99c'
    line2_color: '#f6c98a'
    line3_color: '#f48a78'
    border_color: 'white'
    all_shadows: false
    download_color: rgb(102,255,0,1)</code></pre></td>
      <td><pre><code>  - type: custom:upcoming-media-card
    service: radarr
    image_style: poster
    accent_color: transparent
    title_color: '#e1d99c;text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black;text-decoration: #e1d99c underline;'
    line_color: '#e1d99c;text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black'
    border_color: 'transparent;filter:sepia(1);border-radius: 30px'
    all_shadows: false</code></pre></td>
    </tr>
  </tbody>
</table>
