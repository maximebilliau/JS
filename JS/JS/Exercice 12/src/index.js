export function testFn(chaine) {
    let firstChar = chaine.charAt(0).toUpperCase();
    chaine = chaine.toLowerCase().slice(1);

    chaine = firstChar + chaine;
    // Ne touchez pas au return :
    return chaine;
}


console.log(testFn('chat'));
console.log(testFn('TEST'));
console.log(testFn('HeLLo'));

