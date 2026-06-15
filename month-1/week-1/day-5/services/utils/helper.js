// Simulate a database delay (1 second)
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const echo = (string) => console.log(string);
export{delay, echo};

