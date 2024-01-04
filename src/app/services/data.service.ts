import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Slide {
  id?: string;
  title: string;
  subtitle: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  slides: Observable<Slide[]>;
  programas: Observable<Slide[]>;

  constructor(private firestore: Firestore) {
    this.slides = this.getSlideCollection();
    this.programas = this.getProgramaCollection();
  }

  getSlideCollection(): Observable<Slide[]> {
    const slidesRef = collection(this.firestore, 'slides');
    return collectionData(slidesRef, { idField: 'id' }) as Observable<Slide[]>;
  }

  getSlides(): Observable<Slide[]> {
    return this.slides;
  }

  getSlideById(slideId: string): Observable<Slide> {
    const slideRef = doc(this.firestore, `slides/${slideId}`);
    return docData(slideRef, { idField: 'id' }) as Observable<Slide>;
  }

  getProgramaCollection(): Observable<Slide[]> {
    const programasRef = collection(this.firestore, 'programas');
    return collectionData(programasRef, { idField: 'id' }) as Observable<Slide[]>;
  }

  getProgramas(): Observable<Slide[]> {
    return this.programas.pipe(map((slides) => slides.reverse()));
  }

  addPrograma(slide: Slide) {
    const slideDocRef = collection(this.firestore, `programas`);
    return addDoc(slideDocRef, slide);
  }
}
