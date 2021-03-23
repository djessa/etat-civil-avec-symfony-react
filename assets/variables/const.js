export const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
export const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];


export  const date_to_string =  (string) => {
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

export const personne = {
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    sexe: '',
    profession: '',
    ville: '',
    adresse: ''
};

export const personne_to_en = (personne_input) => {
   return {
        first_name: personne_input.nom, 
        last_name: personne_input.prenom,
        birthdate: personne_input.date_naissance,
        sexe: personne_input.sexe,
        birthplace: personne_input.lieu_naissance,
        profession: personne_input.profession,
        city: personne_input.ville,
        address: personne_input.adresse     
   } 
}