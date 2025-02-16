const inputarea = document.getElementById("inputarea");
const resultarea = document.getElementById("resultarea");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const alphaMorseDict = {
    'ㄱ':'.-..','ㄴ':'..-.','ㄷ':'-...','ㄹ':'...-','ㅁ':'--',
    'ㅂ':'.--','ㅅ':'--.','ㅇ':'-.-','ㅈ':'.--.','ㅊ':'-.-.','ㅋ':'-..-','ㅌ':'--..','ㅍ':'---','ㅎ':'.---',
    'ㅏ':'.','ㅑ':'..','ㅓ':'-','ㅕ':'...','ㅗ':'.-','ㅛ':'-.','ㅜ':'....',
    'ㅠ':'.-.','ㅡ':'-..','ㅣ':'..-','ㅐ':'--.-','ㅔ':'-.--',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.','(':'-.--.',')':'-.--.-',
    ',': '--..--', '?': '..--..', '!': '-.-.--', '/': '-..-.', '&': '.-...', ':': '---...', ';': '-.-.-.', '+': '.-.-.', '-': '-...-', '_': '..--.-', '$': '...-..-', '@': '.--.-.', ' ': '   '
};

//import {disassemble,assemble} from 'es-hangul'

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
    let result = Hangul.disassemble(inputstring).map(char => alphaMorseDict[char]).join('  ');
    updateResult(result);
    resultarea.classList.add('textarea_morse');
}
function translateMorseToString(inputstring) {
    let result = Hangul.assemble(cleanSpace(inputstring.split(' ').map(char => morseAlphaDict[char])));
    
    updateResult(result);
    resultarea.classList.remove('textarea_morse');
}

function translate() {
    copyBtn.innerText='복사';
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
        copyBtn.innerText='복사됨';
        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
}

function copiedtocopy(){
    copyBtn.innerText='복사';
}

translateBtn.addEventListener("click", translate);
copyBtn.addEventListener("click", copytext)
resultarea.addEventListener('input', copiedtocopy);