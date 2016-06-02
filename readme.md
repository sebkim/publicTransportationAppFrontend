# Public Transportation App Frontend

I use Caltrain GTFS information.

This project is for senior web developer nanodegree program of udacity. It basically shows the departure time and arrival time of two stations. A user should choose two stations, a direction of a trip (north or southbound), and weekdays or Saturday or Sunday. It can work even offline (by exploiting the power of serviceworker).

This app was supposed to provide realtime information when it is able to connect online. However, Caltrain does not allow cross origin resource sharing. Thus, I cannot get realtime information. I found one solution to get realtime information using curl (curl can really change origin). However, node-libcurl does not work on the web-browser only environment.

It is developed under Version 53.0.2751.0 canary (64-bit).

## Requirement

It requires bower, and npm.

## Usage

* `npm install` (install required packages)
* `npm run install_bower_comps` (to install related bower_components)
* `npm run serve` (initialize and run watch and server)

./publicTransportationAppFrontend/index.html file is the entrance.

After run `npm run serve`, open the chrome browser and type http://localhost:8080/publicTransportationAppFrontend/
