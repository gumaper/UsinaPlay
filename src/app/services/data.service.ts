import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Slide {
  id?: string;
  type?: number;
  title: string;
  order: number;
  contents: Content[];
}

export interface Content {
  background: string;
  order: number;
  title: string;
  subtitle: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  slides: Observable<Slide[]>;

  constructor(private firestore: Firestore) {
    this.slides = this.getSlideCollection();
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

  addContent(slide: Slide) {
    const slideDocRef = doc(this.firestore, `slides/${slide.id}`);
    return updateDoc(slideDocRef, { contents: slide.contents });
  }
}
