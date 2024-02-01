import becrypt from "bcrypt";
export const encrypt = password => {
    const val= becrypt.hashSync(password, 9);
    return val;
}
export const decrypt = (pass, userpass) => {
    const data = becrypt.compareSync(userpass, pass);
    return data;
}