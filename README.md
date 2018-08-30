# Upcoming-Media-Card
Lovelace card for Home Assistant. Displays upcoming episodes and movies. </br></br>
**Requires an "upcoming-media" custom component**</br>
This card will only work if you've installed one of the upcoming-media components found here:

* [Sonarr]() Haven't uploaded to github yet (Hold your horses, bub. I'm working on it, like, seriously. I'm currently doing it.). 
* [Radarr]() Coming Soon

</br></br>

| Poster View | Banner View 
| ---- | ---- 
| <img src="https://imgur.com/gKHbplv.jpg" alt="Screenshot 1" width="250"> | <img src="https://imgur.com/mA7cdZv.jpg" alt="Screenshot 1" width="250">

## Features:
* Poster and banner views.
* Almost everything can have its color changed with any css color value.
* Language can be changed for days of the week.
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
| type | string | **Required** | `custom: upcoming-media-card`
| service | string | **Required** | Name of the service from custom component. If using the sonarr_upcoming_media component this would be "service: sonarr"
| title | string | Optional | Card title
| image_style | string | poster | Style of images used, either poster or banner.
| clock | number | 12 | Display times in 12 or 24 hour format.
| locale | string | 'en-US' | Change language for days of the week. [Good list of locale codes here.](https://stackoverflow.com/questions/3191664/list-of-all-locales-and-their-short-codes)
| max | number | Optional | How many episodes to display within time range (time range set in component). Default is unlimited.
| show_color | string | 'var(--primary-text-color)' | Color of the show's name. Default in banner view is '#fff'.
| episode_color | string | 'var(--primary-text-color)' | Color of the episode's name. Default in banner view is '#fff'.
| time_color | string | 'var(--primary-text-color)' | Color of the show's air time. Default in banner view is '#fff'.
| downloaded_color | string | 'var(--primary-color)' | Color of downloaded indicator. Air time is replaced with "Downloaded" when episode has completed. Default in banner view is '#fff'.
| ribbon_color | string | 'var(--primary-color)' | Color of ribbon extending from border. Default in banner view is '#000'.
| border_color | string | '#fff' | Color of border around image. Default in banner view is '#000'.

**Bare Minimum Example**

```yaml
resources:
- url: /local/custom-lovelace/upcoming-media-card/upcoming-media-card.js
  type: js
name: My Awesome Home
views:
- title: Media
  cards:
  - type: custom: upcoming-media-card
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
  - type: custom: upcoming-media-card
    service: sonarr
    title: This will be ugly
    image_style: banner
    locale: 'es-MX'
    clock: 24
    max: 3
    show_color: 'var(--primary-text-color)'
    episode_color: 'blue'
    time_color: '#ffc0cb'
    downloaded_color: 'rgba(255,182,193, 0.8)'
    ribbon_color: 'pink'
    border_color: 'grey'
```
