// Simulate a database delay (1 second)
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Create echo for people that like PHP
const echo = (string) => console.log(string);

// Create checkForEmptyArray 
const isEmptyArray = (arr) => {
    return Array.isArray(arr) && arr.length === 0;
};
const isNullishOrNaN = (value) =>
    value == null || Number.isNaN(value);

const isValidId = (value) => {
    return !isNullishOrNaN(value) && Number.isInteger(value);
};
export{delay, echo, isEmptyArray, isNullishOrNaN, isValidId};



