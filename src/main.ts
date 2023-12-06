
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Earth } from './earth';
import { Sun } from "./sun";
import { Space } from "./space";

class Engine {


    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private readonly _renderer: THREE.WebGLRenderer;
    private _controls: OrbitControls;
    private readonly _earth: Earth;
    private readonly _sun: Sun;


    constructor() {

        this._scene = new THREE.Scene();
        this._scene.fog = new THREE.Fog( this._scene.background, 3500, 15000 );
        this._scene.background = new THREE.Color().setHSL( 0.51, 0.4, 0.01, THREE.SRGBColorSpace );

        this._camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 100 );
        this._camera.position.z = 1;

        this._renderer = new THREE.WebGLRenderer( { antialias: true, } );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.xr.enabled = false;
        this._renderer.shadowMap.autoUpdate = false;

        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.05;
        this._controls.minDistance = 0.550;
        this._controls.maxDistance = 2;

        const plight = new THREE.PointLight(0xffffff, 1);
        plight.position.set(1, 1, 1);
        this._scene.add(plight);

        this._scene.add(new Space());
        this._earth = new Earth(this._scene, this._camera);
        // this._sun = new Sun(this._scene);

        // this._scene.position.set(0, -1, -1);

        document.body.appendChild( this._renderer.domElement );

        window.addEventListener( 'resize', this._resize.bind(this) );

        this._renderer.setAnimationLoop( this._animate.bind(this) );

    }


    private _animate( time: number ) {

        this._controls.update();

        this._earth.animate(time);

        this._renderer.render( this._scene, this._camera );

    }


    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );

    }


}



new Engine();
