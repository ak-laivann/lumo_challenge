Array.prototype.groupBy = function (propFunction) {
  // check if the provided prop is a function
  if (!(typeof propFunction === "function")) {
    throw new Error(
      "The provided prop is not a function. The groupBy function expects a function to query the array and group by it"
    );
  }

  // handle the null values gracefully as provided in the specs
  if (this.length === 0) return {};

  if (this.every((value) => value === null)) return {};

  const object = {};

  this.forEach((value) => {
    // the key to group would be returned by the function
    const key = propFunction(value);

    // address the initial condition when there would be no keys or values present in the returnable object
    if (
      Object.keys(object).length === 0 ||
      typeof object[key] === "undefined"
    ) {
      // add the first value you got as the only element in the array.
      object[key] = [value];
    } else {
      const existingArray = object[key];

      // push the obtained value to the existing array. can use push method instead too. wanted to challenge myself.
      object[key] = [...existingArray, value];
    }
  });

  return object;
};
const arr = [1, 2, 3, 4, 5, 6];

const groupByEvenOrOdd = arr.groupBy((x) => (x % 2 === 0 ? "Even" : "Odd"));

console.log("groupByEvenOrOdd = ", groupByEvenOrOdd);
