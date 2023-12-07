import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // If the object store already exists, do nothing
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Updates the database content
export const putDb = async (content) => {

  // Opens the database
  const jateDb = await initdb();

  // Creates the transaction
  const tx = jateDb.transaction('jate', 'readwrite');

  // Gets the stored object
  const store = tx.objectStore('jate');

  // Add data to the database
  await store.put({ id: 1, content: content });

  await tx.done;
  console.log('Content added to the database');
};

export const getDb = async () => {

  // Opens the jate database
  const jateDb = await initdb();

  // Creates a transaction
  const tx = jateDb.transaction('jate', 'readonly');

  // Gets the object store
  const store = tx.objectStore('jate');

  // Gets the first data content
  const data = await store.get(1);

  await tx.done;
  return data ? data.content : '';
};

initdb();