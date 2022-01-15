import * as z from "zod"
import { isISODate } from "../helpers/isISODate";

const username = z.string()
    .min(4, { message: "Der Nutzername muss mindestens 4 Zeichen beinhalten." })
    .max(20, { message: "Der Nutzername darf nicht länger als 20 Zeichen sein." })

const password = z.string()
    .min(8, { message: "Das Passwort muss mindestens 8 Zeichen beinhalten." })
    .max(255, { message: "Das Passwort darf nicht länger als 255 Zeichen sein." })

export const Signup = z.object({
    username: username,
    password: password,
    passwordRepeat: z.string(),
}).refine((data) => data.password === data.passwordRepeat, {
    message: "Die Passwörter stimmen nicht überein.",
    path: ["passwordRepeat"],
});

export const Login = z.object({
    username: username,
    password: password,
    twoFactor: z.string().length(6, { message: "Der Code muss 6 Zeichen lang sein." }).optional(),
});


export const Task = z.object({
    subject: z.string(),
    task: z.string().min(4, { message: "Die Aufgabe muss mindestens 4 Zeichen lang sein." }),
    submission: z.string().refine(isISODate, { message: "Das Datum muss im ISO-Format sein." }),
}).refine((data) => new Date() < new Date(data.submission), {
    message: "Das Datum muss in der Zukunft liegen.",
    path: ["submission"],
});

export const Class = z.object({
    name: z.string().min(4, { message: "Der Name muss mindestens 4 Zeichen lang sein." }),
});