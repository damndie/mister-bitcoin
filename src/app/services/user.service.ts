import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, retry, tap, throwError } from 'rxjs';

import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move.model';
import { storageService } from './async-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

const ENTITY = 'users'
const STORAGE_KEY_LOGGEDIN = 'loggedInUserDB'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([])
  public users$ = this._users$.asObservable()

  private _loggedInUser!: User

  constructor(private router: Router) {
    const users = JSON.parse(localStorage.getItem(ENTITY) || 'null')
    if (!users || users.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createUsers()))
    }

    const loggedInUser = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN) || 'null')
    if (!loggedInUser) {
      this.router.navigateByUrl('/signup')
    } else {
      this._loggedInUser = loggedInUser
    }
  }

  public getUser() {
    return this._loggedInUser
  }

  public signup(name: string) {
    const userToSave = this._getEmptyUser()
    userToSave.fullName = name

    return from(storageService.post(ENTITY, userToSave))
      .pipe(
        tap(newUser => {
          const users = this._users$.value
          this._users$.next([...users, newUser])
          this._setLoggedInUser(newUser)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public logout() {
    const anonymousUser = this._getEmptyUser()
    this._setLoggedInUser(anonymousUser)
  }

  public addMove(contact: Contact, amount: number) {
    const moveToSave: Move = {
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount
    }

    this._loggedInUser.moves.push(moveToSave)
    this._loggedInUser.coins -= amount

    this._setLoggedInUser(this._loggedInUser)

    return this._loggedInUser
  }

  private _setLoggedInUser(user: User) {
    this._loggedInUser = user
    localStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
  }

  private _getEmptyUser() {
    return {
      _id: '',
      fullName: '',
      coins: 100,
      moves: []
    }
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err)
    return throwError(() => err)
  }

  private _createUsers() {
    const user1: User = { _id: 'u123', fullName: 'Daniel Vinitsky', coins: 100, moves: [] }
    const user2: User = { _id: 'u124', fullName: 'Daniel2', coins: 100, moves: [] }

    return [user1, user2]
  }
}