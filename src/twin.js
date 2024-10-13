import { SceneManager } from "./scene.js"
import { CameraManager } from "./camera.js";
import { InputManager } from "./input.js";
import { Models } from "./models.js";

export class Twin {
    constructor() {
        this.scene = new SceneManager(this.gameWindow)
        this.cameraManager = new CameraManager(this.gameWindow)
        this.inputManager = new InputManager(this.gameWindow, this.cameraManager)
        this.models = new Models()

        this.isMouseDown = false

        this.scene.start(this.draw.bind(this))

        this.timePrev = 0

        this.planes = [
            {
                name: "1",
                x: 6.1,
                y: 1.245,
                rotation: Math.PI / 1.3
            },
            {
                name: "2",
                x: 5.83,
                y: 3.66,
                rotation: 0
            },
            {
                name: "3",
                x: 8.72,
                y: 5.9,
                rotation: Math.PI / 4
            },
            {
                name: "4",
                x: 6.32,
                y: 12.82,
                rotation: Math.PI / 0.85
            },
        ]

    }

    loadPlanes() {
        this.planes.forEach(async (plane) => {
            this.models.loadPlaneObject(plane)
        })
        this.models.loadHumanObject()
    }

    get gameWindow() {
        return document.getElementById("render-target");
    }

    draw() {
        if (this.inputManager.isLeftMouseDown) {
            this.cameraManager.handleMouseMovement(this.inputManager.mouse)

        }

        if (parseInt((new Date().getTime() / 1000) - this.timePrev) % 2 !== 0) {
            this.scene.updateObjects(this.models)
            this.timePrev = (new Date().getTime() / 1000)
            console.log(this.models.isHumanLoaded)
        }



        this.cameraManager.updateMousePosition(this.inputManager.mouse)

        this.scene.renderer.render(this.scene.scene, this.cameraManager.camera);

    }

}

window.twin = new Twin()
window.twin.loadPlanes()

window.twin.scene.add(window.twin.models.humanObject)
