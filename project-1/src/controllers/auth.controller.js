async function registerController(req,res){
    authRouter.post('/register', async(req,res)=>{
    const {email,username,password,bio,profileImage} = req.body

/*     const isUserExistingByEmail = await userModel.findOne({email})

    if(isUserExistingByEmail){
        return res.status(409).json({
            message: "user already existing with this email"
        })
    }

    const isUserExistingByUsername = await userModel.findOne({email})

    if(ifUserExistingByUsername){
        return res.status(409).json({
            message: "user already existing with this username"
        })
    } 
        
    This is inefficient since database calls are being made Twice*/

        const isUserExisting = await userModel.findOne({
            $or: //“Match a document if ANY ONE of these conditions in array is true.”
            [
                {username},
                {email}
            ]
        })

        if (isUserExisting){
            return res.status(409).json({
                message: "User is already existing" + 
                (isUserExisting.email) == email ? "Email already exists" : "Username already exists"
            })
        }

        const hash = crypto.createHash('sha256').update(password).digest('hex')

        const user = await userModel.create({
            username,
            email,
            bio,
            profileImage,
            password:hash
        })

         /* 
            user ka data unique hona chaiye
            data unique hona chaiye
            
            */  

        const token = jwt.sign({
           id:user.id},
        process.env.JWT_SECRET, {expiredIn: "1d"})

        res.cookie("token", token) //stored the token in cookuie for sevrer to acccess

        res.status(201).json({
            message: "User registered Successfully",
            user:{
                email: user.email,
                username: user.username,
                bio: user.bio,
                profileImage: user.profileImage

                //never share the password in frontend
            }
        })
}) 
}


async function loginController(req,res){
    authRouter.post("/login", async (req,res) =>{
    const  { username, email, password} = req.body
    /* 
    
    *username
    *password

    * OR

    * email
    * password
    
    */

    const user = await userModel.findOne({
        $or: [

            {
                /* condition */
                username:username
            },

            {
                /* condition */
                email:email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordValid = hash == user.password
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Password Invalid"
        })
    }

    const token = jwt.sign(
        {id: user._id},process.env.JWT_SECRET, {expiresIn : "1d"}
    )

    res.status(200).json({
        message: "User loggedIn Successfully.",
        user: {
            username: user.username,
            email:user.email,
            profileImage: user.profileImage,

        }
    })
})
}


module.exports = {loginController,registerController}