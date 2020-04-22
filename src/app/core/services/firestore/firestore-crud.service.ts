import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

import { environment } from '@env/environment';

/**
 * @see https://dev.to/coly010/building-a-firebase-crud-service-for-angular-2629
 * @deprecated
 * We need a function that will turn our JS Objects into an Object
 * that Firestore can work with
 */
function firebaseSerialize<T>(object: T) {
  return object;
  // return JSON.parse(JSON.stringify(object));
}

// We need a base Entity interface that our models will extend
export interface Entity {
  id?: number; // Optional for new entities
}

export class FirestoreCrudService<T extends Entity> {
  // Reference to the Collection in Firestore
  private collection: AngularFirestoreCollection<T>;

  /**
   * We need to ask for the AngularFirestore Injectable
   * and a Collection Name to use in Firestore
   */
  constructor(
    private readonly db: AngularFirestore,
    collectionName: string
  ) {
    // We then create the reference to this Collection
    this.collection = this.db.collection<T>(collectionName);
  }

  /**
   * We look for the Entity we want to add as well
   * as an Optional Id, which will allow us to set
   * the Entity into a specific Document in the Collection
   */
  add(entity: T, id?: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (id) {
        // If there is an ID Provided, lets specifically set the Document
        entity.id = Number(id);
        this.collection
          .doc(id)
          .set(firebaseSerialize(entity))
          .then(() => {
            resolve(entity);
          });
      } else {
        // If no ID is set, allow Firestore to Auto-Generate one
        const configDocRef = this.db.firestore.collection(environment.configPHP.configPath).doc('php2');
        this.db.firestore
          .runTransaction(
            transaction => transaction.get(configDocRef)
              .then(
                configDoc => {
                  const counter = (configDoc.data().counter || 0) + 1;
                  transaction.update(configDocRef, { counter });
                  return counter;
                }
              )
          )
          .then((counter: number) => {
            entity.id = counter;
            this.collection
              .doc(String(entity.id))
              .set(entity)
              .then(() => resolve(entity)) // observer.next(question.id))
              .catch(error => reject(error)); // observer.error(error));
          })
          .catch(error => reject(error)); // observer.error(error));
      }
    });
    // We want to create a Typed Return of the added Entity
    // return new Promise<T>((resolve, reject) => {
    //   if (id) {
    //     // If there is an ID Provided, lets specifically set the Document
    //     this.collection
    //       .doc(id)
    //       .set(firebaseSerialize(entity))
    //       .then(ref => {
    //         console.log(ref);
    //         resolve(entity);
    //       });
    //   } else {
    //     // If no ID is set, allow Firestore to Auto-Generate one
    //     this.collection.add(firebaseSerialize(entity)).then(ref => {
    //       // Let's make sure we return the newly added ID with Model
    //       const newEntity = {
    //         id: ref.id,
    //         ...entity,
    //       };
    //       resolve(newEntity);
    //     });
    //   }
    // });
  }

  /**
   * Our get method will fetch a single Entity by it's Document ID
   */
  get(id: string): Observable<T> {
    return this.collection
      .doc<T>(id)
      .snapshotChanges()
      .pipe(
        // We want to map the document into a Typed JS Object
        map(doc => {
          // Only if the entity exists should we build an object out of it
          if (doc.payload.exists) {
            const data = doc.payload.data() as T;
            const payloadId = doc.payload.id;
            return { id: payloadId, ...data };
          }
        })
      );
  }

  getById(id: number): Observable<firestore.DocumentSnapshot> {
    return this.db
      .doc<T>(`todos/${id}`)
      .get();
  }

  /**
   * Our list method will get all the Entities in the Collection
   */
  list(): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      // Again we want to build a Typed JS Object from the Document
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as T;
          data.id = Number(a.payload.doc.id);
          return data;
        });
      })
    );
  }

  /**
   * Our Update method takes the full updated Entity
   * Including it's ID property which it will use to find the
   * Document. This is a Hard Update.
   */
  update(entity: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.collection
        .doc<T>(String(entity.id))
        .set(firebaseSerialize(entity))
        .then(() => {
          resolve({
            ...entity,
          });
        });
    });
  }

  /**
   * Delete
   */
  delete(id: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.collection
        .doc<T>(String(id))
        .delete()
        .then(() => {
          resolve(id);
        });
    });
  }
}
