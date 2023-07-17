

import * as THREE from 'three';


export class Light {

    public readonly light : THREE.DirectionalLight;

    constructor() {

        // red light
        // this.light = new THREE.DirectionalLight( 0xff0000, 1 );
        // white light
        this.light = new THREE.DirectionalLight( 0xffffff, 1 );
        this.light.position.set( 1, 1, 1 ).normalize();

    }

}