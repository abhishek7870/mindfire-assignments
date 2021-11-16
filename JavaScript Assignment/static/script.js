const equation = ["-", "+", "*", "/"];
let expectOutput = "";
let captchaEquation = "";

const city_state_country_pattern = /^[A-Za-z]{2,30}(\s[A-Za-z]{2,30})?$/;
const pincode_pattern = /^([0-9]){6}?$/;
const address_pattern = /^[1-9][0-9]{1,3}(\s[\w,]{1,35})+$/; 

const name_pattern = /^[A-Za-z']{2,15}$/;
const email_pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/;
const number_pattern = /^[^0-1][0-9]{9}$/;
const dob_pattern = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

const form = document.getElementById("form");
const fname = document.getElementById("fname");
const mname = document.getElementById("mname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
const phone = document.getElementById("phone");
const dob = document.getElementById("date");
const gender = document.getElementById("gender");
const interest = document.getElementById("interest");

const permanent_address = document.getElementById("per-address");
const parmanent_city = document.getElementById("city");
const permanent_state = document.getElementById("state");
const permanent_country = document.getElementById("country");
const permanent_pincode = document.getElementById("zip");

const current_address = document.getElementById("curr-address");
const current_city = document.getElementById("city1");
const current_state = document.getElementById("state1");
const current_country = document.getElementById("country1");
const current_pincode = document.getElementById("zip1");


document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  var check_validation = checkInputs();
  var is_valid_captcha = submit();
  if (!is_valid_captcha) {
    generateCaptchaEquation();
    const valid_captcha = document.getElementById("valid_captcha");
    valid_captcha.className = "valid_captcha error";
    return
  }
  if (is_valid_captcha && check_validation) {
    // alert("Successfully Registered. Click OK to Proceed");
  }
});



function checkInputs() {
  var check_fname = checkName(fname);
  var check_mname = checkName(mname);
  var check_lname = checkName(lname);
  var check_email = checkEmail();
  var check_password = checkPassword();
  var check_PhoneNumber = checkPhoneNumber();
  var check_dob = checkDob();
  var check_gender = checkGender();
  var check_interest = checkInterest();

  var check_permanent_address = checkAddress(permanent_address);
  var check_permanent_city = checkCity(parmanent_city);
  var check_permanent_state = checkState(permanent_state);
  var check_permanent_country = checkCountry(permanent_country);
  var check_permanent_pincode = checkZipCode(permanent_pincode);

  var check_current_address = checkAddress(current_address);
  var check_current_city = checkCity(current_city);
  var check_current_state = checkState(current_state);
  var check_current_country = checkCountry(current_country);
  var check_current_pincode = checkZipCode(current_pincode);

  if (
    check_fname &&
    check_mname &&
    check_lname &&
    check_email &&
    check_password &&
    check_PhoneNumber &&
    check_dob &&
    check_gender &&
    check_interest &&
    check_permanent_address &&
    check_permanent_city &&
    check_permanent_state &&
    check_permanent_country &&
    check_permanent_pincode &&
    check_current_address &&
    check_current_city &&
    check_current_state &&
    check_current_country &&
    check_current_pincode
  ) {
    return true;
  } else {
    return false;
  }
}


function checkName(name) {
  const name_value = name.value.trim();
  if(name.id==="mname" && name_value.length===0){
    mname.parentElement.className="mname";
    return true;
  }
  if (name_pattern.test(name_value)) {
    setSuccessMsg(name.parentElement);
    return true;
  } else {
    setErrorMsg(name.parentElement);
    return false;
  }
}

function checkEmail() {
  const emailValue = email.value.trim();
  if (email_pattern.test(emailValue)) {
    setSuccessMsg(email.parentElement);
    return true;
  } else {
    setErrorMsg(email.parentElement);
    return false;
  }
}


function checkPassword() {
  const passValue = pass.value.trim();
  if (passValue === "" || passValue.length < 4 || passValue.length > 12) {
    setErrorMsg(pass.parentElement);
    return false;
  } else {
    setSuccessMsg(pass.parentElement);
    return true;
  }
}


function checkPhoneNumber() {
  const phoneValue = phone.value.trim();
  if (number_pattern.test(phoneValue)) {
    setSuccessMsg(phone.parentElement);
    return true;
  } else {
    setErrorMsg(phone.parentElement);
    return false;
  }
}


function checkDob() {
  const dobValue = dob.value.trim();
  if (!dob_pattern.test(dobValue)) {
     setErrorMsg(dob.parentElement);
    return false;
  } else {
    setSuccessMsg(dob.parentElement);
    return true;
  }
}


