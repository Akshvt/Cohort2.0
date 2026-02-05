1) Authentication: Identify karna ki request kis user se aayi hai.

2) Authorization: Different users have different permissions
Eg: Principal---> All School
Faculty: Faculty Rooms, Student Classrooms
Students: Classrooms, Playyground

=> SpotifyUser(Regular perms) || SpotifyArtist (+Upload Songs)

3) Validation: Check data format if its in the correct format?

4) Verification: Checking if data is actually correct in DB(not just input format)


How It Works?

=> User registers on ur server... sends req/info to server req.body
User C: (similarly for users A,B)
{
    name:c_test;
    email:c_test@test.com
    passwords: c_password_test
}

1. Save user data on DB
2. ID Card (TOKEN) create for user, using user data : Token-C => given to user (res).

=> Now next time user sends a req to server (Everytime), 
   it should contain that Token-C || Token-A || Token B
=> Now server reads the token and identifies the user -> Authentication

!IMP : Server signs each token with a secret name called JWT_Secret (which is a random string) [Just like ID card pe College ka Stamp] -> For Verification.
