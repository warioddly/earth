
// @ts-ignore
import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';

export class Sun {

    public readonly sun : THREE.Mesh;

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(0.5, 50, 50);

        const material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(require('./assets/images/8k_sun.jpg')),
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
        // const hexangle = textureLoader.load( require('./assets/images/lensflare/hexangle.png') );
        // const textureFlare0_alpha = textureLoader.load( require('./assets/images/lensflare/lensflare0_alpha.png') );
        // const textureFlare0 = textureLoader.load( require('./assets/images/lensflare/lensflare0.png') );
        // const textureFlare1 = textureLoader.load( require('./assets/images/lensflare/lensflare1.png') );
        // const textureFlare2 = textureLoader.load( require('./assets/images/lensflare/lensflare2.png') );
        // const textureFlare3 = textureLoader.load( require('./assets/images/lensflare/lensflare3.png') );
        //
        // const sunPosition = this.sun.position.clone();
        //
        // for (let i = 0; i < 20; i++) {
        //
        //     const lensflare = this.addLensFlare(sunPosition, 16000, hexangle, textureFlare2, textureFlare0);
        //
        //     this.sun.add( lensflare );
        //
        // }


    }


    private addLensFlare(position, size, overrideImage, textureFlare1, textureFlare2) {

        const flareColor = new THREE.Color( 0xffffff );

        const lensFlare = new Lensflare( overrideImage, 2700, 0.0, THREE.AdditiveBlending, flareColor );

        lensFlare.add( textureFlare1, 4096, 0.0, THREE.AdditiveBlending );
        lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
        lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
        lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

        // lensFlare.customUpdateCallback = lensFlareUpdateCallback;

        lensFlare.position.copy( position );
        lensFlare.size = size ? size : 16000 ;

        return lensFlare;
    }


}