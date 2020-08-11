import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokeman';
  mainPokemanData: Object = {}
  pokemanName: string = ''
  searchPoekman: string = ''
  results:Array<any> = [];
  intialView: boolean = true;
  abilities: any;
  moves: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('app started')

    let url = 'https://pokeapi.co/api/v2/pokemon?offset=200&limit=200';
    this.http.get(url)
    .subscribe(data => {
      console.log(data)
       this.results = data['results'];
      let resultLength =this.results.length;
      console.log(resultLength)

     let random =  this.getRandom(0,resultLength-1)
     console.log(random)

     console.log(this.results[random])
     this.mainPokemanData = this.results[random]
     this.pokemanName = this.mainPokemanData.name

    })
  }



  displayData() {
    console.log(this.searchPoekman)

    console.log(this.results)

   var getIndex = this.results.findIndex(res => {


    return  res.name.toString() === this.searchPoekman.toString()
   })

   console.log(getIndex)

   if(getIndex !== -1) {

    console.log(this.results[getIndex])

    this.pokemanName = this.results[getIndex]['name']
    this.mainPokemanData = this.results[getIndex]


   }


  }

  showDetails() {
    console.log(this.mainPokemanData)
    let url = this.mainPokemanData['url']
    this.http.get(url)
    .subscribe(data => {
      console.log(data)

      this.intialView = false;

      this.abilities = data['abilities'];
      this.moves = data['moves']
    })


  }
  goBack() {
    this.intialView = true
  }

  getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
