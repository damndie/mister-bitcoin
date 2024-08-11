import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../models/user.model';

const ENTITY = 'users';
const STORAGE_KEY_LOGGEDIN = 'loggedInUserDB';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _users$ = new BehaviorSubject<User[]>([])
    public users$ = this._users$.asObservable()

    private _loggedInUser!: User

    constructor() {
        const users = JSON.parse(localStorage.getItem(ENTITY) || 'null')
        if (!users || users.length === 0) {
            const initialUsers = this._createUsers()
            localStorage.setItem(ENTITY, JSON.stringify(initialUsers))
            this._users$.next(initialUsers)
        } else {
            this._users$.next(users)
        }

        const loggedInUser = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN) || 'null')
        if (!loggedInUser) {
            this._loggedInUser = { _id: 'u125', fullName: 'Daniel Vinitsky2', coins: 100, moves: [] }
            localStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(this._loggedInUser))
        } else {
            this._loggedInUser = loggedInUser
        }
    }

    public getUser() {
        return this._loggedInUser;
    }

    private _createUsers(): User[] {
        const user1: User = { _id: 'u123', fullName: 'Daniel Vinitsky', coins: 100, moves: [] }
        const user2: User = { _id: 'u124', fullName: 'Daniel2', coins: 100, moves: [] }

        return [user1, user2];
    }
}
