import db from './db';

export const createNewGroup = async () => {
  const time = Math.floor(Date.now() / 1000);
  const id = await db.groups.add({ name: "Unnamed group", timestamp: time, updateTimestamp: time, size: 0 });
  await db.groups.update(id, {name: `Unnamed group ${id}`})
  return await db.groups.get(id);
}

export const copyCodes = async (groupId) => {
  const codes = await db.codes.where('groupId').equals(groupId).sortBy('timestamp');
  const codeText = codes.map((code) => code.code).join('\n');
  navigator.clipboard.writeText(codeText);
}

export const copyCodesWithSet = async (groupId) => {
  const codes = await db.codes.where('groupId').equals(groupId).sortBy('timestamp');
  const codeText = codes.map((code) => `${code.code}\t${code.status}`).join('\n');
  console.log(codeText);
  navigator.clipboard.writeText(codeText);
}

export const deleteGroup = async (groupId) => {
  return db.codes.where('groupId').equals(groupId)
    .delete()
    .then(() => db.groups.delete(groupId));
}

const checkUrl = 'https://pkmnnerd.app.jumpydoll.com/ptcgo-check-api/code';

const htmlDecode = (input) => {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

const checkCode = async(codeObject, sessionId) => {
  await fetch(`${checkUrl}?code=${codeObject.code}&session_id=${sessionId}`)
    .then(res => {
      return res.json().then((body) => {
        if (res.ok) {
          return body;
        } else {
          const message = body.detail || res.statusText;
          throw Error(message);
        }
      })
    })
    .then(body => {
      let status;
      if (body.valid) {
        status = htmlDecode(body.coupon_title);
      } else {
        status = body.error_message;
      }
      db.codes.update(codeObject.id, {status: status, checkTimestamp: Math.floor(Date.now()/1000)})
    })
}

export const checkFirstCode = async(groupId, sessionId) => {
  const codes = await db.codes.where('groupId').equals(groupId).reverse().sortBy('checkTimestamp');
  codes.sort((a, b) => (a.checkTimestamp || 0) - (b.checkTimestamp || 0) || a.timestamp - b.timestamp);
  console.log(codes);

  if (codes.length === 0) {
    throw Error("No codes in group.");
  }
  await checkCode(codes[0], sessionId);
}

export const checkCodes = async(groupId, sessionId) => {
  const codes = await db.codes.where('groupId').equals(groupId).reverse().sortBy('checkTimestamp');
  codes.sort((a, b) => (a.checkTimestamp || 0) - (b.checkTimestamp || 0) || a.timestamp - b.timestamp);
  console.log(codes);

  for await (const code of codes) {
    await checkCode(code, sessionId);
    await new Promise(r => setTimeout(r, 2000));
  }
}
