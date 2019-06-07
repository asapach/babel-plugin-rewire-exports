export const foo = function() {
  return bar + ham + eggs;
};

const bar = false;

export { bar };

export default foo;

export const [ham] = spam;

export const {eggs} = sausage;
