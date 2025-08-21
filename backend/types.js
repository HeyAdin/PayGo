const zod = require('zod');

const signUpInputValidation = zod.object({
    name: zod.string().min(1, "Name is required"),
    email: zod.email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: zod.string().min(6, "Confirm Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});

const signInInputValidation = zod.object({
    email: zod.email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
});

const updateInputValidation = zod.object({
    name: zod.string().min(1, "Name is required").optional(),
    email: zod.email("Invalid email format").optional(),
    password: zod.string().min(6, "Password must be at least 6 characters long").optional(),
    confirmPassword: zod.string().min(6, "Confirm Password must be at least 6 characters long").optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});

const fundTransferInputValidation = zod.object({
    toUserId : zod.string().min(24).max(30),
    amount:zod.number().int().positive()
})

module.exports = {
    signUpInputValidation,
    signInInputValidation,
    updateInputValidation,
    fundTransferInputValidation
};