export function testFn(phrase) {
    let response = 0;

    phrase.trim().split(' ').forEach(() => {
        response += 1;
    });

    /*response = phrase.trim().split(' ').length;*/

    return response;
}


console.log(testFn('Un petit chat'));
console.log(testFn('Une phrase avec des espaces au début'));

