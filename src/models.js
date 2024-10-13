import * as THREE from "three"
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

export class Models {
    constructor() {
        this.obj_loader = new OBJLoader()
        this.mtl_loader = new MTLLoader()

        this.humanObject = new THREE.Group()
    }

    loadPlaneObject(plane) {
        this.mtl_loader.load(
            './public/plane.mtl',
            function (materials) {
                materials.preload();
                var objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load('./public/plane.obj', function (object) {
                    object.scale.setScalar(0.001);
                    object.rotation.x = -(Math.PI / 2);
                    object.material = new THREE.MeshLambertMaterial()
                    object.traverse((node) => {
                        if (node.isMesh) {
                            node.castShadow = true
                        }
                    })
                    const group = new THREE.Group();
                    group.add(object)
                    object.position.set(-0.8, 0.23, 0)
                    group.position.set(plane.x, 0, plane.y)

                    group.name = plane.name

                    group.rotation.y = plane.rotation

                    window.twin.scene.add(group)
                })

            },
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            function (error) {

                console.log('An error happened', error);

            }
        );
    }

    loadHumanObject() {
        this.obj_loader.load(
            './public/human.obj',
            function (object) {
                object.scale.setScalar(0.01);
                // object.rotation.x = -(Math.PI / 2);
                object.material = new THREE.MeshLambertMaterial()
                object.traverse((node) => {
                    node.material.color.setHex(0x83e68e);
                    if (node.isMesh) {
                        node.castShadow = true
                    }
                })
                // const humanObject = new THREE.Group();
                this.humanObject.add(object)
                object.position.set(0, 0.05, 0)
                this.humanObject.position.set(1000, 0, 0)

            }.bind(this),
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded HUMAN');

            },
            function (error) {

                console.log('An error happened', error);

            }
        );

    }


}