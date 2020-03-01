mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fib28yMjA1IiwiYSI6ImNrNjB1amNmaDBiNWgzb21iZ29yYzlydDIifQ.CIV4EHUW6-8o6pFxQmvpLQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [6.95, 50.93333],
    zoom: 9.5,
    maxZoom: 16,
    minZoom: 8,
});

map.addControl(new mapboxgl.NavigationControl());

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);
// Fahrradmarkt Beginn
map.on('load', function() {
    map.addSource('Fahrradmarkt', {
        'type': 'geojson',
        'data': 'https://kaboo-sch.github.io/map/fahrrad.geojson',
    });

    map.loadImage(
        'Icons\\Fahrradflohmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Fahrrad', image)
        });

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
map.on('click', 'Fahrradmarkt', function(e) {
    map.flyTo({ center: e.features[0].geometry.coordinates });
});

map.on('mouseenter', 'Fahrradmarkt', function () {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'Fahrradmarkt', function () {
    map.getCanvas().style.cursor = '';
});

 //Fahrradmarkt Ende

//Flohmarkt Beginn
map.on('load', function() {
    map.addSource('Flohmarkt', {
        'type': 'geojson',
        'data':'https://kaboo-sch.github.io/map/Flohmarkt_Katrin_v02.geojson',
        cluster: true,
        clusterMaxZoom: 10,
        clusterRadius: 40
    });

    map.loadImage(
        'Icons\\Flohmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Flohmarkt', image)
        });

    map.addLayer({
        id: 'FlohmarktCL',
        type: 'circle',
        source: 'Flohmarkt',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': '#ffbfbf',
            'circle-radius': 18,

        }
    });

    map.addLayer({
        id: 'Flohmarkt-cluster-count',
        type: 'symbol',
        source: 'Flohmarkt',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,

        }
    });

    map.addLayer({
        id: 'Flohmarkt',
        type: 'symbol',
        source: 'Flohmarkt',
        filter: ['!', ['has', 'point_count']],
        layout: {
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
map.on('click', 'Flohmarkt', function(e) {
    map.flyTo({ center: e.features[0].geometry.coordinates });
});
// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'Flohmarkt', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Flohmarkt', function () {
    map.getCanvas().style.cursor = '';
});


map.on('click', 'FlohmarktCL', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['FlohmarktCL']
    });
    var clusterId = features[0].properties.cluster_id;
    map.getSource('Flohmarkt').getClusterExpansionZoom(
        clusterId,
        function(err, zoom) {
            if (err) return;

            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
            });
        }
    );
});

map.on('mouseenter', 'FlohmarktCL', function() {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'FlohmarktCL', function() {
    map.getCanvas().style.cursor = '';
});


//Flohmarkt Ende

//Antikmarkt Anfang
map.on('load', function() {
    map.addSource('Antikmarkt', {
        'type': 'geojson',
        'data':'https://kaboo-sch.github.io/map/Antikmarkt.geojson',
        cluster: true,
        clusterMaxZoom: 10,
        clusterRadius: 25
    });

    map.loadImage(
        'Icons\\Antikmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Antikmarkt', image)
        });

    map.addLayer({
        id: 'AntikmarktCL',
        type: 'circle',
        source: 'Antikmarkt',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': '#662626',
            'circle-radius': 18,
        }
    });

    map.addLayer({
        id: 'Antikmarkt-cluster-count',
        type: 'symbol',
        source: 'Antikmarkt',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'Antikmarkt',
        type: 'symbol',
        source: 'Antikmarkt',
        filter: ['!', ['has', 'point_count']],
        layout: {
            'icon-image': 'Antikmarkt',
            'icon-allow-overlap': true,
            'icon-size': 0.04,
        }
    });
});
map.on('click', 'Antikmarkt', function(e) {
    map.flyTo({ center: e.features[0].geometry.coordinates });
});

map.on('click', 'Antikmarkt', function (e) {
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
map.on('mouseenter', 'Antikmarkt', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Antikmarkt', function () {
    map.getCanvas().style.cursor = '';
});


map.on('click', 'AntikmarktCL', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['AntikmarktCL']
    });
    var clusterId = features[0].properties.cluster_id;
    map.getSource('Antikmarkt').getClusterExpansionZoom(
        clusterId,
        function(err, zoom) {
            if (err) return;

            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
            });
        }
    );
});

map.on('mouseenter', 'AntikmarktCL', function() {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'AntikmarktCL', function() {
    map.getCanvas().style.cursor = '';
});
//Antikmarkt Ende

map.on('load', function() {
    map.addSource('Designmarkt', {
        'type': 'geojson',
        'data':'https://kaboo-sch.github.io/map/designmaerkte.geojson',
        cluster: true,
        clusterMaxZoom: 10,
        clusterRadius: 25
    });

    map.loadImage(
        'Icons\\Designmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Designmarkt', image)
        });

    map.addLayer({
        id: 'DesignmarktCL',
        type: 'circle',
        source: 'Designmarkt',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': '#cc0d5a',
            'circle-radius': 18,
        }
    });

    map.addLayer({
        id: 'Designmarkt-cluster-count',
        type: 'symbol',
        source: 'Designmarkt',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Corbal', 'Corbal'],
            'text-size': 18,
        }
    });

    map.addLayer({
        id: 'Designmarkt',
        type: 'symbol',
        source: 'Designmarkt',
        filter: ['!', ['has', 'point_count']],
        layout: {
            'icon-image': 'Designmarkt',
            'icon-allow-overlap': true,
            'icon-size': 0.04,
        }
    });
});

