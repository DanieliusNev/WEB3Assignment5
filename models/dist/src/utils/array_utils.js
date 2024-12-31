// Trying to avoid getting Ramda all over the code base
export const times = (gen, size) => Array.from(new Array(size), (_, i) => gen(i));
export const repeat = (val, size) => times(_ => val, size);
export const update = (index, val, array) => array.map((e, i) => i === index ? val : e);
export const zipWith = (w, ts, us) => ts.map((t, i) => w(t, us[i]));
