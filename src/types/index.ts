import { Timestamp } from "firebase/firestore";

export type ParticipantType = {
    name: string;
    email: string;
    admin: boolean;
    isLoggedIn: boolean;
    loggedInAt: Timestamp;
    timeLeft: number;
}