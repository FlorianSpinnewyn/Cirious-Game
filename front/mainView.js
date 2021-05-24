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
    mixer23,
    mixer24,
    mixer25,
    mixer26,
    mixer27,
    mixer28,
    mixer29,
    mixer30,
    mixer31,
    mixer32,
    mixer33,
    mixer34,
    mixer35,
    mixer36,
    mixer37,
    mixer38,
    mixer39,
    mixer40,
    mixer41,
    mixer42,
    mixer43,
    mixer44,
    mixer45,
    mixer46,
    mixer47,
    mixer48,
    mixer49,
    mixer50,
    mixer51,
    mixer52,
    mixer53,
    mixer54,
    mixer55,
    mixer56,
    mixer57,
    mixer58,
    mixer59,
    mixer60,
    mixer61,
    mixer62,
    mixer63,
    mixer64,
    mixer65,
    mixer66,
    mixer67,
    mixer68,
    mixer69,
    mixer70,
    mixer71,
    mixer72,
    mixer73,
    mixer74,
    mixer75,
    mixer76,
    mixer77,
    mixer78,
    mixer79,
    mixer80,
    mixer81,
    mixer82,
    mixer83,
    mixer84,
    mixer85,
    mixer86,
    mixer87,
    mixer88,
    mixer89,
    mixer90,
    mixer91,
    mixer92,
    mixer93,
    mixer94,
    mixer95,
    mixer96,
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
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, .1, 1000);
    camera.position.set(200, 100, 0);


    /**------Lumière-----**/
    light = new THREE.DirectionalLight(0x9a9a9a, 1)
    light.position.set(-300, 750, -300)
    light.rotation.y = Math.PI/4
    light.castShadow = true;           
    light.shadow.mapSize.width = 2048;  // default
    light.shadow.mapSize.height = 2048; // default
    light.shadow.camera.near = .5;       // default
    light.shadow.camera.far = 1000    // default
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

    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 50;
    controls.maxPolarAngle = 3*Math.PI / 8;

    /**------Axe-----**/
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const loadingManager = new THREE.LoadingManager(() => {
	
		const loadingScreen = document.getElementById('loading-screen');
		loadingScreen.classList.add('fade-out');
		document.getElementById("home").style.display = "block";
        document.getElementById('loading-screen').style.display = "none";
		// optional: remove loader from DOM via event listener
		loadingScreen.addEventListener('transitionend', () => {});
		
	});
    
    /**------map-----**/
    let loader = new THREE.GLTFLoader(loadingManager);
    loader.load('3d/TestBlender/road/roadTexture.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer = new THREE.AnimationMixer(gltf.scene);
        mixer.clipAction(gltf.animations[0]).play();
        mixer.timeScale = 0;
    });

    /**------Voiture1-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_1/Voiture1.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer2 = new THREE.AnimationMixer(gltf.scene);
        mixer2.clipAction( gltf.animations[0]).play();
    
    });

    /**------Voiture2-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_2/Voiture2.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer3 = new THREE.AnimationMixer(gltf.scene);
        mixer3.clipAction( gltf.animations[0]).play();
    
    });

    /**------Voiture3-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_3/Voiture3.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer4 = new THREE.AnimationMixer(gltf.scene);
        mixer4.clipAction(gltf.animations[0]).play();
    
    });


    /**------Voiture4-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_4/Voiture4.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer5 = new THREE.AnimationMixer(gltf.scene);
        mixer5.clipAction(gltf.animations[0]).play();
    
    });

    /**------Voiture5-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_5/Voiture5.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })
    
        scene.add(gltf.scene);
    
        mixer6 = new THREE.AnimationMixer(gltf.scene);
        mixer6.clipAction(gltf.animations[0]).play();
        
    });

    /**------Voiture6-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_6/Voiture6.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer7 = new THREE.AnimationMixer(gltf.scene);
        mixer7.clipAction(gltf.animations[0]).play();
    
    });


    /**------Voiture7-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_7/Voiture7.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer8 = new THREE.AnimationMixer(gltf.scene);
        mixer8.clipAction(gltf.animations[0]).play();
    
    });


    /**------Voiture8-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_8/Voiture8.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer9 = new THREE.AnimationMixer(gltf.scene);
        mixer9.clipAction(gltf.animations[0]).play();
    
    });

    /**------Voiture9-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_9/Voiture9.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer10 = new THREE.AnimationMixer(gltf.scene);
        mixer10.clipAction(gltf.animations[0]).play();
    
    });


    /**------Voiture10-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_10/Voiture10.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer11 = new THREE.AnimationMixer(gltf.scene);
        mixer11.clipAction(gltf.animations[0]).play();
    
    });


    /**------Voiture11-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_11/Voiture11.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer12 = new THREE.AnimationMixer(gltf.scene);
        mixer12.clipAction(gltf.animations[0]).play();
    
    });



    /**------Voiture12-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_12/Voiture12.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer13 = new THREE.AnimationMixer(gltf.scene);
        mixer13.clipAction(gltf.animations[0]).play();
    
    });

    /**------Voiture13-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_13/Voiture13.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer14 = new THREE.AnimationMixer(gltf.scene);
        mixer14.clipAction(gltf.animations[0]).play();
    
    });



    /**------Voiture14-----*/
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Voiture_14/Voiture14.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer15 = new THREE.AnimationMixer(gltf.scene);
        mixer15.clipAction(gltf.animations[0]).play();
    
    });

    let interaction = new THREE.Interaction(renderer, scene, camera);
    
    /**------mairie-----**/
    loader.load('3d/TestBlender/road/mairie.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);
        gltf.scene.cursor = 'pointer';
        gltf.scene.on('click', function(ev) {socket.emit("mairie");});
    });

    const material = new THREE.MeshBasicMaterial({color: 0xff0000});

    /**------Fleche ---- mairie-----**/ //Transport
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Fleche/exclamation.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.2,0.2, 0.2);
            gltf.scene.position.set(-10,2,-13);
        })
    
        scene.add(gltf.scene);
    
        mixer16 = new THREE.AnimationMixer(gltf.scene);
        mixer16.clipAction(gltf.animations[0]).play();
    });

    //Fleche Gare
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Fleche/fleche_jaune.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.name = "flecheGare";
            gltf.scene.scale.set(0.1,0.1, 0.1);
            gltf.scene.position.set(9,0,-6);
        })
        gltf.scene.name = "flecheGare";
        scene.add(gltf.scene);
        gltf.scene.visible = false;
        mixer17 = new THREE.AnimationMixer(gltf.scene);
        mixer17.clipAction(gltf.animations[0]).play();
    });

     //Fleche Metro1
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_jaune.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(7,0,-4);
         })

         gltf.scene.name = "flecheMetro1";
         scene.add(gltf.scene);
         gltf.scene.visible = false;
         mixer18 = new THREE.AnimationMixer(gltf.scene);
         mixer18.clipAction(gltf.animations[0]).play();
     });

     //Fleche vélo1
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_jaune.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.name = "flecheVelo1";
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(11,0,-4);
         })
     
         scene.add(gltf.scene);
         gltf.scene.visible = false;
         mixer19 = new THREE.AnimationMixer(gltf.scene);
         mixer19.clipAction(gltf.animations[0]).play();
     });

     //Fleche Vélo2
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_jaune.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.name = "flecheVelo2";
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(-1,0,-6);
         })
     
         scene.add(gltf.scene);
         gltf.scene.visible = false;
         mixer20 = new THREE.AnimationMixer(gltf.scene);
         mixer20.clipAction(gltf.animations[0]).play();
     });

     //Métro3
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_jaune.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.name = "flecheMetro3";
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(11,0,0);   
         })
     
         scene.add(gltf.scene);
         gltf.scene.visible = false;
         mixer90 = new THREE.AnimationMixer(gltf.scene);
         mixer90.clipAction(gltf.animations[0]).play();
     });

     //Réparation
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_rouge.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.name = "flecheAtelier";
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(11,0,15);
         })
     
         scene.add(gltf.scene);
         gltf.scene.visible = false;
         mixer80 = new THREE.AnimationMixer(gltf.scene);
         mixer80.clipAction(gltf.animations[0]).play();
     });

    //technicentre
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_rouge.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.name = "flecheTechnicentre";
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(29,0,22);
         })
     
         scene.add(gltf.scene);
         gltf.scene.visible = false;
         mixer79 = new THREE.AnimationMixer(gltf.scene);
         mixer79.clipAction(gltf.animations[0]).play();
       
     });
