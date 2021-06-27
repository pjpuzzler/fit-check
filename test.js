const clothingType = "top";
const obj = { top: "t", bottom: "b" };
const { [clothingType]: _, ...obj2 } = obj;
console.log(obj2);
