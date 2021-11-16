const equation = ['-', '+', '*', '/'];
let expectOutput = '';
let captchaEquation = '';

const pincode_pattern = /^([0-9]){6}?$/;
const address_pattern = /^[1-9][0-9]{1,3}(\s[\w,]{1,35})+$/;
const city_state_country_pattern = /^[A-Za-z]{2,30}(\s[A-Za-z]{2,30})?$/;
const name_pattern = /^[A-Za-z]{2,15}$/;
const email_pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/;
const number_pattern = /^[^0-1][0-9]{9}$/;



var captcha_validation=false;

$(document).on('click','#refresh',function(e){
  e.preventDefault()
  generateCaptchaEquation();
  $('.error_mess').hide();
  $('.captcha_div').removeClass('success');

})

$(document).on('click','.btn',function(e){
  e.preventDefault();
  $('.error_mess').show();
  var check_fname=check_name($('#fname'));
  var check_mname=check_name($('#mname'));
  var check_lname=check_name($('#lname'));
   var check_email_address=check_email($('#email'));
  var check_pass=check_password($('#pass'));
  var check_num = check_number($('#phone'));
  var check_gen = check_gender($('#gender'));
  var check_inter= check_interest($("#interest"));
  var check_dob =check_date($("#date"));


  var check_permanent_address=check_address($('#per-address'));

  var check_permanent_city=check_city($("#city"));
  var check_permanent_state=check_state($("#state"));
  var check_permanent_country=check_country($("#country"));
  var check_permanent_pincode=check_pincode($("#zip"));

  var check_current_address=check_address($("#curr-address"));

  var check_current_city=check_city($("#city1"));
  var check_current_state=check_state($("#state1"));
  var check_current_country=check_country($("#country1"));
  var check_current_pincode=check_pincode($("#zip1"));

var is_valid_captcha = submit();
 if(check_fname && check_mname && check_lname && check_email_address && check_pass && check_num && check_gen && 
  check_inter && check_dob && check_permanent_address && check_permanent_city && check_permanent_state && check_permanent_country && check_permanent_pincode && 
  check_current_address && check_current_city && check_current_state && check_current_country && check_current_pincode && is_valid_captcha){
    // alert("Successfully Registered. Click OK to Proceed");
  }


})


function check_address(element){
  var per_address = $(element).val();
  per_address = per_address.replace(/\s\s+/g, ' ');
    $(element).val(per_address)
    if (address_pattern.test(per_address)) {
      $(element).parent().removeClass("error");
      $(element).parent().addClass("permanent_address success");
      return true;
    } else {
      $(element).parent().removeClass("success");
      $(element).parent().addClass("permanent_address error");
      return false;
    }
}


function check_name(element){
  var fname = $(element).val();
  if($(element).attr('id')==='mname' && fname.length===0){
    $(element).parent().removeClass("success");
    $(element).parent().removeClass("error");
    return true;
  }
  if (name_pattern.test(fname)) {
    $(element).parent().removeClass("error");
    $(element).parent().addClass("success");
    return true;
  } else {
    $(element).parent().removeClass("success");
    $(element).parent().addClass("error");
    return false;
  }

}


function check_email(element){
  var email = $(element).val();
  if (email_pattern.test(email)) {
    $(element).parent().removeClass("error");
    $(element).parent().addClass("success");
    return true;
  } else {
    $(element).parent().removeClass("success");
    $(element).parent().addClass("error");
    return false;
  }

}

function check_password(element){

    var pass = $(element).val();
    if (pass.length>3 && pass.length < 13) {
      $(element).parent().removeClass("error");
      $(element).parent().addClass("success");
      return true;
    } else {
      $(element).parent().removeClass("success");
      $(element).parent().addClass("error");
      return false;
    }
}

function check_number(element){
    var phone = $(element).val();
  if (number_pattern.test(phone)) {
    $(element).parent().removeClass("error");
    $(element).parent().addClass("success");
    return true;
  } else {
    $(element).parent().removeClass("success");
    $(element).parent().addClass("error");
    return false;
  }

}


function check_date(element){
    var dob = $(element).val();
   if (dob!=='') {
   $(element).parent().removeClass("error");
   $(element).parent().addClass("success");
      return true;
    } else {
   $(element).parent().removeClass("success");
   $(element).parent().addClass("error");
      return false;
    }
}

function check_gender(element){
    var gender = $(element).val();
    if (gender !== null) {
      $(element).parent().removeClass("error");
      $(element).parent().addClass("success");
      return true;
    } else {
      $(element).parent().removeClass("success");
      $(element).parent().addClass("error");
      return false;
    }

}


function check_interest(element){
    var interest = $(element).val();
    if (interest.length !== 0) {
      $(element).parent().removeClass("error");
      $(element).parent().addClass("success");
      return true;
    } else {
      $(element).parent().removeClass("success");
      $(element).parent().addClass("error");
      return false;
    }
}



function check_city(element){
    var city = $(element).val();
    city = city.replace(/\s\s+/g, ' ');
    $(element).val(city);
   if(city_state_country_pattern.test(city)) {
     $(element).parent().removeClass("error");
     $(element).parent().addClass("success");
     return true;
    } else {
     $(element).parent().removeClass("success");
     $(element).parent().addClass("error");
     return false;
    }
}
function check_state(element){
    var state = $(element).val();
    state = state.replace(/\s\s+/g, ' ');
    $(element).val(state);
    if(city_state_country_pattern.test(state)) {
      $(element).parent().removeClass("error");
      $(element).parent().addClass("success");
      return true;
    } else {
      $(element).parent().removeClass("success");
      $(element).parent().addClass("error");
      return false;
    }

}

function check_country(element){
    var country = $(element).val();
    country = country.replace(/\s\s+/g, ' ');
    $(element).val(country);
    if (city_state_country_pattern.test(country)) {
      $(element).parent().removeClass("error");
      $(element).parent().addClass("success");
      return true;
    } else {
      $(element).parent().removeClass("success");
      $(element).parent().addClass("error");
      return false;
    }

}

function check_pincode(element){
  var zip = $(element).val();
  if (pincode_pattern.test(zip)) {
    $(element).parent().removeClass("error");
    $(element).parent().addClass("success");
    return true;
  } else {
    $(element).parent().removeClass("success");
    $(element).parent().addClass("error");
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
    if (isNaN(resInt)) {
      $('.error_mess').text("Please Enter Captcha");
      return false;
    }
    else {
        if (resInt === expectOutput) {
          $('.error_mess').hide();
          $('.captcha_div').addClass('captcha_div success')
            return true;
        }
        else{
          $(".error_mess").text("Invalid Captcha");
            
        }
    }

}
