export class InputManager {

    constructor(gameWindow, cameraManager) {
        document.body.addEventListener("keypress", this.onKeyPress.bind(this), false)
        gameWindow.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        gameWindow.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        gameWindow.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        gameWindow.addEventListener("wheel", this.onScroll.bind(this), false)

        this.mouse = { x: 0, y: 0 };
        this.isLeftMouseDown = false;
        this.isMiddleMouseDown = false;
        this.isRightMouseDown = false;
        this.isWheelUp = false
        this.isWheelDown = false
        this.moveDirection = null
        this.cameraManager = cameraManager
    }

    onMouseDown(event) {
        if (event.button === 0) {
            this.isLeftMouseDown = true;
        }
        if (event.button === 1) {
            this.isMiddleMouseDown = true;
        }
        if (event.button === 2) {
            this.isRightMouseDown = true;
        }
    }

    onMouseUp(event) {
        if (event.button === 0) {
            this.isLeftMouseDown = false;
        }
        if (event.button === 1) {
            this.isMiddleMouseDown = false;
        }
        if (event.button === 2) {
            this.isRightMouseDown = false;
        }
    }

    onMouseMove(event) {
        this.isLeftMouseDown = event.buttons & 1;
        this.isRightMouseDown = event.buttons & 2;
        this.isMiddleMouseDown = event.buttons & 4;
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
    }

    onScroll(event) {
        if (event.deltaY < 0) {
            this.cameraManager.zoomIn()
        }
        else {
            this.cameraManager.zoomOut()
        }
    }

    onKeyPress(event) {
        if (event.key === "w") {
            this.cameraManager.moveForward()
        }

        if (event.key === "s") {
            this.cameraManager.moveBackward()
        }

        if (event.key === "a") {
            this.cameraManager.moveLeft()
        }

        if (event.key === "d") {
            this.cameraManager.moveRight()
        }
    }
}