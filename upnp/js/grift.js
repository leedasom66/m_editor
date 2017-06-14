
function grift() {

    // window.addEventListener('load', function () {
        window.awe.init({
            device_type: awe.AUTO_DETECT_DEVICE_TYPE,
            settings: {
                container_id: document.getElementById('webCam').id,
                default_camera_position: {x: 0, y: 0, z: 0},
                default_lights: [
                    {
                        id: 'point_light',
                        type: 'point',
                        color: 0x666666
                    },
                ],
            },

            ready: function () {
                awe.util.require([
                    {
                        capabilities: ['gum', 'webgl'],
                        files: [
                            ['awe-standard-dependencies.js', 'awe-standard.js'],
                            'awe-rift-dependencies.js',
                        ],
                        success: function () {
                            var device_type = awe.device_type();
                            var browser_unsupported = false;
                            if (device_type != 'pc') {
                                browser_unsupported = true;
                            }
                            if (browser_unsupported) {
                                document.body.innerHTML = '<p>This demo currently requires a standards compliant browser that supports WebRTC (gUM) and WebGL. This also requires the open source <a href="https://github.com/Instrument/oculus-bridge/tree/master/app/build">Oculus Bridge</a> and an <a href="http://www.oculusvr.com/">Oculus Rift</a></p>';
                                return;
                            }

                            // setup and paint the scene
                            awe.setup_scene();

                            // add some points of interest
                            awe.pois.add({id: 'north', position: {x: 0, y: 0, z: 200}});
                            awe.pois.add({id: 'north_east', position: {x: 200, y: 0, z: 200}});
                            awe.pois.add({id: 'east', position: {x: 200, y: 0, z: 0}});
                            awe.pois.add({id: 'south_east', position: {x: 200, y: 0, z: -200}});
                            awe.pois.add({id: 'south', position: {x: 0, y: 0, z: -200}});
                            awe.pois.add({id: 'south_west', position: {x: -200, y: 0, z: -200}});
                            awe.pois.add({id: 'west', position: {x: -200, y: 0, z: 0}});
                            awe.pois.add({id: 'north_west', position: {x: -200, y: 0, z: 200}});

                            // add projections to each of the pois
                            awe.projections.add({
                                id: 'n',
                                geometry: {shape: 'cube', x: 50, y: 50, z: 50},
                                rotation: {x: 30, y: 30, z: 0},
                                material: {
                                    type: 'phong',
                                    color: 0xFF0000,
                                },
                            }, {poi_id: 'north'});

                            awe.projections.add({
                                id: 'ne',
                                geometry: {shape: 'sphere', radius: 10},
                                material: {
                                    type: 'phong',
                                    color: 0xCCCCCC,
                                },
                            }, {poi_id: 'north_east'});

                            awe.projections.add({
                                id: 'e',
                                geometry: {shape: 'cube', x: 50, y: 50, z: 50},
                                rotation: {x: 30, y: 30, z: 0},
                                material: {
                                    type: 'phong',
                                    color: 0x00FF00,
                                },
                            }, {poi_id: 'east'});

                            awe.projections.add({
                                id: 'se',
                                geometry: {shape: 'sphere', radius: 10},
                                material: {
                                    type: 'phong',
                                    color: 0xCCCCCC,
                                },
                            }, {poi_id: 'south_east'});

                            awe.projections.add({
                                id: 's',
                                geometry: {shape: 'cube', x: 50, y: 50, z: 50},
                                rotation: {x: 30, y: 30, z: 0},
                                material: {
                                    type: 'phong',
                                    color: 0xFFFFFF,
                                },
                            }, {poi_id: 'south'});

                            awe.projections.add({
                                id: 'sw',
                                geometry: {shape: 'sphere', radius: 10},
                                material: {
                                    type: 'phong',
                                    color: 0xCCCCCC,
                                },
                            }, {poi_id: 'south_west'});

                            awe.projections.add({
                                id: 'w',
                                geometry: {shape: 'cube', x: 50, y: 50, z: 50},
                                rotation: {x: 30, y: 30, z: 0},
                                material: {
                                    type: 'phong',
                                    color: 0x0000FF,
                                },
                            }, {poi_id: 'west'});

                            awe.projections.add({
                                id: 'nw',
                                geometry: {shape: 'sphere', radius: 10},
                                material: {
                                    type: 'phong',
                                    color: 0xCCCCCC,
                                },
                            }, {poi_id: 'north_west'});

                            // load plugin after you've setup the scene
                            awe.util.require([
                                {
                                    capabilities: [],
                                    files: ['awe.grift_ar.js'],
                                }
                            ]);
                        },
                    },
                    {
                        capabilities: [],
                        files: [],
                        success: function () {
                            document.body.innerHTML = '<p>This demo currently requires a standards compliant browser that supports WebRTC (gUM) and WebGL. This also requires the open source <a href="https://github.com/Instrument/oculus-bridge/tree/master/app/build">Oculus Bridge</a> and an <a href="http://www.oculusvr.com/">Oculus Rift</a></p>';
                            return;
                        },

                    },
                ]);
            }
        });
    // });

}
/**
 * Created by leeda on 2017-05-25.
 */
