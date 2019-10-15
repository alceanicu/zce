import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '@app/backend/core/user.interface';


@Injectable()
export class AuthService {
  private userData: any;

  /**
   * Returns true when user is looged in and email is verified
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
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

  login(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => { // FIXME not google & ngZone
        this.ngZone.run(() => {
          this.router.navigate(['/backend/php-list']);
        });
        this.setUserData(result.user);
      })
      .catch((error: any) => {
        window.alert(error.message);
      });
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      sessionStorage.removeItem('user');
      this.router.navigate(['/backend/login']);
    });
  }

  /**
   * Setting up user data when sign in with username/password, sign up with username/password and sign in with social auth
   * provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
   */
  private setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }
}
