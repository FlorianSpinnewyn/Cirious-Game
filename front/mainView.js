import { MapControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";


let camera,
    scene,
    controls,
    renderer,
    stats,
    mixer,
    light;
    
const clock = new THREE.Clock();

init()
animate()

function init()
{
    /**------Affichage FPS------**/
    stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)

    /**------Scene et Fog------**/
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    const color = 0xFFFFFF;  // white
    const near = 10;
    const far = (500);
    scene.fog = new THREE.Fog(color, near, far);

    /**------Camera-----**/
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, .1, 1000 );
    camera.position.set( 200, 100, 0 );


    /**------Lumière-----**/
    light = new THREE.DirectionalLight(0x9a9a9a, 1)
    light.position.set(-300, 750, -300)
    light.rotation.y=Math.PI/4
    light.castShadow = true;           
    light.shadow.mapSize.width = 2048;  // default
    light.shadow.mapSize.height = 2048; // default
    light.shadow.camera.near = .5;       // default
    light.shadow.camera.far = 1000     // default
    light.shadow.camera.left = light.shadow.camera.bottom = -32
    light.shadow.camera.right = light.shadow.camera.top = 32
    light.shadow.bias = -0.00005
    scene.add(light)
    scene.add(new THREE.HemisphereLight(0xefefef, 0xffffff, 0.5))

    /**------Rendu-----**/
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('canvas'),
        antialias: true,
    })
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.gammaInput = renderer.gammaOutput = true
    renderer.gammaFactor = 2.0
    renderer.setSize(window.innerWidth, window.innerHeight)

    
    controls = new MapControls( camera, renderer.domElement );
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 50;
    controls.maxPolarAngle = 3*Math.PI / 8;

    /**------Axe-----**/
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    /**------map-----**/
    let loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/roadTexture.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer = new THREE.AnimationMixer( gltf.scene );
        mixer.clipAction( gltf.animations[ 0 ] ).play();
    });

    let interaction = new THREE.Interaction(renderer, scene, camera);
    
    /**------mairie-----**/
    loader.load('3d/TestBlender/road/mairie.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);
        gltf.scene.cursor = 'pointer';
        gltf.scene.on('click', function(ev){socket.emit("mairie");});
    });

    const material = new THREE.MeshBasicMaterial( {color: 0xff0000} );

    /**------notif ---- mairie-----**/
    const geom = new THREE.BoxGeometry( 0.3, 1, 0.3 );
    const material2 = new THREE.MeshBasicMaterial( {color: 0xef8607} );
    const notif = new THREE.Mesh( geom, material2 );
    notif.position.set(-10,2,-13)
    scene.add( notif );

    /**------kiosque-----**/
    const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
    const cube2 = new THREE.Mesh( geometry2, material );
    cube2.position.set(17,0,-17)
    scene.add( cube2 );
    cube2.cursor = 'pointer';
    cube2.on('click', function(ev){socket.emit("kiosque");});


    /**------Tecnhicentre-----**/
    loader.load('3d/TestBlender/road/technicentre.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);
        gltf.scene.cursor = 'pointer';
        gltf.scene.on('click', function(ev){
            console.log("Nous sommes au Technicentre :)");
            document.getElementById('reparationTrain').style.display='block';
            socket.emit("technicentre");
        });
    });
   

    /**------Parking-----**/
    const geometry4 = new THREE.BoxGeometry( 1, 1, 1 );
    const cube4 = new THREE.Mesh( geometry4, material );
    cube4.position.set(-10,0,3)
    scene.add( cube4 );
    cube4.cursor = 'pointer';
    cube4.on('click', function(ev){
        console.log("Nous sommes au parking :)");
        document.getElementById('reparationVoiture').style.display='block';
        socket.emit("parking");
    });

    /**------Garage-----**/
    const geometry5 = new THREE.BoxGeometry( 1, 1, 1 );
    const cube5 = new THREE.Mesh( geometry5, material );
    cube5.position.set(-17,0,10)
    scene.add( cube5 );
    cube5.cursor = 'pointer';
    cube5.on('click', function(ev){
        console.log("Nous sommes au garage :)");
        document.getElementById('stockVelo').style.display='block';
        socket.emit("garage");
    });

    /**------Atelier-----**/
    const geometry6 = new THREE.BoxGeometry( 1, 1, 1 );
    const cube6 = new THREE.Mesh( geometry6, material );
    cube6.position.set(1,0,2)
    scene.add( cube6 );
    cube6.cursor = 'pointer';
    cube6.on('click', function(ev){
        console.log("Nous sommes à l'atelier :)");
        document.getElementById('reparationMetro').style.display='block';
        socket.emit("atelier");
    });

    /**------Gare-----**/
    loader.load('3d/TestBlender/road/gare.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);
        gltf.scene.cursor = 'pointer';
        gltf.scene.on('click', function(ev){
            console.log("Nous sommes à la gare :)");
            document.getElementById('horaireTrain').style.display='block';
            socket.emit("gare", 1);
        });
    });

    /**------fleche ---- gare-----**/
    const geom2 = new THREE.BoxGeometry( 0.3, 1, 0.3 );
    const fleche = new THREE.Mesh( geom2, material2 );
    fleche.position.set(-1,2,-19)
    scene.add( fleche );

    /**------StationVelo1-----**/
    const geometry8 = new THREE.BoxGeometry( 1, 1, 1 );
    const cube8 = new THREE.Mesh( geometry8, material );
    cube8.position.set(-11,0,-19)
    scene.add( cube8 );
    cube8.cursor = 'pointer';
    cube8.on('click', function(ev){
        console.log("Nous sommes à la station de vélo n°1 :)");
        document.getElementById('veloRestants').style.display='block';
        socket.emit("velo", 1);
    });

    /**------fleche ---- StationVelo1 -----**/
    const geom3 = new THREE.BoxGeometry( 0.3, 1, 0.3 );
    const fleche1 = new THREE.Mesh( geom3, material2 );
    fleche1.position.set(-11,2,-19)
    scene.add( fleche1 );

    /**------StationVelo3-----**/
    const geometry9 = new THREE.BoxGeometry( 1, 1, 1 );
    const cube9 = new THREE.Mesh( geometry9, material );
    cube9.position.set(1,0,-17)
    scene.add( cube9 );
    cube9.cursor = 'pointer';
    cube9.on('click', function(ev){
        console.log("Nous sommes à la station de vélo n°3 :)");
        document.getElementById('veloRestants').style.display='block';
        socket.emit("velo", 3);
    });

    /**------fleche ---- StationVelo3-----**/
    const geom4 = new THREE.BoxGeometry( 0.3, 1, 0.3 );
    const fleche2 = new THREE.Mesh( geom4, material2 );
    fleche2.position.set(1,2,-17)
    scene.add( fleche2 );

    /**------StationMetro1-----**/
    const geometry10 = new THREE.BoxGeometry( 1, 1, 1 );
    const cube10 = new THREE.Mesh( geometry10, material );
    cube10.position.set(-3,0,-17)
    scene.add( cube10 );
    cube10.cursor = 'pointer';
    cube10.on('click', function(ev){
        console.log("Nous sommes à la station de métro n°1 :)");
        document.getElementById('horaireMetro').style.display='block';
        socket.emit("metro", 1);
    });

    /**------fleche ---- StationMetro1 -----**/
    const geom5 = new THREE.BoxGeometry( 0.3, 1, 0.3 );
    const fleche3 = new THREE.Mesh( geom5, material2 );
    fleche3.position.set(-3,2,-17)
    scene.add( fleche3 );

    /**------StationMetro10-----**/
    const geometry11 = new THREE.BoxGeometry( 1, 1, 1 );
    const cube11 = new THREE.Mesh( geometry11, material );
    cube11.position.set(1,0,-9)
    scene.add( cube11 );
    cube11.cursor = 'pointer';
    cube11.on('click', function(ev){
        console.log("Nous sommes à la station de métro n°10 :)");
        document.getElementById('horaireMetro').style.display='block';
        socket.emit("metro", 10);
    });

    /**------fleche ---- StationMetro10 -----**/
    //const geom6 = new THREE.BoxGeometry( 0.3, 1, 0.3 );
    //const fleche4 = new THREE.Mesh( geom6, material2 );
    //fleche4.position.set(1,2,-9)
    //scene.add( fleche4 );

    /**------fleche ---- Stade -----**/
    //const geom7 = new THREE.BoxGeometry( 0.3, 1, 0.3 );
    //const fleche5 = new THREE.Mesh( geom7, material2 );
    //fleche5.position.set(1,2,-9)
    //scene.add( fleche5 );

}

function animate()
{
    stats.begin()

    requestAnimationFrame( animate );
    const delta = clock.getDelta();

    mixer.update(delta)   
    controls.update();
    renderer.render( scene, camera );
    stats.end()

}

