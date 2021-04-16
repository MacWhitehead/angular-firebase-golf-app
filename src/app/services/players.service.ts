import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Player } from '../interfaces/player';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private db: AngularFirestore) {}

  saveGameToScoreboard(player: Player): any {
    this.db.collection('scoreboardData').add(player);
  }

  getGamesByCourse(courseId: string): Observable<Player[]> {
    const filteredPlayers = this.db.collection('scoreboardData', (ref) =>
      ref.where('courseId', '==', courseId)
    );
    return filteredPlayers.snapshotChanges().pipe(
      map((items: DocumentChangeAction<Player>[]): Player[] => {
        return items.map(
          (item: DocumentChangeAction<Player>): Player => {
            return {
              id: item.payload.doc.id,
              courseId,
              name: item.payload.doc.data().name,
              one: item.payload.doc.data().one,
              two: item.payload.doc.data().two,
              three: item.payload.doc.data().three,
              four: item.payload.doc.data().four,
              five: item.payload.doc.data().five,
              six: item.payload.doc.data().six,
              seven: item.payload.doc.data().seven,
              eight: item.payload.doc.data().eight,
            };
          }
        );
      })
    );
  }
}
