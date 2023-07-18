

import * as THREE from 'three';


export class Light {

    public readonly light : THREE.DirectionalLight;

    constructor() {

           this.light = new THREE.DirectionalLight( 0xffffff, 1 );
           this.light.position.set( 0, 0, 1 );

    }

}