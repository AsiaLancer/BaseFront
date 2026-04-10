function isNTrue(o) {
    if (o === null || o === undefined || o === "" || o === 0 || o === false || o === NaN) {
        return false;
    }
    return true;
}
function deepClone(obj) {
    // 你的代码
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    const cloneObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    return cloneObj;
}
function uniqueArr(arr) {
    return [...new Set(arr)];
}
