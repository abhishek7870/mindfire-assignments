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
const perAddress = document.getElementById("per-address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");
const zip = document.getElementById("zip");

const currAddress = document.getElementById("curr-address");
const city1 = document.getElementById("city1");
const state1 = document.getElementById("state1");
const country1 = document.getElementById("country1");
const zip1 = document.getElementById("zip1");

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
  var fname = checkFname();
  var mname = checkMname();
  var lname = checkLname();
  var email = CheckEmail();
  var password = checkPassword();
  var PhoneNumber = checkPhoneNumber();
  var dob = checkDob();
  var gender = checkGender();
  var interest = checkInterest();
  var permanentAddress = checkPermanentAddress();
  var city1 = checkCity();
  var state1 = checkState();
  var country1 = checkCountry();
  var pincode1 = checkZipCode();
  var currentAddress = checkCurrentAddress();
  var city2 = checkCity1();
  var state2 = checkState1();
  var country2 = checkCountry1();
  var pincode2 = checkZipCode1();
  if (
    fname &&
    mname &&
    lname &&
    email &&
    password &&
    PhoneNumber &&
    dob &&
    gender &&
    interest &&
    permanentAddress &&
    city1 &&
    state1 &&
    country1 &&
    pincode1 &&
    currAddress &&
    city2 &&
    state2 &&
    country2 &&
    pincode2
  ) {
    return true;
  } else {
    return false;
  }
}

