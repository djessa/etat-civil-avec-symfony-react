import { formatNumDate } from './const';

const volana = ['janoary', 'febroary', 'martsa', 'aprily', 'mey', 'jona', 'jolay', 'aogositra', 'septambra', 'oktobra', 'novambra', 'desambra'];

const isa = ['aotra', 'iraika', 'roa', 'telo', 'efatra', 'dimy', 'enina', 'fito', 'valo', 'sivy'];

const nbreToIsa = (andro) => {
    const unite = andro[1] !== '0' ? isa[parseInt(andro[1])] + ' amby ' : '';
    let dizaine = '';
    if (andro[0] == '1')
        dizaine = 'folo';
    else dizaine = isa[parseInt(andro[0])] + '-polo';
    return unite + dizaine;
};

const laharany_volana = (input) => {
    const andro = '' + input;
    if (andro.length === 2) {
        return nbreToIsa(andro)
    } else {
        if (andro === '1')
            return 'voalohan\'ny volana ';
        else return isa[parseInt(andro)];
    }
}

const dizaine = (input) => {
    input = parseInt(input);
    if (input == 0)
        return '';
    if (input == 1)
        return 'folo';
    if (input == 4)
        return 'efa-polo ';
    if (input == 5)
        return 'dimam-polo';
    if (input == 6)
        return 'enim-polo';
    if (input == 9)
        return 'sivi-folo';
    return isa[input] + '-polo';
}

const centaine = (input) => {
    if (input == 0)
        return '';
    if (input == 1)
        return 'zato';
    if (input == 2)
        return 'roan-jato';
    if (input == 3)
        return 'telon-jato';
    if (input == 4)
        return 'efa-jato';
    if (input == 5)
        return 'diman-jato';
    if (input == 6)
        return 'enin-jato';
    if (input == 7)
        return 'fiton-jato';
    if (input == 8)
        return 'valon-jato';
    if (input == 9)
        return 'sivin-jato';
}

const milliaine = (input) => {
    if (input == 1)
        return 'arivo';
    return isa[parseInt(input)] + ' arivo';
}

const unit = (input) => {
    return (input == 0) ? '' : isa[parseInt(input)];
}

const taona = (input) => {
    const date = '' + input;
    const u = unit(date[3]);
    const d = dizaine(date[2]);
    const c = centaine(date[1]);
    const m = milliaine(date[0]);
    let resultat = '';
    if (u) {
        resultat += u;
        if (d)
            resultat += ' amby ' + d;
        if (c)
            resultat += ' sy ' + c;
        if (m)
            resultat += ' sy ' + m;
    } else if (d) {
        resultat += d;
        if (c)
            resultat += ' sy ' + c;
        if (m)
            resultat += ' sy ' + m;

    } else if (c) {
        resultat += c;
        if (m)
            resultat += ' sy ' + m;
    } else {
        resultat += m;
    }
    return resultat;
}

export const daty_feno = (date) => {
    const d = new Date(date);
    return laharany_volana(d.getDate()) + ' ' + volana[d.getMonth()] + ' taona ' + taona(d.getFullYear());
}


export const daty = (date) => {
    const d = new Date(date);
    const resultat = formatNumDate(d.getDate()) + ' ' + volana[d.getMonth()] + ' ' + d.getFullYear();
    return resultat;
}

export const annee = (date) => {
    const d = new Date(date);
    return taona(d.getFullYear());
}

export const ora = (date) => {
    const d = new Date(date);
    let heure = d.getHours();
    let min = d.getMinutes();
    let andro;
    let hora;
    let minitra = '';
    if (heure == 0) {
        heure = 'roa amby folo';
        andro = 'alina';
    }
    else if (heure < 13) {
        if (heure > 9) {
            heure = '' + heure;
            heure = (heure[1] != '0' ? unit(heure[1]) + ' amby ' : '') + dizaine(heure[0]);
            andro = 'atoandro';
        } else {
            heure = unit(heure);
            andro = 'maraina';
        }
    } else {
        heure -= 12;
        if (heure < 10) {
            andro = heure < 4 ? 'tolak\'andro' : heure <= 6 ? 'hariva' : 'alina';
            heure = unit(heure);
        } else {
            heure = '' + heure;
            heure = (heure[1] != '0' ? unit(heure[1]) + ' amby ' : '') + dizaine(heure[0]);
            andro = 'alina';
        }
    }
    if (min != 0) {
        if (min > 9) {
            min = '' + min;
            minitra = (min[1] != '0' ? unit(min[1]) + ' amby ' : '') + dizaine(min[0]);
        } else {
            minitra = unit(min);
        }
        minitra += ' minitra';
    }
    hora = heure + ' ora ';
    if (minitra)
        hora += 'sy ' + minitra;
    return hora + ' ' + andro;
}