mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fib28yMjA1IiwiYSI6ImNrNjB1amNmaDBiNWgzb21iZ29yYzlydDIifQ.CIV4EHUW6-8o6pFxQmvpLQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [6.95, 50.93333],
    zoom: 10.5,
    maxZoom: 16,
    minZoom: 9,
});


var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

var url = 'https://kaboo-sch.github.io/map/fahrrad.geojson';
map.on('load', function() {
    window.setInterval(function() {
        map.getSource('Fahrradmarkt').setData(url);
    });
    map.loadImage(
        'Icons\\Fahrradflohmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Fahrrad', image)
        });

    map.addSource('Fahrradmarkt', { type: 'geojson', data: url });
    map.addLayer({
        'id': 'Fahrradmarkt',
        'type': 'symbol',
        'source': 'Fahrradmarkt',
        'layout': {
            'icon-image': 'Fahrrad',
            'icon-allow-overlap': true,
            'icon-size': 0.04,

        }
        });
});

map.on('click', 'Fahrradmarkt', function (e) {
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

map.on('mouseenter', 'Fahrradmarkt', function () {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'Fahrradmarkt', function () {
    map.getCanvas().style.cursor = '';

});

var url2 = 'https://kaboo-sch.github.io/map/Flohmarkt_Katrin_v02.geojson';
map.on('load', function() {
    window.setInterval(function() {
        map.getSource('Flohmarkt').setData(url2);
    });
    map.loadImage(
        'Icons\\Flohmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Flohmarkt', image)
        });

    map.addSource('Flohmarkt', { type: 'geojson', data: url2 });
    map.addLayer({
        'id': 'Flohmarkt',
        'type': 'symbol',
        'source': 'Flohmarkt',
        'layout': {
            'icon-image': 'Flohmarkt',
            'icon-allow-overlap': true,
            'icon-size': 0.04,

        }
    });
});


map.on('click', 'Flohmarkt', function (e) {
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
map.on('mouseenter', 'Flohmarkt', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Flohmarkt', function () {
    map.getCanvas().style.cursor = '';
});


var url3 = 'https://kaboo-sch.github.io/map/Wochenmarkt.geojson';
map.on('load', function() {
    window.setInterval(function() {
        map.getSource('Wochenmarkt').setData(url3);
    });
    map.loadImage(
        'Icons\\Wochenmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Wochenmarkt', image)
        });

    map.addSource('Wochenmarkt', { type: 'geojson', data: url3 });
    map.addLayer({
        'id': 'Wochenmarkt',
        'type': 'symbol',
        'source': 'Wochenmarkt',
        'layout': {
            'icon-image': 'Wochenmarkt',
            'icon-allow-overlap': true,
            'icon-size': 0.04,

        }
    });
});


map.on('click', 'Wochenmarkt', function (e) {
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
map.on('mouseenter', 'Wochenmarkt', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Wochenmarkt', function () {
    map.getCanvas().style.cursor = '';
});



var toggleableLayerIds = ['Flohmarkt', 'Fahrradmarkt', 'Wochenmarkt'];
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function(e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

map.addControl(new mapboxgl.NavigationControl());