map.on('click', 'Designmarkt', function (e) {
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
map.on('click', 'Designmarkt', function(e) {
    map.flyTo({ center: e.features[0].geometry.coordinates });
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'Designmarkt', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Designmarkt', function () {
    map.getCanvas().style.cursor = '';
});




map.on('click', 'DesignmarktCL', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['DesignmarktCL']
    });
    var clusterId = features[0].properties.cluster_id;
    map.getSource('Designmarkt').getClusterExpansionZoom(
        clusterId,
        function(err, zoom) {
            if (err) return;

            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
            });
        }
    );
});

map.on('mouseenter', 'DesignmarktCL', function() {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'DesignmarktCL', function() {
    map.getCanvas().style.cursor = '';
});


//Designmarkt Ende

//Beginn Wochenmarkt

map.on('load', function() {
    map.addSource('Wochenmarkt', {
        'type': 'geojson',
        'data':'https://kaboo-sch.github.io/map/Wochenmarkt.geojson',
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 45
    });
    map.loadImage(
        'Icons\\Wochenmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Wochenmarkt', image)
        });

    map.addLayer({
        id: 'WochenmarktCL',
        type: 'circle',
        source: 'Wochenmarkt',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': '#cc810e',
            'circle-radius': 18,
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'Wochenmarkt',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'Wochenmarkt',
        type: 'symbol',
        source: 'Wochenmarkt',
        filter: ['!', ['has', 'point_count']],
        layout: {
            'icon-image': 'Wochenmarkt',
            'icon-allow-overlap': true,
            'icon-size': 0.04,
        }
    });

    map.on('click', 'Wochenmarkt', function(e) {
        map.flyTo({ center: e.features[0].geometry.coordinates });
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

// inspect a cluster on click
    map.on('click', 'WochenmarktCL', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['WochenmarktCL']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('Wochenmarkt').getClusterExpansionZoom(
            clusterId,
            function(err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    map.on('mouseenter', 'WochenmarktCL', function() {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'WochenmarktCL', function() {
        map.getCanvas().style.cursor = '';
    });
});
//Wochenmarkt Ende

//Kinderflohmarkt Anfang
map.on('load', function() {
    map.addSource('Kinderflohmarkt', {
        'type': 'geojson',
        'data':'https://kaboo-sch.github.io/map/kinderflohmarkt.geojson',
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 45
    });
    map.loadImage(
        'Icons\\Kinderflohmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Kinderflohmarkt', image)
        });

    map.addLayer({
        id: 'KinderflohmarktCL',
        type: 'circle',
        source: 'Kinderflohmarkt',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': '#cc810e',
            'circle-radius': 18,
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'Kinderflohmarkt',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'Kinderflohmarkt',
        type: 'symbol',
        source: 'Kinderflohmarkt',
        filter: ['!', ['has', 'point_count']],
        layout: {
            'icon-image': 'Kinderflohmarkt',
            'icon-allow-overlap': true,
            'icon-size': 0.04,
        }
    });

    map.on('click', 'Kinderflohmarkt', function(e) {
        map.flyTo({ center: e.features[0].geometry.coordinates });
    });
    map.on('click', 'Kinderflohmarkt', function (e) {
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
    map.on('mouseenter', 'Kinderflohmarkt', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Kinderflohmarkt', function () {
        map.getCanvas().style.cursor = '';
    });

// inspect a cluster on click
    map.on('click', 'KinderflohmarktCL', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['KinderflohmarktCL']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('Kinderflohmarkt').getClusterExpansionZoom(
            clusterId,
            function(err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    map.on('mouseenter', 'KinderflohmarktCL', function() {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'KinderflohmarktCL', function() {
        map.getCanvas().style.cursor = '';
    });
});
//Kinderflohmarkt Ende

// Nachtflohmarkt Anfang

map.on('load', function() {
    map.addSource('Nachtflohmarkt', {
        'type': 'geojson',
        'data':'https://kaboo-sch.github.io/map/nachtflohmarkt.geojson',
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 45
    });
    map.loadImage(
        'Icons\\Nachtflohmarkt.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('Nachtflohmarkt', image)
        });

    map.addLayer({
        id: 'NachtflohmarktCL',
        type: 'circle',
        source: 'Nachtflohmarkt',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': '#cc810e',
            'circle-radius': 18,
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'Nachtflohmarkt',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'Nachtflohmarkt',
        type: 'symbol',
        source: 'Nachtflohmarkt',
        filter: ['!', ['has', 'point_count']],
        layout: {
            'icon-image': 'Nachtflohmarkt',
            'icon-allow-overlap': true,
            'icon-size': 0.04,
        }
    });

    map.on('click', 'Nachtflohmarkt', function(e) {
        map.flyTo({ center: e.features[0].geometry.coordinates });
    });
    map.on('click', 'Nachtflohmarkt', function (e) {
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
    map.on('mouseenter', 'Nachtflohmarkt', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Nachtflohmarkt', function () {
        map.getCanvas().style.cursor = '';
    });

// inspect a cluster on click
    map.on('click', 'NachtflohmarktCL', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['NachtflohmarktCL']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('Nachtflohmarkt').getClusterExpansionZoom(
            clusterId,
            function(err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    map.on('mouseenter', 'NachtflohmarktCL', function() {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'NachtflohmarktCL', function() {
        map.getCanvas().style.cursor = '';
    });
});



var toggleableLayerIds = ['Flohmarkt', 'Fahrradmarkt', 'Wochenmarkt', 'Antikmarkt', 'Designmarkt', 'Kinderflohmarkt', 'Nachtflohmarkt'];
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id ;

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

