

import * as THREE from 'three';


export class Earth {

    public readonly earth : THREE.Mesh;

    constructor() {

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry( 0.5, 50, 50 );
        const material = new THREE.MeshNormalMaterial({ color: 0x00ff00, wireframe: true });

        this.earth = new THREE.Mesh( geometry, material );

    }

    public rotate(time) {
        this.earth.rotation.y = time / 3000;
    }


}