declare module "#auth-utils" {
  interface User extends Omit<Customer, "password"> {}

  interface UserSession {
    user: User;
  }

  interface SecureSessionData {}
}

export {};
