
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Earth } from './earth';
import { Sun } from "./sun";
import { Space } from "./space";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// @ts-ignore
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// @ts-ignore
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

class Engine {


    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private readonly _renderer: THREE.WebGLRenderer;
    private _controls: OrbitControls;
    private composer: EffectComposer;

    private readonly _earth: Earth ;
    private readonly _sun: Sun = new Sun();


    constructor() {

        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 100 );
        this._camera.position.z = 0.9;

        this._renderer = new THREE.WebGLRenderer( { antialias: true, } );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        // this._renderer.toneMapping = THREE.ReinhardToneMapping;

        this._controls = new OrbitControls(this._camera, this._renderer.domElement);

        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.05;
        this._controls.minDistance = 0.550;
        this._controls.maxDistance = 2;

        this._scene.add( new THREE.AmbientLight( 0xcccccc ) );
        this._scene.add(new Space());
        this._earth = new Earth(this._scene, this._camera, this._renderer);

        document.body.appendChild( this._renderer.domElement );

        window.addEventListener( 'resize', this._resize.bind(this) );

        this._renderer.setAnimationLoop( this._animation.bind(this) );

    }


    private _animation( time: number ) {


        this._controls.update();

        // this._renderer.render( this._scene, this._camera );

        this._earth.animate(time);


    }


    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }


}



new Engine();
