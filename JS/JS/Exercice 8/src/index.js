export function testFn(note) {
    let remarque;
    // Déclarez en dessous :
    switch (note) {
        case 5:
            remarque = 'Excellent';
            break;
        case 4:
            remarque = 'Très bien';
            break;
        case 3:
            remarque = 'Bien';
            break;
        case 2:
            remarque = 'Moyen';
            break;
        case 1:
        case 0:
            remarque = 'Médiocre';
            break;
        default:
            remarque = 'La note doit être un nombre compris entre 0 et 5';
    }

    // Ne touchez pas au return.
    return remarque;
}