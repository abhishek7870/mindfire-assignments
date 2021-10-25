// validation

var captcha_validation=false;

$(document).ready(function(){

  $('.refresh').click(function(e){
    e.preventDefault();
    generateCaptchaEquation();

  })
     

    $('.btn').click(function(e){
        e.preventDefault();
        if(checkFname() &&
        checkMname() &&
        checkLname() &&
        checkEmail() &&
        checkPassword() &&
        checkNumber() &&
        checkDate() &&
        checkGender() &&
        checkInterest() &&
        checkParmanentAddress() &&
        checkCity1() &&
        checkState1() &&
        checkCountry1() &&
        checkZipcode1() &&
        checkCurrentAddress() &&
        checkCity2() &&
        checkState2() &&
        checkCountry2() &&
        checkZipcode2() &&
        captcha_validation
    ){
        if(captcha_validation)
        {
        
          alert('Your Form is Submited');
        }
        else{
          $('.valid_captcha2').text('Please Correct Captcha');
          $('.valid_captcha2').show();
          $('.valid_captcha2').addClass('error');
        }
      
    }
    else {
      console.log("hello world")
    }
        

    })
    
})

function checkParmanentAddress(){
  var per_address = $("#per-address").val();
    if (per_address.length > 0) {
      $(".address").removeClass("error");
      $(".address").addClass("address success");
      return true;
    } else {
      $(".address").removeClass("success");
      $(".address").addClass("address error");
      return false;
    }

}
function checkCurrentAddress(){
  var curr_address = $("#curr-address").val();
     
    if (curr_address.length > 0) {
      $(".address").removeClass("error");
      $(".address").addClass("address success");
      return true;
    } else {
      $(".address").removeClass("success");
      $(".address").addClass("address error");
      return false;
    }

}

