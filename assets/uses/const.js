export const WEBROOT = '/etat_civil/public/';

const date = new Date();

export const formatNumDate = num => (parseInt(num) > 9) ? num : '0' + num

export const currentDate = date.getFullYear() + '-' + formatNumDate(date.getMonth() + 1) + '-' + formatNumDate(date.getDate());

export const currentTime = formatNumDate(date.getHours()) + ':' + formatNumDate(date.getMinutes());

export const dateFormat = (date) => (
    date.getFullYear() + '-' + formatNumDate(date.getMonth() + 1) + '-' + formatNumDate(date.getDate())
)
export const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
export const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

export const date_to_string = (string) => {
    const date = new Date(string);
    return jours[date.getDay()] + ' ' + date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear() + ' à ' + date.getHours() + 'h:' + date.getMinutes();
}
export const mini_date = (string) => {

    const date = new Date(string);
    return date.toLocaleDateString();
}
export const dateDuJour = () => {
    const date = new Date();
    return jours[date.getDay()] + ' ' + date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear();
}