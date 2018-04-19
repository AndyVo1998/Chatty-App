let colours = ['blue', 'red', 'green', 'purple', 'black']
let index = 0;
const getColour = () => {
  const id = index + 1;
  if (index === colours.length - 1) {
    index = 0;
  } else {
    index = id;
  }
  return colours[index];
};

console.log(getColour());
console.log(getColour());
console.log(getColour());
console.log(getColour());
console.log(getColour());
console.log(getColour());
console.log(getColour());