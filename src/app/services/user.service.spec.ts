import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('onBrowserClose shold be called', (done) => {
    service.getBrowserClose().subscribe(() => done());

    spyOn(service, 'onBrowserClose').and.callThrough();
    service.onBrowserClose();
    expect(service.onBrowserClose).toHaveBeenCalled();
  });

  it('setUser should store an user', () => {
    const user: User = { name: 'test', score: 49, autoClikers: 11 };
    service.setUser(user);

    const currentUser = service.getCurrentUser();
    expect(currentUser !== undefined).toBe(true);
    expect(currentUser?.name).toBe(user.name);

    const users = localStorage.getItem('gameUsers');
    expect(users !== null).toBe(true);
    expect(users?.length).toBeGreaterThan(0);
    if (users !== null) {
      const storageUsers = JSON.parse(users) as User[];
      const userFound = storageUsers.find(u => u.name === user.name);
      expect(userFound !== undefined).toBe(true);
      expect(userFound?.name).toBe(user.name);
    }
  });

  it('setUser should store a second user', () => {
    const user: User = { name: 'test', score: 49, autoClikers: 11 };
    service.setUser(user);
    const user2: User = { name: 'test2', score: 75, autoClikers: 1 };
    service.setUser(user2);

    const users = localStorage.getItem('gameUsers');
    expect(users !== null).toBe(true);
    expect(users?.length).toBeGreaterThan(1);
    if (users !== null) {
      const storageUsers = JSON.parse(users) as User[];
      const userFound = storageUsers.find(u => u.name === user2.name);
      expect(userFound !== undefined).toBe(true);
      expect(userFound?.name).toBe(user2.name);
    }
  });

  it('setUser should update an user', () => {
    let user: User = { name: 'test', score: 5, autoClikers: 11 };
    service.setUser(user);
    user.score = 49;
    service.setUser(user);

    const users = localStorage.getItem('gameUsers');
    expect(users !== null).toBe(true);
    expect(users?.length).toBeGreaterThan(0);
    if (users !== null) {
      const storageUsers = JSON.parse(users) as User[];
      const userFound = storageUsers.find(u => u.name === user.name);
      expect(userFound !== undefined).toBe(true);
      expect(userFound?.score).toBe(user.score);
    }
  });

  it('getUsers should get stored user', () => {
    const users: User[] = [{ name: 'test', score: 49, autoClikers: 0 }];

    const jsonUsers = JSON.stringify(users);
    localStorage.setItem('gameUsers', jsonUsers);

    const storageUsers = service.getUsers();
    expect(storageUsers.length).toBeGreaterThan(0);

    const userFound = storageUsers.find(u => u.name === users[0].name);
    expect(userFound !== undefined).toBe(true);
  });

});
