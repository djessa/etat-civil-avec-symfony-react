import { formatNumDate } from './const';

export const volana = ['janoary', 'febroary', 'martsa', 'aprily', 'mey', 'jona', 'jolay', 'aogositra', 'septambra', 'oktobra', 'novambra', 'desambra'];
export const daty = (date) => {
    const d = new Date(date);
    const resultat = formatNumDate(d.getDate()) + ' ' + volana[d.getMonth()] + ' ' + d.getFullYear();
    return resultat;
}