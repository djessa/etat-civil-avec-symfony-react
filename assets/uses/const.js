export const WEBROOT = '/etat-civil/public/';

const date = new Date();

const formatNumDate = num => (parseInt(num) > 9) ? num : '0' + num

export const currentDate = date.getFullYear() + '-' + formatNumDate(date.getMonth() + 1) + '-' + formatNumDate(date.getDate());

export const currentTime = formatNumDate(date.getHours()) + ':' + formatNumDate(date.getMinutes());

export const dateFormat = (date) => (
    date.getFullYear() + '-' + formatNumDate(date.getMonth() + 1) + '-' + formatNumDate(date.getDate())
)