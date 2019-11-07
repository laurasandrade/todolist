import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-banner-comunicacao',
  templateUrl: './banner-comunicacao.component.html',
  styleUrls: ['./banner-comunicacao.component.scss']
})
export class BannerComunicacaoComponent implements OnInit {

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  inputFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const foto = event.target.files[0];

      const formData = new FormData();
      formData.append('foto', foto);

      this.http.post('http://localhost:8080/fotos', formData)
        .subscribe(resposta => console.log('updload ok'));

    }
  }


}
