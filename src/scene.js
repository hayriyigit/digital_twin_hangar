import * as THREE from "three"

const BACKGROUND = 0x1F4872

export class SceneManager {
    constructor(gameWindow) {
        this.gameWindow = gameWindow
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(BACKGROUND);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.gameWindow.offsetWidth, this.gameWindow.offsetHeight);
        this.gameWindow.appendChild(this.renderer.domElement);

        this.humanObjects = []

        this.initLight()
        this.initFloor()
    }


    initLight() {
        const sun = new THREE.DirectionalLight(0xffffff, 2)
        sun.position.set(5, 50, 0);
        sun.castShadow = true;
        sun.shadow.camera.left = -0;
        sun.shadow.camera.right = 0;
        sun.shadow.camera.top = 20;
        sun.shadow.camera.bottom = -20;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.near = 10;
        sun.shadow.camera.far = 50;
        sun.shadow.normalBias = 0.01;
        this.scene.add(sun);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    }

    initFloor() {
        const geometry = new THREE.BoxGeometry(10, 0.1, 14);
        const material = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load("public/floor.png"),
            color: 0x777777
        })
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(5, 0, 7);
        mesh.castShadow = true;
        this.add(mesh)
    }

    updateObjects(models) {
        const url = "http://127.0.0.1:5000/"

        const response = fetch(url)
            .then((response) => response.json())
            .then(response => {
                const data = response.data
                const planes = data.filter(object => object.type == "plane")
                const humans = data.filter(object => object.type == "human")
                this.updateHumans(humans, models)
            })
            .catch(e => console.log(e))
    }

    // updatePlanes(planes){

    // }

    updateHumans(humans, models) {
        // this.scene.remove(this.scene.getObjectByName("human"))
        this.humanObjects.forEach(element => {
            this.scene.remove(element)
        });
        this.humanObjects = []

        humans.forEach(element => {
            // console.log(models.humanObject)
            const human = models.humanObject.clone()
            human.position.set(element.x / 100, 0, element.y / 100)
            this.humanObjects.push(human)
            this.add(human)
        });
        
    }

    add(object) {
        this.scene.add(object)
    }

    start(draw) {
        this.renderer.setAnimationLoop(draw);
    }
}