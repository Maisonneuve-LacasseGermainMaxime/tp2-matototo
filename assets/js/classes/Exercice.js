import ToastModale from "./ToastModale.js";
class Exercice {
    constructor(exerciceInfos, conteneur, app) {
        const { id, date, type, duree, description, difficulte } = exerciceInfos;
        this.conteneur = conteneur;
        this.app = app;

        this.id = id;
        this.date = date;
        this.type = type;
        this.duree = duree;
        this.description = description;
        this.difficulte = difficulte;

        this.gabaritExercices = document.querySelector("template#exercice");
        this.injecterHTML();
    }

    injecterHTML() {
        let cloneListe = this.gabaritExercices.content.cloneNode(true);
        this.conteneur.append(cloneListe);
        this.elementHTML = this.conteneur.lastElementChild;

        this.elementHTML.id = this.id;
        this.elementHTML.innerHTML = this.elementHTML.innerHTML.replaceAll(/{{ type }}/g, this.type);
        this.elementHTML.innerHTML = this.elementHTML.innerHTML.replaceAll(/{{ date }}/g, this.date);

        this.elementHTML.innerHTML = this.elementHTML.innerHTML.replaceAll(/{{ duree }}/g, this.duree);
        this.elementHTML.innerHTML = this.elementHTML.innerHTML.replaceAll(/{{ description }}/g, this.description);
        this.elementHTML.innerHTML = this.elementHTML.innerHTML.replaceAll(/{{ difficulte }}/g, this.difficulte);

        this.elementHTML.addEventListener("click", this.onClic.bind(this));


    }

    onClic(evenement) {

       
        const declencheur = evenement.target;
        const bouton = declencheur.closest("[data-action='supprimer']");
        const exercice = declencheur.closest(".space");
       

        if (bouton !== null) {
            //Supprime
            const id = this.id;
            this.app.supprimerUnExercice(id);

        }
        else {
            
            history.pushState({}, "", `/detail/${this.id}`);
            this.app.router.miseAJourURL(); }


        
        
    }

}
export default Exercice;

/*
        const detail = declencheur.closest("[data-action='detail']");
        const supprimer = declencheur.querySelector("[data-action='supprimer']");
if (bouton !== null) {
    //Supprime
    const id = exercice.id;
    console.log(id);
    this.app.supprimerUnExercice(id);

} else {}


    onClic(evenement) {
        const declencheur = evenement.target;
        const bouton = declencheur.closest("[data-action='supprimer']");
        const exercice = declencheur.closest(".exercice");
       

        if (bouton !== null && bouton !== declencheur.querySelector("[data-action='supprimer']")) {
            //Supprime
            const id = exercice.id;
            this.app.supprimerUnExercice(id);

        } else if (bouton !== null) {
            history.pushState({}, "", `/detail/${this.id}`);
            this.app.router.miseAJourURL();
        }else {
            const detail = this.elementHTML.querySelector("[data-action='detail']");
            if(detail) {
                console.log(detail);
                detail.classList.add("impact");
            }
        }
    }

*/