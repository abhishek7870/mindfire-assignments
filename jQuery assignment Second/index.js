var country_map = new Map();
var state_map = new Map();
var captcha_validation=false;
var address_seperated = [];

const equation = ['-', '+', '*', '/'];
let expectOutput = '';
let captchaEquation = '';

$(document).ready(function () {
  loadCountryStateMap();
  loadCountries($("#current_country"));
  $(".emp-details-main").hide();

});

$("#add-phone").click(function (e) {
  var clonned_mob_div = $("#primary-mob").clone();
  $(clonned_mob_div).removeAttr("id");
  $(clonned_mob_div).children("h5:first").remove();
  $(clonned_mob_div).children("input:first").addClass("margleft-20");
  $(clonned_mob_div).children("input:first").val('');
  var add_phone = $(clonned_mob_div).find("#add-phone");
  $(add_phone).removeClass("fa-plus-circle");
  $(add_phone).addClass("fa-trash");
  $(add_phone).removeAttr("id");
  $(add_phone).addClass("remove-phone");

  $(clonned_mob_div).insertAfter("#primary-mob");
});

$(document).on("click", "#add-address", function () {
  var alternative_address = $("#primary-address").clone();
  $(alternative_address).removeAttr("id");
  console.log($(alternative_address).find('input').val(''));
  var new_picode = $(alternative_address).find(".pincode");
  var delete_btn = '<button class="delete">Delete</button>';
  $(delete_btn).insertAfter(new_picode);
  console.log($(new_picode));

  $(alternative_address).insertAfter("#primary-address");
});

$(document).on("click", ".remove-phone", function () {
  $(this).parent(".mob").remove();
});

function loadStates(country_field) {
  var parent_div = $(country_field).parents('.address');
  var state_field = $(parent_div[0]).find('.select_state');
  var country_field_value = $(country_field).val();

  var state_options = "<option value=''>Choose Your</option>";
  $.getJSON("states.json", function (result) {
    $.each(result, function (i, states) {
      if (country_field_value == states.country_id) {
        state_options +=
          "<option value='" + states.id + "'>" + states.name + "</option>";
      }
    });
    $(state_field).html(state_options);
  });
}

function loadCountries(country_field) {
  var country_options = "";
  $.getJSON("countries.json", function (result) {
    $.each(result, function (j, countries) {
      country_options +=
        "<option value='" +
        countries.id +
        "'>" +
        countries.name +
        "</option>";
    });
    $(country_field).append(country_options);
  });
}

function loadCountryStateMap() {
  $.getJSON("countries.json", function (countries) {
    for (let i = 0; i < countries.length; i++) {
      country_map.set("" + countries[i].id, countries[i].name);
    }

    //   console.log(country_map);
  });
  $.getJSON("states.json", function (states) {
    for (let i = 0; i < states.length; i++) {
      state_map.set(states[i].id, states[i].name);
    }
  });
}

$(document).on('change', '.select_country', function(){
  loadStates(this);
})

$(document).on("click", ".delete", function () {
  var parent = $(this).closest(".right-down");
  $(parent).remove();
});

$(document).on("click", "#submit", function () {
  $(".error-mess-name").hide();
  $(".error-mess-email").hide();
  $(".error-mess-mob").hide();
  $(".error-mess-aadhar").hide();
  $(".error-mess-pan").hide();
  $(".error-mess-country").hide();
  $("error-mess-country").hide();
  $("error-mess-city").hide();
  $("error-mess-pincode").hide();
  if (
    checkName() &&
    checkEmail() &&
    checkMobileNumbers() &&
    checkPan() &&
    checkAadhar() &&
     checkAddress() &&
    captcha_validation
  ) {
    
    $(".main-div").css("display", "none");
    $(".emp-details-main").show();
    var name = $("#name").val();
    var email = $("#email").val();
    var mobile1 = $(".mob");
    var mobile_numbers = '';

    for(var i=0;i<mobile1.length;i++){
        var new_mobile = $(mobile1[i]).find('input').val();
        console.log(new_mobile)
        mobile_numbers += new_mobile + ', ';
    }
    $('.emp-mob h2').html(mobile_numbers);
    
    var pan = $("#pan").val();
    var aadhar = $("#aadhar").val();
     
    var address= $('.address');
    var display_address= '';
    for(var i=0;i<address.length ;i++){
        let country =  $(address[i]).find('.select_country').find(":selected").text();
        let state = $(address[i]).find('.select_state').find(":selected").text();
        let city = $(address[i]).find('.select_city').val();
        let pincode=  $(address[i]).find('.select_pincode').val();
        display_address+=country+ ',' +state+ ', '+ city + ', ' + pincode + '<br>';
     }
     console.log(display_address);
     address_seperated = display_address.split('.');

    $(".name h1").html(name);
    $(".name h4").html(email);
    $(".emp-name h2").html(name);
    $(".emp-email h2").html(email);

    $(".emp-pan h2").html(pan);
    $(".emp-aadhar h2").html(aadhar);
    $('.emp-address-details p').html(display_address);
   
  }
  else{
    $('.valid_captcha2').show();
     $('.valid_captcha2').addClass('error');

  }
});

function checkName() {
  var pattern =
    /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
  var name = $("#name").val();
  if (pattern.test(name) && name !== "") {
    $(".error-mess-name").hide();
    $(".fname").removeClass("error");
    $(".fname").addClass("fname success");
    return true;
  } else {
    $(".error-mess-name").html("Should contain only Characters");
    $(".error-mess-name").show();
    $(".fname").removeClass("success");
    $(".fname").addClass("fname error");
    return false;
  }
}

