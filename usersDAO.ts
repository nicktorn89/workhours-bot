import { UserData } from 'types';
import { db } from './db';

class UsersDAO {
  dropTable() {
    db.run('DROP TABLE users');
  }

  initTable() {
    db.run('CREATE TABLE IF NOT EXISTS users (chatId int)');
  }

  _showAllUsers() {
    db.each('SELECT * FROM users', (error: any, data: any) => {
      console.log('error', error, 'data', data);
    });
  }

  createUser({ chatId }: UserData) {
    db.run(`INSERT INTO users (chatId) VALUES (${chatId})`);

    this._showAllUsers();
  }

  // updateUser(chatId: number, data: UserData) {
  // db.run(`UPDATE users SET ${fields} WHERE chatId='${chatId}'`);
  // }

  deleteUser(chatId: number) {
    db.run(`DELETE FROM users WHERE chatId='${chatId}'`);
  }
}

const usersDAOSingletone = new UsersDAO();

usersDAOSingletone.initTable();
usersDAOSingletone._showAllUsers();

export {
  usersDAOSingletone,
};

