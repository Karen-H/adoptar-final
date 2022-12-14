let crypto = require('crypto');

let generateSalt = rounds => {
    if(rounds >= 15) {
        throw new Error(`${rounds} is greater than 15. Must be less`);
    }
    if(typeof rounds !== 'number') {
        throw new Error('Rounds param must be a number');
    }
    if(rounds == null) {
        rounds = 12;
    }

    return crypto.randomBytes(Math.ceil(rounds/2)).toString('hex').slice(0, rounds);
};

let hasher = (password, s) => {
    let hash = crypto.createHmac('sha512', s);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: s,
        hashedpassword: value
    };
};

let hash = (password, salt) => {
    if(password == null || salt == null) {
        throw new Error('Must provide password and salt values');
    }
    if(typeof password !== 'string' || typeof salt !== 'string') {
        throw new Error('Password must be a string and salt must either be a salt string or a number of rounds');
    }

    return hasher(password, salt);
};

let compare = (password, hash) => {
    hash = {
        salt: passSalt,
        hashedpassword: passHash
    }

    if(password == null || hash == null) {
        throw new Error('Password and hash are required to compare');
    }
    if(typeof password !== 'string' || typeof hash !== 'object') {
        throw new Error('Password must be a string and hash must be an object');
    }

    let passwordData = hasher(password, hash.salt);
    console.log('Hash: ', passwordData);
    if(passwordData.hashedpassword === hash.hashedpassword) {
        return true;
    }
    return false
};


module.exports = {
    generateSalt,
    hash,
    compare
}