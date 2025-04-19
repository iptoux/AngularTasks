export interface Account {
  offline: boolean;
  username: string;
  password?: string;
  localStorageKey?: string;
  email?: string;
  avatar?: string;
}