function checkFname() {
  const fnameValue = fname.value.trim();
  var pattern = /^[A-Za-z']+$/;
  if (pattern.test(fnameValue) && fnameValue.length > 1) {
    console.log("dsfds");
    setSuccessForFname(fname);
    return true;
  } else {
    setErrorForFname(fname);
    return false;
  }
}

function checkMname() {
  const mnameValue = mname.value.trim();
  var pattern = /^[A-Za-z']+$/;
  if (mnameValue.length === 0) {
    setBackToNormal(mname);
    return true;
  } else if (pattern.test(mnameValue) && mnameValue.length > 1) {
    setSuccessForMname(mname);
    return true;
  } else {
    setErrorForMname(mname);
    return false;
  }
}

function checkLname() {
  const lnameValue = lname.value.trim();
  var pattern = /^[A-Za-z']+$/;
  if (pattern.test(lnameValue) && lnameValue.length > 1) {
    setSuccessForLname(lname);
    return true;
  } else {
    setErrorForLname(lname);
    return false;
  }
}

function CheckEmail() {
  const emailValue = email.value.trim();
  console.log(emailValue);
  var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (pattern.test(emailValue) && emailValue.length != 0) {
    setSuccessForEmail(email);
    return true;
  } else {
    setErrorForEmail(email);
    return false;
  }
}

function checkPassword() {
  const passValue = pass.value.trim();
  if (passValue === "" || passValue.length < 4 || passValue.length > 12) {
    setErrorForPassword(pass);
    return false;
  } else {
    setSuccessForPassword(pass);
    return true;
  }
}

function checkPhoneNumber() {
  const phoneValue = phone.value.trim();
  var pattern = /^[^0-1][0-9]{9}$/;
  if (pattern.test(phoneValue)) {
    setSuccessForPhone(phone);
    return true;
  } else {
    setErrorForPhone(phone);
    return false;
  }
}

function checkDob() {
  const dobValue = dob.value.trim();
  console.log(dobValue);
  var pattern = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  console.log(pattern.test(dobValue));
  if (dobValue === null || !pattern.test(dobValue)) {
    setErrorForDob(dob);
    return false;
  } else {
    setSuccessForDob(dob);
    return true;
  }
}

function checkGender() {
  const genderValue = gender.value.trim();
  if (genderValue === "") {
    setErrorForGender(gender);
    return false;
  } else {
    setSuccessForGender(gender);
    return true;
  }
}
function checkInterest() {
  const interestValue = interest.value.trim();
  if (interestValue === "") {
    setErrorForInterest(interest);
    return false;
  } else {
    setSuccessForInterest(interest);
    return true;
  }
}

function checkPermanentAddress() {
  const perAddressValue = perAddress.value.trim();
  const pattern = /[0-9 -/]{1,7}\s+[\w\s]+/;
  if (!pattern.test(perAddressValue)) {
    setErrorForPermentAddress(perAddress);
    return false;
  } else {
    setSuccessForPermentAddress(perAddress);
    return true;
  }
}

function checkCity() {
  const cityValue = city.value.trim();
  var pattern = /^[A-Za-z']+$/;
  if (cityValue === "" || cityValue.length < 3) {
    setErrorForCity(city);
    return false;
  } else if (pattern.test(cityValue)) {
    setSuccessForCity(city);
    return true;
  } else {
    setErrorForCity(city);
    return false;
  }
}

function checkState() {
  const StateValue = state.value.trim();
  var pattern = /^[A-Za-z']+$/;
  if (StateValue === "" || StateValue.length < 3) {
    setErrorForState(state);
    return false;
  } else if (pattern.test(StateValue)) {
    setSuccessForState(state);
    return true;
  } else {
    setErrorForState(state);
    return false;
  }
}

function checkCountry() {
  var pattern = /^[A-Za-z']+$/;
  const countryValue = country.value.trim();

  if (countryValue === "" || countryValue.length < 3) {
    setErrorForCountry(country);
    return false;
  } else if (pattern.test(countryValue)) {
    setSuccessForCountry(country);
    return true;
  } else {
    setErrorForCountry(country);
    return false;
  }
}

function checkZipCode() {
  const zipValue = zip.value.trim();
  var pattern = /^([0-9]){6}?$/;
  if (pattern.test(zipValue) && zipValue.length == 6) {
    setSuccessForPincode(zip);
    return true;
  } else {
    setErrorForPincode(zip);
    return false;
  }
}

function checkCurrentAddress() {
  const currAddressValue = currAddress.value.trim();
  const pattern = /[0-9 -/]{1,7}\s+[\w\s]+/;
  if (!pattern.test(currAddressValue)) {
    setErrorForCurrentAddress(currAddress);
    return false;
  } else {
    setSuccessForCurrentAddress(currAddress);
    return true;
  }
}

function checkCity1() {
  const cityValue1 = city1.value.trim();
  var pattern = /^[A-Za-z']+$/;
  if (cityValue1 === "" || cityValue1.length < 3) {
    setErrorForCity(city1);
    return false;
  } else if (pattern.test(cityValue1)) {
    setSuccessForCity(city1);
    return true;
  } else {
    setErrorForCity(city1);
    return false;
  }
}

function checkState1() {
  const StateValue1 = state1.value.trim();
  var pattern = /^[A-Za-z']+$/;
  if (StateValue1 === "" || StateValue1.length < 3) {
    setErrorForState1(state1);
    return false;
  } else if (pattern.test(StateValue1)) {
    setSuccessForState1(state1);
    return true;
  } else {
    setErrorForState(state1);
    return false;
  }
}

function checkCountry1() {
  var pattern = /^[A-Za-z']+$/;
  const countryValue1 = country1.value.trim();

  if (countryValue1 === "" || countryValue1.length < 3) {
    setErrorForCountry1(country1);
    return false;
  } else if (pattern.test(countryValue1)) {
    setSuccessForCountry1(country1);
    return true;
  } else {
    setErrorForCountry1(country1);
    return false;
  }
}

function checkZipCode1() {
  const zipValue1 = zip1.value.trim();
  var pattern = /^([0-9]){6}?$/;
  if (pattern.test(zipValue1) && zipValue1.length == 6) {
    setSuccessForPincode1(zip1);
    return true;
  } else {
    setErrorForPincode1(zip1);
    return false;
  }
}

function setErrorForPermentAddress(input) {
  const permanent_address = input.parentElement;
  permanent_address.className = "permanent_address error";
}
function setSuccessForPermentAddress(input) {
  const permanent_address = input.parentElement;
  permanent_address.className = "permanent_address success";
}

function setErrorForCurrentAddress(input) {
  const current_address = input.parentElement;
  current_address.className = "current_address error";
}
function setSuccessForCurrentAddress(input) {
  const current_address = input.parentElement;
  current_address.className = "current_address success";
}

function setErrorForCity1(input) {
  const city1 = input.parentElement;
  city1.className = "city1 error";
}
function setSuccessForCity1(input) {
  const city1 = input.parentElement;
  city1.className = "city1 success";
}

function setErrorForState1(input) {
  const state1 = input.parentElement;
  state1.className = "state1 error";
}
function setSuccessForState1(input) {
  const state1 = input.parentElement;
  state1.className = "state1 success";
}

function setErrorForCountry1(input) {
  const country1 = input.parentElement;
  country1.className = "country1 error";
}
function setSuccessForCountry1(input) {
  const country1 = input.parentElement;
  country1.className = "country1 success";
}

function setErrorForPincode1(input) {
  const zip1 = input.parentElement;
  zip1.className = "zip1 error";
}
function setSuccessForPincode1(input) {
  const zip1 = input.parentElement;
  zip1.className = "zip1 success";
}

function setErrorForCity(input) {
  const city = input.parentElement;
  city.className = "city error";
}
function setSuccessForCity(input) {
  const city = input.parentElement;
  city.className = "city success";
}

function setErrorForState(input) {
  const state = input.parentElement;
  state.className = "state error";
}
function setSuccessForState(input) {
  const state = input.parentElement;
  state.className = "state success";
}

function setErrorForCountry(input) {
  const country = input.parentElement;
  country.className = "country error";
}
function setSuccessForCountry(input) {
  const country = input.parentElement;
  country.className = "country success";
}

function setErrorForPincode(input) {
  const zip = input.parentElement;
  zip.className = "zip error";
}
function setSuccessForPincode(input) {
  const zip = input.parentElement;
  zip.className = "zip success";
}

function setErrorForGender(input) {
  const gender = input.parentElement;
  gender.className = "gender error";
}
function setSuccessForGender(input) {
  const gender = input.parentElement;
  gender.className = "gender success";
}

function setErrorForInterest(input) {
  const parentInterest=document.getElementsByClassName('div2-gender-interest');
  const interest = input.parentElement;
  interest.className = "interest error";
  parentInterest[0].className="div2-gender-interest error";
}
function setSuccessForInterest(input) {
  const parentInterest=document.getElementsByClassName('div2-gender-interest');
  const interest = input.parentElement;
  interest.className = "interest success";
  parentInterest[0].className="div2-gender-interest success";
}

function setErrorForDob(input) {
  const dob = input.parentElement;
  dob.className = "dob error";
}
function setSuccessForDob(input) {
  const dob = input.parentElement;
  dob.className = "dob success";
}

function setErrorForPhone(input) {
  const phone = input.parentElement;
  phone.className = "phone error";
}
function setSuccessForPhone(input) {
  const phone = input.parentElement;
  phone.className = "phone success";
}

function setErrorForEmail(input) {
  const email = input.parentElement;
  email.className = "email error";
}
function setSuccessForEmail(input) {
  const email = input.parentElement;
  email.className = "email success";
}

function setErrorForPassword(input) {
  const pass = input.parentElement;
  pass.className = "pass error";
}
function setSuccessForPassword(input) {
  const pass = input.parentElement;
  pass.className = "pass success";
}

function setErrorForFname(input) {
  const fname = input.parentElement;
  fname.className = "fname error";
}
function setSuccessForFname(input) {
  const fname = input.parentElement;
  fname.className = "fname success";
}

function setErrorForMname(input) {
  const mname = input.parentElement;
  mname.className = "mname error";
}
function setSuccessForMname(input) {
  const mname = input.parentElement;
  mname.className = "mname success";
}
function setBackToNormal(input) {
  const mname = input.parentElement;
  mname.className = "mname";
}

function setErrorForLname(input) {
  const lname = input.parentElement;
  lname.className = "lname error";
}
function setSuccessForLname(input) {
  const lname = input.parentElement;
  lname.className = "lname success";
}

document.querySelector(".refresh").addEventListener("click", function (e) {
  e.preventDefault();
  generateCaptchaEquation();
  const element = document.getElementById("captcha_input");
  const element1 = document.getElementById("valid_captcha");
  const captcha1 = element.parentElement;
  captcha1.className = "captcha1";
  element1.className = "valid_captcha";
});

const equation = ["-", "+", "*", "/"];
let expectOutput = "";
let captchaEquation = "";

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
        console.log("-=-=-=-=-=-=")
      setSuccessForCaptcha(captcha_input);
      return true;
    } else {
      setErrorForCaptcha2(captcha_input);
      return false;
    }
  }
}

function setErrorForCaptcha(input) {
  const captcha1 = input.parentElement;
  captcha1.className = "captcha1";
  document.getElementById("valid_captcha").innerHTML = "Please enter captcha";
}
function setErrorForCaptcha2(input) {
  const captcha1 = input.parentElement;
  captcha1.className = "captcha1";
  document.getElementById("valid_captcha").innerHTML = "Invalid captcha";
}
function setSuccessForCaptcha(input) {
  const captcha1 = input.parentElement;
  captcha1.className = "captcha1 success";
  const valid_captcha = document.getElementById("valid_captcha");
  valid_captcha.className = "valid_captcha";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
