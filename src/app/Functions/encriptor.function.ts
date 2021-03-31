import * as CryptoJS from 'crypto-js'; //imports

const encryptSecretKey = "!\"£$%^&*()_+123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm*"; //adding secret key

//Data Encryption Function
function  encryptData(msg: string) {
    var keySize = 256;
    var salt = CryptoJS.lib.WordArray.random(16);
    var key = CryptoJS.PBKDF2(encryptSecretKey, salt, {
        keySize: keySize / 32,
        iterations: 100
    });
    
    var iv = CryptoJS.lib.WordArray.random(128 / 8);
    
    var encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    
    var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
    
    return result;
}

function decryptData(key:any, ciphertextB64:any) {  
                           
    var key1 = CryptoJS.enc.Utf8.parse(key);                             
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);  
 
    var decrypted = CryptoJS.AES.decrypt(ciphertextB64, key1, {iv: iv}); 
  return decrypted.toString(CryptoJS.enc.Utf8);                       
} 

//https://sstarx.medium.com/encryption-and-decryption-in-angular-asp-net-core-application-1f55bfa3d8bd