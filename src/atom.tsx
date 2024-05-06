import { atom } from "recoil";

export const wordsOnScreenAtom=atom({
    key:'wordsOnScreen',
    default:[] as Array<string>
})