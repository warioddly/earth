
// @ts-ignore
import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';

export class Sun {

    public readonly sun : THREE.Mesh;

    constructor(scene: THREE.Scene) {

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(0.5, 50, 50);

        const material = new THREE.MeshBasicMaterial({
            // map: new THREE.TextureLoader().load(require('./assets/images/8k_sun.jpg')),
            side: THREE.FrontSide,
            color: 0xffffff,
        });

        this.sun = new THREE.Mesh(geometry, material);
        this.sun.position.z = -2;
        this.sun.position.set(1, 1, 1);
        this.sun.matrixAutoUpdate = false;
        this.sun.updateMatrix();
        scene.add(this.sun);


        // const textureLoader = new THREE.TextureLoader();
        //
        // const textureFlare0 = textureLoader.load( require("./assets/images/lensflare/lensflare0.png") );
        // const textureFlare1 = textureLoader.load( require("./assets/images/lensflare/lensflare2.png") );
        // const textureFlare2 = textureLoader.load( require("./assets/images/lensflare/lensflare3.png") );
        //
        // for (let i = 0; i < 10; i++) {
        //     scene.add( this.addLensFlare(
        //         new THREE.Vector3(1, 1, 1),
        //         120.5,
        //         )
        //     );
        // }

    }


    private addLensFlare(position, size) {

        const textureLoader = new THREE.TextureLoader();

        const textureFlare0 = textureLoader.load( require("./assets/images/lensflare/lensflare0.png") );
        const textureFlare3 = textureLoader.load( require("./assets/images/lensflare/lensflare3.png") );
        const textureFlare2 = textureLoader.load( require("./assets/images/lensflare/lensflare2.png") );
        const textureFlare1 = textureLoader.load( require("./assets/images/lensflare/lensflare1.png") );

        const lensFlare = new Lensflare();
        lensFlare.addElement( new LensflareElement( textureFlare0, size, 0.1, new THREE.Color( 0xffffff ) ) );
        lensFlare.addElement( new LensflareElement( textureFlare3, size, .3 ) );
        lensFlare.addElement( new LensflareElement( textureFlare2, size, 0.5 ) );
        lensFlare.addElement( new LensflareElement( textureFlare1, size, 0.7 ) );
        lensFlare.addElement( new LensflareElement( textureFlare2, size, 1 ) );

        lensFlare.position.copy( position );

        return lensFlare;
    }


}

