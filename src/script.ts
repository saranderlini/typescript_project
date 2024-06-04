//Elenco che raccoglie tutti i programmi a cui e' possibile iscriversi
let elencoProgrammi: IProgrammaFormazione[] = [];

//Elenco che raccoglie tutti gli iscritti ai corsi
let Professioniste: ProfessionistaMedia[] = [];

//Raccoglie i corsi a cui le persone si iscrivono, si popola attraverso il metodo partecipaProgramma(), all'interno della class Professionista
let Corsi: IProgrammaFormazione[] = [];

interface IProfessionistaMedia {
  nome: string;
  cognome: string;
  specializzazione: string;
  esperienza: string;
  interessi: string;

  partecipaProgramma(programma: IProgrammaFormazione): void;
}

interface IProgrammaFormazione {
  titolo: string;
  descrizione: string;
  ambitoSpecializzazione: string;
  durata: number; //ore
  partecipanti?: ProfessionistaMedia[];

  aggiungiPartecipanti(professionista: IProfessionistaMedia[]): void;
}

interface IPiattaforma {
  nome: string;
  tipo: string;
  descrizione: string;
  contenuto: string;

  pubblicaContenuto(
    professionista: IProfessionistaMedia,
    contenuto: string
  ): void;
}

abstract class ProfessionistaMedia implements IProfessionistaMedia {
  nome: string;
  cognome: string;
  specializzazione: string;
  esperienza: string;
  interessi: string;
  corsoIscrizione: any;

  constructor(
    nome: string,
    cognome: string,
    specializzazione: string,
    esperienza: string,
    interessi: string
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.specializzazione = specializzazione;
    this.esperienza = esperienza;
    this.interessi = interessi;
  }

  abstract partecipaProgramma(programma: IProgrammaFormazione): void;
}

abstract class ProgrammaFormazione implements IProgrammaFormazione {
  titolo: string;
  descrizione: string;
  ambitoSpecializzazione: string;
  durata: number;
  partecipanti?: ProfessionistaMedia[];

  constructor(
    titolo: string,
    descrizione: string,
    ambitoSpecializzazione: string,
    durata: number,
    partecipanti?: ProfessionistaMedia[]
  ) {
    this.titolo = titolo;
    this.descrizione = descrizione;
    this.ambitoSpecializzazione = ambitoSpecializzazione;
    this.durata = durata;
    this.partecipanti = partecipanti || [];
  }

  //Prende l'elenco Professioniste (popolato dal metodo partecipaProgramma() all'interno della definizione della classe Professionista) e per ciascun professionista controlla i corsi specificati nella proprieta' corsoIscrizione
  //
  aggiungiPartecipanti(professionisti: ProfessionistaMedia[]): void {
    professionisti.forEach((professionista) => {
      professionista.corsoIscrizione.forEach((item) => {
        if (
          item == this.titolo &&
          !this.partecipanti!.some((p) => p.nome === professionista.nome)
        ) {
          this.partecipanti!.push(professionista);
        }
      });
    });
  }
}

class Piattaforma implements IPiattaforma {
  nome: string;
  tipo: string;
  descrizione: string;
  contenuto: string;
  constructor(
    nome: string,
    tipo: string,
    descrizione: string,
    contenuto: string
  ) {
    this.nome = nome;
    this.tipo = tipo;
    this.descrizione = descrizione;
    this.contenuto = contenuto;
  }

  pubblicaContenuto(
    professionista: IProfessionistaMedia,
    contenuto: string
  ): void {
    console.log(
      `Formato ${this.tipo}. ${this.nome}: "${contenuto}" - ${professionista.nome} ${professionista.cognome}, ${professionista.esperienza}`
    );
  }
}

class Programma extends ProgrammaFormazione {
  constructor(
    titolo: string,
    descrizione: string,
    ambitoSpecializzazione: string,
    durata: number
  ) {
    super(titolo, descrizione, ambitoSpecializzazione, durata);
  }
}

//Crea un elenco dei programmi di Formazione a cui e' possibile iscriversi.
//Se il programma e' gia' presente nell'elenco, allora non inserisce nessuna nuova voce; altrimenti, lo aggiunge alla lista.
function checkIfProgramExists(programma: IProgrammaFormazione): void {
  if (elencoProgrammi.length == 0) {
    elencoProgrammi.push(programma);
  } else {
    for (let i = 0; i < elencoProgrammi.length; i++) {
      if (
        elencoProgrammi[i].titolo == programma.titolo &&
        elencoProgrammi[i].descrizione == programma.descrizione
      ) {
        break;
      } else {
        elencoProgrammi.push(programma);
        break;
      }
    }
  }
}

function mostraProgrammi(): void {
  let i = 1;
  let elencoCompleto: string = "";
  elencoProgrammi.forEach((programma) => {
    elencoCompleto += `Programma ${[i]}: ${programma.titolo} \n`;
    i++;
    return elencoCompleto;
  });
  console.log(
    "Le iscrizioni sono aperte per i seguenti programmi: \n" + elencoCompleto
  );
}

class Professionista extends ProfessionistaMedia {
  corsoIscrizione: string[];

  constructor(
    nome: string,
    cognome: string,
    specializzazione: string,
    esperienza: string,
    interessi: string,
    corsoIscrizione: string[]
  ) {
    super(nome, cognome, specializzazione, esperienza, interessi);
    this.corsoIscrizione = corsoIscrizione;
  }

