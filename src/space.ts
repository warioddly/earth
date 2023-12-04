
import * as THREE from 'three';


export class Space {


    private readonly milkyWay: THREE.Mesh;


    constructor() {

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry( 0.5, 350, 350 );

        const material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load( require('./assets/images/milkyway.jpg') ),
            side: THREE.BackSide,
        });

        this.milkyWay = new THREE.Mesh( geometry, material );


    }

}