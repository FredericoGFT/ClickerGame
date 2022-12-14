import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private localStorageKey = 'gameUsers';
  private currentUser: User | undefined = undefined;
  private browserClose$ = new Subject<any>();

  /**
   * Rise browser close event.
   */
  public onBrowserClose() {
    this.browserClose$.next(true);
  }

  /**
   * Get observable for browser close event.
   */
  public getBrowserClose(): Observable<any> {
    return this.browserClose$.asObservable();
  }

  /**
   * Add or update an user.
   * @param user User data.
   */
  public setUser(user: User) {
    let users: User[] = this.getLocalStorageUsers();
    this.currentUser = user;

    if (users.length > 0) {
      const userFound = users.find(u => u.name === user.name);
      if (userFound) {
        this.updateUser(user, users, userFound);
        this.currentUser = userFound;
      }
      else
        users.push(user);
    }
    else
      users.push(user);

    this.setLocalStorageUsers(users);
  }

  /**
   * Return the current user.
   */
  public getCurrentUser(): User | undefined {
    return this.currentUser;
  }

  /**
   * Get array users from local storage.
   */
  public getUsers(): User[] {
    return this.getLocalStorageUsers();
  }

  private getLocalStorageUsers(): User[] {
    let users: User[] = [];

    let storageUsers = localStorage.getItem(this.localStorageKey);
    if (storageUsers !== null) {
      const data = JSON.parse(storageUsers);
      users = <User[]>data;
    }
    return users;
  }

  private setLocalStorageUsers(users: User[]) {
    const storageUsers = JSON.stringify(users);
    localStorage.setItem(this.localStorageKey, storageUsers);
  }

  private updateUser(user: User, users: User[], userFound: User) {
    const index = users.indexOf(userFound);
    users[index] = user;
  }
}