function checkGender() {
  const genderValue = gender.value.trim();
  if (genderValue === "") {
    setErrorMsg(gender.parentElement);
    return false;
  } else {
    setSuccessMsg(gender.parentElement);
    return true;
  }
}


function checkInterest() {
  const parentInterest=document.getElementsByClassName('div2-gender-interest');
  parentInterest[0].className="div2-gender-interest error";
  const interestValue = interest.value.trim();
  if (interestValue === "") {
    setErrorMsg(interest.parentElement);
    return false;
  } else {
    setSuccessMsg(interest.parentElement);
    return true;
  }
}


function checkAddress(address) {
  var address_value = address.value.trim();
  address_value = address_value.replace(/\s\s+/g, ' ');
  address.value = address_value;
  if (!address_pattern.test(address_value)) {
    setErrorMsg(address.parentElement);
    return false;
  } else {
    setSuccessMsg(address.parentElement);
    return true;
  }
}


function checkCity(city) {
  var city_value = city.value.trim();
  city_value = city_value.replace(/\s\s+/g, ' ');
  city.value = city_value;
   if (city_state_country_pattern.test(city_value)) {
    setSuccessMsg(city.parentElement);
    return true;
  } else {
    setErrorMsg(city.parentElement);
    return false;
  }
}


function checkState(state) {
  var state_value = state.value.trim();
  state_value = state_value.replace(/\s\s+/g, ' ');
  state.value = state_value;
   if (city_state_country_pattern.test(state_value)) {
    setSuccessMsg(state.parentElement);
    return true;
  } else {
    setErrorMsg(state.parentElement);
    return false;
  }
}


function checkCountry(country) {
  var country_value = country.value.trim();
  country_value = country_value.replace(/\s\s+/g, ' ');
  country.value = country_value
  if (city_state_country_pattern.test(country_value)) {
    setSuccessMsg(country.parentElement);
    return true;
  } else {
    setErrorMsg(country.parentElement);
    return false;
  }
}


function checkZipCode(zip) {
  const zip_value = zip.value.trim();
  if (pincode_pattern.test(zip_value)) {
    setSuccessMsg(zip.parentElement);
    return true;
  } else {
    setErrorMsg(zip.parentElement);
    return false;
  }
}


function setErrorMsg(element) {
  class_names = element.className.replace("success", "");
  class_names = class_names.replace("error", "");
  element.className = class_names + " " + "error";
}


function setSuccessMsg(element) {
  class_names = element.className.replace("error", "");
  class_names =class_names.replace("success", "");
  element.className = class_names + " " + "success";
}


document.querySelector(".refresh").addEventListener("click", function (e) {
  generateCaptchaEquation();
  const element = document.getElementById("captcha_input");
  const valid_captcha = document.getElementById("valid_captcha");
  const captcha_div = element.parentElement;
  captcha_div.className = "captcha_div";
  valid_captcha.className = "valid_captcha";
});


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function generateCaptchaEquation() {
  var operator = generateRandomOperation();
  var num1 = Math.floor(getRandomArbitrary(10, 99));
  var num2 = Math.floor(getRandomArbitrary(10, 99));

  if (operator === equation[3] || operator === equation[0]) {
    if (num1 < num2) {
      var temp = num1;
      num1 = num2;
      num2 = temp;
    }

    if (num1 % num2 != 0) {
      num1 -= num1 % num2;
    }
  }
  if (operator === equation[2]) {
    num1 = Math.floor(getRandomArbitrary(1, 9));
    num2 = Math.floor(getRandomArbitrary(1, 9));
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
  const res = document.getElementById("captcha_input").value;
  const captcha_input = document.getElementById("captcha_input");
  if (res === "") {
    setErrorForCaptcha(captcha_input);
  } else {
    let resInt = parseInt(res);
    if (resInt === expectOutput) {
      setSuccessForCaptcha(captcha_input);
      return true;
    } else {
      setErrorForCaptcha(captcha_input);
      return false;
    }
  }
}

function setErrorForCaptcha(input) {
  const captcha_div = input.parentElement;
  captcha_div.className = "captcha_div";
  var valid_captcha = document.getElementById("valid_captcha");
  if(input.value.trim().length===0){
     valid_captcha.innerHTML = "Please enter captcha";
  }
  else{
    valid_captcha.innerHTML = "Invalid captcha"
  }
}

function setSuccessForCaptcha(input) {
  const captcha_div = input.parentElement;
  captcha_div.className = "captcha_div success";
  const valid_captcha = document.getElementById("valid_captcha");
  valid_captcha.className = "valid_captcha";
}

