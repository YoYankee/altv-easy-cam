import { Vector3 } from 'alt-client';
import native from 'natives';

export default class easyCam {
    private camera: number | null;
    constructor(name: string, pos: Vector3, point: Vector3, fov: number | null){
        this.camera = native.createCam(name, true);
        native.setCamCoord(this.camera, pos.x, pos.y, pos.z);
        this.setCoord(pos);
        this.pointAtCoord(point);
        if (fov) this.setFov(fov);
        this.setActive(true);
        native.renderScriptCams(true, false, 0, true, false, false);
    }

    get cam() {
        return this.camera;
    }

    destroy() {
        this.setActive(false);
        native.destroyCam(this.cam, true);
        this.camera = null;
        native.renderScriptCams(false, false, 0, true, false, false);
    };

    switchTo(name: string, pos: Vector3, toPos: Vector3, time: number, fov: number | null) {
        if (!this.camera) return;
        const newCam = new easyCam(name, pos, toPos, fov);
        newCam.setCoord(pos);
        newCam.pointAtCoord(toPos);
        if (fov) newCam.setFov(fov);
        this.setActiveWithInterp(newCam.cam, this.camera, time, 0, 0);
        this.destroy();
    };

    tpTo(pos: Vector3, toPos: Vector3, fov: number | null) {
        if (!this.camera) return;
        this.setCoord(pos);
        this.pointAtCoord(toPos);
        if (fov) this.setFov(fov)
    };    

    setCoord(pos: Vector3) {
        if (!this.camera) return;
        native.setCamCoord(this.camera, pos.x, pos.y, pos.z);
    }

    pointAtCoord(pos: Vector3) {
        if (!this.camera) return;
        native.pointCamAtCoord(this.camera, pos.x, pos.y, pos.z);
    }

    setRot(pos: Vector3, order: number) {
        if (!this.camera) return;
        native.setCamRot(this.camera, pos.x, pos.y, pos.z, order);
    }

    setFov(fov: number) {
        if (!this.camera) return;
        native.setCamFov(this.camera, fov);
    }

    setActive(state: boolean) {
        if (!this.camera) return;
        native.setCamActive(this.camera, state);
    }

    setActiveWithInterp(camTo: number, camFrom: number, duration: number, easeLocation: number, easeRotation: number) {
        native.setCamActiveWithInterp(camTo, camFrom, duration, easeLocation, easeRotation);
    }
}
