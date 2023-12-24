import { updateDoc } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Content, DataService, Slide } from '../services/data.service';
import { Observable, filter, map, reduce, tap } from 'rxjs';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  slides$!: Observable<Slide[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.slides$ = this.dataService.getSlides();
  }

  addNovoPrograma(slide: Slide) {
    this.dataService.getSlideById('v8LzCcg1OB1jblubvr09').subscribe({
      next: (res) => {
        let novoConteudo: Content = {
          order: 1,
          background:
            'https://img.freepik.com/fotos-premium/contemporaneo-impecavel-centro-de-fitness-interior-generative-ai_391052-10889.jpg',
          title: 'Novo Treino',
          subtitle: 'comece agora',
        };

        console.log(res);

        let slideAtualizado = res;
        slideAtualizado.contents.unshift(novoConteudo);

        this.dataService.addContent(slideAtualizado);
      },
      error: (error) => {},
    });
  }
}
