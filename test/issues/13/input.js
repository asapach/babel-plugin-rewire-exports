export function spam() {
  return {
    eggs() {
      eggs();
    },
    foo(){
      console.log(foo);
    }
  };
}

export function eggs() {
}

export const foo = 1;
