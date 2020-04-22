import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from '@app/backend/core/user.interface';
import { Logger } from '@app/core';

const log = new Logger('LoginComponent');

@Injectable()
export class AuthService {
  private userData: any;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    /**
     * Saving user data in localstorage when logged in and setting up null when logged out
     */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        sessionStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(sessionStorage.getItem('user'));
      } else {
        sessionStorage.setItem('user', null);
        JSON.parse(sessionStorage.getItem('user'));
      }
    });
  }

  /**
   * Returns true when user is logged in and email is verified
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (user !== null) && (user.emailVerified !== false);
  }

  public login(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then(
          (result) => {
            this.setUserData(result.user).then(() => resolve(true));
          },
          (error) => {
            reject(error);
          });
    });
  }

  public logout(): void {
    this.afAuth
      .signOut()
      .then(() => {
        sessionStorage.removeItem('user');
        this.router
          .navigate(['/login'])
          .then(() => log.info('Logout with success'));
      })
      .catch((error: any) => {
        log.error('Try to `logout` - ERROR:', error.message);
      });
  }

  /**
   * Setting up user data when sign in with username/password, sign up with username/password and sign in with
   * social auth provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
   */
  private setUserData(user: any): Promise<void> {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    return userRef.set(userData, { merge: true });
  }
}
