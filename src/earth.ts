// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// @ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// @ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// @ts-ignore
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// @ts-ignore
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

export class Earth {

    public readonly earth : THREE.Mesh;
    public readonly clouds : THREE.Mesh;
    public readonly atmosphere : THREE.Mesh;
    public readonly composer : EffectComposer;
    public readonly bloomPass : UnrealBloomPass;
    public readonly effectFXAA : THREE.ShaderPass;
    private darkMaterial : THREE.MeshBasicMaterial;
    private lightMaterial : THREE.MeshBasicMaterial;

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {

        const cloudTexture = new THREE.TextureLoader().load( require('./assets/images/8k_earth_clouds.jpg') )
        const earthTexture = new THREE.TextureLoader().load( require('./assets/images/8k_earth_daymap.jpg') )
        const bumpTexture = new THREE.TextureLoader().load( require('./assets/images/elev_bump_8k.jpg') )

        const earthMaterial = new THREE.MeshPhongMaterial({
            map: earthTexture,
            bumpMap: bumpTexture,
            bumpScale: 3,
            color: 0xffffff,
            shininess: 10,
        });

        const cloudsMaterial = new THREE.MeshPhongMaterial({
            map: cloudTexture,
            alphaMap : cloudTexture,
            transparent: true,
            alphaTest: 0.001,
            shininess: 1,
        });


        this.earth = new THREE.Mesh( new THREE.SphereGeometry( 0.5, 60, 60 ), earthMaterial );
        this.clouds = new THREE.Mesh( new THREE.SphereGeometry( 0.51, 60, 60 ), cloudsMaterial );
        // this.atmosphere = new THREE.Mesh(new THREE.SphereGeometry(0.52, 60, 60), atmosphereMaterial);

        scene.add(this.earth);
        scene.add(this.clouds);
        // scene.add(this.atmosphere);

        this.earth.layers.enable(0);
        this.clouds.layers.enable(0);


        camera.layers.enable(1);
        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry( 0.52, 60, 60 ),
            new THREE.MeshBasicMaterial({
                color: 0x93cfef,
                side: THREE.BackSide
            })
        );
        atmosphere.layers.enable(1);
        scene.add(atmosphere);

        /** COMPOSER */
        const renderScene = new RenderPass( scene, camera )

        this.effectFXAA = new ShaderPass( FXAAShader )
        this.effectFXAA.uniforms.resolution.value.set( 1 / window.innerWidth, 1 / window.innerHeight )

        this.bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
        this.bloomPass.threshold = 0.1
        this.bloomPass.strength = 0.5
        this.bloomPass.radius = 0.1
        this.bloomPass.renderToScreen = true

        this.composer = new EffectComposer( renderer )
        this.composer.setSize( window.innerWidth, window.innerHeight )

        this.composer.addPass( renderScene )
        this.composer.addPass( this.effectFXAA )
        this.composer.addPass( this.bloomPass )

    }


    public rotate(time: number) {
        this.earth.rotation.y = time / 10000;
    }

    public moveClouds(time: number) {
        this.clouds.rotation.y = time / 12000;
    }

    public animate(time: number) {
        this.rotate(time);
        this.moveClouds(time);

        this.composer.render();

    }

}