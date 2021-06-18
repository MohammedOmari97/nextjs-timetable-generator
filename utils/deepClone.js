export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  var props = Object.getOwnPropertyDescriptors(obj);
  for (var prop in props) {
    props[prop].value = deepClone(props[prop].value);
  }
  return Object.create(Object.getPrototypeOf(obj), props);
}
