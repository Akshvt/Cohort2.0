1. Created user model and schema, made email unique
2. Created routes file
{
    -express.Router
    -jwtwebtokens
    -post(/"register"){
        create user
        isUserAlreadyExists(true || false) .findOne(email) => noteModel will return based on noteSchema
        token = jwt.sign //Token created + signed using JWT-SECRET (jwtsecrets.com)
        
    }
    
}
3. 'cookie-parser' package installed & save token in cookie

4. Cookies Storage : Server can access and read the data in it. Present in every browser
server will read the token from cookies storage automatically, so we dont need to hardcode it