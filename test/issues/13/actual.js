export function spam() {
  return {
    eggs() {
      eggs();
    }
  };
}

export function eggs() {
}
