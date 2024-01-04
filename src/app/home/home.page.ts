import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService, Slide } from '../services/data.service';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  slides$!: Observable<Slide[]>;
  programas$!: Observable<Slide[]>;

  loading: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.slides$ = this.dataService.getSlides();
    this.programas$ = this.dataService.getProgramas();
  }

  addNovoPrograma() {
    this.loading = true;

    const programa: Slide = {
      image:
        'https://img.freepik.com/fotos-premium/contemporaneo-impecavel-centro-de-fitness-interior-generative-ai_391052-10889.jpg',
      title: 'Novo Treino',
      subtitle: 'comece agora',
    };

    this.dataService.addPrograma(programa).then((res) => {
      this.loading = false;
    });
  }
}
