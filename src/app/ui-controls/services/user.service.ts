import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: User | undefined = undefined;
  private browserClose$ = new Subject<any>();

  public onBrowserClose() {
    this.browserClose$.next(true);
  }

  public browserClose(): Observable<any> {
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
      const userFound = users.find(u => u.name == user.name);
      if (userFound != undefined) {
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

  public getCurrentUser(): User | undefined {
    return this.currentUser;
  }

  public getUsers(): User[] {
    return this.getLocalStorageUsers();
  }

  private getLocalStorageUsers(): User[] {
    let users: User[] = [];

    let storageUsers = localStorage.getItem('gameUsers');
    if (storageUsers != null) {
      const data = JSON.parse(storageUsers);
      users = <User[]>data;
    }
    return users;
  }

  private setLocalStorageUsers(users: User[]) {
    const storageUsers = JSON.stringify(users);
    localStorage.setItem('gameUsers', storageUsers);
  }

  private updateUser(user: User, users: User[], userFound: User) {
    if (user.score > 0) {
      const index = users.indexOf(userFound);
      users[index] = user;
      this.currentUser = user;
    }
  }
}
