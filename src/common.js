import db from './db';

export const createNewGroup = async () => {
  const time = Math.floor(Date.now() / 1000);
  const id = await db.groups.add({ name: "Unnamed group", timestamp: time, updateTimestamp: time, size: 0 });
  await db.groups.update(id, {name: `Unnamed group ${id}`})
  return await db.groups.get(id);
}

export const copyCodes = async (groupId) => {
  const codes = await db.codes.where('groupId').equals(groupId).toArray()
  const codeText = codes.map((code) => code.code).join('\n');
  navigator.clipboard.writeText(codeText);
}

export const deleteGroup = async (groupId) => {
  return db.codes.where('groupId').equals(groupId)
    .delete()
    .then(() => db.groups.delete(groupId));
}