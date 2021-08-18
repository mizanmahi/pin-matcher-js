const generateBtn = document.getElementById('generate_btn');
const pinDisplay = document.getElementById('pin_display');

const keys = document.getElementById('keys');
const inputPin = document.getElementById('input_pin');

const submitBtn = document.getElementById('submit_btn');

const tryLeft = document.getElementById('try_left');

let tryLeftCount = 3;

function generatePin() {
  let random = Math.round(Math.random() * 10000);
  if (random > 1000) return random;
  return generatePin();
}

// @ Generating and updating pin display
generateBtn.addEventListener('click', function () {
  let pin = generatePin();
  pinDisplay.value = pin;

  inputPin.value = '';
  tryLeftCount = 3;
  tryLeft.style.display = 'none';
  submitBtn.removeAttribute('disabled');
  submitBtn.classList.remove('disable');
});

// @ Keypad listener by event delegation pattern
keys.addEventListener('click', function (e) {
  let key = e.target.innerText;
  if (!isNaN(key)) {
    inputPin.value += key;
  } else if (key === 'C') {
    inputPin.value = '';
  } else if (key === '<') {
    prevInput = Array.from(inputPin.value);
    prevInput.pop();
    inputPin.value = prevInput.join('');
  }
});

// @ Submit button listener
submitBtn.addEventListener('click', verifyPin);

function verifyPin() {
  let usersPin = inputPin.value;
  let generatedPin = pinDisplay.value;
  console.log({ usersPin, generatedPin });

  const successText = document.getElementById('success');
  const failText = document.getElementById('fail');

  if (usersPin === generatedPin) {
    successText.style.display = 'block';
    failText.style.display = 'none';
    inputPin.value = '';
    tryLeft.style.display = 'none';
  } else {
    tryLeft.style.display = 'block';
    successText.style.display = 'none';
    failText.style.display = 'block';

    tryLeftCount--;

    if (tryLeftCount > 0) {
      tryLeft.innerText = tryLeftCount + ' try left';
    } else {
      tryLeft.innerText = tryLeftCount + ' try left, try generating new pin';

      submitBtn.setAttribute('disabled', 'true');
      submitBtn.classList.add('disable');
    }
  }
}
