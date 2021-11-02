var country_map = new Map();
var state_map = new Map();
var captcha_validation=false;
var address_seperated = [];

const equation = ['-', '+', '*', '/'];
let expectOutput = '';
let captchaEquation = '';

$(document).ready(function () {
    $('.refresh').click(function(e){
      e.preventDefault();
      generateCaptchaEquation();
      $('.captcha-error-mess').hide();
      $('.captcha1').removeClass('success');
    })
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
  $(clonned_mob_div).removeClass('success');
  $(clonned_mob_div).removeClass('error');
  $(clonned_mob_div).find('.error-mess-mob').hide();

  $(clonned_mob_div).insertAfter("#primary-mob");
});



$(document).on('change','#file',function(){
    var input_var = $('#file')[0];
    // console.log(input_var);
  if (input_var.files && input_var.files[0])
     console.log("sdffds");
    {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#profile_pic').attr('src', e.target.result);
            $('#profile_pic').html(e.target.result);
        }
        reader.readAsDataURL(input_var.files[0]);
    }
})



$(document).on("click", "#add-address", function () {
  var alternative_address = $("#primary-address").clone();
  $(alternative_address).removeAttr("id");
  $(alternative_address).find('.country').removeClass('success');
  $(alternative_address).find('.state').removeClass('success');
  $(alternative_address).find('.city').removeClass('success');
  $(alternative_address).find('.pincode').removeClass('success');
  $(alternative_address).find('.country').removeClass('error');
  $(alternative_address).find('.state').removeClass('error');
  $(alternative_address).find('.city').removeClass('error');
  $(alternative_address).find('.pincode').removeClass('error');
  $(alternative_address).find('.select_city').val('');
  $(alternative_address).find('.select_pincode').val('');
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
  $.getJSON("static/states.json", function (result) {
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
  $.getJSON("static/countries.json", function (result) {
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
  $.getJSON("static/countries.json", function (countries) {
    for (let i = 0; i < countries.length; i++) {
      country_map.set("" + countries[i].id, countries[i].name);
    }
  });
  $.getJSON("static/states.json", function (states) {
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
 
   var name=checkName($("#name"));
   var email=checkEmail($("#email"));
   var mobile=checkMobileNumbers();
   var panNumber=checkPan($("#pan"));
   var aadharNumber=checkAadhar("#aadhar");
   var is_valid_captcha = checkCaptcha();
   var address=checkAddress();


  if(name && email && mobile && panNumber && aadharNumber && is_valid_captcha && address){
    $(".main-div").css("display", "none");
    $(".emp-details-main").show();
    var userImage = $('#profile_pic');
    console.log(userImage[0].currentSrc);
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


     $('#display_profile_pic').attr('src', userImage[0].currentSrc);
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

$(document).on('blur', '.country', function(){
  checkCountry(this);
});
$(document).on('blur', '.state', function(){
  checkState(this);
});
$(document).on('blur', '.city', function(){
  checkCity(this);
});
$(document).on('blur', '.pincode', function(){
  checkPincode(this);
});


function checkName(ele) {
  var pattern =
    /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
  var name = $(ele).val();
  if (pattern.test(name) && name !== "") {
    $(".error-mess-name").hide();
    $(".fname").removeClass("error");
    $(".fname").addClass("fname success");
    return true;
  } else {
    $('.error-mess-name').html("Full name should only contain alphabets and must be 2-30 characters long.");
    $(".error-mess-name").show();
    $(".fname").removeClass("success");
    $(".fname").addClass("fname error");
    return false;
  }
}

function checkEmail(ele) {
  var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var email = $(ele).val();
  if (pattern.test(email) && email !== "") {
    $(".error-mess-email").hide();
    $(".email").removeClass("error");
    $(".email").addClass("email success");
    return true;
  } else {
    $('.error-mess-email').html('Please provide a valid email address.');
    $(".error-mess-email").show();
    $(".email").removeClass("success");
    $(".email").addClass(".email error");
    return false;
  }
}


function checkMobileNumbers()
{

  let mobile_type=true;
  var number_fields = $('.mob');
  console.log(number_fields);
  for (var i=0; i<number_fields.length; i++)
  {
    if (!checkMobile(number_fields[i]))
      {
          mobile_type=false;
      }
    else{
      
    }
  }
  if(mobile_type){
     return true;
  }
  else{
    return false;
  }
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
  console.log("ssss");
  if (pattern.test(mobile) && mobile != "") {
    $(".error-mess-mob").hide();
    $(ele).removeClass("error");
    $(ele).addClass("mob success");
    return true;
  } else {
    $(ele).find('.error-mess-mob').html('Please provide a valid phone number.');
    $(ele).find(".error-mess-mob").show();
    $(ele).removeClass("success");
    $(ele).addClass("mob error");
    return false;
  }
}

function checkAadhar(ele) {
  var pattern = /^\d+$/;
  var aadhar = $(ele).val();
  if (pattern.test(aadhar) && aadhar.length===12) {
    $(".error-mess-aadhar").hide();
    $(".aadhar").removeClass("error");
    $(".aadhar").addClass("aadhar success");
    return true;
  } else {
    $('.error-mess-aadhar').html("Please provide a valid aadhar number.");
    $(".error-mess-aadhar").show();
    $(".aadhar").removeClass("success");
    $(".aadhar").addClass(".aadhar error");
    return false;
  }
}

function checkPan(ele) {
  var pattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  var panNumber = $(ele).val();
  if (pattern.test(panNumber) && panNumber != "") {
    $(".error-mess-pan").hide();
    $(".pan").removeClass("error");
    $(".pan").addClass("pan success");
    return true;
  } else {
    $('.error-mess-pan').html("Please provide a valid pan number.");
    $(".error-mess-pan").show();
    $(".pan").removeClass("success");
    $(".pan").addClass(".pan error");
    return false;
  }
}

function checkCountry(ele) {
  var country = $(ele).find('.select_country').val();
  console.log(country);
  if (country > 0) {
    $(ele).find(".error-mess-country").hide();
    $(ele).removeClass("error");
    $(ele).addClass("success");
    console.log("pass" , ele);
    return true;
  } else {
    $(ele).find(".error-mess-country").html("Please choose your country.");
    $(ele).find(".error-mess-country").show();
    $(ele).removeClass("success");
    $(ele).addClass("error");
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
    $(ele).find(".error-mess-state").html("Please choose your state.");
    $(ele).find(".error-mess-state").show();
    $(ele).removeClass("success");
    $(ele).addClass("error");
    return false;
  }
}

function checkCity(ele) {
  var pattern = /^[a-zA-Z]*$/;
  var city = $(ele).find('.select_city').val();
  if (pattern.test(city) && city.length>2) {
    $(ele).find(".error-mess-city").hide();
    $(ele).removeClass("error");
    $(ele).addClass("city success");
    return true;
  } else {
    $(ele).find(".error-mess-city").html("Please provide your city name.");
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
    $(ele).find(".error-mess-pincode").html("Please provide your pincode.");
    $(ele).find(".error-mess-pincode").show();
    $(ele).removeClass("success");
    $(ele).addClass("pincode error");
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


function checkCaptcha() {
   const res = $('#captcha_input').val();
   let resInt = parseInt(res);
   if (isNaN(resInt)) {
     $('.captcha-error-mess').text("Please enter captcha");
     return false;
   }
   else {
     console.log(resInt);
       if (resInt === expectOutput) {
         $('.captcha-error-mess').hide();
         $('.captcha1').addClass('captcha1 success')
           return true;
       }
       else{
        $('.captcha-error-mess').text("Invalid captcha");
        return false;
       }
   }

}
