const equation = ['-', '+', '*', '/'];
let expectOutput = '';
let captchaEquation = '';

var captcha_validation=false;
$(document).on('click','#refresh',function(e){
  e.preventDefault()
  generateCaptchaEquation();
  $('.error_mess').hide();
  $('.captcha1').removeClass('success');



})
$(document).on('click','.btn',function(e){
  e.preventDefault();
  $('.error_mess').show();
  var fname=checkFname($('#fname'));
  var mname=checkLname($('#mname'));
  var lname=checkLname($('#lname'));
  var email=checkEmail($('#email'));
  var password=checkPassword($('#pass'));
  var number = checkNumber($('#phone'));
  var gender = checkGender($('#gender'));
  var interest= checkInterest($("#interest"));
  var dob =checkDate($("#date"));
  var permanent_add=checkParmanentAddress($('#per-address'));
  var city1=checkCity1($("#city"));
  var state1=checkState1($("#state"));
  var country1=checkCountry1($("#country"));
  var zip1=checkZipcode1($("#zip"));
  var current_add=checkCurrentAddress($("#curr-address"));
  var city2=checkCity2($("#city1"));
  var state2=checkState2($("#state1"));
  var country2=checkCountry2($("#country1"));
  var zip2=checkZipcode2($("#zip1"));

var is_valid_captcha = submit();
 if(fname && mname && lname && email && password && number && gender && 
  interest && dob && permanent_add && city1 && state1 && country1 && zip1 && 
  current_add && city2 && state2 && country2 && zip2 && is_valid_captcha){
    // alert("Successfully Registered. Click OK to Proceed");
  }


})


function checkParmanentAddress(element){
  var per_address = $(element).val();
  const pattern = /[0-9 -/]{1,7}\s+[\w\s]+/;
    if (pattern.test(per_address)) {
      console.log("dsfds");
      $(".permanent_address").removeClass("error");
      $(".permanent_address").addClass("permanent_address success");
      return true;
    } else {
      $(".permanent_address").removeClass("success");
      $(".permanent_address").addClass("permanent_address error");
      return false;
    }

}
function checkCurrentAddress(element){
  var curr_address = $(element).val();
  const pattern = /[0-9 -/]{1,7}\s+[\w\s]+/;
     
    if (pattern.test(curr_address)) {
      $(".current_address").removeClass("error");
      $(".current_address").addClass("current_address success");
      return true;
    } else {
      $(".current_address").removeClass("success");
      $(".current_address").addClass("current_address error");
      return false;
    }

}