//garage
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_rouge.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.name = "flecheGarage";
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(-7,0,23);
         })
     
         scene.add(gltf.scene);
         gltf.scene.visible = false;
         mixer81 = new THREE.AnimationMixer(gltf.scene);
         mixer81.clipAction(gltf.animations[0]).play();
     });

//Parking
loader = new THREE.GLTFLoader();
loader.load('3d/TestBlender/road/animation/Fleche/fleche_rouge.glb', function(gltf) {
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.receiveShadow = true;
            child.castShadow = true;
        }
        gltf.scene.name = "flecheParking";
        gltf.scene.scale.set(0.1,0.1, 0.1);
        gltf.scene.position.set(0,0,16);
    })

    scene.add(gltf.scene);
    gltf.scene.visible = false;
    mixer88 = new THREE.AnimationMixer(gltf.scene);
    mixer88.clipAction(gltf.animations[0]).play();
});

     //Fleche Destination
     //Musée
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_verte.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(2,0,10);
         })
         gltf.scene.name = "Musee";
         
         scene.add(gltf.scene);
         gltf.scene.visible = false;

         mixer82 = new THREE.AnimationMixer(gltf.scene);
         mixer82.clipAction(gltf.animations[0]).play();
     });

     //ecole
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_verte.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(-6,0,10);
         })
         gltf.scene.name = "Ecole";
         scene.add(gltf.scene);
         gltf.scene.visible = false;

         mixer83 = new THREE.AnimationMixer(gltf.scene);
         mixer83.clipAction(gltf.animations[0]).play();
     });

     //Centre commercial
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_verte.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(11,0,5);
         })
         gltf.scene.name = "Magasins";
         scene.add(gltf.scene);
         gltf.scene.visible = false;

         mixer84 = new THREE.AnimationMixer(gltf.scene);
         mixer84.clipAction(gltf.animations[0]).play();
     });

     //restaurant
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_verte.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(19,0,12);
         })
         gltf.scene.name = "Restaurant";
         scene.add(gltf.scene);
         gltf.scene.visible = false;

         mixer85 = new THREE.AnimationMixer(gltf.scene);
         mixer85.clipAction(gltf.animations[0]).play();
     });

     //parc
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_verte.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(20,0,-2);
         })
         gltf.scene.name = "Parc";
         scene.add(gltf.scene);
         gltf.scene.visible = false;

         mixer86 = new THREE.AnimationMixer(gltf.scene);
         mixer86.clipAction(gltf.animations[0]).play();
     });

     //Campagne
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_verte.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(11,0,25);
         })
         gltf.scene.visible = false;
         scene.add(gltf.scene);
         gltf.scene.name = "Campagne";
         mixer87 = new THREE.AnimationMixer(gltf.scene);
         mixer87.clipAction(gltf.animations[0]).play();
     });

     //Stade
     loader = new THREE.GLTFLoader();
     loader.load('3d/TestBlender/road/animation/Fleche/fleche_verte.glb', function(gltf) {
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true;
                 child.castShadow = true;
             }
             gltf.scene.scale.set(0.1,0.1, 0.1);
             gltf.scene.position.set(-6,0,-5);
         })
         gltf.scene.visible = false;
         gltf.scene.name = "Stade";
         scene.add(gltf.scene);
     
         mixer89 = new THREE.AnimationMixer(gltf.scene);
         mixer89.clipAction(gltf.animations[0]).play();
     });

    //nuage
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Nuage/nuage.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer21 = new THREE.AnimationMixer(gltf.scene);
        mixer21.clipAction(gltf.animations[0]).play();
    });

    //nuage2
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Nuage/nuage2.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer22 = new THREE.AnimationMixer(gltf.scene);
        mixer22.clipAction(gltf.animations[0]).play();
    });

    //nuage3
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Nuage/nuage3.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer92 = new THREE.AnimationMixer(gltf.scene);
        mixer92.clipAction(gltf.animations[0]).play();
    });

    //nuage4
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Nuage/nuage4.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer93 = new THREE.AnimationMixer(gltf.scene);
        mixer93.clipAction(gltf.animations[0]).play();
    });

    //nuage5
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Nuage/nuage5.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer94 = new THREE.AnimationMixer(gltf.scene);
        mixer94.clipAction(gltf.animations[0]).play();
    });

    //nuage6
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Nuage/nuage6.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);

        mixer95 = new THREE.AnimationMixer(gltf.scene);
        mixer95.clipAction(gltf.animations[0]).play();
    });

    //nuage7
    loader = new THREE.GLTFLoader();
    loader.load('3d/TestBlender/road/animation/Nuage/nuage7.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1)
        })

        scene.add(gltf.scene);
        
        gltf.scene.cursor = 'pointer';
        gltf.scene.on('click', function(ev) {
        console.log("Tu as trouvé le nuage");
    });
    mixer96 = new THREE.AnimationMixer(gltf.scene);
    mixer96.clipAction(gltf.animations[0]).play();

    });

    //fleur
    loader.load('3d/TestBlender/road/fleur/pleindefleurs.glb', function(gltf) {
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.receiveShadow = true;
            child.castShadow = true;
        }
        gltf.scene.scale.set(0.1,0.1, 0.1);
    })

    scene.add(gltf.scene);
    gltf.scene.cursor = 'pointer';
    gltf.scene.on('click', function(ev) {
        console.log("Tu as trouvé une fleur"); 
    });
    });

    //mouton
    loader.load('3d/TestBlender/road/Mouton/petitmouton.glb', function(gltf) {
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.receiveShadow = true;
            child.castShadow = true;
        }
        gltf.scene.scale.set(0.1,0.1, 0.1);
    })

    scene.add(gltf.scene);
    gltf.scene.cursor = 'pointer';
    gltf.scene.on('click', function(ev) {
        console.log("Tu as trouvé le mouton");
        
    });
    });

    //ballot
    loader.load('3d/TestBlender/road/ballot.glb', function(gltf) {
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.receiveShadow = true;
            child.castShadow = true;
        }
        gltf.scene.scale.set(0.1,0.1, 0.1);
    })

    scene.add(gltf.scene);
    gltf.scene.cursor = 'pointer';
    gltf.scene.on('click', function(ev) {
        console.log("Tu as trouvé le ballot");
        
    });
    });
  
    /**------kiosque-----**/
    loader.load('3d/TestBlender/road/kiosque.glb', function(gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            gltf.scene.scale.set(0.1,0.1, 0.1);
        })

        scene.add(gltf.scene);
        gltf.scene.cursor = 'pointer';
        gltf.scene.on('click', function(ev) {socket.emit("kiosque");});
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
    loader.load('3d/TestBlender/road/parking.glb', function(gltf){
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
            console.log("Nous sommes au parking :)");
            document.getElementById('reparationVoiture').style.display='block';
            socket.emit("parking");
        });
    });

    /**------Garage-----**/
    loader.load('3d/TestBlender/road/garagevelo.glb', function(gltf){
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
            console.log("Nous sommes au garage :)");
            document.getElementById('stockVelo').style.display='block';
            socket.emit("garage");
        });
    });


    /**------Atelier-----**/
    loader.load('3d/TestBlender/road/atelier.glb', function(gltf){
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
            console.log("Nous sommes à l'atelier :)");
            document.getElementById('reparationMetro').style.display='block';
            socket.emit("atelier");
        });
        mixer91 = new THREE.AnimationMixer( gltf.scene );
        mixer91.clipAction( gltf.animations[ 0   ] ).play();
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
    loader.load('3d/TestBlender/road/velo1.glb', function(gltf){
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
            console.log("Nous sommes à la station de vélo n°1 :)");
            document.getElementById('veloRestants1').style.display='block';
            socket.emit("velo", 1);
        });
    });


    /**------StationVelo3-----**/
    loader.load('3d/TestBlender/road/velo3.glb', function(gltf){
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
            console.log("Nous sommes à la station de vélo n°3 :)");
            document.getElementById('veloRestants2').style.display='block';
            socket.emit("velo", 3);
        });
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
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube12=gltf.scene;
             cube12.scale.set(0.1,0.1, 0.1)
         })
 
         cube12.name="0.7.N"
         cube12.visible=false;
         cube12.position.set(-5,0,-19-0.82);
         scene.add( cube12 );
         cube12.cursor = 'pointer';
         cube12.on('click', function(ev){
             evenementClickPersonne("0.7.N")
         });
         mixer23 = new THREE.AnimationMixer( gltf.scene );
         mixer23.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube13;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube13=gltf.scene;
             cube13.scale.set(0.1,0.1, 0.1)
         })
 
         cube13.name="0.7.S"
         cube13.visible=false;
         cube13.position.set(-5,0,-19+0.82);
         scene.add( cube13 );
         cube13.cursor = 'pointer';
         cube13.on('click', function(ev){
             evenementClickPersonne("0.7.S")
         });     
         mixer24 = new THREE.AnimationMixer( gltf.scene );
         mixer24.clipAction( gltf.animations[ 0   ] ).play();
     });
    

     let cube14;
     loader.load('3d/TestBlender/road/personnage_E.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube14=gltf.scene;
             cube14.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube14.name="0.7.E"
         cube14.visible=false;
         cube14.position.set(-5+0.82 ,0,-19);
         scene.add( cube14 );
         cube14.cursor = 'pointer';
         cube14.on('click', function(ev){
             evenementClickPersonne("0.7.E")
         });     
         mixer25 = new THREE.AnimationMixer( gltf.scene );
         mixer25.clipAction( gltf.animations[ 0   ] ).play();
     });
     let cube15;
     loader.load('3d/TestBlender/road/personnage_O.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube15=gltf.scene;
             cube15.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube15.name="0.7.O"
    cube15.visible=false;
    cube15.position.set(-5-0.82 ,0,-19);
    scene.add( cube15 );
    cube15.cursor = 'pointer';
    cube15.on('click', function(ev){
        evenementClickPersonne("0.7.O")
    });  
         mixer26 = new THREE.AnimationMixer( gltf.scene );
         mixer26.clipAction( gltf.animations[ 0   ] ).play();
     });
     let cube40;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube40=gltf.scene;
             cube40.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube40.name="0.7.NO"
         cube40.visible=false;
         cube40.position.set(-5-0.82,0,-19-0.82);
         scene.add( cube40 );
         cube40.cursor = 'pointer';
         cube40.on('click', function(ev){
             evenementClickPersonne("0.7.NO")
         });
         mixer27 = new THREE.AnimationMixer( gltf.scene );
         mixer27.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube41;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube41=gltf.scene;
             cube41.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube41.name="0.7.NE"
    cube41.visible=false;
    cube41.position.set(-5+0.82,0,-19-0.82);
    scene.add( cube41 );
    cube41.cursor = 'pointer';
    cube41.on('click', function(ev){
        evenementClickPersonne("0.7.NE")
    });
         mixer28 = new THREE.AnimationMixer( gltf.scene );
         mixer28.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube42;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube42=gltf.scene;
             cube42.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube42.name="0.7.SO"
         cube42.visible=false;
         cube42.position.set(-5-0.82,0,-19+0.82);
         scene.add( cube42 );
         cube42.cursor = 'pointer';
         cube42.on('click', function(ev){
             evenementClickPersonne("0.7.SO")
         });
     
         mixer29 = new THREE.AnimationMixer( gltf.scene );
         mixer29.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube43;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube43=gltf.scene;
             cube43.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube43.name="0.7.SE"
         cube43.visible=false;
         cube43.position.set(-5+0.82,0,-19+0.82);
         scene.add( cube43 );
         cube43.cursor = 'pointer';
         cube43.on('click', function(ev){
             evenementClickPersonne("0.7.SE")
         });
     
         mixer30 = new THREE.AnimationMixer( gltf.scene );
         mixer30.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube16;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube16=gltf.scene;
             cube16.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube16.name="1.7.N"
     cube16.visible=false;
     cube16.position.set(-5,0,-17-0.82);
     scene.add( cube16 );
     cube16.cursor = 'pointer';
     cube16.on('click', function(ev){
        evenementClickPersonne("1.7.N")
     });
     
         mixer78 = new THREE.AnimationMixer( gltf.scene );
         mixer78.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube17;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube17=gltf.scene;
             cube17.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube17.name="1.7.S"
         cube17.visible=false;
         cube17.position.set(-5,0,-17+0.82);
         scene.add( cube17 );
         cube17.cursor = 'pointer';
         cube17.on('click', function(ev){
            evenementClickPersonne("1.7.S")
         });
     
         mixer31 = new THREE.AnimationMixer( gltf.scene );
         mixer31.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube18;
     loader.load('3d/TestBlender/road/personnage_E.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube18=gltf.scene;
             cube18.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube18.name="1.7.E"
         cube18.visible=false;
         cube18.position.set(-5+0.82 ,0,-17);
         scene.add( cube18 );
         cube18.cursor = 'pointer';
         cube18.on('click', function(ev){
            evenementClickPersonne("1.7.E")
         });
     
         mixer32 = new THREE.AnimationMixer( gltf.scene );
         mixer32.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube19;
     loader.load('3d/TestBlender/road/personnage_O.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube19=gltf.scene;
             cube19.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube19.name="1.7.O"
     cube19.visible=false;
     cube19.position.set(-5-0.82 ,0,-17);
     scene.add( cube19 );
     cube19.cursor = 'pointer';
     cube19.on('click', function(ev){
        evenementClickPersonne("1.7.O")
     });
     
         mixer33 = new THREE.AnimationMixer( gltf.scene );
         mixer33.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube44;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube44=gltf.scene;
             cube44.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube44.name="1.7.NO"
     cube44.visible=false;
     cube44.position.set(-5-0.82,0,-17-0.82);
     scene.add( cube44 );
     cube44.cursor = 'pointer';
     cube44.on('click', function(ev){
        evenementClickPersonne("1.7.NO")
     });
     
         mixer34 = new THREE.AnimationMixer( gltf.scene );
         mixer34.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     let cube45;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube45=gltf.scene;
             cube45.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube45.name="1.7.NE"
     cube45.visible=false;
     cube45.position.set(-5+0.82,0,-17-0.82);
     scene.add( cube45 );
     cube45.cursor = 'pointer';
     cube45.on('click', function(ev){
        evenementClickPersonne("1.7.NE")
     });
     
         mixer35 = new THREE.AnimationMixer( gltf.scene );
         mixer35.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube46;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube46=gltf.scene;
             cube46.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube46.name="1.7.SO"
     cube46.visible=false;
     cube46.position.set(-5-0.82,0,-17+0.82);
     scene.add( cube46 );
     cube46.cursor = 'pointer';
     cube46.on('click', function(ev){
        evenementClickPersonne("1.7.SO")
     });
     
         mixer36 = new THREE.AnimationMixer( gltf.scene );
         mixer36.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube47;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube47=gltf.scene;
             cube47.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube47.name="1.7.SE"
     cube47.visible=false;
     cube47.position.set(-5+0.82,0,-17+0.82);
     scene.add( cube47 );
     cube47.cursor = 'pointer';
     cube47.on('click', function(ev){
        evenementClickPersonne("1.7.SE")
     });
     
         mixer37 = new THREE.AnimationMixer( gltf.scene );
         mixer37.clipAction( gltf.animations[ 0   ] ).play();
     });


     //BLOC 3

     let cube20;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube20=gltf.scene;
             cube20.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube20.name="1.8.N"
     cube20.visible=false;
     cube20.position.set(-3,0,-17-0.82);
     scene.add( cube20 );
     cube20.cursor = 'pointer';
     cube20.on('click', function(ev){
        evenementClickPersonne("1.8.N")
     });
 
     
         mixer38 = new THREE.AnimationMixer( gltf.scene );
         mixer38.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube21;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube21=gltf.scene;
             cube21.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube21.name="1.8.S"
     cube21.visible=false;
     cube21.position.set(-3,0,-17+0.82);
     scene.add( cube21 );
     cube21.cursor = 'pointer';
     cube21.on('click', function(ev){
        evenementClickPersonne("1.8.S")
     });
 
     
         mixer39 = new THREE.AnimationMixer( gltf.scene );
         mixer39.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube22;
     loader.load('3d/TestBlender/road/personnage_E.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube22=gltf.scene;
             cube22.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube22.name="1.8.E"
     cube22.visible=false;
     cube22.position.set(-3+0.82 ,0,-17);
     scene.add( cube22 );
     cube22.cursor = 'pointer';
     cube22.on('click', function(ev){
        evenementClickPersonne("1.8.E")
     });
 
     
         mixer40 = new THREE.AnimationMixer( gltf.scene );
         mixer40.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube23;
     loader.load('3d/TestBlender/road/personnage_O.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube23=gltf.scene;
             cube23.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube23.name="1.8.O"
     cube23.visible=false;
     cube23.position.set(-3-0.82 ,0,-17);
     scene.add( cube23 );
     cube23.cursor = 'pointer';
     cube23.on('click', function(ev){
        evenementClickPersonne("1.8.O")
     });
 
     
         mixer41 = new THREE.AnimationMixer( gltf.scene );
         mixer41.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube48;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube48=gltf.scene;
             cube48.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube48.name="1.8.NO"
     cube48.visible=false;
     cube48.position.set(-3-0.82,0,-17-0.82);
     scene.add( cube48 );
     cube48.cursor = 'pointer';
     cube48.on('click', function(ev){
        evenementClickPersonne("1.8.NO")
     });
 
     
         mixer42 = new THREE.AnimationMixer( gltf.scene );
         mixer42.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube49;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube49=gltf.scene;
             cube49.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube49.name="1.8.NE"
     cube49.visible=false;
     cube49.position.set(-3+0.82,0,-17-0.82);
     scene.add( cube49 );
     cube49.cursor = 'pointer';
     cube49.on('click', function(ev){
        evenementClickPersonne("1.8.NE")
     });
 
     
         mixer43 = new THREE.AnimationMixer( gltf.scene );
         mixer43.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube50;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube50=gltf.scene;
             cube50.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube50.name="1.8.SO"
         cube50.visible=false;
         cube50.position.set(-3-0.82,0,-17+0.82);
         scene.add( cube50 );
         cube50.cursor = 'pointer';
         cube50.on('click', function(ev){
            evenementClickPersonne("1.8.SO")
         });
 
     
         mixer44 = new THREE.AnimationMixer( gltf.scene );
         mixer44.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube51;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube51=gltf.scene;
             cube51.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube51.name="1.8.SE"
     cube51.visible=false;
     cube51.position.set(-3+0.82,0,-17+0.82);
     scene.add( cube51 );
     cube51.cursor = 'pointer';
     cube51.on('click', function(ev){
        evenementClickPersonne("1.8.SE")
     });
 
     
         mixer45 = new THREE.AnimationMixer( gltf.scene );
         mixer45.clipAction( gltf.animations[ 0   ] ).play();
     });


      //BLOC 4
    let cube24;
    loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            cube24=gltf.scene;
            cube24.scale.set(0.1,0.1, 0.1)
        })

       
        cube24.name="1.9.N"
    cube24.visible=false;
    cube24.position.set(-1,0,-17-0.82);
    scene.add( cube24 );
    cube24.cursor = 'pointer';
    cube24.on('click', function(ev){
       evenementClickPersonne("1.9.N")
    });

    
        mixer46 = new THREE.AnimationMixer( gltf.scene );
        mixer46.clipAction( gltf.animations[ 0   ] ).play();
    });


    let cube25;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube25=gltf.scene;
             cube25.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube25.name="1.9.S"
     cube25.visible=false;
     cube25.position.set(-1,0,-17+0.82);
     scene.add( cube25 );
     cube25.cursor = 'pointer';
     cube25.on('click', function(ev){
        evenementClickPersonne("1.9.S")
     });
 
     
         mixer47 = new THREE.AnimationMixer( gltf.scene );
         mixer47.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube26;
     loader.load('3d/TestBlender/road/personnage_E.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube26=gltf.scene;
             cube26.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube26.name="1.9.E"
     cube26.visible=false;
     cube26.position.set(-1+0.82 ,0,-17);
     scene.add( cube26 );
     cube26.cursor = 'pointer';
     cube26.on('click', function(ev){
        evenementClickPersonne("1.9.E")
     });
 
     
         mixer48 = new THREE.AnimationMixer( gltf.scene );
         mixer48.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube27;
     loader.load('3d/TestBlender/road/personnage_O.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube27=gltf.scene;
             cube27.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube27.name="1.9.O"
         cube27.visible=false;
         cube27.position.set(-1-0.82 ,0,-17);
         scene.add( cube27 );
         cube27.cursor = 'pointer';
         cube27.on('click', function(ev){
            evenementClickPersonne("1.9.O")
         });
    
 
     
         mixer49 = new THREE.AnimationMixer( gltf.scene );
         mixer49.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube52;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube52=gltf.scene;
             cube52.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube52.name="1.9.NO"
     cube52.visible=false;
     cube52.position.set(-1-0.82,0,-17-0.82);
     scene.add( cube52 );
     cube52.cursor = 'pointer';
     cube52.on('click', function(ev){
        evenementClickPersonne("1.9.NO")
     });
     
         mixer50 = new THREE.AnimationMixer( gltf.scene );
         mixer50.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube53;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube53=gltf.scene;
             cube53.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube53.name="1.9.NE"
     cube53.visible=false;
     cube53.position.set(-1+0.82,0,-17-0.82);
     scene.add( cube53 );
     cube53.cursor = 'pointer';
     cube53.on('click', function(ev){
        evenementClickPersonne("1.9.NE")
     });
     
         mixer51 = new THREE.AnimationMixer( gltf.scene );
         mixer51.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube54;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube54=gltf.scene;
             cube54.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube54.name="1.9.SO"
         cube54.visible=false;
         cube54.position.set(-1-0.82,0,-17+0.82);
         scene.add( cube54 );
         cube54.cursor = 'pointer';
         cube54.on('click', function(ev){
            evenementClickPersonne("1.9.SO")
         });
     
         mixer52 = new THREE.AnimationMixer( gltf.scene );
         mixer52.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube55;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube55=gltf.scene;
             cube55.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube55.name="1.9.SE"
     cube55.visible=false;
     cube55.position.set(-1+0.82,0,-17+0.82);
     scene.add( cube55 );
     cube55.cursor = 'pointer';
     cube55.on('click', function(ev){
        evenementClickPersonne("1.9.SE")
     });
     
         mixer53 = new THREE.AnimationMixer( gltf.scene );
         mixer53.clipAction( gltf.animations[ 0   ] ).play();
     });

     //BLOC 5

    let cube28;
    loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            cube28=gltf.scene;
            cube28.scale.set(0.1,0.1, 0.1)
        })

       
        cube28.name="1.10.N"
    cube28.visible=false;
    cube28.position.set(1,0,-17-0.82);
    scene.add( cube28 );
    cube28.cursor = 'pointer';
    cube28.on('click', function(ev){
       evenementClickPersonne("1.10.N")
    });
    
        mixer54 = new THREE.AnimationMixer( gltf.scene );
        mixer54.clipAction( gltf.animations[ 0   ] ).play();
    });

    let cube29;
    loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            cube29=gltf.scene;
            cube29.scale.set(0.1,0.1, 0.1)
        })

       
        cube29.name="1.10.S"
    cube29.visible=false;
    cube29.position.set(1,0,-17+0.82);
    scene.add( cube29 );
    cube29.cursor = 'pointer';
    cube29.on('click', function(ev){
       evenementClickPersonne("1.10.S")
    });
    
        mixer55 = new THREE.AnimationMixer( gltf.scene );
        mixer55.clipAction( gltf.animations[ 0   ] ).play();
    });


    let cube30;
     loader.load('3d/TestBlender/road/personnage_E.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube30=gltf.scene;
             cube30.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube30.name="1.10.E"
     cube30.visible=false;
     cube30.position.set(1+0.82 ,0,-17);
     scene.add( cube30 );
     cube30.cursor = 'pointer';
     cube30.on('click', function(ev){
        evenementClickPersonne("1.10.E")
     });
     
         mixer56 = new THREE.AnimationMixer( gltf.scene );
         mixer56.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube31;
     loader.load('3d/TestBlender/road/personnage_O.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube31=gltf.scene;
             cube31.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube31.name="1.10.O"
         cube31.visible=false;
         cube31.position.set(1-0.82 ,0,-17);
         scene.add( cube31 );
         cube31.cursor = 'pointer';
         cube31.on('click', function(ev){
            evenementClickPersonne("1.10.O")
         });
     
         mixer57 = new THREE.AnimationMixer( gltf.scene );
         mixer57.clipAction( gltf.animations[ 0   ] ).play();
     });

     let cube56;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube56=gltf.scene;
             cube56.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube56.name="1.10.NO"
     cube56.visible=false;
     cube56.position.set(1-0.82,0,-17-0.82);
     scene.add( cube56 );
     cube56.cursor = 'pointer';
     cube56.on('click', function(ev){
        evenementClickPersonne("1.10.NO")
     });
     
         mixer58 = new THREE.AnimationMixer( gltf.scene );
         mixer58.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube57;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube57=gltf.scene;
             cube57.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube57.name="1.10.NE"
     cube57.visible=false;
     cube57.position.set(1+0.82,0,-17-0.82);
     scene.add( cube57 );
     cube57.cursor = 'pointer';
     cube57.on('click', function(ev){
        evenementClickPersonne("1.10.NE")
     });
     
         mixer59 = new THREE.AnimationMixer( gltf.scene );
         mixer59.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube58;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube58=gltf.scene;
             cube58.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube58.name="1.10.SO"
     cube58.visible=false;
     cube58.position.set(1-0.82,0,-17+0.82);
     scene.add( cube58 );
     cube58.cursor = 'pointer';
     cube58.on('click', function(ev){
        evenementClickPersonne("1.10.SO")
     });
     
         mixer60 = new THREE.AnimationMixer( gltf.scene );
         mixer60.clipAction( gltf.animations[ 0   ] ).play();
     });


     let cube59;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube59=gltf.scene;
             cube59.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube59.name="1.10.SE"
     cube59.visible=false;
     cube59.position.set(1+0.82,0,-17+0.82);
     scene.add( cube59 );
     cube59.cursor = 'pointer';
     cube59.on('click', function(ev){
        evenementClickPersonne("1.10.SE")
     });
     
         mixer61 = new THREE.AnimationMixer( gltf.scene );
         mixer61.clipAction( gltf.animations[ 0   ] ).play();
     });


     //BLOC 6
    let cube32;
    loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            cube32=gltf.scene;
            cube32.scale.set(0.1,0.1, 0.1)
        })

       
        cube32.name="1.11.N"
    cube32.visible=false;
    cube32.position.set(3,0,-17-0.82);
    scene.add( cube32 );
    cube32.cursor = 'pointer';
    cube32.on('click', function(ev){
       evenementClickPersonne("1.11.N")
    });
    
        mixer62 = new THREE.AnimationMixer( gltf.scene );
        mixer62.clipAction( gltf.animations[ 0   ] ).play();
    });

    let cube33;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube33=gltf.scene;
             cube33.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube33.name="1.11.S"
         cube33.visible=false;
         cube33.position.set(3,0,-17+0.82);
         scene.add( cube33 );
         cube33.cursor = 'pointer';
         cube33.on('click', function(ev){
            evenementClickPersonne("1.11.S")
         });
     
         mixer63 = new THREE.AnimationMixer( gltf.scene );
         mixer63.clipAction( gltf.animations[ 0   ] ).play();
     });
    
     let cube34;
     loader.load('3d/TestBlender/road/personnage_E.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube34=gltf.scene;
             cube34.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube34.name="1.11.E"
     cube34.visible=false;
     cube34.position.set(3+0.82 ,0,-17);
     scene.add( cube34 );
     cube34.cursor = 'pointer';
     cube34.on('click', function(ev){
        evenementClickPersonne("1.11.E")
     });
     
         mixer64 = new THREE.AnimationMixer( gltf.scene );
         mixer64.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     let cube35;
     loader.load('3d/TestBlender/road/personnage_O.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube35=gltf.scene;
             cube35.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube35.name="1.11.O"
     cube35.visible=false;
     cube35.position.set(3-0.82 ,0,-17);
     scene.add( cube35 );
     cube35.cursor = 'pointer';
     cube35.on('click', function(ev){
        evenementClickPersonne("1.11.O")
     });
     
         mixer65 = new THREE.AnimationMixer( gltf.scene );
         mixer65.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     let cube60;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube60=gltf.scene;
             cube60.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube60.name="1.11.NO"
         cube60.visible=false;
         cube60.position.set(3-0.82,0,-17-0.82);
         scene.add( cube60 );
         cube60.cursor = 'pointer';
         cube60.on('click', function(ev){
            evenementClickPersonne("1.11.NO")
         });
     
         mixer66 = new THREE.AnimationMixer( gltf.scene );
         mixer66.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     let cube61;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube61=gltf.scene;
             cube61.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube61.name="1.11.NE"
     cube61.visible=false;
     cube61.position.set(3+0.82,0,-17-0.82);
     scene.add( cube61 );
     cube61.cursor = 'pointer';
     cube61.on('click', function(ev){
        evenementClickPersonne("1.11.NE")
     });
     
         mixer67 = new THREE.AnimationMixer( gltf.scene );
         mixer67.clipAction( gltf.animations[ 0   ] ).play();
     });
  
     let cube62;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube62=gltf.scene;
             cube62.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube62.name="1.11.SO"
     cube62.visible=false;
     cube62.position.set(3-0.82,0,-17+0.82);
     scene.add( cube62 );
     cube62.cursor = 'pointer';
     cube62.on('click', function(ev){
        evenementClickPersonne("1.11.SO")
     });
     
         mixer68 = new THREE.AnimationMixer( gltf.scene );
         mixer68.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     let cube63;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube63=gltf.scene;
             cube63.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube63.name="1.11.SE"
     cube63.visible=false;
     cube63.position.set(3+0.82,0,-17+0.82);
     scene.add( cube63 );
     cube63.cursor = 'pointer';
     cube63.on('click', function(ev){
        evenementClickPersonne("1.11.SE");
     });
     
         mixer69 = new THREE.AnimationMixer( gltf.scene );
         mixer69.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     //BLOC 7
     let cube36;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube36=gltf.scene;
             cube36.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube36.name="0.11.N"
         cube36.visible=false;
         cube36.position.set(3,0,-19-0.82);
         scene.add( cube36 );
         cube36.cursor = 'pointer';
         cube36.on('click', function(ev){
            evenementClickPersonne("0.11.N");
         });
     
         mixer70 = new THREE.AnimationMixer( gltf.scene );
         mixer70.clipAction( gltf.animations[ 0   ] ).play();
     });
     
    
     let cube37;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube37=gltf.scene;
             cube37.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube37.name="0.11.S"
     cube37.visible=false;
     cube37.position.set(3,0,-19+0.82);
     scene.add( cube37 );
     cube37.cursor = 'pointer';
     cube37.on('click', function(ev){
        evenementClickPersonne("0.11.S");
     });
     
         mixer71 = new THREE.AnimationMixer( gltf.scene );
         mixer71.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     let cube38;
     loader.load('3d/TestBlender/road/personnage_E.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube38=gltf.scene;
             cube38.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube38.name="0.11.E"
     cube38.visible=false;
     cube38.position.set(3+0.82 ,0,-19);
     scene.add( cube38 );
     cube38.cursor = 'pointer';
     cube38.on('click', function(ev){
        evenementClickPersonne("0.11.E");
     });
     
         mixer72 = new THREE.AnimationMixer( gltf.scene );
         mixer72.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     let cube39;
     loader.load('3d/TestBlender/road/personnage_O.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube39=gltf.scene;
             cube39.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube39.name="0.11.O"
         cube39.visible=false;
         cube39.position.set(3-0.82 ,0,-19);
         scene.add( cube39 );
         cube39.cursor = 'pointer';
         cube39 .on('click', function(ev){
            evenementClickPersonne("0.11.O");
         });
     
         mixer73 = new THREE.AnimationMixer( gltf.scene );
         mixer73.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     let cube64;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube64=gltf.scene;
             cube64.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube64.name="0.11.NO"
         cube64.visible=false;
         cube64.position.set(3-0.82,0,-19-0.82);
         scene.add( cube64 );
         cube64.cursor = 'pointer';
         cube64.on('click', function(ev){
            evenementClickPersonne("0.11.NO");
         });
     
         mixer74 = new THREE.AnimationMixer( gltf.scene );
         mixer74.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     let cube65;
     loader.load('3d/TestBlender/road/personnage_N.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube65=gltf.scene;
             cube65.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube65.name="0.11.NE"
     cube65.visible=false;
     cube65.position.set(3+0.82,0,-19-0.82);
     scene.add( cube65 );
     cube65.cursor = 'pointer';
     cube65.on('click', function(ev){
        evenementClickPersonne("0.11.NE");
     });
     
         mixer75 = new THREE.AnimationMixer( gltf.scene );
         mixer75.clipAction( gltf.animations[ 0   ] ).play();
     });
     
     let cube66;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube66=gltf.scene;
             cube66.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube66.name="0.11.SO"
         cube66.visible=false;
         cube66.position.set(3-0.82,0,-19+0.82);
         scene.add( cube66 );
         cube66.cursor = 'pointer';
         cube66.on('click', function(ev){
            evenementClickPersonne("0.11.SO");
         });
     
         mixer76 = new THREE.AnimationMixer( gltf.scene );
         mixer76.clipAction( gltf.animations[ 0   ] ).play();
     });
     

     let cube67;
     loader.load('3d/TestBlender/road/personnage_S.glb', function(gltf){
         gltf.scene.traverse(function (child) {
             if (child.isMesh) {
                 child.receiveShadow = true
                 child.castShadow = true
             }
             cube67=gltf.scene;
             cube67.scale.set(0.1,0.1, 0.1)
         })
 
        
         cube67.name="0.11.SE"
     cube67.visible=false;
     cube67.position.set(3+0.82,0,-19+0.82);
     scene.add( cube67 );
     cube67.cursor = 'pointer';
     cube67.on('click', function(ev){
        evenementClickPersonne("0.11.SE");
     });
     
         mixer77 = new THREE.AnimationMixer( gltf.scene );
         mixer77.clipAction( gltf.animations[ 0   ] ).play();
     });

    /**------plot-----**/
    loader.load('3d/TestBlender/road/plot/plot.glb', function(gltf){
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
            console.log("Tu as trouvé le plot");
            
        });
    });

    loader.load('3d/TestBlender/road/plot/plot_2.glb', function(gltf){
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
            console.log("Tu as trouvé le plot 2");
            
        });
    });

    loader.load('3d/TestBlender/road/plot/plot_3.glb', function(gltf){
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
            console.log("Tu as trouvé le plot 3");
            
        });
    });

    loader.load('3d/TestBlender/road/plot/plot_4.glb', function(gltf){
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
            console.log("Tu as trouvé le plot 4");
            
        });
    });

    loader.load('3d/TestBlender/road/plot/plot_5.glb', function(gltf){
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
            console.log("Tu as trouvé le plot 5");
            
        });
    });

    //Chien
    loader.load('3d/TestBlender/road/chien.glb', function(gltf){
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
            console.log("Tu as trouvé le Chien");
            
        });
    });
     
}


