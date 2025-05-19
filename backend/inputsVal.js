const zod = require('zod');
const signUpSchema = zod.object({
    firstName : zod.string(),
    lastName : zod.string(),
    email : zod.string().email(),
    password : zod.string().min(6)
});

const signInSchema = zod.object({
    email : zod.string().email(),
    password : zod.string().min(6)
});

const updateProfile = zod.object({
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
    password : zod.string().min(6).optional()
})

module.exports ={
    signInSchema,
    signUpSchema,
    updateProfile
}