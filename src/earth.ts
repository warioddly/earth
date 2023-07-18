

import * as THREE from 'three';


export class Earth {

    public readonly earth : THREE.Mesh;

    constructor() {

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry( 0.5, 50, 50 );

        const material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load("images/8k_earth_daymap.jpg"),
            bumpMap: new THREE.TextureLoader().load("images/elev_bump_8k.jpg"),
            bumpScale: 0.005,
            specular: new THREE.Color("grey"),
            shininess: 10,
        });

        this.earth = new THREE.Mesh( geometry, material );

    }

    public rotate(time) {
        this.earth.rotation.y = time / 6000;
    }

}