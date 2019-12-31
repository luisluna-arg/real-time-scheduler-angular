import { Injectable } from '@angular/core';
import { _ } from 'node_modules/underscore';

@Injectable()
export class MusiciansService {

    private musicianCount:number = 0;

    private musicians:Musician[] = [
        {
          id: ++this.musicianCount,
          name: "Gustavo Cerati",
          bio: "He was an Argentine musician, singer-songwriter, composer and record producer. He gain international recognition for having been the lead singer, " + 
          "guitarist and composer of the rock band Soda Stereo. He is considered one of the most important, popular and influential Latin American rock musicians.",
          img: "assets/img/01.cerati.jpg",
          birthDate: new Date(1959, 7, 11),
          deathDate: new Date(2014, 8, 4),
          location: "Buenos Aires, Argentina"
        },
        {
          id: ++this.musicianCount,
          name:  "Ricardo Mollo",
          bio: "He is an Argentine musician known for being part of two bands of the Argentine rock movement: he was a Sumo guitarist in the 1980s and is currently " + 
          "the guitarist, vocalist and leader of Divididos. He is considered one of the best musicians and composers of Argentine rock.",
          img: "assets/img/02.mollo.jpg",
          birthDate: new Date(1957, 7, 17),
          deathDate: null,
          location: "Buenos Aires, Argentina"
        },
        {
          id: ++this.musicianCount,
          name:  "Taylor Hawkins",
          bio: "He is a musician from the United States, best known for being the drummer of the band Foo Fighters. Before joining the band in 1997, he was a tour " + 
          "drummer for Alanis Morissette and also a drummer for the progressive experimental band Sylvia. In 2004, he formed his own parallel project: Taylor Hawkins " + 
          "and the Coattail Riders, in which he plays drums and sings. He was voted \"Best Rock Drummer\" in 2005 by the UK Rhythm Percussion Magazine.",
          img: "assets/img/03.t.hawkins.jpg",
          birthDate: new Date(1972, 1, 17),
          deathDate: null,
          location: "Laguna Beach, Estados Unidos"
        },
        {
          id: ++this.musicianCount,
          name:  "Freddie Mercury",
          bio: "He was a singer, songwriter, pianist, and British musician of Indian and Indian origin, known for having been the lead vocalist of the rock band Queen. " + 
          "As an interpreter, he has been recognized for his powerful voice and extravagant staging. As a composer, he wrote many of Queen's successes. " + 
          "In addition to the activity with the band, in the eighties he launched his solo career, which led him to publish two albums, Mr. Bad Guy (1985) and " +
          "Barcelona (1988), the latter in collaboration with the Spanish soprano Montserrat Caballe.​",
          img: "assets/img/04.f.mercury.jpg",
          birthDate: new Date(1946, 8, 5),
          deathDate: new Date(1991, 10, 24),
          location: "Londrés, Inglaterra"
        },
        {
          id: ++this.musicianCount,
          name:  "Gary Clark jr.",
          bio: "He is an American guitarist and actor. Described as the future of Texas blues, Clark has shared the stage with numerous rock and roll legends. " + 
          "He has stated that he is \"influenced by blues, jazz, soul, music of African-American origins, as well as hip hop\". Clark has a unique and particular " + 
          "musical style, the sound of his guitar is distorted, while his vocal style is morbid and intense.",
          img: "assets/img/05.g.clark.jr.jpg",
          birthDate: new Date(1984, 1, 15),
          deathDate: null,
          location: "Austin, Estados Unidos"
        },
        {
          id: ++this.musicianCount,
          name:  "Alex Turner",
          bio: "He is a singer, writer, musician and record producer. He is best known for being the frontman and main composer of the rock band Arctic Monkeys, " + 
          "with whom he has released 6 albums. He has also recorded with his parallel project The Last Shadow Puppets and as a solo artist.",
          img: "assets/img/06.a.turner.jpg",
          birthDate: new Date(1986, 0, 6),
          deathDate: null,
          location: "Sheffield, Inglaterra"
        },
        {
          id: ++this.musicianCount,
          name:  "Noel Gallagher",
          bio: "He is an English singer, songwriter and guitarist. He was the lead guitarist, vocalist and main composer of the rock band Oasis. " + 
          "After the disolution of Oasis in 2009, he became lead vocalist and sole composer of his own band, Noel Gallagher's High Flying Birds.",
          img: "assets/img/07.n.gallagher.jpg",
          birthDate: new Date(1967, 4, 29),
          deathDate: null,
          location: "Manchester, Inglaterra"
        },
        {
          id: ++this.musicianCount,
          name:  "Liam Gallagher",
          bio: "He is an English singer and songwriter. He came to fame as the lead singer of the rock band Oasis, and then disengaged himself as " + 
          "a singer of Beady Eye, before becoming a solo artist, after the dissolution of both bands.",
          img: "assets/img/08.l.gallagher.jpg",
          birthDate: new Date(1972, 8, 21),
          deathDate: null,
          location: "Manchester, Inglaterra"
        }
      ];

    constructor() {
    }
    
    getMusicians():Musician[] {
        return this.musicians;
    }

    getMusician(id:number):Musician {
      return _.find(this.musicians, (musician) => musician.id == id);;
    }

    searchMusician(value:string):Musician[]{
      let musiciansArr:Musician[] = [];

      if (value == undefined || value == null || value.trim() == "") {
        return musiciansArr;
      }

      let name, loweredValue = value.toLowerCase().trim();
      for(let musician of this.musicians) {
        name = musician.name.toLowerCase().trim();
        if (name.indexOf(loweredValue) >= 0)
        {
          musiciansArr.push(musician);
        }
      }

      return musiciansArr;
    }
}

export interface Musician {
  id:number;
  name:  string;
  bio: string;
  img: string;
  birthDate: Date;
  deathDate: Date;
  location: string;
}
