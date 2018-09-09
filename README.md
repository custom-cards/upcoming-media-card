# Upcoming-Media-Card
Lovelace card for Home Assistant. Displays upcoming episodes and movies. </br></br>
**Requires an "upcoming-media" custom component**</br>
This card will only work if you've installed one of the upcoming-media components found here:

* [Sonarr](https://github.com/custom-components/sensor.sonarr_upcoming_media)
* [Radarr](https://github.com/custom-components/sensor.radarr_upcoming_media)
</br>
If you are a developer, please read below on how to create your own component for this card.
</br></br>
<link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/FgwNR2l"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">If you feel I deserve it, you can buy me a coffee</span></a></br></br></br>

| Poster View | Banner View 
| ---- | ---- 
| <img src="https://imgur.com/gKHbplv.jpg" alt="Screenshot 1" width="250"> | <img src="https://imgur.com/mA7cdZv.jpg" alt="Screenshot 1" width="250">

## Features:
* Poster and banner views.
* Almost everything can have its color changed with any css color value.
* 12 or 24 hour display for times.
* Anything beyond a week will display the date.
* Indicator if file has already been downloaded
* Can limit the number of episodes/movies shown.

## Installation:

Install the custom component by following it's instructions. </br>
Install this card by copying to your `www/custom-lovelace/` folder. </br>
Be sure to include it in its own folder like so: `www/custom-lovelace/sonarr-upcoming-card/sonarr-upcoming-card.js` </br>
This will allow it to be updated with the tracker card and custom updater.

## Options:

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:upcoming-media-card`
| service | string | **Required** | Name of the service from custom component. If using the sonarr_upcoming_media component this would be "service: sonarr"
| title | string | Optional | Card title
| image_style | string | poster | Style of images used, either poster or banner.
| clock | number | 12 | Display times in 12 or 24 hour format.
| date | string | 'mmdd' | Display date in either month/day ('mmdd') or day/month ('ddmm')
| max | number | 10 | How many episodes to display within time range (time range set in component).
| show_color | string | 'var(--primary-text-color)' | Color of the show's name. Default in banner view is '#fff'.
| episode_color | string | 'var(--primary-text-color)' | Color of the episode's name. Default in banner view is '#fff'.
| time_color | string | 'var(--primary-text-color)' | Color of the show's air time. Default in banner view is '#fff'.
| extra_color | string | 'var(--primary-text-color)' | Color of the extra info in poster view(IMDb rating and studio name).
| downloaded_color | string | 'var(--primary-color)' | Color of downloaded indicator. Air time is replaced with "Downloaded" when episode has completed. Default in banner view is '#fff'.
| ribbon_color | string | 'var(--primary-color)' | Color of ribbon extending from border. Default in banner view is '#000'.
| border_color | string | '#fff' | Color of border around image. Default in banner view is '#000'.
| extra_info | string | 'on' | Show or hide extra info in poster view(IMDb rating and studio name). - ( 'on' or 'off' ). 
| text_shadows | string | 'on' | Show or hide text shadows. - ( 'on' or 'off' ). 
| box_shadows | string | 'on' | Show or hide shadows behind images. - ( 'on' or 'off' ). 
| media_type | string | tv | Type of media to be displayed. This is automatcally set when choosing sonarr. In case you are creating your own component, you can switch between the two modes ( tv or movies ).


**Bare Minimum Example**

```yaml
resources:
- url: /local/custom-lovelace/upcoming-media-card/upcoming-media-card.js
  type: js
name: My Awesome Home
views:
- title: Media
  cards:
  - type: custom:upcoming-media-card
    service: sonarr  
```

**Example with all options**

```yaml
resources:
- url: /local/custom-lovelace/upcoming-media-card/upcoming-media-card.js
  type: js
name: My Awesome Home
views:
- title: Ugly Media
  cards:
  - type: custom:upcoming-media-card
    service: sonarr
    title: Crazy colors
    image_style: banner
    clock: 24
    max: 3
    show_color: 'var(--primary-text-color)'
    episode_color: 'blue'
    time_color: '#ffc0cb'
    downloaded_color: 'rgba(255,182,193, 0.8)'
    ribbon_color: 'pink'
    border_color: 'grey'
    text_shadows: 'off'
    box_shadows: 'off'
    media_type: movies
```

## Developers

**If you'd like to make your own component to feed this card:**

1. Make a sensor that follows this naming convention "sensor.sonarr_upcoming_media", replacing sonarr with your service.
2. The state of the sensor must be the amount of items (episodes, movies, etc.) to be listed.
3. The card looks for numbered attributes with values formatted like these examples:


TV:
```
banner1: https://www.thetvdb.com/banners/graphical/5b43a197b530e.jpg
poster1: https://www.thetvdb.com/banners/_cache/posters/290853-15.jpg
title1: Fear the Walking Dead
subtitle1: Weak
airdate1: 2018-09-03T01:00:00Z
hasFile1: false
info1: S04E12
banner2: https://www.thetvdb.com/banners/graphical/239851-g.jpg
poster2: https://www.thetvdb.com/banners/_cache/posters/239851-2.jpg
title2: Penn & Teller: Fool Us
subtitle2: The Fool Us Zone
airdate2: 2018-09-04T00:00:00Z
hasFile2: false
info2: S05E11b
```
Movies:
```
poster1: https://www.thetvdb.com/banners/_cache/posters/290853-15.jpg
banner1: https://www.thetvdb.com/banners/_cache/posters/290853-15.jpg
title1: Solo: A Star Wars Story
subtitle1: 
airdate1: 2018-09-14T00:00:00Z
info1: Available 
hasFile1: false
poster2: https://www.thetvdb.com/banners/_cache/posters/290853-15.jpg
banner2: https://www.thetvdb.com/banners/_cache/posters/290853-15.jpg
title2: Patient Zero
subtitle2: 
airdate2: 2018-10-22T00:00:00Z
info2: Available 
hasFile2: false
```

Then all the user needs to do is put your service name in the config like so "service: sonarr".</br>
Please inform me if you create one and I'll add it to the list.</br>
If you need special styling or edits to the card to accomidate your service, just ask or submit a PR.</br></br>

Thanks!
