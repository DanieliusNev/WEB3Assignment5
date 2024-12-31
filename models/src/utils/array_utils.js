"use strict";
// Trying to avoid getting Ramda all over the code base
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipWith = exports.update = exports.repeat = exports.times = void 0;
const times = (gen, size) => Array.from(new Array(size), (_, i) => gen(i));
exports.times = times;
const repeat = (val, size) => (0, exports.times)(_ => val, size);
exports.repeat = repeat;
const update = (index, val, array) => array.map((e, i) => i === index ? val : e);
exports.update = update;
const zipWith = (w, ts, us) => ts.map((t, i) => w(t, us[i]));
exports.zipWith = zipWith;
