const inputarea = document.getElementById("inputarea");
const resultarea = document.getElementById("resultarea");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const alphaMorseDict = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.','(':'-.--.',')':'-.--.-',
    ',': '--..--', '?': '..--..', '!': '-.-.--', '/': '-..-.', '&': '.-...', ':': '---...', ';': '-.-.-.', '+': '.-.-.', '-': '-...-', '_': '..--.-', '$': '...-..-', '@': '.--.-.', ' ': '   '
};

const morseAlphaDict = Object.fromEntries(
    Object.entries(alphaMorseDict).map(([letter, code]) => [code, letter])
);

morseAlphaDict['']=' ';

function cleanSpace(string){
    newString = '';
    for(let i=0;i<string.length-1;++i){
        if(!(string[i]==' ' && string[i+1]!=' ')){
            newString +=string[i]
        }
    }
    newString+=string[string.length-1]
    return newString;
}

function updateResult(string) {
    resultarea.value = string;
}

function translateStringToMorse(inputstring) {
    let result = inputstring.toUpperCase().split('').map(char => alphaMorseDict[char]).join('  ');
    updateResult(result);
    resultarea.classList.add('textarea_morse');
}
function translateMorseToString(inputstring) {
    let result = inputstring.split(' ').map(char => morseAlphaDict[char]).join('');
    result = cleanSpace(result);
    updateResult(result);
    resultarea.classList.remove('textarea_morse');
}

function translate() {
    copyBtn.innerText='Copy';
    let inputstring = inputarea.value;
    let pattern = /[^.\-\s]/;
    if (pattern.test(inputstring)) {
        //string to morsecode
        translateStringToMorse(inputstring);
    } else {
        //morse code to string
        translateMorseToString(inputstring);
    }
}

function copytext() {
    var clipboard = new ClipboardJS('#copyBtn');

    clipboard.on('success', function (e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        copyBtn.innerText='Copied';
        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
}

function copiedtocopy(){
    copyBtn.innerText='Copy';
}

translateBtn.addEventListener("click", translate);
copyBtn.addEventListener("click", copytext)
resultarea.addEventListener('input', copiedtocopy);