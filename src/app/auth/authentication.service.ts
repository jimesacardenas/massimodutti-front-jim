import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  firstname?: string,
  flastname?: string,
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService) { }

  get users(): LoginContext[] {
    const _users = localStorage.getItem('users');
    if (_users) {
      return JSON.parse(_users) as LoginContext[];
    }
    return [];
  }
  set users(value: LoginContext[]) {
    localStorage.setItem('users', JSON.stringify(value));
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    const user = this.users.find(u => u.username === context.username && u.password === context.password);

    if (user) {
      const data = {
        username: user.username,
        token: '123456',
      };

      this.credentialsService.setCredentials(data, context.remember);
      return of(data);
    }

    return of(undefined);
  }

  /**
   * Register the user.
   * @param context The register parameters.
   * @return The user credentials.
   */
  register(context: LoginContext): Observable<LoginContext> {
    if (!context) {
      return of(undefined)
    }

    const _users = this.users

    _users.push(context);

    this.users = _users;

    return of(context);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
