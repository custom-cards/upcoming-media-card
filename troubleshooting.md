# Troubleshooting:

Follow the instructions below before posting an issue or asking for help on the forums.

If you're having issues with the card, make sure it's not contained inside another card in your ui-lovelace.yaml to rule out
issues with the container card.

Make sure you installed the custom components. This card only works with the custom-components linked in the readme of this card.

## Components

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
