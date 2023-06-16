export type NewEntity<T> = Omit<T, 'id'>;

export type ID = number;

export type Identifiable = { id: ID };

export type LoginCredentials = {
  email: string,
  password: string,
};
