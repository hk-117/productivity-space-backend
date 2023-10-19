const bcrypt = require('bcrypt');

async function hashPassword(password){
    try{
        const hash = await bcrypt.hash(password,10);
        return hash;
    } catch (e) {
        throw Error(" Could Not Hash Password :( ");
    }
}