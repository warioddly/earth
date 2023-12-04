
// @ts-ignore
import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// @ts-ignore
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// @ts-ignore
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// @ts-ignore
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


export class Earth {

    public readonly earth : THREE.Mesh;
    public readonly clouds : THREE.Mesh;
    public composer : EffectComposer;

    public params = {
        threshold: 2,
        strength: 23,
        radius: 70,
        exposure: 12
    };

    constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) {

        const cloudTexture = new THREE.TextureLoader().load( require('./assets/images/8k_earth_clouds.jpg') )
        const earthTexture = new THREE.TextureLoader().load( require('./assets/images/8k_earth_daymap.jpg') )
        const bumpTexture = new THREE.TextureLoader().load( require('./assets/images/elev_bump_8k.jpg') )

        const material = new THREE.MeshPhongMaterial({
            map: earthTexture,
            bumpMap: bumpTexture,
            bumpScale: 0.007,
            specular: new THREE.Color("grey"),
            shininess: 10,
        });
        const cloudsMaterial = new THREE.MeshPhongMaterial({
            map: cloudTexture,
            alphaMap : cloudTexture,
            transparent: true,
            alphaTest: 0.001,
            shininess: 1,
        });

        this.earth = new THREE.Mesh( new THREE.SphereGeometry( 0.5, 60, 60 ), material );
        this.clouds = new THREE.Mesh( new THREE.SphereGeometry( 0.51, 60, 60 ), cloudsMaterial );

        scene.add(this.earth);
        scene.add(this.clouds);


        // const geometry = new THREE.SphereGeometry(1, 32, 32);
        // const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        // const mesh = new THREE.Mesh(geometry, material);
        // scene.add(mesh);

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 12.5, 12.4, 12.85);
        const renderPass = new RenderPass(scene, camera);

        this.composer = new EffectComposer(renderer);
        this.composer.addPass(renderPass);
        this.composer.addPass(bloomPass);

        // const gui = new GUI();
        //
        // const bloomFolder = gui.addFolder( 'bloom' );
        //
        // bloomFolder.add( this.params, 'threshold', 0.0, 1.0 ).onChange( function ( value ) {
        //
        //     bloomPass.threshold = Number( value );
        //
        // } );
        //
        // bloomFolder.add( this.params, 'strength', 0.0, 3.0 ).onChange( function ( value ) {
        //
        //     bloomPass.strength = Number( value );
        //
        // } );
        //
        // gui.add( this.params, 'radius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
        //
        //     bloomPass.radius = Number( value );
        //
        // } );

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