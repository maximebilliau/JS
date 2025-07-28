export function testFn(nombre) {
    let texte = '';

    if (typeof nombre != 'number'){
        return 'Pas un nombre';
    }

    let j = 0;
    for (let i = nombre; i < nombre+5; i++) {
        if (j !== 2)
            texte += i;
        j++
    }

    return texte;
}


console.log(testFn('Dupont'));

