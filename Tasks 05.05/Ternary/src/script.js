const fruits = ['CLEMANTINA', 'CHERRY', 'WaterMelon', 'melon', 'apple'];

const fruitCase = fruits.map((fruit, i) => fruit === fruits[i].toLowerCase() ? "lower" : fruit === fruits[i].toUpperCase() ? "upper" : "neither");

console.log(fruitCase);