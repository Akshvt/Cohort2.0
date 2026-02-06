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

5. Status Codes 400 vs 409: 
-> 400 Bad Request is used when the client sends invalid or malformed data (missing fields, wrong format, failed validation).
-> 409 Conflict is used when the request is valid, but cannot be processed because it conflicts with existing server state (e.g., user already exists).

Rule of thumb:
Invalid input → 400
Valid input but duplicate/conflict → 409