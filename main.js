const buttons = document.querySelectorAll('.digit')
buttons.forEach(el => el.addEventListener('click', buttonPressed))
const operator = document.querySelectorAll('.opp')
operator.forEach(el => el.addEventListener('click', oppPressed))

document.querySelector('#CE').addEventListener('click', clearEntry)
document.querySelector('#dot').addEventListener('click', dotPressed)
document.querySelector('#AC').addEventListener('click', clearAll)
document.querySelector('#equals').addEventListener('click', calculate)

let screenMain = document.querySelector('#screenone')
let screenCalc = document.querySelector('#screentwo')

let calcValue = ' ';
let current = '0';
let previous = 0;

function buttonPressed() {
  if (current.length < 35) {
    if (current == '0') {
      current = this.innerHTML;
    } else {
      current += this.innerHTML;
    }
    showMain(current);
  }
}

function oppPressed() {
  let val = this.innerHTML;
  if (!current && previous) {
    current = previous;
  }
  if (current[current.length - 1] == '.') {
    current = current.slice(0, -1)
  }
  if (current) {
    calcValue += ' ' + current + ' ' + val;
    current = ' ';
  } else {
    calcValue = calcValue.slice(0, -1) + val
  }
  showCalc(calcValue)
}

function clearEntry() {
  current = current.slice(0, -1);
  current = previous.length == 0 ? ' ' : current
  showMain(current)
}

function clearAll() {
  current = '';
  showMain('0');

  calcValue = '';
  showCalc('0');
}

function dotPressed() {
  if (!current == '' || current == '0 ') {
    current = '0. '

  } else if (!/\./.test(current)) {
    current += '. '
  }
  showMain(current);
}

function calculate() {
  let answer = calcValue + current;
  answer = answer.replace('×', '*').replace('÷', '/').replace('∙', '.')
  answer = eval(answer);

  showMain(answer)

  calcValue += ' ' + current + ' = ' + answer
  showCalc(calcValue)

  current = ' ';
  calcValue = ' ';

}

function showMain(text) {
  screenMain.innerHTML = text
}

function showCalc(text) {
  screenCalc.innerHTML = text
}
