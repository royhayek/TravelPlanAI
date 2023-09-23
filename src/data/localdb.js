import _ from 'lodash';
import * as SQLite from 'expo-sqlite';

// Open the local stored database
export const db = SQLite.openDatabase('travelplanai.db');

// Create the conversations table if it doesn't exist
export const createTables = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS conversations (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, assistant TEXT, createdAt TEXT);');
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, conversationId INTEGER, question TEXT, answer TEXT, createdAt TEXT);',
        );
      },
      () => {
        reject();
      },
      () => {
        console.info('[InitData] :: Created database tables');
        resolve();
      },
    );
  });
};

// Insert a new conversation to db
export const addConversation = conversation => {
  return new Promise((resolve, reject) => {
    // is conversation object empty?
    if (_.isEmpty(conversation)) {
      return false;
    }

    const { title, assistant, createdAt } = conversation;

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO conversations (title, assistant, createdAt) VALUES (?, ?, ?)',
        [title, assistant, createdAt],
        (t, res) => {
          resolve(res?.insertId);
        },
        (t, err) => {
          console.debug('[addConversation] :: ', err);
          reject();
        },
      );
    });
  });
};

// Retrieve all stored conversations
export const getConversations = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM conversations',
        [],
        (t, { rows: { _array } }) => {
          resolve(_array);
        },
        (t, error) => {
          console.error(error);
          reject();
        },
      );
    });
  });
};

// Retrieve conversation by id
export const getConversation = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM conversations WHERE id = ?;',
        [id],
        (t, { rows: { _array } }) => {
          resolve(_array);
        },
        () => {
          reject();
        },
      );
    });
  });
};

// Delete conversation by id
export const deleteConversation = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM conversations WHERE id = ?;',
        [id],
        () => {
          resolve();
        },
        () => {
          reject();
        },
      );
    });
  });
};

// Delete all stored conversations
export const deleteAllConversations = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM conversations',
        null,
        () => {
          resolve();
        },
        () => {
          reject();
        },
      );
    });
  });
};

export const getMessagesByConversation = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM messages WHERE conversationId = ?;',
        [id],
        (t, { rows: { _array } }) => {
          console.debug('[getMessagesByConversation] :: _array', _array);
          resolve(_array);
        },
        (t, err) => {
          console.debug('[getMessagesByConversation] :: ', err);
          reject();
        },
      );
    });
  });
};

export const addMessage = message => {
  try {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(message)) {
        return false;
      }

      const { conversationId, question, answer, createdAt } = message;
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO messages (conversationId, question, answer, createdAt) VALUES (?,?,?,?)',
          [conversationId, question, answer, createdAt],
          (t, res) => {
            resolve(res.insertId);
          },
          (t, err) => {
            console.debug('[addMessage] :: ', err);
            reject();
          },
        );
      });
    });
  } catch (error) {
    console.error('[addMessage] :: error ', error);
  }
};

export const updateLocalAnswer = message => {
  try {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(message)) {
        return false;
      }

      const { messageId, answer } = message;

      db.transaction(tx => {
        tx.executeSql(
          'UPDATE messages SET answer = ? WHERE id = ?;',
          [answer, messageId],
          () => {
            resolve();
          },
          (t, error) => {
            console.debug('error', error);
            reject();
          },
        );
      });
    });
  } catch (e) {
    console.debug('[updateLocalAnswer] :: ', e);
  }
};
