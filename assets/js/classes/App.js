/*

Methode static

class App {
    static #instance;

    //Permet d'accéder à l'instance de la classe de n'importe où dans le code en utilisant App.instance
    static get instance() {
        return App.#instance;
    }

    constructor() {
        if (App.#instance) {
            return App.#instance;
        } else {
            App.#instance = this;
        }
    }
}
*/
// Methode comme vu en classe
import Router from "./Router.js";
import Formulaire from "./Formulaire.js";
import Exercice from "./Exercice.js";
import ToastModale from "./ToastModale.js";
class App {
  #exercices;
  #formulaire;
  #router;

  constructor() {
    this.#exercices = [];

    this.#formulaire;

    this.panneauListeHTML = document.querySelector("[data-panneau='liste']");
    this.panneauDetailHTML = document.querySelector("[data-panneau='detail']");
    this.panneauFormulaireHTML = document.querySelector(
      "[data-panneau='formulaire']"
    );
    this.listeExercicesHTML =
    this.panneauListeHTML.querySelector(".liste-exercice");
    this.btnSupprimer = document.querySelector("[data-action='supprimer']");
    //console.log(this.btnSupprimer);
    this.btnSupprimer.addEventListener("click", this.supprimerUnExercice.bind(this));

    this.router = new Router(this);
    this.#formulaire = new Formulaire(this);
  }

  async recupererTousLesExercices() {
    const reponse = await fetch(
      "http://localhost:80/api/exercices/lireTout.php"
    );
    const exercices = await reponse.json();

    this.#exercices = [];
    this.listeExercicesHTML.innerHTML = "";

    exercices.forEach((exercice) => {
      this.#exercices.push(exercice);
      new Exercice(exercice, this.listeExercicesHTML, this);
    });
  }

  async recupererUnExercice(id) {
    try {
      const reponse = await fetch(
        `http://localhost:80/api/exercices/lireUn.php?id=${id}`
      );
      //console.log(reponse);

      const exercice = await reponse.json();

      if (reponse.ok == false) {
        throw new Error(exercice.message);
      }

      const exercicesInfos = exercice[0];
      const { date, type, duree, description, difficulte } = exercicesInfos;
      this.panneauDetailHTML.querySelector("[data-liste-exercices]").id = id;
      this.panneauDetailHTML.querySelector("[data-type]").textContent = type;
      this.panneauDetailHTML.querySelector("[data-duree]").textContent = duree;
      // TODO: date format
      this.panneauDetailHTML.querySelector("[data-date]").textContent = date;
      this.panneauDetailHTML.querySelector("[data-description]").textContent =
        description;
      this.panneauDetailHTML.querySelector("[data-difficulte]").textContent =
        difficulte;

      // TODO: parseInt(difficulte) pour comparer
      // FIXME: DATE
    } catch (error) {
      console.log(error.message);
      new ToastModale("Une erreur est survenue", "error");
    }
  }

  async supprimerUnExercice() {
    let id = this.panneauDetailHTML.querySelector("[data-liste-exercices]").id;
    // console.log(id);
    
    if(!id){
        return;
    }
    //Supprimer un exercice
    const reponse = await fetch(
      `http://localhost:80/api/exercices/supprimerUn.php?id=${id}`
    );
    const exercice = await reponse.json();
    //Rediriger
    history.pushState({}, "", "/");
    this.recupererTousLesExercices();

    //Afficher un toast
    new ToastModale("L'exercice a été supprimée");
  }

  #cacherTout() {
    this.panneauListeHTML.classList.add("invisible");
    this.panneauDetailHTML.classList.add("invisible");
    this.panneauFormulaireHTML.classList.add("invisible");
  }

  afficherPanneauListe() {
    this.#cacherTout();
    this.panneauListeHTML.classList.remove("invisible");
    this.recupererTousLesExercices();
  }

  afficherPanneauDetail(id) {
    // console.log(id);
    //Récupérer le détail de l'exercice avec Fetch et le id
    // console.log("panneauDetail");
    this.#cacherTout();
    this.panneauDetailHTML.classList.remove("invisible");
    //Récupérer le détail d'une tâche avec Fetch et le id
    this.recupererUnExercice(id);
  }

  afficherPanneauFormulaire() {
    // console.log("afficherPanneauFormulaire");
    this.#cacherTout();
    this.panneauFormulaireHTML.classList.remove("invisible");
    //Afficher le formulaire
  }
}

export default App;

// TODO: CSS POUR LA MODALE VOIR COURS
