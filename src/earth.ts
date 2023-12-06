// @ts-ignore
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

export class Earth {

    public readonly earth : THREE.Mesh;
    public readonly clouds : THREE.Mesh;
    public readonly atmosphere : THREE.Mesh;
    private user;
    // private userRing;

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {

        const cloudTexture = new THREE.TextureLoader().load( require('./assets/images/8k_earth_clouds.jpg')  ),
              earthDayTexture = new THREE.TextureLoader().load( require('./assets/images/8k_earth_daymap.jpg') ),
              earthNightTexture = new THREE.TextureLoader().load( require('./assets/images/8k_earth_nightmap.jpg') ),
              bumpTexture  = new THREE.TextureLoader().load( require('./assets/images/8081_earthbump10k.jpg')),
              earthSpecTexture = new THREE.TextureLoader().load( require('./assets/images/8081_earthspec10k.jpg'));

        const earthMaterial = new THREE.MeshPhongMaterial({
            bumpMap: bumpTexture,
            bumpScale: 0.003,
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
            uniforms: {
                    "c":   { type: "f", value: 1 },
                    "p":   { type: "f", value: 1 },
                    glowColor: { type: "c", value: new THREE.Color(0x00b3ff) },
                    viewVector: { type: "v3", value: camera.position }
                },
            vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending ,
            transparent: true,
        });

        this.earth = new THREE.Mesh( new THREE.SphereGeometry( 0.5, 60, 60 ), earthMaterial );
        this.clouds = new THREE.Mesh( new THREE.SphereGeometry( 0.505, 60, 60 ), cloudsMaterial );
        this.atmosphere = new THREE.Mesh(new THREE.SphereGeometry( 0.511, 60, 60 ), atmosphereMaterial);

        scene.add( this.earth );
        scene.add( this.clouds );
        scene.add( this.atmosphere );

        this._addUserPosition();

    }




    private _addUserPosition() {

        new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        })
            .then((coordinates: any) => {

                const { latitude, longitude } = coordinates.coords,
                    phi = (90 - latitude) * (Math.PI / 180),
                    theta = (longitude + 180) * (Math.PI / 180),
                    earthRadius = this.earth.geometry.parameters.radius;

                const surfacePosition = new THREE.Vector3(
                    -earthRadius * Math.sin(phi) * Math.cos(theta),
                    earthRadius * Math.cos(phi),
                    earthRadius * Math.sin(phi) * Math.sin(theta)
                );

                const userRadius = .0065;

                this.user = new THREE.Mesh(
                    new THREE.SphereGeometry(userRadius, 32, 32),
                    new THREE.MeshBasicMaterial({
                        color: 0x4ade80,
                        opacity: 0.5,
                        transparent: true,
                    })
                );

                // this.userRing = new THREE.Mesh(
                //     new THREE.RingGeometry(0, 1.9, 32),
                //     new THREE.MeshBasicMaterial({
                //         color: 0xdc2626,
                //         side: THREE.DoubleSide,
                //         blending: THREE.AdditiveBlending ,
                //         opacity: 0.5,
                //         transparent: true,
                //     })
                // );
                //
                // this.userRing.scale.set(0.001, 0.001, 0.001);

                this.user.position.copy(surfacePosition).add(new THREE.Vector3(0, userRadius, 0));


                // new TWEEN.Tween(this.userRing.scale)
                //     .to(new THREE.Vector3(0.03, 0.03, 0.03))
                //     .easing(TWEEN.Easing.Quadratic.Out)
                //     .repeat(Infinity)
                //     .start();
                //
                // new TWEEN.Tween(this.userRing.material)
                //     .to({ opacity: 0 })
                //     .easing(TWEEN.Easing.Quadratic.Out)
                //     .repeat(Infinity)
                //     .start();
                //
                // this.user.add(this.userRing);
                this.earth.add(this.user);

            });

    }


    public animate(time: number) {
        this.earth.rotation.y = time * 0.00002;
        this.clouds.rotation.y = time * 0.00001;
        // TWEEN.update();
    }

}