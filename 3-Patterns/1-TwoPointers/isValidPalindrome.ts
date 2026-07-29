/**
 * run "npx ts-node 3-Patterns\TwoPointers\isValidPalindrome.ts"
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. 
Alphanumeric characters include letters and numbers.
https://leetcode.com/problems/valid-palindrome/description/
 */

import { Log } from "../../Log";

function isValidChar(char: string) {
    const isAlphabet = char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122;
    const isNumber = char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
    return isAlphabet || isNumber;
}

function isValidPalindrome(str: string) {
    let s = 0, e = str.length - 1;
    while (s < e) {
        const s1 = str[s];
        const s2 = str[e];
        if (!isValidChar(s1)) s++;
        if (!isValidChar(s2)) e--;

        if (isValidChar(s1) && isValidChar(s2)) {
            if (s1 !== s2) return false;
            else { s++; e--; }
        }
    }
    return true;
}

(() => {
    let str = "A man, a plan, a canal: Panama"
    let result = isValidPalindrome(str);
    Log.info(`Is "${str}" a valid palindrome? ${result}`);

    str = "race a car"
    result = isValidPalindrome(str);
    Log.info(`Is "${str}" a valid palindrome? ${result}`);

    str = " "
    result = isValidPalindrome(str);
    Log.info(`Is "${str}" a valid palindrome? ${result}`);

    str = "HelLo"
    result = isValidPalindrome(str);
    Log.info(`Is "${str}" a valid palindrome? ${result}`);
})();
