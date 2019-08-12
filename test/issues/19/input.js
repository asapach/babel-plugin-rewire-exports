export function spam() {
  return {
    eggs() {
      eggs();
    }
  };
}

export var eggs = function () {
};