function checkEmail() {
  var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var email = $("#email").val();
  if (pattern.test(email) && email !== "") {
    $(".error-mess-email").hide();
    $(".email").removeClass("error");
    $(".email").addClass("email success");
    return true;
  } else {
    $(".error-mess-email").html("Invalid Email");
    $(".error-mess-email").show();
    $(".email").removeClass("success");
    $(".email").addClass(".email error");
    return false;
  }
}

function checkMobileNumbers()
{
  var number_fields = $('.mob');
  for (var i=0; i<number_fields.length; i++)
  {
    if (!checkMobile(number_fields[i]))
      return false;
  }
  return true;
}

function checkAddress(){
  var address_vields = $(".address");
  for(var i=0;i<address_vields.length;i++){
      if(
        checkCountry($(address_vields[i]).find('.country')) && 
      checkState($(address_vields[i]).find('.state')) && 
      checkCity($(address_vields[i]).find('.city')) && 
      checkPincode($(address_vields[i]).find('.pincode'))
      ){
        console.log("passed" + address_vields[i])
        continue;
      }
      else{
        return false;
      }
  }
  return true;
}

function checkMobile(ele) {
  var mobile = $(ele).find('input').val();
  var pattern = /^[^0-1][0-9]{9}$/;
  if (pattern.test(mobile) && mobile != "") {
    $(".error-mess-mob").hide();
    $(ele).removeClass("error");
    $(ele).addClass("mob success");
    return true;
  } else {
    $(".error-mess-mob").html("Invalid Mobile Number");
    $(".error-mess-mob").show();
    $(ele).removeClass("success");
    $(ele).addClass("mob error");
    return false;
  }
}

function checkAadhar() {
  var pattern = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
  var aadhar = $("#aadhar").val();
  if (pattern.test(aadhar) && aadhar != "") {
    $(".error-mess-aadhar").hide();
    $(".aadhar").removeClass("error");
    $(".aadhar").addClass("aadhar success");
    return true;
  } else {
    $(".error-mess-aadhar").html("Invalid Aadhar Number");
    $(".error-mess-aadhar").show();
    $(".aadhar").removeClass("success");
    $(".aadhar").addClass(".aadhar error");
    return false;
  }
}

function checkPan() {
  var pattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  var panNumber = $("#pan").val();
  if (pattern.test(panNumber) && panNumber != "") {
    $(".error-mess-pan").hide();
    $(".pan").removeClass("error");
    $(".pan").addClass("pan success");
    return true;
  } else {
    $(".error-mess-pan").html("Invalid Pan Number");
    $(".error-mess-pan").show();
    $(".pan").removeClass("success");
    $(".pan").addClass(".pan error");
    return false;
  }
}

function checkCountry(ele) {
  var country = $(ele).find('.select_country').val();

  if (country > 0) {
    $(ele).find(".error-mess-country").hide();
    $(ele).removeClass("error");
    $(ele).addClass("country success");
    console.log("pass" , ele);
    return true;
  } else {
    $(ele).find(".error-mess-country").html("Please Choose Your Country");
    $(ele).find(".error-mess-country").show();
    $(ele).removeClass("success");
    $(ele).addClass(".country error");

    console.log("failed", ele);
    return false;
  }
}

function checkState(ele) {
  var state = $(ele).find('.select_state').val();
  if (state>0) {
    $(ele).find(".error-mess-state").hide();
    $(ele).removeClass("error");
    $(ele).addClass("state success");
    return true;
  } else {
    $(ele).find(".error-mess-state").html("Please Choose Your State");
    $(ele).find(".error-mess-state").show();
    $(ele).removeClass("success");
    $(ele).addClass(".state error");
    return false;
  }
}

function checkCity(ele) {
  var pattern = /^[a-zA-Z]*$/;
  var city = $(ele).find('.select_city').val();
  console.log(city);
  if (pattern.test(city) && city !== "") {
    $(ele).find(".error-mess-city").hide();
    $(ele).removeClass("error");
    $(ele).addClass("city success");
    return true;
  } else {
    $(ele).find(".error-mess-city").html("Should contain only Characters");
    $(ele).find(".error-mess-city").show();
    $(ele).removeClass("success");
    $(ele).addClass("city error");
    return false;
  }
}

function checkPincode(ele) {
  var pattern = /^([0-9]){6}?$/;
  var pincode = $(ele).find('.select_pincode').val();
  if (pattern.test(pincode) && pincode !== "") {
    $(ele).find(".error-mess-pincode").hide();
    $(ele).removeClass("error");
    $(ele).addClass("pincode success");
    return true;
  } else {
    $(ele).find(".error-mess-pincode").html("Should contain only Six Digit");
    $(ele).find(".error-mess-pincode").show();
    $(ele).removeClass("success");
    $(ele).addClass("pincode error");
    return false;
  }
}

//captcha 
$(document).on('click','.captcha-btn',function(e){
  e.preventDefault();
  var is_valid_captcha = checkCaptcha();

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
});


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


function checkCaptcha() {
   const res = $('#captcha_input').val();
   let resInt = parseInt(res);
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
         $('valid_captcha2').hide();
         $('.captcha1').addClass('captcha1 success')
           return 2;
       }
       else{
           return 3;
       }
   }

}
