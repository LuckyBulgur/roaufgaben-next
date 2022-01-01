import * as z from "zod"

export const Signup = z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(8).max(100),
    passwordRepeat: z.string().min(8).max(100),
}).refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["passwordRepeat"],
});

export const Login = z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(8).max(100),
    twoFactor: z.string().max(6),
})