function checkFname(){
    var pattern = /^[A-Za-z']+$/;
    var fname = $("#fname").val();
    console.log(fname);
  if (pattern.test(fname) && fname !== "") {
    $(".fname").removeClass("error");
    $(".fname").addClass("fname success");
    return true;
  } else {
    $(".fname").removeClass("success");
    $(".fname").addClass("fname error");
    return false;
  }

}
function checkMname(){
    var pattern = /^[A-Za-z']+$/;
    var mname = $("#mname").val();
  if (pattern.test(mname) && mname !== "") {
    $(".mname").removeClass("error");
    $(".mname").addClass("mname success");
    return true;
  } else {
    $(".mname").removeClass("success");
    $(".mname").addClass("mname error");
    return false;
  }

}
function checkLname(){
    var pattern = /^[A-Za-z']+$/;

    var lname = $("#lname").val();
  if (pattern.test(lname) && lname !== "") {
    $(".lname").removeClass("error");
    $(".lname").addClass("lname success");
    return true;
  } else {
    $(".lname").removeClass("success");
    $(".lname").addClass("lname error");
    return false;
  }

}

function checkEmail(){

    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var email = $("#email").val();
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
function checkPassword(){

    var pass = $("#pass").val();
    if (pass.length>0 && pass.length < 8) {
      $(".pass").removeClass("error");
      $(".pass").addClass("pass success");
      return true;
    } else {
      $(".pass").removeClass("success");
      $(".pass").addClass("pass error");
      return false;
    }
}
function checkNumber(){
    var phone = $("#phone").val();
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
function checkDate(){
    var dob = $("#date").find(":selected");
    if (dob.length !== null) {
      $(".dob").removeClass("error");
      $(".dob").addClass("dob success");
      return true;
    } else {
      $(".dob").removeClass("success");
      $(".dob").addClass("dob error");
      return false;
    }
}

function checkGender(){
    var gender = $("#gender").val();
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

function checkInterest(){
    var interest = $("#interest").val();
    if (interest !== null) {
      $(".interest").removeClass("error");
      $(".interest").addClass("interest success");
      return true;
    } else {
      $(".interest").removeClass("success");
      $(".interest").addClass("interest error");
      return false;
    }

}


function checkCity1(){
    var city = $("#city").val();
     
    if (city.length > 0) {
      $(".city").removeClass("error");
      $(".city").addClass("city success");
      return true;
    } else {
      $(".city").removeClass("success");
      $(".city").addClass("city error");
      return false;
    }
}
function checkState1(){
    var state = $("#state").val();
    if (state.length >0) {
      $(".state").removeClass("error");
      $(".state").addClass("state success");
      return true;
    } else {
      $(".state").removeClass("success");
      $(".state").addClass("state error");
      return false;
    }

}
function checkCountry1(){
    var country = $("#country").val();
    if (country.length>0) {
      $(".country").removeClass("error");
      $(".country").addClass("country success");
      return true;
    } else {
      $(".country").removeClass("success");
      $(".country").addClass("country error");
      return false;
    }

}
function checkZipcode1(){

    var pattern = /^([0-9]){6}?$/;
  var zip = $("#zip").val();
  if (pattern.test(zip) && zip !== "") {
    $(".zip").removeClass("error");
    $(".zip").addClass("zip success");
    return true;
  } else {
    $(".zip").removeClass("success");
    $(".zip").addClass("zip error");
    return false;
  }


}

function checkCity2(){
  var city1 = $("#city1").val();
  if (city1.length >0) {
    $(".city1").removeClass("error");
    $(".city1").addClass("city1 success");
    return true;
  } else {
    $(".city1").removeClass("success");
    $(".city1").addClass("city1 error");
    return false;
  }
}
function checkState2(){
  var state1 = $("#state1").val();
  if (state1.length>0) {
    $(".state1").removeClass("error");
    $(".state1").addClass("state1 success");
    return true;
  } else {
    $(".state1").removeClass("success");
    $(".state1").addClass("state1 error");
    return false;
  }

}
function checkCountry2(){
  var country1 = $("#country1").val();
  if (country1.length >0) {
    $(".country1").removeClass("error");
    $(".country1").addClass("country1 success");
    return true;
  } else {
    $(".country1").removeClass("success");
    $(".country1").addClass("country1 error");
    return false;
  }

}
function checkZipcode2(){

  var pattern = /^([0-9]){6}?$/;
var zip1 = $("#zip1").val();
if (pattern.test(zip1) && zip1 !== "") {
  $(".zip1").removeClass("error");
  $(".zip1").addClass("zip1 success");
  return true;
} else {
  $(".zip1").removeClass("success");
  $(".zip1").addClass("zip1 error");
  return false;
}


}



//captcha generated code
$(document).ready(function(){
   $(document).on('click','.captcha-btn',function(e){
     e.preventDefault();
    var is_valid_captcha = submit();
    console.log(!is_valid_captcha);;
    if (is_valid_captcha===1) {
         $('.valid_captcha').hide();
    }
    else if(is_valid_captcha===3){
      generateCaptchaEquation();
      $('.valid_captcha1').hide();
      $('.valid_captcha2').hide();
      $('.valid_captcha').show();
       $('.valid_captcha').text("Please Enter Valid Captcha");
       $('.valid_captcha').addClass('valid_captcha error');

    }
    else{
      captcha_validation=is_valid_captcha;
    }

   })
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
      $('.valid_captcha1').text("Please Enter Captcha");
      $('.valid_captcha1').addClass('valid_captcha1 error'); 
      return 1;
    }
    else {
      console.log(resInt);
        if (resInt === expectOutput) {
          $('.valid_captcha').removeClass('error');
          $('.valid_captcha').hide();
          $('.valid_captcha2').removeClass('error');
          $('.valid_captcha2').hide();
          $('.valid_captcha1').show();
          $('.captcha1').addClass('captcha1 success')
            return 2;
        }
        else{
            return 3;
        }
    }

}
