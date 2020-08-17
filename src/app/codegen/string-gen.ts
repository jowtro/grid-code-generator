export class StringGen {
    ALPHABET: string = "abcdefghijklmnopqrstuvwxyz";
    
    generateRandomLetter(weightChar?: string) {
        const newAlphabet: string = weightChar != undefined?this.ALPHABET.replace(weightChar, ''):this.ALPHABET;
        const randomLetter:string = newAlphabet[Math.floor(Math.random() * (newAlphabet.length - 0))];
        return randomLetter;
    }

}