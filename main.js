// DOM Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Match functions with Keys
const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value=password;
    document.body.appendChild(textarea);
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
    textarea.remove();
    alert("Password copied to clipboard");
});

// Add Eventlistner and Generate the Password
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;  // use + for string to number type conversion
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasUpper,hasLower,hasNumber,hasSymbol,length);
});

function generatePassword (upper,lower,number,symbol,length){
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    const typeArr = [{upper},{lower},{number},{symbol}].filter(item => Object.values(item)[0]);
    
    if (length > 20) {
        alert("Length should be below 20.");
        return '';
    }

    if(typesCount === 0) {
        return '';
    }

    for(let i=0;i<length;i+=typesCount) {
        typeArr.forEach(type => {
            const funcname = Object.keys(type)[0];
            generatedPassword += randomFunc[funcname]();
        });
    }
    const finalPassword = generatedPassword.slice(0,length);
    return finalPassword;
} 

// Generator Functions 
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*()_+-=<>?,./{}[]'
    return symbols[Math.floor(Math.random()* symbols.length)];
}