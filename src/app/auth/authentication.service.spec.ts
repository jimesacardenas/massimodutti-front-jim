import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { CredentialsService, Credentials } from './credentials.service';
import { MockCredentialsService } from './credentials.service.mock';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let credentialsService: MockCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CredentialsService, useClass: MockCredentialsService }, AuthenticationService],
    });

    authenticationService = TestBed.inject(AuthenticationService);
    credentialsService = TestBed.inject(CredentialsService);
    credentialsService.credentials = null;
    spyOn(credentialsService, 'setCredentials').and.callThrough();
  });

  describe('register', () => {
    it('should register user', fakeAsync(() => {
      // Arrange
      const request = authenticationService.register({
        username: 'test',
        password: '123',
        firstname: 'test',
        flastname: 'test'
      });
      request.subscribe();
      tick();

      // Assert
      request.subscribe((credentials) => {
        expect(credentials).toBeDefined();
      });
    }));
  });


  describe('login', () => {
    it('should return credentials', fakeAsync(() => {
      // Act
      const registerrequest = authenticationService.register({
        username: 'test',
        password: '123',
        firstname: 'test',
        flastname: 'test'
      });

      registerrequest.subscribe();

      const request = authenticationService.login({
        username: 'test',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe((credentials) => {
        expect(credentials).toBeDefined();
        expect(credentials.token).toBeDefined();
      });
    }));

    it('should authenticate user', fakeAsync(() => {
      expect(credentialsService.isAuthenticated()).toBe(false);

      // Act
      const registerrequest = authenticationService.register({
        username: 'test',
        password: '123',
        firstname: 'test',
        flastname: 'test'
      });

      registerrequest.subscribe();

      // Act
      const request = authenticationService.login({
        username: 'test',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(credentialsService.isAuthenticated()).toBe(true);
        expect(credentialsService.credentials).not.toBeNull();
        expect((credentialsService.credentials as Credentials).token).toBeDefined();
        expect((credentialsService.credentials as Credentials).token).not.toBeNull();
      });
    }));

    it('should persist credentials for the session', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'test',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(credentialsService.setCredentials).toHaveBeenCalled();
        expect((credentialsService.setCredentials as jasmine.Spy).calls.mostRecent().args[1]).toBe(undefined);
      });
    }));

    it('should persist credentials across sessions', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'test',
        password: '123',
        remember: true,
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(credentialsService.setCredentials).toHaveBeenCalled();
        expect((credentialsService.setCredentials as jasmine.Spy).calls.mostRecent().args[1]).toBe(true);
      });
    }));
  });

  describe('logout', () => {
    it('should clear user authentication', fakeAsync(() => {
      // Arrange
      const registerrequest = authenticationService.register({
        username: 'test',
        password: '123',
        firstname: 'test',
        flastname: 'test'
      });

      registerrequest.subscribe();


      const loginRequest = authenticationService.login({
        username: 'test',
        password: '123',
      });
      tick();

      // Assert
      loginRequest.subscribe(() => {
        expect(credentialsService.isAuthenticated()).toBe(true);

        const request = authenticationService.logout();
        tick();

        request.subscribe(() => {
          expect(credentialsService.isAuthenticated()).toBe(false);
          expect(credentialsService.credentials).toBeNull();
        });
      });
    }));
  });
});
