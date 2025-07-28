export function testFn(condition, age) {
    const a = 42;
    const b = condition == true ? a : 0;
    let statut = 'Mineur';
    if(age >= 21){
        statut = 'Majeur aux USA';
    } else if (age >= 18) {
        statut = 'Majeur en France';
    }

    // Ne touchez pas au return.
    return [b, statut];
}