let delta;

function animate()
{
    stats.begin()

    requestAnimationFrame( animate );
    delta = clock.getDelta();
    mixer96.update(delta);
    mixer95.update(delta);
    mixer94.update(delta);
    mixer93.update(delta);
    mixer92.update(delta);
    mixer91.update(delta);
    mixer90.update(delta);
    mixer89.update(delta);
    mixer88.update(delta);
    mixer87.update(delta);
    mixer86.update(delta);
    mixer85.update(delta);
    mixer84.update(delta);
    mixer83.update(delta);
    mixer82.update(delta);
    mixer81.update(delta);
    mixer80.update(delta);
    mixer79.update(delta);
    mixer78.update(delta);
    mixer77.update(delta);
    mixer76.update(delta);
    mixer75.update(delta);
    mixer74.update(delta);
    mixer73.update(delta);
    mixer72.update(delta);
    mixer71.update(delta);
    mixer70.update(delta);
    mixer69.update(delta);
    mixer68.update(delta);
    mixer67.update(delta);
    mixer66.update(delta);
    mixer65.update(delta);
    mixer64.update(delta);
    mixer63.update(delta);
    mixer62.update(delta);
    mixer61.update(delta);
    mixer60.update(delta);
    mixer59.update(delta);
    mixer58.update(delta);
    mixer57.update(delta);
    mixer56.update(delta);
    mixer55.update(delta);
    mixer54.update(delta);
    mixer53.update(delta);
    mixer52.update(delta);
    mixer51.update(delta);
    mixer50.update(delta);
    mixer49.update(delta);
    mixer48.update(delta);
    mixer47.update(delta);
    mixer46.update(delta);
    mixer45.update(delta);
    mixer44.update(delta);
    mixer43.update(delta);
    mixer42.update(delta);
    mixer41.update(delta);
    mixer40.update(delta);
    mixer39.update(delta);
    mixer38.update(delta);
    mixer37.update(delta);
    mixer36.update(delta);
    mixer35.update(delta);
    mixer34.update(delta);
    mixer33.update(delta);
    mixer32.update(delta);
    mixer31.update(delta);
    mixer30.update(delta);
    mixer29.update(delta);
    mixer28.update(delta);
    mixer27.update(delta);
    mixer26.update(delta);
    mixer25.update(delta);
    mixer24.update(delta);
    mixer23.update(delta);
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
    stats.end();
    //console.log(mixer.time)
}

init();
animate();