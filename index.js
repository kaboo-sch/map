mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fib28yMjA1IiwiYSI6ImNrNWR2NHNzMDFrcWYzbXBrMHRmNWdlYWMifQ.EBbbdu-QU0EUToCpwWmI4g';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [6.95, 50.93333],
    zoom: 11.5,
    maxZoom: 16,
    minZoom: 10,
});


map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);
var url = 'https://kaboo-sch.github.io/map/fahrrad.geojson';
map.on('load', function() {
    window.setInterval(function() {
        map.getSource('fahrrad').setData(url);
    });
    map.loadImage(
        'Icons\\Fahrradflohmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Fahrrad', image)
        });

    map.addSource('fahrrad', { type: 'geojson', data: url });
    map.addLayer({
        'id': 'fahrrad',
        'type': 'symbol',
        'source': 'fahrrad',
        'layout': {
            'icon-image': 'Fahrrad',
            'icon-allow-overlap': true,
            'icon-size': 0.04,

        }
        });
});

map.on('click', 'fahrrad', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});

map.on('mouseenter', 'fahrrad', function () {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'fahrrad', function () {
    map.getCanvas().style.cursor = '';

});



var url2 = 'https://kaboo-sch.github.io/map/Flohmarkt_Katrin_v02.geojson';
map.on('load', function() {
    window.setInterval(function() {
        map.getSource('flohmarkt').setData(url2);
    });
    map.loadImage(
        'Icons\\Flohmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Flohmarkt', image)
        });

    map.addSource('flohmarkt', { type: 'geojson', data: url });
    map.addLayer({
        'id': 'flohmarkt',
        'type': 'symbol',
        'source': 'flohmarkt',
        'layout': {
            'icon-image': 'Flohmarkt',
            'icon-allow-overlap': true,
            'icon-size': 0.04,

        }
    });
});

map.on('click', 'flohmarkt', function (e) {
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
map.on('mouseenter', 'flohmarkt', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'flohmarkt', function () {
    map.getCanvas().style.cursor = '';
});


