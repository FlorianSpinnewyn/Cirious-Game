

let camera,
    scene,
    controls,
    renderer,
    stats,
    mixer,
    mixer2,
    mixer3,
    mixer4,
    mixer5,
    mixer6,
    mixer7,
    mixer8,
    mixer9,
    mixer10,
    mixer11,
    mixer12,
    mixer13,
    mixer14,
    mixer15,
    light;
    
const clock = new THREE.Clock();



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

    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 50;
    controls.maxPolarAngle = 3*Math.PI / 8;

    /**------Axe-----**/
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    const loadingManager = new THREE.LoadingManager( () => {
	
		const loadingScreen = document.getElementById( 'loading-screen' );
		loadingScreen.classList.add( 'fade-out' );
		document.getElementById("home").style.display = "block";
        document.getElementById('loading-screen').style.display = "none";
		// optional: remove loader from DOM via event listener
		loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
		
	} );
    
    /**------map-----**/
    let loader = new THREE.GLTFLoader( loadingManager );
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

        /**------Voiture1-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_1/Voiture1.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer2 = new THREE.AnimationMixer( gltf.scene );
        mixer2.clipAction( gltf.animations[ 0   ] ).play();
    
    });

    /**------Voiture2-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_2/Voiture2.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer3 = new THREE.AnimationMixer( gltf.scene );
        mixer3.clipAction( gltf.animations[ 0   ] ).play();
    
    });

    /**------Voiture3-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_3/Voiture3.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer4 = new THREE.AnimationMixer( gltf.scene );
        mixer4.clipAction( gltf.animations[ 0   ] ).play();
    
    });


    /**------Voiture4-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_4/Voiture4.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer5 = new THREE.AnimationMixer( gltf.scene );
        mixer5.clipAction( gltf.animations[ 0   ] ).play();
    
    });

    /**------Voiture5-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_5/Voiture5.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })
    
        scene.add(gltf.scene);
    
        mixer6 = new THREE.AnimationMixer( gltf.scene );
        mixer6.clipAction( gltf.animations[ 0   ] ).play();
        
    });

    /**------Voiture6-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_6/Voiture6.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer7 = new THREE.AnimationMixer( gltf.scene );
        mixer7.clipAction( gltf.animations[ 0   ] ).play();
    
    });


    /**------Voiture7-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_7/Voiture7.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer8 = new THREE.AnimationMixer( gltf.scene );
        mixer8.clipAction( gltf.animations[ 0   ] ).play();
    
    });


    /**------Voiture8-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_8/Voiture8.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer9 = new THREE.AnimationMixer( gltf.scene );
        mixer9.clipAction( gltf.animations[ 0   ] ).play();
    
    });

    /**------Voiture9-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_9/Voiture9.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer10 = new THREE.AnimationMixer( gltf.scene );
        mixer10.clipAction( gltf.animations[ 0   ] ).play();
    
    });


    /**------Voiture10-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_10/Voiture10.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer11 = new THREE.AnimationMixer( gltf.scene );
        mixer11.clipAction( gltf.animations[ 0   ] ).play();
    
    });


    /**------Voiture11-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_11/Voiture11.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer12 = new THREE.AnimationMixer( gltf.scene );
        mixer12.clipAction( gltf.animations[ 0   ] ).play();
    
    });



    /**------Voiture12-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_12/Voiture12.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer13 = new THREE.AnimationMixer( gltf.scene );
        mixer13.clipAction( gltf.animations[ 0   ] ).play();
    
    });

    /**------Voiture13-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_13/Voiture13.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer14 = new THREE.AnimationMixer( gltf.scene );
        mixer14.clipAction( gltf.animations[ 0   ] ).play();
    
    });



    /**------Voiture14-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_14/Voiture14.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);

        mixer15 = new THREE.AnimationMixer( gltf.scene );
        mixer15.clipAction( gltf.animations[ 0   ] ).play();
    
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
    loader.load('3d/TestBlender/road/kiosque.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);
        gltf.scene.cursor = 'pointer';
        gltf.scene.on('click', function(ev){socket.emit("kiosque");});
    });



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

     /**------Perso-----**/

     //BLOC 1
    const geometry12 = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    const cube12 = new THREE.Mesh( geometry12, material );
    cube12.name="0.7.N"
    cube12.visible=false;
    cube12.position.set(-5,0,-19-0.82);
    scene.add( cube12 );
    cube12.cursor = 'pointer';
    cube12.on('click', function(ev){
        
    });

    const cube13 = new THREE.Mesh( geometry12, material );
    cube13.name="0.7.S"
    cube13.visible=false;
    cube13.position.set(-5,0,-19+0.82);
    scene.add( cube13 );
    cube13.cursor = 'pointer';
    cube13.on('click', function(ev){
        
    });

    const cube14 = new THREE.Mesh( geometry12, material );
    cube14.name="0.7.E"
    cube14.visible=false;
    cube14.position.set(-5+0.82 ,0,-19);
    scene.add( cube14 );
    cube14.cursor = 'pointer';
    cube14.on('click', function(ev){
        
    });

    const cube15 = new THREE.Mesh( geometry12, material );
    cube15.name="0.7.O"
    cube15.visible=false;
    cube15.position.set(-5-0.82 ,0,-19);
    scene.add( cube15 );
    cube15.cursor = 'pointer';
    cube15.on('click', function(ev){
        
    });

     //BLOC 2
     const cube16 = new THREE.Mesh( geometry12, material );
     cube16.name="1.7.N"
     cube16.visible=false;
     cube16.position.set(-5,0,-17-0.82);
     scene.add( cube16 );
     cube16.cursor = 'pointer';
     cube16.on('click', function(ev){
         
     });
 
     const cube17 = new THREE.Mesh( geometry12, material );
     cube17.name="1.7.S"
     cube17.visible=false;
     cube17.position.set(-5,0,-17+0.82);
     scene.add( cube17 );
     cube17.cursor = 'pointer';
     cube17.on('click', function(ev){
         
     });
 
     const cube18 = new THREE.Mesh( geometry12, material );
     cube18.name="1.7.E"
     cube18.visible=false;
     cube18.position.set(-5+0.82 ,0,-17);
     scene.add( cube18 );
     cube18.cursor = 'pointer';
     cube18.on('click', function(ev){
         
     });
 
     const cube19 = new THREE.Mesh( geometry12, material );
     cube19.name="1.7.O"
     cube19.visible=false;
     cube19.position.set(-5-0.82 ,0,-17);
     scene.add( cube19 );
     cube19.cursor = 'pointer';
     cube19.on('click', function(ev){
         
     });

     //BLOC 3
     const cube20 = new THREE.Mesh( geometry12, material );
     cube20.name="1.8.N"
     cube20.visible=false;
     cube20.position.set(-3,0,-17-0.82);
     scene.add( cube20 );
     cube20.cursor = 'pointer';
     cube20.on('click', function(ev){
         
     });
 
     const cube21 = new THREE.Mesh( geometry12, material );
     cube21.name="1.8.S"
     cube21.visible=false;
     cube21.position.set(-3,0,-17+0.82);
     scene.add( cube21 );
     cube21.cursor = 'pointer';
     cube21.on('click', function(ev){
         
     });
 
     const cube22 = new THREE.Mesh( geometry12, material );
     cube22.name="1.8.E"
     cube22.visible=false;
     cube22.position.set(-3+0.82 ,0,-17);
     scene.add( cube22 );
     cube22.cursor = 'pointer';
     cube22.on('click', function(ev){
         
     });
 
     const cube23 = new THREE.Mesh( geometry12, material );
     cube23.name="1.8.O"
     cube23.visible=false;
     cube23.position.set(-3-0.82 ,0,-17);
     scene.add( cube23 );
     cube23.cursor = 'pointer';
     cube23.on('click', function(ev){
         
     });


    
    //BLOC 4
     const cube24 = new THREE.Mesh( geometry12, material );
     cube24.name="1.9.N"
     cube24.visible=false;
     cube24.position.set(-1,0,-17-0.82);
     scene.add( cube24 );
     cube24.cursor = 'pointer';
     cube24.on('click', function(ev){
         
     });
 
     const cube25 = new THREE.Mesh( geometry12, material );
     cube25.name="1.9.S"
     cube25.visible=false;
     cube25.position.set(-1,0,-17+0.82);
     scene.add( cube25 );
     cube25.cursor = 'pointer';
     cube25.on('click', function(ev){
         
     });
 
     const cube26 = new THREE.Mesh( geometry12, material );
     cube26.name="1.9.E"
     cube26.visible=false;
     cube26.position.set(-1+0.82 ,0,-17);
     scene.add( cube26 );
     cube26.cursor = 'pointer';
     cube26.on('click', function(ev){
         
     });
 
     const cube27 = new THREE.Mesh( geometry12, material );
     cube27.name="1.9.O"
     cube27.visible=false;
     cube27.position.set(-1-0.82 ,0,-17);
     scene.add( cube27 );
     cube27.cursor = 'pointer';
     cube27.on('click', function(ev){
         
     });

    //BLOC 5
     const cube28 = new THREE.Mesh( geometry12, material );
     cube28.name="1.10.N"
     cube28.visible=false;
     cube28.position.set(1,0,-17-0.82);
     scene.add( cube28 );
     cube28.cursor = 'pointer';
     cube28.on('click', function(ev){
         
     });
 
     const cube29 = new THREE.Mesh( geometry12, material );
     cube29.name="1.10.S"
     cube29.visible=false;
     cube29.position.set(1,0,-17+0.82);
     scene.add( cube29 );
     cube29.cursor = 'pointer';
     cube29.on('click', function(ev){
         
     });
 
     const cube30 = new THREE.Mesh( geometry12, material );
     cube30.name="1.10.E"
     cube30.visible=false;
     cube30.position.set(1+0.82 ,0,-17);
     scene.add( cube30 );
     cube30.cursor = 'pointer';
     cube30.on('click', function(ev){
         
     });
 
     const cube31 = new THREE.Mesh( geometry12, material );
     cube31.name="1.10.O"
     cube31.visible=false;
     cube31.position.set(1-0.82 ,0,-17);
     scene.add( cube31 );
     cube31.cursor = 'pointer';
     cube31.on('click', function(ev){
         
     });

    //BLOC 6
     const cube32 = new THREE.Mesh( geometry12, material );
     cube32.name="1.11.N"
     cube32.visible=false;
     cube32.position.set(3,0,-17-0.82);
     scene.add( cube32 );
     cube32.cursor = 'pointer';
     cube32.on('click', function(ev){
         
     });
 
     const cube33 = new THREE.Mesh( geometry12, material );
     cube33.name="1.11.S"
     cube33.visible=false;
     cube33.position.set(3,0,-17+0.82);
     scene.add( cube33 );
     cube33.cursor = 'pointer';
     cube33.on('click', function(ev){
         
     });
 
     const cube34 = new THREE.Mesh( geometry12, material );
     cube34.name="1.11.E"
     cube34.visible=false;
     cube34.position.set(3+0.82 ,0,-17);
     scene.add( cube34 );
     cube34.cursor = 'pointer';
     cube34.on('click', function(ev){
         
     });
 
     const cube35 = new THREE.Mesh( geometry12, material );
     cube35.name="1.11.O"
     cube35.visible=false;
     cube35.position.set(3-0.82 ,0,-17);
     scene.add( cube35 );
     cube35.cursor = 'pointer';
     cube35.on('click', function(ev){
         
     });

    //BLOC 7
     const cube36 = new THREE.Mesh( geometry12, material );
     cube36.name="0.11.N"
     cube36.visible=false;
     cube36.position.set(3,0,-19-0.82);
     scene.add( cube36 );
     cube36.cursor = 'pointer';
     cube36.on('click', function(ev){
         
     });
 
     const cube37 = new THREE.Mesh( geometry12, material );
     cube37.name="0.11.S"
     cube37.visible=false;
     cube37.position.set(3,0,-19+0.82);
     scene.add( cube37 );
     cube37.cursor = 'pointer';
     cube37.on('click', function(ev){
         
     });
 
     const cube38 = new THREE.Mesh( geometry12, material );
     cube38.name="0.11.E"
     cube38.visible=false;
     cube38.position.set(3+0.82 ,0,-19);
     scene.add( cube38 );
     cube38.cursor = 'pointer';
     cube38.on('click', function(ev){
         
     });
 
     const cube39 = new THREE.Mesh( geometry12, material );
     cube39.name="0.11.O"
     cube39.visible=false;
     cube39.position.set(3-0.82 ,0,-19);
     scene.add( cube39 );
     cube39.cursor = 'pointer';
     cube39 .on('click', function(ev){
         
     });


}



function animate()
{
    stats.begin()

    requestAnimationFrame( animate );
    const delta = clock.getDelta();
    mixer15.update(delta);
    mixer14.update(delta);
    mixer13.update(delta);
    mixer12.update(delta);
    mixer11.update(delta);
    mixer10.update(delta);
    mixer9.update(delta);
    mixer8.update(delta);
    mixer7.update(delta);
    mixer6.update(delta);
    mixer5.update(delta);
    mixer4.update(delta);
    mixer3.update(delta);   
    mixer2.update(delta);
    mixer.update(delta);   
    controls.update();
    renderer.render( scene, camera );
    stats.end()

}

function ajoutPersonne(personne) {

    scene.getObjectByName(personne.depart).visible=true;
}

function suppPersonne(personne) {

    scene.getObjectByName(personne.depart).visible=false;
}

init();
animate();



