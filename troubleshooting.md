# Troubleshooting:

Follow the instructions below before posting an issue or asking for help on the forums.

If you're having issues with the card, make sure it's not contained inside another card in your ui-lovelace.yaml to rule out
issues with the container card.

Make sure you installed the custom components. This card only works with the custom-components linked in the readme of this card.

**When asking for help on the forums or posting an issue on github, please be sure to indicate that you tried these steps and report your findings.**

## Components

First thing to check is if the components are reporting any data. You can find this in your HA sidebar under developer tools. Click
the icon that looks like this <>. To help with troubleshooting always mention what you see here next to your sensor (sensor.sonarr_upcoming_media, for example). Keep in mind that "sensor.sonarr_upcoming" & "sensor.radarr_upcoming" are not the components for this card, they are the default HA components. The sonarr and radarr components for this card end in "media".

Try the default Home Assistant components for the service you are using to see if they're working. If they are having issues as well it is a good indication that there are issues with the service and not the components.

Below are some links to try in your browser to test your connection and api needed for the components.
If you do not get any info from the links below, one or all of the following may be true:

* there are issues with the service that you are using
* IP, port, SSL, api key, or token may be incorrect.
* there are no items to report in your set timeframe.

These are not issues related to the card or components and need addressed with the service you are using.

## Radarr & Sonarr:
For start and end date use "YYYY-MM-DD" format like so: "2018-09-31"
Start date should be todays date and end date should be as far into the future as you set the component. Use the IP and port of your
Radarr or Sonarr server.
`````
http(s)://[IP]:[port]/api/calendar?apikey=[API_key]&start=[start_date]&end=[end_date]
`````
## Plex:
Use the IP and port of your Plex server.
`````
http(s)://[IP]:[port]/library/recentlyAdded?X-Plex-Token=[token]
`````

