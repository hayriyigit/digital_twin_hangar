import * as THREE from 'three';

const CAMERA_SIZE = 40;
const MAX_RENDER = 1000
const MIN_RENDER = 1
const DEG2RAD = Math.PI / 180.0;


const Y_AXIS = new THREE.Vector3(0, 1, 0)

export class CameraManager {
    constructor(gameWindow) {
        const ratio = gameWindow.offsetWidth / gameWindow.offsetHeight
        this.camera = new THREE.PerspectiveCamera(CAMERA_SIZE, ratio, MIN_RENDER, MAX_RENDER);
        this.cameraOrigin = new THREE.Vector3()
        this.cameraRadius = 20;
        this.cameraAzimuth = 0;
        this.cameraElevation = 10;

        this.prevMouseX = 0;
        this.prevMouseY = 0;
        this.updateCameraPosition();
    }

    zoomIn() {
        this.cameraRadius = Math.max(2, this.cameraRadius - 1);
        this.updateCameraPosition()
    }

    zoomOut() {
        this.cameraRadius = Math.min(50, this.cameraRadius + 1)
        this.updateCameraPosition()
    }

    moveForward() {
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, this.cameraAzimuth * DEG2RAD)
        this.cameraOrigin.add(forward.multiplyScalar(-0.01 * 20))
        this.updateCameraPosition()
    }

    moveBackward() {
        const backward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, this.cameraAzimuth * DEG2RAD)
        this.cameraOrigin.add(backward.multiplyScalar(0.01 * 20))
        this.updateCameraPosition()
    }

    moveLeft() {
        const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, this.cameraAzimuth * DEG2RAD)
        this.cameraOrigin.add(left.multiplyScalar(-0.01 * 20))
        this.updateCameraPosition()
    }

    moveRight() {
        const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, this.cameraAzimuth * DEG2RAD)
        this.cameraOrigin.add(right.multiplyScalar(0.01 * 20))
        this.updateCameraPosition()
    }

    handleMouseMovement(coords){

        const deltaX = (coords.x - this.prevMouseX)
        const deltaY = (coords.y - this.prevMouseY)
        this.cameraAzimuth += -(deltaX * 0.5);
        this.cameraElevation += (deltaY * 0.5);
        this.cameraElevation = Math.min(90, Math.max(0, this.cameraElevation));
        this.updateCameraPosition();
    }

    updateMousePosition(coords){
        this.prevMouseX = coords.x;
        this.prevMouseY = coords.y;
    }

    updateCameraPosition() {
        this.camera.position.x = this.cameraRadius * Math.sin(this.cameraAzimuth * DEG2RAD) * Math.cos(this.cameraElevation * DEG2RAD);
        this.camera.position.y = this.cameraRadius * Math.sin(this.cameraElevation * DEG2RAD);
        this.camera.position.z = this.cameraRadius * Math.cos(this.cameraAzimuth * DEG2RAD) * Math.cos(this.cameraElevation * DEG2RAD);
        this.camera.position.add(this.cameraOrigin)
        this.camera.lookAt(this.cameraOrigin);
        this.camera.updateMatrix();
    };

}