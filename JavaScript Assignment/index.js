
const form = document.getElementById('form');
const fname = document.getElementById('fname');
const mname = document.getElementById('mname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const phone = document.getElementById('phone');
const dob = document.getElementById('date');
const gender = document.getElementById('gender');
const interest = document.getElementById('interest')
const city = document.getElementById('city')
const state = document.getElementById('state')
const country = document.getElementById('country')
const zip = document.getElementById('zip')

const city1 = document.getElementById('city1')
const state1 = document.getElementById('state1')
const country1 = document.getElementById('country1')
const zip1 = document.getElementById('zip1')


document.querySelector(".btn")
    .addEventListener(("click"), (e) => {
        e.preventDefault();
        console.log("sdfjdsf");
        checkInputs();
    })
function checkInputs() {
    const fnameValue = fname.value.trim();
    const mnameValue = mname.value.trim();
    const lnameValue = lname.value.trim();
    const emailValue = email.value.trim();
    const passValue = pass.value.trim();
    const phoneValue = phone.value.trim();
    const dobValue = dob.value.trim();
    const genderValue = gender.value.trim();
    const interestValue = interest.value.trim();

    const cityValue = city.value.trim();
    const StateValue = state.value.trim();
    const countryValue = country.value.trim();
    const zipValue = zip.value.trim();

    const cityValue1 = city1.value.trim();
    const StateValue1 = state1.value.trim();
    const countryValue1 = country1.value.trim();
    const zipValue1 = zip1.value.trim();

    if (fnameValue === ''||fnameValue.length<=3) {
        setErrorFor(fname);
    }
    else if(fnameValue.length>3) {
        setSuccessFor(fname)
    }

    if (mnameValue === '' || mnameValue.length<=2) {
        setErrorFor(mname);
    }
    else if(mnameValue.length>2) {
        setSuccessFor(mname);
    }

    if (lnameValue === '' ||lnameValue.length<=2) {
        setErrorFor(lname);
    }
    else if(lnameValue.length>2) {
        setSuccessFor(lname);
    }
    if (emailValue === ''|| !isEmail(emailValue)) {
        setErrorForEmail(email);
    }
    else {
        setSuccessForEmail(email);
    }
    if (passValue === '') {
        setErrorForEmail(pass);
    }
    else {
        setSuccessForEmail(pass);
    }
    if (phoneValue === '' || phoneValue.length <10) {
        setErrorForPhone(phone);
    }
    else {
        setSuccessForPhone(phone);
    }
    if (dobValue === '') {
        setErrorForPhone(dob);
    }
    else {
        setSuccessForPhone(dob);
    }


    if (genderValue === '') {
        setErrorForGender(gender);
    }
    else {
        setSuccessForGender(gender);
    }

    if (interestValue === '') {
        setErrorForGender(interest);
    }
    else {
        setSuccessForGender(interest);
    }



    if (cityValue === '') {
        setErrorForAddress(city);
    }
    else {
        setSuccessForAddress(city);
    }

    if (StateValue === '') {
        setErrorForAddress(state);
    }
    else {
        setSuccessForAddress(state);
    }

    if (countryValue === '') {
        setErrorForAddress(country);
    }
    else {
        setSuccessForAddress(country);
    }

    if (zipValue === '') {
        setErrorForAddress(zip);
    }
    else {
        setSuccessForAddress(zip);
    }


    if (cityValue1 === '') {
        setErrorForAddress(city1);
    }
    else {
        setSuccessForAddress(city1);
    }

    if (StateValue1 === '') {
        setErrorForAddress(state1);
    }
    else {
        setSuccessForAddress(state1);
    }

    if (countryValue1 === '') {
        setErrorForAddress(country1);
    }
    else {
        setSuccessForAddress(country1);
    }

    if (zipValue1 === '') {
        setErrorForAddress(zip1);
    }
    else {
        setSuccessForAddress(zip1);
    }

}

function setErrorForAddress(input) {
    const state = input.parentElement;
    state.className = 'state error';
}
function setSuccessForAddress(input) {
    const state = input.parentElement;
    state.className = 'state success';

}

function setErrorForGender(input) {
    const gender = input.parentElement;
    gender.className = 'gender error';
}
function setSuccessForGender(input) {
    const gender = input.parentElement;
    gender.className = 'gender success';

}

function setErrorForPhone(input) {
    const phone = input.parentElement;
    phone.className = 'phone error';
}
function setSuccessForPhone(input) {
    const phone = input.parentElement;
    phone.className = 'phone success';

}


function setErrorForEmail(input) {
    const email = input.parentElement;
    email.className = 'email error';
}
function setSuccessForEmail(input) {
    const email = input.parentElement;
    email.className = 'email success';

}
function setErrorFor(input) {
    const fname = input.parentElement;
    fname.className = 'fname error';
}
function setSuccessFor(input) {
    const fname = input.parentElement;
    fname.className = 'fname success';

}




//captcha generated code
document.querySelector('.captcha-btn')
    .addEventListener('click', (e) => {
        e.preventDefault();
        var is_valid_captcha = submit();
        if (!is_valid_captcha) {
            generateCaptchaEquation();
            const valid_captcha = document.getElementById('valid_captcha');
            valid_captcha.className = 'valid_captcha error'
        } 
    })

const equation = ['-', '+', '*', '/'];
let expectOutput = '';
let captchaEquation = '';

function getRandomArbitrary(min, max) {
return Math.random() * (max - min) + min;
}

function generateCaptchaEquation() {
    var operator = generateRandomOperation();
    var num1 = Math.floor(getRandomArbitrary(10, 99));
    var num2 = Math.floor(getRandomArbitrary(10, 99));

    if (operator === equation[3] || operator ===equation[0]) {
        if (num1 < num2) {
            var temp = num1;
            num1 = num2;
            num2 = temp;
        }

        if (num1 % num2 != 0) {
            num1 -= num1 % num2
        }
    }
    captchaEquation = num1 + " " + operator + " " + num2;
    expectOutput = claculateOutput(num1, num2, operator);
    document.getElementById("captcha").innerHTML = captchaEquation;
}
function claculateOutput(num1, num2, operator) {
    switch (operator) {
        case equation[0]:
            return num1 - num2;
        case equation[1]:
            return num1 + num2;
        case equation[2]:
            return num1 * num2;
        case equation[3]:
            return num1 / num2;
    }


}

function generateRandomOperation() {
    const index = Math.floor(Math.random() * 10) % 4;
    return equation[index];
}


function submit() {
    const res = document.getElementById('captcha_input').value;
    const captcha_input = document.getElementById('captcha_input');
    if (res === '') {
        alert('Please Enter captcha Input');
    }
    else {
        let resInt = parseInt(res);
        if (resInt === expectOutput) {
            setSuccessForCaptcha(captcha_input);
            return true;
        }
        else{
            return false;
        }
    }

}
function setSuccessForCaptcha(input) {
    const captcha1 = input.parentElement;
    captcha1.className = 'captcha1 success';
    const valid_captcha = document.getElementById('valid_captcha');
    valid_captcha.className = 'valid_captcha'
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
