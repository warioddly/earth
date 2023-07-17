
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';




class Engine {


    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _controls: OrbitControls;


    private readonly _mesh: THREE.Mesh;


    constructor() {

            this._scene = new THREE.Scene();
            this._camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
            this._camera.position.z = 1;

            const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
            const material = new THREE.MeshNormalMaterial();

            this._mesh = new THREE.Mesh( geometry, material );

            this._scene.add( this._mesh );

            this._renderer = new THREE.WebGLRenderer( { antialias: true } );
            this._renderer.setSize( window.innerWidth, window.innerHeight );
            this._renderer.setAnimationLoop( this._animation.bind(this) );
            document.body.appendChild( this._renderer.domElement );
            this._controls = new OrbitControls(this._camera, this._renderer.domElement);



    }


    private _animation( time ) {

            this._mesh.rotation.x = time / 21000;
            this._mesh.rotation.y = time / 1000;
            this._controls.update();
            this._renderer.render( this._scene, this._camera );

    }


}



const engine = new Engine();
