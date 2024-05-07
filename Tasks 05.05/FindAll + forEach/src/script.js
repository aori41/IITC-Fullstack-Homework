// #1 - FindAll function

console.log(findAll('archaebacteria', 'a')); // returns[0, 4, 7, 13]
console.log(findAll('abracadabra', 'a')); // returns[0, 3, 5, 7, 10]
console.log(findAll('encyclopedy', 'm')); // returns[]
console.log(findAll('encyclopedy', 'c')); // returns[2, 4]
console.log(findAll('encyclopedy', 'c')); // returns[2, 4]
console.log(findAll('error', 'e')); // returns[0]


function findAll(word, letter) {
    const arr = [];
    let index = word.indexOf(letter);

    while (index != -1) {
        arr.push(index);
        index = word.indexOf(letter, index + 1);
    }
    return arr;
}

// #4 - forEach

const colors1 = ['red', 'navy', 'green', 'black', 'yellow', 'bordo'];
const colors2 = ['pink', 'blue', 'lightgreen', 'grey', 'lemon', 'magenta'];

// a
colors1.forEach((color, i, arr) => arr[i] = color.toUpperCase());

// b
colors1.forEach((color, i, arr) => {
    arr[i] = colors2[i];
    colors2[i] = color;
});

console.log(colors1);
console.log(colors2);

// c

colors1.forEach((color, i, arr) => {
    if (i % 2 === 0) {
        arr[i] = colors2[i];
        colors2[i] = color;
    }
});

console.log(colors1);
console.log(colors2);
