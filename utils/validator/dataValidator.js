export const validateData = (req, res, next) => {
    const { name, email, password } = req.body;
    const errorBucket = {};
    checkName(name,errorBucket);
    if(!req.url.startsWith("/update/"))checkEmail(email,errorBucket);
    if(!req.url.startsWith("/update/"))checkPassword(password,errorBucket);
    checkImage(req.file,errorBucket,req);
    req.errorBucket = {
        bucket: errorBucket,
        size: Object.keys(errorBucket).length
    };
    next();
};

const checkName=(name,errorBucket)=>{
    if (name === undefined) {
        errorBucket["name"] = "Name is required";
    } else if (name.length <= 2) {
        errorBucket["name"] = "Name length should be 3 or greater";
    }
}
export const checkEmail=(email,errorBucket)=>{
    if (email === undefined) {
        errorBucket["email"] = "Email is required";
    } else if (!/\S+@gmail\.com$/.test(email)) {
        errorBucket["email"] = "Email is not valid";
    }
}
export const checkPassword=(password,errorBucket)=>{
    if (password === undefined) {
        errorBucket["password"] = "Password is required";
    } else if (password.length < 8 || password.length > 15) {
        errorBucket["password"] = "Password length should be between 8 and 15 characters";
    } else if (!/[A-Z]/.test(password)) {
        errorBucket["password"] = "Password should contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
        errorBucket["password"] = "Password should contain at least one lowercase letter";
    } else if (!/\d/.test(password)) {
        errorBucket["password"] = "Password should contain at least one numeric digit";
    }
}
export const checkImage=(image,errorBucket,req)=>{
    if (image === undefined) {
        if(!req.url.startsWith("/update/")){
            errorBucket["profileImg"] = "Image is required";
        }
    }
     else if (image.size / (1024 * 1024) > 1) {
        errorBucket["profileImg"] = "Image should be 1mb or less";
    }
    if((req.url.startsWith("/update/")&&image!==undefined)&&(req.body.imgLink===undefined)){
        errorBucket["imgLink"]="To update profileImg imgLink is required"
    }
}