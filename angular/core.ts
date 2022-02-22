export const getUserById = (id: number): Promise<User> =>
  new Promise((resolve) => {
    const users = [
      {
        id: 1,
        firstname: "Giorgi",
        lastname: "Bazerashvili",
        age: 26,
        isActive: true,
      },
      {
        id: 2,
        firstname: "Giorgi",
        lastname: "Bazerashvili",
        age: 27,
        isActive: false,
      },
      {
        id: 3,
        firstname: "Giorgi",
        lastname: "Bazerashvili",
        age: 28,
        isActive: true,
      },
    ];
    setTimeout(() => {
      resolve(users.find((u) => u.id == id));
    }, 3000);
  });

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  isActive: boolean;
}

export function memo(min: number) {
  return (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ): any => {
    const descriptorValue = descriptor.value;
    const cache = new Map<number, any>();
    descriptor.value = function (...args: any[]) {
      const id = args[0];
      if (cache.has(id)) {
        if ((Date.now() - cache.get(id).createdAt) / 60000 < min) {
          return Promise.resolve(cache.get(id));
        }
      }
      return descriptorValue.apply(this, args).then((data) => {
        cache.set(id, { ...data, createdAt: Date.now() });
        return data;
      });
    };
    return descriptor;
  };
}

export class UsersService {
  @memo(1)
  getUserById(id: number): Promise<User> {
    return getUserById(id);
  }
}