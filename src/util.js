import { Color, Vector3 } from 'three';

const random = {
  color(){
    return new Color(Math.random() * 0xffffff);
  },
  int(min, max) {
    return Math.round(this.float(min, max));
  },
  float (min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    return Math.random() * (max - min) + min;
  },
  position(
    x = { min: -10, max: 10},
    y = { min: -10, max: 10},
    z = { min: -10, max: 10},
  ) {
    return new Vector3(
        this.float(x.min, x.max),
        this.float(y.min, y.max),
        this.float(z.min, z.max),
    );
  }
};

const util = {
  times(func, times) {
    for(let i = 0; i < times; i++) {
      func();
    }
  },
  loopObjectKeys(object, callback) {
    Object.keys(object).forEach(keyName => callback(object[keyName]));
  },
  deg2rad(deg) {
    return deg * Math.PI / 180;
  },
  rad2deg(rad) {
    return rad * 180 / Math.PI;
  },
}

export { util, random };