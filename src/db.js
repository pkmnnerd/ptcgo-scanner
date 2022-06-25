import Dexie from 'dexie';

export const db = new Dexie('ptcgo-scanner');
db.version(1).stores({
  groups: '++id, name, timestamp, updateTimestamp',
  codes: '++id, code, groupId, timestamp, status, checkTimestamp'
});


export default db;