# Upcoming-Media-Card

**Requires an "upcoming-media" custom component**
This card will only work if you've installed one of the upcoming-media components found here:

* [Sonarr](https://github.com/custom-components/sensor.sonarr_upcoming_media)
* [Radarr](https://github.com/custom-components/sensor.radarr_upcoming_media)

<br/>
<link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/FgwNR2l"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">If you feel I deserve it, you can buy me a coffee</span></a><br/><br/><br/>

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

# Main Config:

|NAME|TYPE|DEFAULT|DESCRIPTION|
|-|-|-|-|
|type|string|**REQUIRED**|<code>**"custom:upcoming-media-card"**</code>|
|service|string|**REQUIRED**|Name of the service from custom component. If using the sonarr_upcoming_media component this would be <code>**"service: sonarr"**</code>|
|title|string|optional|Title displayed at top of card.|
|date|string|mmdd|How to display dates. If the date were September 24th: <code>**"date: ddmm"**</code> would be 24/09 and <code>**"date: mmdd"**</code>  would be 09/24|
|clock|number|12|Display times as either 12 hour  <code>**"clock: 12"**</code> or 24 hour <code>**"clock: 24"**</code>|
|max|number|5|Maximum number of items to show.|
|image_style|string|poster|There are currently two different styles for the card:poster and fanart.|

# Style Options:

|NAME|POSTER&nbsp;DEFAULTS&nbsp;&nbsp;&nbsp;&nbsp;|FANART&nbsp;DEFAULTS&nbsp;|DESCRIPTION|
|-|-|-|-|
|title_text<br/>line1_text<br/>line2_text<br/>line3_text|title<br/>episode<br/>date<br/>extra|title<br/>date<br/>extra<br/>empty|The text contents for the line: title, episode, extra, & empty. More info below.|
|title_size<br/>line1_size<br/>line2_size<br/>line3_size|large<br/>medium<br/>small<br/>small|large<br/>medium<br/>small<br/>small|Text size for each line. small, medium, or large|
|line_size|no default|no default|Text size of lines below title. More info below.|
|title_color<br/>line1_color<br/>line2_color<br/>line3_color|var(--primary-text-color)<br/>var(--primary-text-color)<br/>var(--primary-text-color)<br/>var(--primary-text-color) |'#fff'<br/>'#fff'<br/>'#fff'<br/>'#fff'|The color of each line. Any valid CSS color. Hex values must be in quotes.|
|line_color|no default|no default|Color of lines below title. Any valid CSS color. Hex values must be in quotes. More info below.|
|border_color|'#fff'|'#000'|Color of the outside border in fanart view and border around image in poster view.|
|accent_color|var(--primary-color)|'#000'|Color of the ribbon in poster view and background in fanart view.|
|download_color|var(--primary-color)|var(--primary-color)|Changes the color of "Downloaded" text.|
|text_shadows|boolean|true|Display or hide shadows behind text.|
|box_shadows|boolean|true|Display or hide shadows behind objects.|
|all_shadows|boolean|no default|Turns both text and object shadows on or off.
<br/>

The text content options are title, episode, extra, and empty (more to come soon). Episode only works for television and is blank for movies. Empty gives you an empty line of text which can be sized and used as a seperator. 

Text color options can be any valid CSS value. This includes color names like <code>red</code>, rgb values like <code>rgba(255, 0, 0, 0.6)</code>, variable names for HA like <code>var(--primary-color)</code>, hex values like <code>'#ff6347'</code>, you can even use <code>transparent</code>. If using hex values, encase in quotes. This is the only time quotes are required in the cards configuration.

There are 2 space saving configuration options: <code>line_color</code> and <code>line_size</code>. These two options affect all lines of text below the title. These options can be overwritten as well. For example: if you set <code>line_color: white</code> and <code>line2_color: blue</code> then lines 1 & 3 will be white while line 2 will be blue.

## Customization Examples

These examples are just to illustrate a bit of what you can do. The advanced options show a side effect of the color configuration where if you enclose the setting in quotes and use a semi colon after the color you can insert CSS to style the text even more. This of course isn't a "supported" option, but it is fun to tinker with if you know a bit of CSS. The advanced samples just show a bit of that with text-shadows, image filters, border radius, etc. But you're not limited to just those. Experiment and show off your results.

|Customized|Advanced
|:-|:-
|<img src="https://i.imgur.com/2tLQcYJ.jpg" width="400px">|<img src="https://i.imgur.com/Qx1ME3u.jpg" width="400px">
|<details><summary>Show Code</summary>&nbsp;&nbsp;- type: custom:upcoming-media-card-beta<br/>&nbsp;&nbsp;&nbsp;&nbsp;service: sonarr<br/>&nbsp;&nbsp;&nbsp;&nbsp;image_style: fanart<br/>&nbsp;&nbsp;&nbsp;&nbsp;accent_color: '#001E1B'<br/>&nbsp;&nbsp;&nbsp;&nbsp;title_color: '#bfead3'<br/>&nbsp;&nbsp;&nbsp;&nbsp;line1_color: '#e1d99c'<br/>&nbsp;&nbsp;&nbsp;&nbsp;line2_color: '#f6c98a'<br/>&nbsp;&nbsp;&nbsp;&nbsp;line3_color: '#f48a78'<br/>&nbsp;&nbsp;&nbsp;&nbsp;border_color: '#00695f'</details>|<details><summary>Show Code</summary>&nbsp;&nbsp;- type: custom:upcoming-media-card-beta<br/>&nbsp;&nbsp;&nbsp;&nbsp;service: radarr<br/>&nbsp;&nbsp;&nbsp;&nbsp;image_style: fanart<br/>&nbsp;&nbsp;&nbsp;&nbsp;accent_color: '#000'<br/>&nbsp;&nbsp;&nbsp;&nbsp;title_color: 'white;text-shadow: 1px 1px 0 #ff6600,2px 2px 0 #ff6600 , 3px 3px 0 #ff6600,4px 4px 0 #ff6600 , 5px 5px 0 #ff6600'<br/>&nbsp;&nbsp;&nbsp;&nbsp;line_color: 'white;text-shadow: 1px 1px 0 #ff6600,2px 2px 0 #ff6600 , 3px 3px 0 #ff6600,4px 4px 0 #ff6600 , 5px 5px 0 #ff6600'<br/>&nbsp;&nbsp;&nbsp;&nbsp;border_color: '#fff;outline-style:solid;outline-color:#ff6600'</details>
|<img src="https://i.imgur.com/zT3iwDw.jpg" width='400px'>|<img src="https://i.imgur.com/SkyR0OO.jpg" width='400px'>
|<details><summary>Show Code</summary>&nbsp;&nbsp;- type: custom:upcoming-media-card<br/>&nbsp;&nbsp;&nbsp;&nbsp;service: sonarr<br/>&nbsp;&nbsp;&nbsp;&nbsp;image_style: poster<br/>&nbsp;&nbsp;&nbsp;&nbsp;accent_color: 'cyan'<br/>&nbsp;&nbsp;&nbsp;&nbsp;title_color: '#00695f'<br/>&nbsp;&nbsp;&nbsp;&nbsp;line1_color: '#e1d99c'<br/>&nbsp;&nbsp;&nbsp;&nbsp;line2_color: '#f6c98a'<br/>&nbsp;&nbsp;&nbsp;&nbsp;line3_color: '#f48a78'<br/>&nbsp;&nbsp;&nbsp;&nbsp;border_color: 'white'<br/>&nbsp;&nbsp;&nbsp;&nbsp;all_shadows: false<br/>&nbsp;&nbsp;&nbsp;&nbsp;download_color: rgb(102,255,0,1)</details>|<details><summary>Show Code</summary>&nbsp;&nbsp;- type: custom:upcoming-media-card<br/>&nbsp;&nbsp;&nbsp;&nbsp;service: radarr<br/>&nbsp;&nbsp;&nbsp;&nbsp;image_style: poster<br/>&nbsp;&nbsp;&nbsp;&nbsp;accent_color: transparent<br/>&nbsp;&nbsp;&nbsp;&nbsp;title_color: '#e1d99c;text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black;text-decoration: #e1d99c underline;'<br/>&nbsp;&nbsp;&nbsp;&nbsp;line_color: '#e1d99c;text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black'&nbsp;&nbsp;&nbsp;&nbsp;border_color: 'transparent;filter:sepia(1);border-radius: 30px'<br/>&nbsp;&nbsp;&nbsp;&nbsp;all_shadows: false</details>
