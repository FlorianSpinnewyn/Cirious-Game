import { MapControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
let camera,
    scene,
    controls,
    renderer,
    stats,
    light;

init()
animate()

function init()
{
    /**------Affichage FPS------**/
    //stats = new Stats()
    //stats.showPanel(0)
    //document.body.appendChild(stats.dom)

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
    light.castShadow = false
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
    controls.maxPolarAngle = Math.PI / 2;

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
    });


}

function animate()
{
    //stats.begin()
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
    //stats.end()
}
