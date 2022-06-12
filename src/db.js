import Dexie from 'dexie';

export const db = new Dexie('ptcgo-scanner');
db.version(2).stores({
  groups: '++id, name, timestamp',
  codes: '++id, code, groupId, timestamp'
});


export default db;