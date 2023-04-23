

const inputTextarea = document.getElementById('input-text');
const outputTextarea = document.getElementById('output-text');
const encryptButton = document.getElementById('encrypt-button');
const decryptButton = document.getElementById('decrypt-button');
const copyButton = document.getElementById('copy-button');



copyButton.addEventListener('click', () => {
  outputTextarea.select();
  document.execCommand('copy');
});

function pasteText() {
  navigator.clipboard.readText()
    .then(text => {
      document.getElementById('input-text').value = text;
    })
    .catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
}



encryptButton.addEventListener('click', () => {
  const inputText = inputTextarea.value.trim();
  if (inputText === '') {
    outputTextarea.value = '';
    return;
  }

  const outputText = encrypt(inputText);
  outputTextarea.value = outputText;
});

decryptButton.addEventListener('click', () => {
  const inputText = inputTextarea.value.trim();
  if (inputText === '') {
    outputTextarea.value = '';
    return;
  }

  const outputText = decrypt(inputText);
  outputTextarea.value = outputText;
});

function translate(text) {
  const isMorseCode = /^[.-/ ]+$/.test(text);
  if (isMorseCode) {
    return morseToText(text);
  } else {
    return textToMorse(text.toLowerCase());
  }
}

function encrypt(msg) {
  let count = 0;
  let locked = '';
  for (let i = 0; i < msg.length; i++) {
    let letter = msg.charAt(i);
    let x = letter.charCodeAt(0);
    count += 7;
    let key = count;
    if (count > 18) {
      count -= 18;
    }
    let hidden = x + key;
    locked += String.fromCharCode(hidden);
  }
  return locked;
}

function decrypt(xsg) {
  let xcount = 0;
  let unlocked = '';
  for (let i = 0; i < xsg.length; i++) {
    let letter = xsg.charAt(i);
    let x = letter.charCodeAt(0);
    xcount += 7;
    let key = xcount;
    if (xcount > 18) {
      xcount -= 18;
    }
    let hidden = x - key;
    unlocked += String.fromCharCode(hidden);
  }
  return unlocked;
}