function checkFname(element){
    var pattern = /^[A-Za-z']+$/;
    var fname = $(element).val();
    console.log(fname);
    console.log(fname);
  if (pattern.test(fname) && fname.length>1 ) {
    $(".fname").removeClass("error");
    $(".fname").addClass("fname success");
    return true;
  } else {
    $(".fname").removeClass("success");
    $(".fname").addClass("fname error");
    return false;
  }

}
function checkMname(element){
    var pattern = /^[A-Za-z']+$/;
    var mname = $(element).val();
  if(mname.length===0)
  {
    $(".mname").removeClass("success");
    $(".mname").removeClass("error");
    return true;
  }
 else if (pattern.test(mname) && mname.length>1) {
    $(".mname").removeClass("error");
    $(".mname").addClass("mname success");
    return true;
  } else  {
    $(".mname").removeClass("success");
    $(".mname").addClass("mname error");
    return false;
  }

}
function checkLname(element){
    var pattern = /^[A-Za-z']+$/;

    var lname = $(element).val();
  if (pattern.test(lname) && lname.length>1) {
    $(".lname").removeClass("error");
    $(".lname").addClass("lname success");
    return true;
  } else {
    $(".lname").removeClass("success");
    $(".lname").addClass("lname error");
    return false;
  }

}

function checkEmail(element){

    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var email = $(element).val();
  if (pattern.test(email) && email !== "") {
    $(".email").removeClass("error");
    $(".email").addClass("email success");
    return true;
  } else {
    $(".email").removeClass("success");
    $(".email").addClass("email error");
    return false;
  }

}
function checkPassword(element){

    var pass = $(element).val();
    if (pass.length>3 && pass.length < 13) {
      $(".pass").removeClass("error");
      $(".pass").addClass("pass success");
      return true;
    } else {
      $(".pass").removeClass("success");
      $(".pass").addClass("pass error");
      return false;
    }
}
function checkNumber(element){
    var phone = $(element).val();
  var pattern = /^[^0-1][0-9]{9}$/;
  if (pattern.test(phone) && phone != "") {
    $(".phone").removeClass("error");
    $(".phone").addClass("phone success");
    return true;
  } else {
    $(".phone").removeClass("success");
    $(".phone").addClass("phone error");
    return false;
  }

}
function checkDate(element){
    var dob = $(element).val();
    console.log(dob);
    if (dob!=='') {
      $(".dob").removeClass("error");
      $(".dob").addClass("dob success");
      return true;
    } else {
      $(".dob").removeClass("success");
      $(".dob").addClass("dob error");
      return false;
    }
}

function checkGender(element){
    var gender = $(element).val();
    if (gender !== null) {
      $(".gender").removeClass("error");
      $(".gender").addClass("gender success");
      return true;
    } else {
      $(".gender").removeClass("success");
      $(".gender").addClass("gender error");
      return false;
    }

}

function checkInterest(element){
    var interest = $(element).val();
    if (interest.length !== 0) {
      $(".interest").removeClass("error");
      $(".interest").addClass("interest success");
      return true;
    } else {
      $(".interest").removeClass("success");
      $(".interest").addClass("interest error");
      return false;
    }
}


function checkCity1(element){
    var city = $(element).val();
    var pattern = /^[A-Za-z']+$/;
    if(city.length===0 || city.length<3){
      $(".city").removeClass("success");
      $(".city").addClass("city error");
      return false;
    }
   else if(pattern.test(city)) {
      $(".city").removeClass("error");
      $(".city").addClass("city success");
      return true;
    } else {
      $(".city").removeClass("success");
      $(".city").addClass("city error");
      return false;
    }
}
function checkState1(element){
    var state = $(element).val();
    var pattern = /^[A-Za-z']+$/;
    if(state.length<3){
      $(".state").removeClass("success");
      $(".state").addClass("state error");
      return false;
    }
    if (pattern.test(state)) {
      $(".state").removeClass("error");
      $(".state").addClass("state success");
      return true;
    } else {
      $(".state").removeClass("success");
      $(".state").addClass("state error");
      return false;
    }

}
function checkCountry1(element){
    var country = $(element).val();
    var pattern = /^[A-Za-z']+$/;
    if(country.length<3){
      $(".country").removeClass("success");
      $(".country").addClass("country error");
      return false;
    }
    if (pattern.test(country)) {
      $(".country").removeClass("error");
      $(".country").addClass("country success");
      return true;
    } else {
      $(".country").removeClass("success");
      $(".country").addClass("country error");
      return false;
    }

}
function checkZipcode1(element){
    var pattern = /^([0-9]){6}?$/;
  var zip = $(element).val();
  if (pattern.test(zip) && zip.length === 6) {
    $(".zip").removeClass("error");
    $(".zip").addClass("zip success");
    return true;
  } else {
    $(".zip").removeClass("success");
    $(".zip").addClass("zip error");
    return false;
  }

}

function checkCity2(element){
  var city1 = $(element).val();
  var pattern = /^[A-Za-z']+$/;
  if(city1.length===0 || city1.length<3){
    $(".city1").removeClass("success");
    $(".city1").addClass("city1 error");
    return false;
  }
 else if(pattern.test(city1)) {
    $(".city1").removeClass("error");
    $(".city1").addClass("city1 success");
    return true;
  } else {
    $(".city1").removeClass("success");
    $(".city1").addClass("city1 error");
    return false;
  }
 
}
function checkState2(element){
  var state1 = $(element).val();
  var pattern = /^[A-Za-z']+$/;
  if(state1.length<3){
    $(".state1").removeClass("success");
    $(".state1").addClass("state1 error");
    return false;
  }
  if (pattern.test(state1)) {
    $(".state1").removeClass("error");
    $(".state1").addClass("state1 success");
    return true;
  } else {
    $(".state1").removeClass("success");
    $(".state1").addClass("state1 error");
    return false;
  }


}
function checkCountry2(element){
  var country1 = $(element).val();
  var pattern = /^[A-Za-z']+$/;
  if(country1.length<3){
    $(".country1").removeClass("success");
    $(".country1").addClass("country1 error");
    return false;
  }
  if (pattern.test(country1)) {
    $(".country1").removeClass("error");
    $(".country1").addClass("country1 success");
    return true;
  } else {
    $(".country1").removeClass("success");
    $(".country1").addClass("country1 error");
    return false;
  }
 

}
function checkZipcode2(element){
  var pattern = /^([0-9]){6}?$/;
  var zip1 = $(element).val();
  if (pattern.test(zip1) && zip1.length === 6) {
    $(".zip1").removeClass("error");
    $(".zip1").addClass("zip1 success");
    return true;
  } else {
    $(".zip1").removeClass("success");
    $(".zip1").addClass("zip1 error");
    return false;
  }

 
}


  

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
    if(operator === equation[2]){
      num1= Math.floor(getRandomArbitrary(1, 9));
      num2=  Math.floor(getRandomArbitrary(1, 9));
    }
    captchaEquation = num1 + " " + operator + " " + num2;
    expectOutput = claculateOutput(num1, num2, operator);
    $("#captcha").text(captchaEquation);
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
    const res = $('#captcha_input').val();
    let resInt = parseInt(res);
    console.log(isNaN(resInt));
    if (isNaN(resInt)) {
      $('.error_mess').text("Please Enter Captcha");
      return false;
    }
    else {
        if (resInt === expectOutput) {
          $('.error_mess').hide();
          $('.captcha1').addClass('captcha1 success')
            return true;
        }
        else{
          $(".error_mess").text("Invalid Captcha");
            
        }
    }

}
