
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

export { timeout, removeItemOnce };