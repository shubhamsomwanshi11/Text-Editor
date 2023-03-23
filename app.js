const inputTextEl = document.getElementById('input-text');
const outputTextEl = document.getElementById('output-text');
const copyWrapperEl = document.getElementById('copy-wrapper');
const copyBtnEl = document.getElementById('copy-btn');
const copyIconEl = document.getElementById('copy-icon');


function formatText(action) {
  const inputText = inputTextEl.value.trim();
  let outputText = '';

  switch (action) {
    case 'uppercase-all':
      outputText = inputText.toUpperCase();
      break;
    case 'lowercase-all':
      outputText = inputText.toLowerCase();
      break;
    case 'capitalize-sentences':
      outputText = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
      break;
    case 'capitalize-words':
      outputText = inputText.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      break;
    case 'find-and-replace':
      const findText = document.getElementById('find-text').value.trim();
      const replaceText = document.getElementById('replace-text').value.trim();
      const isCaseSensitive = document.getElementById('case-sensitive').checked;
      const regexOption = isCaseSensitive ? 'g' : 'gi';
      outputText = inputText.replace(new RegExp(findText, regexOption), replaceText);
      break;
    case 'add-text':
      const addText = document.querySelector('input[type="text"]').value.trim();
      const position = document.getElementById('select').value;
      const textArray = inputText.split('\n').map(line => position === 'Start' ? addText + line : line + addText);
      outputText = textArray.join('\n');
      break;
    case 'trim-text':
      const trimPosition = document.getElementById('trimPos').value;
      const trimCharacters = parseInt(document.getElementById('trimChar').value, 10);
      const linesArray = inputText.split('\n').map(line => trimPosition === 'First' ? line.substr(trimCharacters) : line.substr(0, line.length - trimCharacters));
      outputText = linesArray.join('\n');
      break;
    case 'bold':
      outputText = `<b>${inputText}</b>`;
      break;
    case 'italic':
      outputText = `<i>${inputText}</i>`;
      break;
    case 'underline':
      outputText = `<u>${inputText}</u>`;
      break;
    case 'input':
      outputText = inputText;
  }

  outputTextEl.innerHTML = outputText;
}

function showFloatingWindow(id) {
  var floatingWindow = document.getElementById("floating-window");
  var trim = document.getElementById("trim");
  var add = document.getElementById("add");
  var find = document.getElementById("find");

  // Check if a floating window is already open
  if (!floatingWindow.classList.contains("is-hidden")) {

    floatingWindow.classList.add("is-hidden");
    trim.classList.add("is-hidden");
    add.classList.add("is-hidden");
    find.classList.add("is-hidden");
  }

  floatingWindow.classList.remove("is-hidden");
  if (id === 'trim') {
    trim.classList.remove("is-hidden");
  } else if (id === 'add') {
    add.classList.remove("is-hidden");
  } else if (id === 'find') {
    find.classList.remove("is-hidden");
  }
  else{
    floatingWindow.classList.add('is-hidden')
  }
}


function addCopyButtonListener() {
    const copyBtn = document.querySelector('#copy-btn');
    const copyIcon = document.querySelector('#copy-icon');
    const outputText = document.querySelector('#output-text');
  
    if (outputText) {
      copyBtn.addEventListener('click', () => {
        const tempElem = document.createElement('div');
        tempElem.innerHTML = outputText.innerHTML;
        navigator.clipboard.writeText(tempElem.textContent)
          .then(() => {
            copyBtn.textContent = 'Copied!';
            copyIcon.classList.add('fa-check');
            setTimeout(() => {
              copyBtn.textContent = 'Copy';
              copyIcon.classList.remove('fa-check');
            }, 2000);
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err);
          });
      });
    }
  }
  function countWords(text) {
    return text.trim().split(/\s+/).length;
  }
  
  function countCharacters(text) {
    return text.length;
  }
inputTextEl.addEventListener("keyup", () => {  
document.getElementById("word-count").innerHTML = countWords(inputTextEl.value);
document.getElementById("char-count").innerHTML = countCharacters(inputTextEl.value);
});

document.getElementById('reset').addEventListener('click',function(){
  location.reload();
})
addCopyButtonListener();