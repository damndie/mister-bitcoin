import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';

import { User } from '../models/user.model';

import { HttpErrorResponse } from '@angular/common/http';

const ENTITY = 'users'


@Injectable({
    providedIn: 'root'
})

export class UserService {
    private _users$ = new BehaviorSubject<User[]>([])
    public users$ = this._users$.asObservable()

    constructor() {
        const users = JSON.parse(localStorage.getItem(ENTITY) || 'null')
        if (!users || users.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._createUsers()))
        }
    }
    private _createUsers() {
        const user1: User = { _id: 'u123', fullName: 'Daniel Vinitsky', coins: 100, moves: [] }
        const user2: User = { _id: 'u124', fullName: 'Daniel2', coins: 100, moves: [] }

        return [user1, user2]
    }
}