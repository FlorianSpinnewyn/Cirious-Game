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
    mixer16,
    mixer17,
    mixer18,
    mixer19,
    mixer20,
    mixer21,
    mixer22,
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
		loadingScreen.addEventListener( 'transitionend', ()=>{} );
		
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

        /**------Fleche ---- mairie-----**/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Fleche/fleche.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })
    
        scene.add(gltf.scene);
    
        mixer16 = new THREE.AnimationMixer( gltf.scene );
        mixer16.clipAction( gltf.animations[ 0   ] ).play();
      
    });
    //Fleche Gare
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Fleche/fleche.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
            gltf.scene.position.set(9,0,-6);
        })
    
        scene.add(gltf.scene);
    
        mixer17 = new THREE.AnimationMixer( gltf.scene );
        mixer17.clipAction( gltf.animations[ 0   ] ).play();
      
    });

     //Fleche Metro1
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             gltf.scene.scale.set(0.1,0.1, 0.1)
             gltf.scene.position.set(7,0,-4);
         })
     
         scene.add(gltf.scene);
     
         mixer18 = new THREE.AnimationMixer( gltf.scene );
         mixer18.clipAction( gltf.animations[ 0   ] ).play();
       
     });

     //Fleche Metro2
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             gltf.scene.scale.set(0.1,0.1, 0.1)
             gltf.scene.position.set(11,0,-4);
         })
     
         scene.add(gltf.scene);
     
         mixer19 = new THREE.AnimationMixer( gltf.scene );
         mixer19.clipAction( gltf.animations[ 0   ] ).play();
       
     });


     //Fleche Metro3
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             gltf.scene.scale.set(0.1,0.1, 0.1)
             gltf.scene.position.set(-1,0,-6);
         })
     
         scene.add(gltf.scene);
     
         mixer20 = new THREE.AnimationMixer( gltf.scene );
         mixer20.clipAction( gltf.animations[ 0 ] ).play();
       
     });

     //nuage
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Nuage/nuage.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             gltf.scene.scale.set(0.1,0.1, 0.1)
         
         })
     
         scene.add(gltf.scene);
     
         mixer21 = new THREE.AnimationMixer( gltf.scene );
         mixer21.clipAction( gltf.animations[ 0   ] ).play();
       
     });

     //nuage2
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Nuage/nuage2.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             gltf.scene.scale.set(0.1,0.1, 0.1)
         
         })
     
         scene.add(gltf.scene);
     
         mixer22 = new THREE.AnimationMixer( gltf.scene );
         mixer22.clipAction( gltf.animations[ 0   ] ).play();
       
     });



  
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
        });
    });


    /**------StationVelo1-----**/
    const geometry8 = new THREE.BoxGeometry( 1, 1, 1 );
    const cube8 = new THREE.Mesh( geometry8, material );
    cube8.position.set(-11,0,-19)
    scene.add( cube8 );
    cube8.cursor = 'pointer';
    cube8.on('click', function(ev){
        console.log("Nous sommes à la station de vélo n°1 :)");
        document.getElementById('veloRestants1').style.display='block';
        socket.emit("velo", 1);
    });


    /**------StationVelo3-----**/
    const geometry9 = new THREE.BoxGeometry( 1, 1, 1 );
    const cube9 = new THREE.Mesh( geometry9, material );
    cube9.position.set(1,0,-17)
    scene.add( cube9 );
    cube9.cursor = 'pointer';
    cube9.on('click', function(ev){
        console.log("Nous sommes à la station de vélo n°3 :)");
        document.getElementById('veloRestants2').style.display='block';
        socket.emit("velo", 3);
    });


    /**------StationMetro1-----**/
    loader.load('3d/TestBlender/road/metro1.glb', function(gltf){
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
            console.log("Nous sommes à la station de métro n°1 :)");
            document.getElementById('horaireMetro1').style.display='block';
        });
    });
    
    /**------StationMetro10-----**/
    loader.load('3d/TestBlender/road/metro10.glb', function(gltf){
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
            console.log("Nous sommes à la station de métro n°10 :)");
            document.getElementById('horaireMetro2').style.display='block';
        });
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
     const geometry12 = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );

     //BLOC 1
     let cube12;
     loader.load('3d/TestBlender/road/personnage.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube12=gltf.scene;
             cube12.scale.set(0.1,0.1, 0.1)
         })
 
         cube12.name="0.7.N"
         cube12.visible=true;
         cube12.position.set(-5,0,-19-0.82);
         scene.add( cube12 );
         cube12.cursor = 'pointer';
         cube12.on('click', function(ev){
             evenementClickPersonne("0.7.N")
         });
     });



     let cube13;
     loader.load('3d/TestBlender/road/personnage.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube13=gltf.scene;
             cube13.scale.set(0.1,0.1, 0.1)
         })
 
         cube13.name="0.7.S"
         cube13.visible=true;
         cube13.position.set(-5,0,-19+0.82);
         scene.add( cube13 );
         cube13.cursor = 'pointer';
         cube13.on('click', function(ev){
             evenementClickPersonne("0.7.S")
         });     
     });
    

    const cube14 = new THREE.Mesh( geometry12, material );
    cube14.name="0.7.E"
    cube14.visible=false;
    cube14.position.set(-5+0.82 ,0,-19);
    scene.add( cube14 );
    cube14.cursor = 'pointer';
    cube14.on('click', function(ev){
        evenementClickPersonne("0.7.E")
    });

    const cube15 = new THREE.Mesh( geometry12, material );
    cube15.name="0.7.O"
    cube15.visible=false;
    cube15.position.set(-5-0.82 ,0,-19);
    scene.add( cube15 );
    cube15.cursor = 'pointer';
    cube15.on('click', function(ev){
        evenementClickPersonne("0.7.O")
    });

    const cube40 = new THREE.Mesh( geometry12, material );
    cube40.name="0.7.NO"
    cube40.visible=false;
    cube40.position.set(-5-0.82,0,-19-0.82);
    scene.add( cube40 );
    cube40.cursor = 'pointer';
    cube40.on('click', function(ev){
        evenementClickPersonne("0.7.NO")
    });
    const cube41 = new THREE.Mesh( geometry12, material );
    cube41.name="0.7.NE"
    cube41.visible=false;
    cube41.position.set(-5+0.82,0,-19-0.82);
    scene.add( cube41 );
    cube41.cursor = 'pointer';
    cube41.on('click', function(ev){
        evenementClickPersonne("0.7.NE")
    });

    const cube42 = new THREE.Mesh( geometry12, material );
    cube42.name="0.7.SO"
    cube42.visible=false;
    cube42.position.set(-5-0.82,0,-19+0.82);
    scene.add( cube42 );
    cube42.cursor = 'pointer';
    cube42.on('click', function(ev){
        evenementClickPersonne("0.7.SO")
    });
    const cube43 = new THREE.Mesh( geometry12, material );
    cube43.name="0.7.SE"
    cube43.visible=false;
    cube43.position.set(-5+0.82,0,-19+0.82);
    scene.add( cube43 );
    cube43.cursor = 'pointer';
    cube43.on('click', function(ev){
        evenementClickPersonne("0.7.SE")
    });

     //BLOC 2
     const cube16 = new THREE.Mesh( geometry12, material );
     cube16.name="1.7.N"
     cube16.visible=false;
     cube16.position.set(-5,0,-17-0.82);
     scene.add( cube16 );
     cube16.cursor = 'pointer';
     cube16.on('click', function(ev){
        evenementClickPersonne("1.7.N")
     });
 
     const cube17 = new THREE.Mesh( geometry12, material );
     cube17.name="1.7.S"
     cube17.visible=false;
     cube17.position.set(-5,0,-17+0.82);
     scene.add( cube17 );
     cube17.cursor = 'pointer';
     cube17.on('click', function(ev){
        evenementClickPersonne("1.7.S")
     });
 
     const cube18 = new THREE.Mesh( geometry12, material );
     cube18.name="1.7.E"
     cube18.visible=false;
     cube18.position.set(-5+0.82 ,0,-17);
     scene.add( cube18 );
     cube18.cursor = 'pointer';
     cube18.on('click', function(ev){
        evenementClickPersonne("1.7.E")
     });
 
     const cube19 = new THREE.Mesh( geometry12, material );
     cube19.name="1.7.O"
     cube19.visible=false;
     cube19.position.set(-5-0.82 ,0,-17);
     scene.add( cube19 );
     cube19.cursor = 'pointer';
     cube19.on('click', function(ev){
        evenementClickPersonne("1.7.O")
     });

     const cube44 = new THREE.Mesh( geometry12, material );
     cube44.name="1.7.NO"
     cube44.visible=false;
     cube44.position.set(-5-0.82,0,-17-0.82);
     scene.add( cube44 );
     cube44.cursor = 'pointer';
     cube44.on('click', function(ev){
        evenementClickPersonne("1.7.NO")
     });
     const cube45 = new THREE.Mesh( geometry12, material );
     cube45.name="1.7.NE"
     cube45.visible=false;
     cube45.position.set(-5+0.82,0,-17-0.82);
     scene.add( cube45 );
     cube45.cursor = 'pointer';
     cube45.on('click', function(ev){
        evenementClickPersonne("1.7.NE")
     });
 
     const cube46 = new THREE.Mesh( geometry12, material );
     cube46.name="1.7.SO"
     cube46.visible=false;
     cube46.position.set(-5-0.82,0,-17+0.82);
     scene.add( cube46 );
     cube46.cursor = 'pointer';
     cube46.on('click', function(ev){
        evenementClickPersonne("1.7.SO")
     });
     const cube47 = new THREE.Mesh( geometry12, material );
     cube47.name="1.7.SE"
     cube47.visible=false;
     cube47.position.set(-5+0.82,0,-17+0.82);
     scene.add( cube47 );
     cube47.cursor = 'pointer';
     cube47.on('click', function(ev){
        evenementClickPersonne("1.7.SE")
     });

     //BLOC 3
     const cube20 = new THREE.Mesh( geometry12, material );
     cube20.name="1.8.N"
     cube20.visible=false;
     cube20.position.set(-3,0,-17-0.82);
     scene.add( cube20 );
     cube20.cursor = 'pointer';
     cube20.on('click', function(ev){
        evenementClickPersonne("1.8.N")
     });
 
     const cube21 = new THREE.Mesh( geometry12, material );
     cube21.name="1.8.S"
     cube21.visible=false;
     cube21.position.set(-3,0,-17+0.82);
     scene.add( cube21 );
     cube21.cursor = 'pointer';
     cube21.on('click', function(ev){
        evenementClickPersonne("1.8.S")
     });
 
     const cube22 = new THREE.Mesh( geometry12, material );
     cube22.name="1.8.E"
     cube22.visible=false;
     cube22.position.set(-3+0.82 ,0,-17);
     scene.add( cube22 );
     cube22.cursor = 'pointer';
     cube22.on('click', function(ev){
        evenementClickPersonne("1.8.E")
     });
 
     const cube23 = new THREE.Mesh( geometry12, material );
     cube23.name="1.8.O"
     cube23.visible=false;
     cube23.position.set(-3-0.82 ,0,-17);
     scene.add( cube23 );
     cube23.cursor = 'pointer';
     cube23.on('click', function(ev){
        evenementClickPersonne("1.8.O")
     });

     const cube48 = new THREE.Mesh( geometry12, material );
     cube48.name="1.8.NO"
     cube48.visible=false;
     cube48.position.set(-3-0.82,0,-17-0.82);
     scene.add( cube48 );
     cube48.cursor = 'pointer';
     cube48.on('click', function(ev){
        evenementClickPersonne("1.8.NO")
     });
     const cube49 = new THREE.Mesh( geometry12, material );
     cube49.name="1.8.NE"
     cube49.visible=false;
     cube49.position.set(-3+0.82,0,-17-0.82);
     scene.add( cube49 );
     cube49.cursor = 'pointer';
     cube49.on('click', function(ev){
        evenementClickPersonne("1.8.NE")
     });
 
     const cube50 = new THREE.Mesh( geometry12, material );
     cube50.name="1.8.SO"
     cube50.visible=false;
     cube50.position.set(-3-0.82,0,-17+0.82);
     scene.add( cube50 );
     cube50.cursor = 'pointer';
     cube50.on('click', function(ev){
        evenementClickPersonne("1.8.SO")
     });
     const cube51 = new THREE.Mesh( geometry12, material );
     cube51.name="1.8.SE"
     cube51.visible=false;
     cube51.position.set(-3+0.82,0,-17+0.82);
     scene.add( cube51 );
     cube51.cursor = 'pointer';
     cube51.on('click', function(ev){
        evenementClickPersonne("1.8.SE")
     });

    
    //BLOC 4
     const cube24 = new THREE.Mesh( geometry12, material );
     cube24.name="1.9.N"
     cube24.visible=false;
     cube24.position.set(-1,0,-17-0.82);
     scene.add( cube24 );
     cube24.cursor = 'pointer';
     cube24.on('click', function(ev){
        evenementClickPersonne("1.9.N")
     });
 
     const cube25 = new THREE.Mesh( geometry12, material );
     cube25.name="1.9.S"
     cube25.visible=false;
     cube25.position.set(-1,0,-17+0.82);
     scene.add( cube25 );
     cube25.cursor = 'pointer';
     cube25.on('click', function(ev){
        evenementClickPersonne("1.9.S")
     });
 
     const cube26 = new THREE.Mesh( geometry12, material );
     cube26.name="1.9.E"
     cube26.visible=false;
     cube26.position.set(-1+0.82 ,0,-17);
     scene.add( cube26 );
     cube26.cursor = 'pointer';
     cube26.on('click', function(ev){
        evenementClickPersonne("1.9.E")
     });
 
     const cube27 = new THREE.Mesh( geometry12, material );
     cube27.name="1.9.O"
     cube27.visible=false;
     cube27.position.set(-1-0.82 ,0,-17);
     scene.add( cube27 );
     cube27.cursor = 'pointer';
     cube27.on('click', function(ev){
        evenementClickPersonne("1.9.O")
     });

     const cube52 = new THREE.Mesh( geometry12, material );
     cube52.name="1.9.NO"
     cube52.visible=false;
     cube52.position.set(-1-0.82,0,-17-0.82);
     scene.add( cube52 );
     cube52.cursor = 'pointer';
     cube52.on('click', function(ev){
        evenementClickPersonne("1.9.NO")
     });
     const cube53 = new THREE.Mesh( geometry12, material );
     cube53.name="1.9.NE"
     cube53.visible=false;
     cube53.position.set(-1+0.82,0,-17-0.82);
     scene.add( cube53 );
     cube53.cursor = 'pointer';
     cube53.on('click', function(ev){
        evenementClickPersonne("1.9.NE")
     });
 
     const cube54 = new THREE.Mesh( geometry12, material );
     cube54.name="1.9.SO"
     cube54.visible=false;
     cube54.position.set(-1-0.82,0,-17+0.82);
     scene.add( cube54 );
     cube54.cursor = 'pointer';
     cube54.on('click', function(ev){
        evenementClickPersonne("1.9.SO")
     });
     const cube55 = new THREE.Mesh( geometry12, material );
     cube55.name="1.9.SE"
     cube55.visible=false;
     cube55.position.set(-1+0.82,0,-17+0.82);
     scene.add( cube55 );
     cube55.cursor = 'pointer';
     cube55.on('click', function(ev){
        evenementClickPersonne("1.9.SE")
     });

    //BLOC 5
     const cube28 = new THREE.Mesh( geometry12, material );
     cube28.name="1.10.N"
     cube28.visible=false;
     cube28.position.set(1,0,-17-0.82);
     scene.add( cube28 );
     cube28.cursor = 'pointer';
     cube28.on('click', function(ev){
        evenementClickPersonne("1.10.N")
     });
 
     const cube29 = new THREE.Mesh( geometry12, material );
     cube29.name="1.10.S"
     cube29.visible=false;
     cube29.position.set(1,0,-17+0.82);
     scene.add( cube29 );
     cube29.cursor = 'pointer';
     cube29.on('click', function(ev){
        evenementClickPersonne("1.10.S")
     });
 
     const cube30 = new THREE.Mesh( geometry12, material );
     cube30.name="1.10.E"
     cube30.visible=false;
     cube30.position.set(1+0.82 ,0,-17);
     scene.add( cube30 );
     cube30.cursor = 'pointer';
     cube30.on('click', function(ev){
        evenementClickPersonne("1.10.E")
     });
 
     const cube31 = new THREE.Mesh( geometry12, material );
     cube31.name="1.10.O"
     cube31.visible=false;
     cube31.position.set(1-0.82 ,0,-17);
     scene.add( cube31 );
     cube31.cursor = 'pointer';
     cube31.on('click', function(ev){
        evenementClickPersonne("1.10.O")
     });

     const cube56 = new THREE.Mesh( geometry12, material );
     cube56.name="1.10.NO"
     cube56.visible=false;
     cube56.position.set(1-0.82,0,-17-0.82);
     scene.add( cube56 );
     cube56.cursor = 'pointer';
     cube56.on('click', function(ev){
        evenementClickPersonne("1.10.NO")
     });
     const cube57 = new THREE.Mesh( geometry12, material );
     cube57.name="1.10.NE"
     cube57.visible=false;
     cube57.position.set(1+0.82,0,-17-0.82);
     scene.add( cube57 );
     cube57.cursor = 'pointer';
     cube57.on('click', function(ev){
        evenementClickPersonne("1.10.NE")
     });
 
     const cube58 = new THREE.Mesh( geometry12, material );
     cube58.name="1.10.SO"
     cube58.visible=false;
     cube58.position.set(1-0.82,0,-17+0.82);
     scene.add( cube58 );
     cube58.cursor = 'pointer';
     cube58.on('click', function(ev){
        evenementClickPersonne("1.10.SO")
     });
     const cube59 = new THREE.Mesh( geometry12, material );
     cube59.name="1.10.SE"
     cube59.visible=false;
     cube59.position.set(1+0.82,0,-17+0.82);
     scene.add( cube59 );
     cube59.cursor = 'pointer';
     cube59.on('click', function(ev){
        evenementClickPersonne("1.10.SE")
     });
    //BLOC 6
     const cube32 = new THREE.Mesh( geometry12, material );
     cube32.name="1.11.N"
     cube32.visible=false;
     cube32.position.set(3,0,-17-0.82);
     scene.add( cube32 );
     cube32.cursor = 'pointer';
     cube32.on('click', function(ev){
        evenementClickPersonne("1.11.N")
     });
 
     const cube33 = new THREE.Mesh( geometry12, material );
     cube33.name="1.11.S"
     cube33.visible=false;
     cube33.position.set(3,0,-17+0.82);
     scene.add( cube33 );
     cube33.cursor = 'pointer';
     cube33.on('click', function(ev){
        evenementClickPersonne("1.11.S")
     });
 
     const cube34 = new THREE.Mesh( geometry12, material );
     cube34.name="1.11.E"
     cube34.visible=false;
     cube34.position.set(3+0.82 ,0,-17);
     scene.add( cube34 );
     cube34.cursor = 'pointer';
     cube34.on('click', function(ev){
        evenementClickPersonne("1.11.E")
     });
 
     const cube35 = new THREE.Mesh( geometry12, material );
     cube35.name="1.11.O"
     cube35.visible=false;
     cube35.position.set(3-0.82 ,0,-17);
     scene.add( cube35 );
     cube35.cursor = 'pointer';
     cube35.on('click', function(ev){
        evenementClickPersonne("1.11.O")
     });

     const cube60 = new THREE.Mesh( geometry12, material );
     cube60.name="1.11.NO"
     cube60.visible=false;
     cube60.position.set(3-0.82,0,-17-0.82);
     scene.add( cube60 );
     cube60.cursor = 'pointer';
     cube60.on('click', function(ev){
        evenementClickPersonne("1.11.NO")
     });
     const cube61 = new THREE.Mesh( geometry12, material );
     cube61.name="1.11.NE"
     cube61.visible=false;
     cube61.position.set(3+0.82,0,-17-0.82);
     scene.add( cube61 );
     cube61.cursor = 'pointer';
     cube61.on('click', function(ev){
        evenementClickPersonne("1.11.NE")
     });
 
     const cube62 = new THREE.Mesh( geometry12, material );
     cube62.name="1.11.SO"
     cube62.visible=false;
     cube62.position.set(3-0.82,0,-17+0.82);
     scene.add( cube62 );
     cube62.cursor = 'pointer';
     cube62.on('click', function(ev){
        evenementClickPersonne("1.11.SO")
     });
     const cube63 = new THREE.Mesh( geometry12, material );
     cube63.name="1.11.SE"
     cube63.visible=false;
     cube63.position.set(3+0.82,0,-17+0.82);
     scene.add( cube63 );
     cube63.cursor = 'pointer';
     cube63.on('click', function(ev){
        evenementClickPersonne("1.11.SE");
     });

    //BLOC 7
     const cube36 = new THREE.Mesh( geometry12, material );
     cube36.name="0.11.N"
     cube36.visible=false;
     cube36.position.set(3,0,-19-0.82);
     scene.add( cube36 );
     cube36.cursor = 'pointer';
     cube36.on('click', function(ev){
        evenementClickPersonne("0.11.N");
     });
 
     const cube37 = new THREE.Mesh( geometry12, material );
     cube37.name="0.11.S"
     cube37.visible=false;
     cube37.position.set(3,0,-19+0.82);
     scene.add( cube37 );
     cube37.cursor = 'pointer';
     cube37.on('click', function(ev){
        evenementClickPersonne("0.11.S");
     });
 
     const cube38 = new THREE.Mesh( geometry12, material );
     cube38.name="0.11.E"
     cube38.visible=false;
     cube38.position.set(3+0.82 ,0,-19);
     scene.add( cube38 );
     cube38.cursor = 'pointer';
     cube38.on('click', function(ev){
        evenementClickPersonne("0.11.E");
     });
 
     const cube39 = new THREE.Mesh( geometry12, material );
     cube39.name="0.11.O"
     cube39.visible=false;
     cube39.position.set(3-0.82 ,0,-19);
     scene.add( cube39 );
     cube39.cursor = 'pointer';
     cube39 .on('click', function(ev){
        evenementClickPersonne("0.11.O");
     });

     const cube64 = new THREE.Mesh( geometry12, material );
     cube64.name="0.11.NO"
     cube64.visible=false;
     cube64.position.set(3-0.82,0,-19-0.82);
     scene.add( cube64 );
     cube64.cursor = 'pointer';
     cube64.on('click', function(ev){
        evenementClickPersonne("0.11.NO");
     });
     const cube65 = new THREE.Mesh( geometry12, material );
     cube65.name="0.11.NE"
     cube65.visible=false;
     cube65.position.set(3+0.82,0,-19-0.82);
     scene.add( cube65 );
     cube65.cursor = 'pointer';
     cube65.on('click', function(ev){
        evenementClickPersonne("0.11.NE");
     });
 
     const cube66 = new THREE.Mesh( geometry12, material );
     cube66.name="0.11.SO"
     cube66.visible=false;
     cube66.position.set(3-0.82,0,-19+0.82);
     scene.add( cube66 );
     cube66.cursor = 'pointer';
     cube66.on('click', function(ev){
        evenementClickPersonne("0.11.SO");
     });
     const cube67 = new THREE.Mesh( geometry12, material );
     cube67.name="0.11.SE"
     cube67.visible=false;
     cube67.position.set(3+0.82,0,-19+0.82);
     scene.add( cube67 );
     cube67.cursor = 'pointer';
     cube67.on('click', function(ev){
        evenementClickPersonne("0.11.SE");
     });

}



function animate()
{
    stats.begin()

    requestAnimationFrame( animate );
    const delta = clock.getDelta();
    mixer22.update(delta);
    mixer21.update(delta);
    mixer20.update(delta);
    mixer19.update(delta);
    mixer18.update(delta);
    mixer17.update(delta);
    mixer16.update(delta);
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



init();
animate();