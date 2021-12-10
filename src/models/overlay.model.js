import {
    v4
} from 'uuid';

export const OverlayType = {
    POI: 'poi',
    Marker: 'Marker',
    Emissive: 'emissive',
}

export const POIIcon = {
    Camera: 'camera',
    Location: 'location',
    TrafficLight: 'trafficLight',
    TrashCan: 'trashCan',
    StreetLamp: 'streetLamp',
    BusStation: 'busStation',
    Exit: 'exit',
    Restaurant: 'restaurant',
    Parking: 'parking',
    Dock: 'dock',
    Subway: 'subway',
    Supermarket: 'supermarket',
    Mall: 'mall',
    Toilet: 'toilet',
}

export const EmissionType = {
    type1: '悬浮标记01',
    type2: '圆形区域轮廓02',
    type3: '雷达标记',
    type4: '地面标记01',
    type5: '圆形区域轮廓01',
    type6: '事故标记',
    type7: '悬浮标记02',
    type8: '圆形区域轮廓03',
}

export class Overlay {
    constructor() {
        this.corrdinateX = 0;
        this.corrdinateY = 0;
        this.corrdinateZ = 0;
        this.content = '';
        this.color = '';
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.scale = 1;
        this.opacity = 1;
        this.id = v4();
    }
}

export class POIOverlay extends Overlay {
    constructor() {
        // @ts-ignore
        super(...arguments);
        this.type = OverlayType.POI;
        this.icon = '';
    }
}

export class MarkerOverlay extends Overlay {
    constructor() {
        // @ts-ignore
        super(...arguments);
        this.type = OverlayType.Marker;
        this.title = '';
        this.align = '';
        this.borderWidth = 0;
        this.borderColor = '';
    }
}

export class EmissiveOverlay extends Overlay {
    constructor() {
        // @ts-ignore
        super(...arguments);
        this.type = OverlayType.Emissive;
        this.emission = 0;
        this.speed = 0;
        this.icon = '';
    }
}