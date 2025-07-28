export function testFn(cb) {
    let lastNumber = cb.slice(-4);
    let reponse = lastNumber.padStart(cb.length, '*')
    return reponse;
}


console.log(testFn('30116613634425'));
console.log(testFn('379517272367653'));
console.log(testFn('5223112447929699'));

