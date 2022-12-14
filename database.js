import Realm from 'realm';
import { SHA256 } from './sha';

const UserSchema = {
  name: 'User',
  primaryKey: 'userId',
  properties: {
      userId: 'int',
      userName: 'string',
      userOrgname: {type: 'string', optional: true},
      userEmail: 'string',
      userPass: 'string',
      userWp: {type: 'int', optional: true},
      userTel: {type: 'int', optional: true},
      userIg: {type: 'string', optional: true},
      userFb: {type: 'string', optional: true},
      userTw: {type: 'string', optional: true},
  }
}

const PetSchema = {
  name: 'Pet',
  primaryKey: 'petId',
  properties: {
      userId: 'int',
      petId: 'int',
      petName: 'string',
      petType: 'string',
      petAge: 'string',
      petBreed: 'string',
      petProvincia: 'string',
      petBarrio: 'string',
      petLatitud: 'string',
      petLongitud: 'string',
      petPicture: 'string',
  }
}

const LastUserIdSchema = {
  name: 'LastUser',
  primaryKey: 'lastUserId',
  properties: {
    lastUserId: 'int',
    userId: 'int'
  }
}

const Schema = [UserSchema, PetSchema, LastUserIdSchema];

const databaseOptions = {
  schema: Schema,
  deleteRealmIfMigrationNeeded: true,
}

export const addUser = (name, orgname, email, pass, wp, tel, ig, fb, tw) => new Promise((reject) => {
  Realm.open(databaseOptions).then(realm => {
    const lastUser = realm.objects('User').length + 1;
    const lastUser2 = realm.objects('LastUser').length + 1;
    let hash = SHA256(pass);
    realm.write(() => {
      realm.create('User', {
          userId: lastUser, 
          userName: name,
          userOrgname: orgname,
          userEmail: email,
          userPass: hash,
          userWp: wp,
          userTel: tel,
          userIg: ig,
          userFb: fb,
          userTw: tw
      });
    });
    console.log(realm.objects('User').length);
    console.log(realm.objects('User'));
    realm.write(() => {
      realm.create('LastUser', {
        lastUserId: lastUser2,
        userId: lastUser,
      });
    });
  }).catch((error) => reject(error));
});

export const authenticate = (email, pass) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    const lastUser = realm.objects('LastUser').length + 1;
    let allUsers = realm.objects('User');
    let hash = SHA256(pass);
    const user = allUsers.filtered(`userEmail='${email}' && userPass ='${hash}'`);
    if (user.length == 0) {
      reject("El usuario no existe");
    }
    realm.write(() => {
      realm.create('LastUser', {
        lastUserId: lastUser,
        userId: user[0].userId, 
      });
    });
    resolve(user);
  }).catch((error) => reject(error));
});

export const loggedIn = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allLastUser = realm.objects('LastUser');
    const lastUserId = allLastUser.filtered(`lastUserId='${allLastUser.length}'`);
    resolve(lastUserId[0].userId);
  }).catch((error) => reject(error));
});

export const addPet = (user, name, type, age, breed, provincia, barrio, latitud, longitud, picture) => new Promise((reject) => {
  Realm.open(databaseOptions).then(realm => {
    let lastPet = realm.objects('Pet').length + 1;
    realm.write(() => {
      realm.create('Pet', {
          userId: user,
          petId: lastPet, 
          petName: name,
          petType: type,
          petAge: age,
          petBreed: breed,
          petProvincia: provincia,
          petBarrio: barrio,
          petLatitud: latitud,
          petLongitud: longitud,
          petPicture: picture,
      });
  });
  console.log(realm.objects('Pet').length);
  console.log(realm.objects('Pet'));
  }).catch((error) => reject(error));
});

export const getPets = (userId) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allPets = realm.objects('Pet');
    const userPets = allPets.filtered(`userId='${userId}'`);
    resolve(userPets);
  }).catch((error) => reject(error));
});

export const getUserData = (userId) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allUsers = realm.objects('User');
    const userData = allUsers.filtered(`userId='${userId}'`);
    resolve(userData);
  }).catch((error) => reject(error));
});

export const getAllUsers = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allUsers = realm.objects('User');
    resolve(allUsers);
  }).catch((error) => reject(error));
});

export const getAllPets = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allPets = realm.objects('Pet');
    resolve(allPets);
  }).catch((error) => reject(error));
});

export const deletePet = (petId) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let pet = realm.objectForPrimaryKey('Pet', petId)
      realm.delete(pet);
      resolve();
    });
  }).catch((error) => reject(error));
});

export const getCats = (userId) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allPets = realm.objects('Pet');
    let userCats = allPets.filtered(`petType = "cat" && userId ='${userId}'`);
    resolve(userCats.length);
  }).catch((error) => reject(error));
});

export const getAllCats = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allPets = realm.objects('Pet');
    let allCats = allPets.filtered(`petType = "cat" && petBreed = "no tiene"`);
    resolve(allCats);
  }).catch((error) => reject(error));
});

export const getAllCatsCount = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allPets = realm.objects('Pet');
    let allCats = allPets.filtered(`petType = "cat" && petBreed = "no tiene"`);
    resolve(allCats.length);
  }).catch((error) => reject(error));
});

export const getAllDogs = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allPets = realm.objects('Pet');
    let allDogs = allPets.filtered(`petType = "dog"`);
    resolve(allDogs);
  }).catch((error) => reject(error));
});

export const getDogs = (userId) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allPets = realm.objects('Pet');
    let userDogs = allPets.filtered(`petType = "dog" && userId ='${userId}'`);
    resolve(userDogs.length);
  }).catch((error) => reject(error));
});

export const getOthers = (userId) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allPets = realm.objects('Pet');
    let userOthers = allPets.filtered(`petType = "other" && userId ='${userId}'`);
    resolve(userOthers.length);
  }).catch((error) => reject(error));
});

export default new Realm(databaseOptions);
