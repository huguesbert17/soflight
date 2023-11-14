import * as CryptoJS from 'crypto-js'
const secret = "th!$I$@T3$t@pp"

export const encrypt = (message: any) => {
    return CryptoJS.AES.encrypt(message, secret).toString()
}

export const decrypt = (cipherText: string) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secret)
    return bytes.toString(CryptoJS.enc.Utf8);
}
