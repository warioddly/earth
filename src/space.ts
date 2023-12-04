
import * as THREE from 'three';


export class Space {


    private readonly milkyWay: THREE.Mesh;


    constructor() {

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry( 30.5, 60, 60 );

        const material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load( require('./assets/images/8k_stars.jpg') ),
            side: THREE.BackSide,
        });

        this.milkyWay = new THREE.Mesh( geometry, material );


        return this.milkyWay;

    }

}