import jwt from "jsonwebtoken";
// const secretKey=process.env.JwtSecret|"Laila";
const secretKey="Laila";
export const CreatToken = (obj) => {
    return jwt.sign(obj, secretKey, { expiresIn: "1d" });
}
export const CreatTokenWithTime = (obj, time) => {
    return jwt.sign(obj, secretKey, { expiresIn: time });
}
export const verifyTokenWithTime = (Token) => {
    try {
        const check = jwt.verify(Token, secretKey);
        return check ? check : null;
    } catch (error) {
        return null;
    }
}

export const verifyToken = (Token) => {
    try {
        const check = jwt.verify(Token, secretKey, { expiresIn: "1d" });
        return check ? check : null;
    } catch (error) {
        return null;
    }
}