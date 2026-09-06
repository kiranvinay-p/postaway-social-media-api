import bcrypt from "bcryptjs";

let users = [];
let nextUserId = 1;

export class UserModel {
  static getAllUsers() {
    return users;
  }

  static findById(id) {
    return users.find((user) => user.id === Number(id));
  }

  static findByEmail(email) {
    return users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  static async addUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: nextUserId++,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    };

    users.push(user);

    return user;
  }

  static async confirmLogin(email, password) {
    const user = this.findByEmail(email);

    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return null;
    }

    return user;
  }
}
