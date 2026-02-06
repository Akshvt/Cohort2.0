1. Created /protected api to log all the existing cookies/protected routes
2. Created a /login api to check if user  with a particular email exists in db (if not then we send 404) if yes then we check if the password matches the one in db (else we send 404) ELSE we sign a token

3. Password Hashing -> to prevent loss due to data leaking => Use md5 generator

mypassword ---> hashing ---> longlonglonghashedstring (same input = same output each time)
(plain text)         ------>         (hash)          (also its one way.. cant use hash to get its plain text)

Aisa callback jo tab chalta h jab koi api fetch ho