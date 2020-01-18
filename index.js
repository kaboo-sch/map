mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fib28yMjA1IiwiYSI6ImNrNWR2NHNzMDFrcWYzbXBrMHRmNWdlYWMifQ.EBbbdu-QU0EUToCpwWmI4g';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',

    center: [6.95, 50.93333],
    zoom: 11,
    maxZoom: 16,
    //minZoom: 10,
});


map.on('load', function() {
    map.loadImage(
        'Icons\\Flohmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Flohmarkt', image)
            map.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'properties': {
                                    "description": "<strong>Stadtflohmarkt</strong> <br>Art: Flohmarkt <br>Ort: Luxemburgerstr. 124 <br>Barrierefrei: Ja <br>Outdoor/Indoor: Outdoor <br>Haltestelle: Haltestelle Weishausstraße mit den Linien 18, 142, 978<br>Eintritt: 0 Euro <br><a href='http://www.stadt-flohmarkt.de/' target='_blank'>www.stadt-flohmarkt.de </a>",
                                    "Name": "Stadflohmarkt",
                                    "Ort": "Luxemburgerstr. 124",
                                    "Barrierefrei": "Ja",
                                    "Outdoor/Indoor": "Outdoor",
                                    "Wie komme ich hin?": "Haltestelle Weisshausstraße mit der Linie 18, 142, 978",
                                    "Wann": "Jeden Samstag ab 6 Uhr",
                                    "Eintritt": "0 Euro ",
                                    "Link": "http://www.stadt-flohmarkt.de/",
                                    "Art": "Flohmarkt"
                                },
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [6.933156251907349,
                                        50.921716708228466]
                                }
                            },
                            {
                                'type': 'Feature',
                                'properties': {
                                    "description": "<strong>DIY Flohmarkt Balloni</strong> <br>Art: Designmarkt <br>Ort: Ehrenfeldgürtel 88<br>Barrierefrei: Ja <br>Outdoor/Indoor: Indoor <br>Haltestelle: Haltestelle Venloer Straße mit der Linie: 3,4,13,140,141,142 <br>Eintritt: 4 Euro <br><a href='https://diy-markt.com/portfolio_page/koeln-designmarkt/' target='_blank'> www.diy-markt./portfolio_page/koeln-designmarkt</a>",
                                    "Name": "Balloni",
                                    "Ort": "Ehrenfeldgürtel 88",
                                    "Barrierefrei": "Ja",
                                    "Outdoor/Indoor": "Indoor",
                                    "Wie komme ich hin?": "Haltestelle Venloer Straße; Line: 3,4,13,140,141,142",
                                    "Wann": "Sonntag 19. 03",
                                    "Eintritt": "4 Euro",
                                    "Link": "https://diy-markt.com/portfolio_page/koeln-designmarkt/",
                                    "Art": "Flohmarkt"

                                },
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [6.918087601661682,
                                        50.951002551477885]
                                }
                            },
                            {
                                'type': 'Feature',
                                'properties': {
                                    "Name": "Kölner Fahrradmarkt",
                                    "description": "<strong>Kölner Fahrradmarkt</strong> <br>Art: Fahrradmarkt  <br> Ort: Neptunplatz <br>Barrierefrei: Ja <br>Outdoor/Indoor: Outdoor <br>Haltestelle: Körnerstraße mit den Linien 3, 4 <br>Eintritt: 0 Euro <br><a href=http://www.fahrradmarkt-koeln.de/termine/'' target='_blank>www.fahrradmarkt-koeln.de</a>",
                                    "Ort": "Neptunplatz ",
                                    "Barrierefrei": "Ja",
                                    "Outdoor/Indoor": "Outdoor",
                                    "Wie komme ich hin?": "Haltestelle Körnerstraße mit den Linien 3, 4",
                                    "Wann": "25.01.2020, 15.02.2020, 21.03.2020",
                                    "Eintritt": "0 Euro ",
                                    "Link": "http://www.fahrradmarkt-koeln.de/termine/",
                                    "Art": "Fahrradmarkt"
                                },
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [6.9194555282592765,
                                        50.94755871181732]
                                }
                            },
                            {
                                'type': 'Feature',
                                'properties': {
                                    "description": "<strong>Klettenberggürtel Flohmarkt</strong> <br>Art: Flohmarkt <br>Ort: Klettenberggürtel <br>Barrierefrei: Ja <br>Outdoor/Indoor: Outdoor <br>Haltestelle: Klettenberggürtel mit der Linie 13, 18, 130 und 134 <br>Eintritt: 0 Euro <br><a href='http://troedeltipp.de/' target='_blank'>www.troedeltipp.de</a>",
                                    "ort": "Klettenberggürtel",
                                    "Barrierefrei": "Ja",
                                    "Outdoor/Indoor": "Outdoor",
                                    "Wie komme ich hin?": "Haltestelle: Sülzgürtel Linien: 13, 18, 130, 134",
                                    "Wann": "Dienstag 19.05",
                                    "Eintritt": "0 Euro",
                                    "Link": "www.troedeltipp.de",
                                    "Art": "Flohmarkt",
                                    "name": "<strong> Klettenbergg\u00fcrtel Flohmarkt</strong>"

                                },

                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [6.931707859039307,
                                        50.908458828142294]
                                }
                            },

                        ]
                    }
                },
                'layout': {
                    'icon-image': 'Flohmarkt',
                    'icon-size': 0.04,
                    'icon-allow-overlap': true
                }
            });
        });

    map.on('click', 'places', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;


// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });
});
