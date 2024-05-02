import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('userInput.db');

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS userInput (id INTEGER PRIMARY KEY AUTOINCREMENT, desc TEXT, phone INTEGER, lat FLOAT, long FLOAT, timestamp INTEGER)'
    );
  });
};
