export class User {
  id?: number;
  avatar?: string;
  first_name: string;
  last_name: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
