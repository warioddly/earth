// @ts-ignore
import * as THREE from 'three';

export class Earth {

    public readonly earth : THREE.Mesh;
    public readonly clouds : THREE.Mesh;
    public readonly atmosphere : THREE.Mesh;

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {

        const cloudTexture = new THREE.TextureLoader().load( require('./assets/images/8k_earth_clouds.jpg')  ),
              earthDayTexture = new THREE.TextureLoader().load( require('./assets/images/8k_earth_daymap.jpg') ),
              earthNightTexture = new THREE.TextureLoader().load( require('./assets/images/8k_earth_nightmap.jpg') ),
              bumpTexture  = new THREE.TextureLoader().load( require('./assets/images/8081_earthbump10k.jpg')),
              earthSpecTexture = new THREE.TextureLoader().load( require('./assets/images/8081_earthspec10k.jpg'));

        const earthMaterial = new THREE.MeshPhongMaterial({
            bumpMap: bumpTexture,
            bumpScale: 0.001,
            map: earthDayTexture,
            emissiveMap: earthNightTexture,
            emissive: new THREE.Color(0x888888),
            emissiveIntensity: 1,
            specularMap: earthSpecTexture,
            specular: 1,
            shininess: 30,
        });
        const cloudsMaterial = new THREE.MeshPhongMaterial({
            map: cloudTexture,
            alphaMap : cloudTexture,
            transparent: true,
            alphaTest: 0.0001,
            side: THREE.DoubleSide,
        });
        const atmosphereMaterial = new THREE.ShaderMaterial({
            uniforms:
                {
                    "c":   { type: "f", value: 1 },
                    "p":   { type: "f", value: 1 },
                    glowColor: { type: "c", value: new THREE.Color(0x00b3ff) },
                    viewVector: { type: "v3", value: camera.position }
                },
            vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending ,
            transparent: true
        });

        this.earth = new THREE.Mesh( new THREE.SphereGeometry( 0.5, 60, 60 ), earthMaterial );
        this.clouds = new THREE.Mesh( new THREE.SphereGeometry( 0.505, 60, 60 ), cloudsMaterial );
        this.atmosphere = new THREE.Mesh(new THREE.SphereGeometry( 0.511, 60, 60 ), atmosphereMaterial);

        scene.add( this.earth );
        scene.add( this.clouds );
        scene.add( this.atmosphere );

    }


    private animateClouds(time: number) {
        this.clouds.rotation.y = time * 0.00001;
    }

    public animate(time: number) {
        this.earth.rotation.y = time * 0.00002;
        this.animateClouds(time);
    }

}