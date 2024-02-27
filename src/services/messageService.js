import message from "../models/message.js";
import userService from "../models/user.js";

export const create = (body) => message.create(body);

export const deleteMsg = async (user, from) => {

  await message.deleteMany({ user: user, from: from });

  await message.deleteMany({ user: from, from: user });

  const text = {message: "apagado com sucesso"}

  return text

}

export const FindMessages = async (User, From) => {
  
  const resUser = await message.find({ user: User, from: From });

  const resFrom = await message.find({ user: From, from: User });

  let allMsg = []

  for (let c in resUser) {
    allMsg.push(resUser[c])
  }
  for (let c in resFrom) {
    allMsg.push(resFrom[c])
  }

  
  allMsg.sort(function (a, b) {

    if (a.date > b.date) {
      return 1;
    }

    if (a.date < b.date) {
      return -1;
    }
     
    return 0;

  });

  return allMsg
}

export const msgAll = async (user) => {
  let idFrom = [];
  let resId = [];
  let MsgFrom = [];

  const resUser = await message.find({ user: user });
  const resFrom = await message.find({ from: user });

  for (let c in resUser) {
    //enviando id do from

    idFrom.push(resUser[c].from);
  }

  for (let c in resFrom) {
    //enviando ids do user

    idFrom.push(resFrom[c].user);
  }

  const set = new Set(idFrom); //remove os iguais

  idFrom = Array.from(set);

  for (let c in idFrom) {
    resId.push(await message.find({ user: user, from: idFrom[c] })); //envia minhas msg pro array
  }

  for (let c in idFrom) {
    MsgFrom.push(await message.find({ user: idFrom[c], from: user })); //envia msg deles pro array
  }

  let lastUser = [];
  let lastFrom = [];

  for (let c in resId) {
    //funçao que pega minha ultima msg enviada para eles

    let res = resId[c];

    lastUser.push(res[res.length - 1]);
  }

  for (let c in MsgFrom) {
    //funçao que pega ultima msg deles

    let res = MsgFrom[c];

    lastFrom.push(res[res.length - 1]);
  }

  let newLastFrom = []; //ultima msg deles para mim

  let newLastUser = []; //ultima msg minha para eles

  let idsMsg = []; //criar array com cada id e ultima msg

  newLastUser = lastUser.filter((last) => last != null); // remove null  UserId meu com msg minha para cada id

  newLastFrom = lastFrom.filter((last) => last != null); // remove null UserId deles com ultima msg pra mim

  let msgsLast = []; //array com ultimas msg entre o user e o from

  let nameId = [];

  for (let c in idFrom) {
    nameId.push({ id: await userService.find({ _id: idFrom[c] }) });

    if (newLastFrom[c] === undefined) {
      msgsLast.push(newLastUser[c]);
    } else {
      if (newLastUser[c] === undefined) {
        msgsLast.push(newLastFrom[c]);
      } else {
        if (newLastUser[c].date > newLastFrom[c].date) {
          //lastfrom 2 nao existe

          msgsLast.push(newLastUser[c]);
        } else {
          msgsLast.push(newLastFrom[c]);
        }
      }
    }

    idsMsg.push({
      username: nameId[c].id[0].username,
      userid: idFrom[c],
      msg: msgsLast[c],
    });
  }

  idsMsg.sort(function (a, b) {

    if (a.msg.date > b.msg.date) {
      return 1;
    }

    if (a.msg.date < b.msg.date) {
      return -1;
    }
     
    return 0;

  });

  idsMsg.reverse()

  return idsMsg
};