  //Metodo per richiesta di iscriversi ad un programma di Formazione, verifica prima l'esistenza del programma sulla base di quelli presenti nell'elencoProgrammi.
  //Se il corso esiste, allora aggiunge il nome del partecipante alla proprieta' partecipanti : string[] dell'interface IProgrammaFormazione
  partecipaProgramma(): void {
    for (let i = 0; i < this.corsoIscrizione.length; i++) {
      for (let j = 0; j < elencoProgrammi.length; j++) {
        if (this.corsoIscrizione[i] == elencoProgrammi[j].titolo) {
          Professioniste.push(this);
          Corsi.push(elencoProgrammi[j]);
        }
      }
    }
  }

  mostraDettagli(this): void {
    console.log(
      `Dettagli:\nNome: ${this.nome} ${this.cognome}\nSpecializzazione: ${this.ambitoSpecializzazione}\nEsperienza: ${this.esperienza} \nInteressi: ${this.interessi} \nProgrammi: ${this.corsoIscrizione}`
    );
  }
}

let vociMagazine = new Piattaforma(
  "Voci Magazine",
  "cartaceo",
  "La rivista mensile per leggere le storie nascoste.",
  "Articoli e inchieste"
);
let vociPodcast = new Piattaforma(
  "Voci Podcast",
  "digitale",
  "Per ascoltare le voci e non solo sentire le voci fin troppo silenti.",
  "Podcast"
);

let programma1 = new Programma(
  "Welfare e Pensioni",
  "Programma sull'aceeso a politiche attive, misure di supporto all'occupazione, per le nuove e vecchie generazioni",
  "Politica",
  4
);

let programma2 = new Programma(
  "Distribuzione del Bene",
  "Politiche monetarie, evasione e paradisi fiscali",
  "Economia",
  10
);

let programma3 = new Programma(
  "Sostenibilita",
  "Per affrontare sfide ed opportunità in ambito di sostenibilità ambientale, sociale ed economica, collegate alla rivoluzione ESG in atto.",
  "ESG",
  10
);

let programma4 = new Programma(
  "ReFrame",
  "per la promozione dell’equità di genere nell’industria cinematografica.",
  "Women in Film",
  15
);

let programma5 = new Programma(
  "The Radical Notion",
  "",
  "Politica e Societa'",
  8
);

let programmaFoto = new Programma(
  "Changing the room and the light within",
  "How the Female Gaze Is Changing Photographs of Women",
  "Fotografia",
  20
);

checkIfProgramExists(programma1);
checkIfProgramExists(programma2);
checkIfProgramExists(programma3);
checkIfProgramExists(programma4);
checkIfProgramExists(programmaFoto);

mostraProgrammi();

let avvocato = new Professionista(
  "Giulia",
  "Russo",
  "Giornalismo",
  "CdA",
  "Avversione alla Politica Liberale",
  ["Distribuzione del Bene"]
);

let rappresentanteSindacale = new Professionista(
  "Anna",
  "Zanardi",
  "Sindacalista",
  "Diritti del Lavoro",
  "Lettura",
  ["Welfare e Pensioni", "Distribuzione del Bene"]
);

let giornalista = new Professionista(
  "Federica",
  "Bianchi",
  "Giornalista",
  "Reuters",
  "Ecosistemi",
  ["ReFrame"]
);

let cronista = new Professionista(
  "Andrea",
  "Fabbri",
  "Cronista Sportiva",
  "SkySport",
  "Sport, Genere e Inclusione",
  ["ReFrame"]
);

let fotografa = new Professionista(
  "Olimpia",
  "Vecchi",
  "Reporter",
  "Life",
  "Social Impact",
  ["Changing the room and the light within"]
);

fotografa.partecipaProgramma();
fotografa.mostraDettagli();
avvocato.partecipaProgramma();
rappresentanteSindacale.partecipaProgramma();
giornalista.partecipaProgramma();
cronista.partecipaProgramma();
cronista.mostraDettagli();

//Riporta la lista dei partecipanti iscritti a ogni corso
function mostraPartecipanti(list: IProgrammaFormazione[]): void {
  list.forEach((corso) => {
    corso.aggiungiPartecipanti(Professioniste);
    let nomeCognome: string[] = [];
    if (corso.partecipanti != undefined) {
      for (let i = 0; i < corso.partecipanti.length; i++) {
        nomeCognome.push(
          ` ${corso.partecipanti[i].nome} ${corso.partecipanti[i].cognome}`
        );
      }
    }
    console.log(`${corso.titolo}:${nomeCognome}`);
  });
}

mostraPartecipanti(Corsi);
let contenutoCronista: string = "The Second Sports Sex";

vociMagazine.pubblicaContenuto(
  rappresentanteSindacale,
  "Come la rappresentazione continua ad essere una questione androcentrica."
);
vociPodcast.pubblicaContenuto(
  giornalista,
  "Il dilemma della gestazione per altri nel pieno dei conflitti."
);
vociPodcast.pubblicaContenuto(cronista, contenutoCronista);
let theCollector = new Piattaforma(
  "The Collector",
  "digitale",
  "online resource center for women photographers worldwide",
  "foto e video"
);
theCollector.pubblicaContenuto(fotografa, "Corpi negati - Gallery");
