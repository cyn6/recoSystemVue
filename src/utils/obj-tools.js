export function flatten(obj) {
  // 扁平化对象
  const ans = {};
  inner(obj, null);
  function inner(o, prev) {
    for (let key in o) {
      if (o[key] instanceof Object) {
        if (prev === null) {
          inner(o[key], key);
        } else {
          inner(o[key], prev + "." + key);
        }
      } else {
        if (prev === null) {
          ans[key] = o[key];
        } else {
          ans[prev + "." + key] = o[key];
        }
      }
    }
  }
  return ans;
}

export default {}