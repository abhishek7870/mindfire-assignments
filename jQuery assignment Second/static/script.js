var captcha_validation = false;
var address_seperated = [];

const equation = ["-", "+", "*", "/"];
let expectOutput = "";
let captchaEquation = "";

const full_name_pattern = /^[A-Za-z]{2,15}(\s[A-Za-z]{2,15})?(\s[A-Za-z]{2,15})?$/;
const city_pattern = /^[A-Za-z]{2,30}(\s[A-Za-z]{2,30})?$/;
const email_pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/;
const number_pattern = /^[^0-1][0-9]{9}$/;
const pan_pattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const pincode_pattern = /^\d{6}$/;
const aadhar_pattern = /^\d{12}$/;

$(document).ready(function () {
  $(".refresh").click(function (e) {
    e.preventDefault();
    generateCaptchaEquation();
    $(".captcha-error-mess").hide();
    $(".captcha_div").removeClass("success");
  });
  loadCountries($("#current_country"));
  $(".emp-details-main").hide();
});

$("#add-phone").click(function (e) {
  var clonned_mob_div = $("#primary-mob").clone();
  $(clonned_mob_div).removeAttr("id");
  $(clonned_mob_div).children("h5:first").remove();
  $(clonned_mob_div).children("input:first").addClass("margleft-20").val("");

  var add_phone = $(clonned_mob_div).find("#add-phone");
  $(add_phone).removeClass("fa-plus-circle");
  $(add_phone).addClass("fa-trash");
  $(add_phone).removeAttr("id");
  $(add_phone).addClass("remove-phone");
  $(clonned_mob_div).removeClass("success");
  $(clonned_mob_div).removeClass("error");
  $(clonned_mob_div).find(".error-mess-mob").hide();

  $(clonned_mob_div).insertAfter("#primary-mob");
});

$(document).on("change", "#file", function () {
  var input_var = $("#file")[0];
  if (input_var.files && input_var.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#profile_pic").attr("src", e.target.result);
      $("#profile_pic").html(e.target.result);
    };
    reader.readAsDataURL(input_var.files[0]);
  }
});

$(document).on("click", "#add-address", function () {
  var alternative_address = $("#primary-address").clone();

  $(alternative_address).removeAttr("id");
  $(alternative_address).find(".country").removeClass("success error");
  $(alternative_address).find(".state").removeClass("success error");
  $(alternative_address).find(".city").removeClass("success error");
  $(alternative_address).find(".pincode").removeClass("success error");
  $(alternative_address).find(".select_city, .select_pincode").val("");
  $(alternative_address)
    .find(
      ".error-mess-country, .error-mess-state, .error-mess-city, .error-mess-pincode"
    )
    .text("");
  $(alternative_address).find(".add-link").remove();

  var delete_btn = '<button class="delete">Delete</button>';
  $(delete_btn).insertAfter($(alternative_address).find(".pincode"));
  $(alternative_address).insertAfter("#primary-address");
});

$(document).on("click", ".remove-phone", function () {
  $(this).parent(".mob").remove();
});

function loadStates(country_field) {
  var parent_div = $(country_field).parents(".address");
  var state_field = $(parent_div[0]).find(".select_state");
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
        "<option value='" + countries.id + "'>" + countries.name + "</option>";
    });
    $(country_field).append(country_options);
  });
}

$(document).on("change", ".select_country", function () {
  loadStates(this);
});

$(document).on("click", ".delete", function () {
  $(this).closest(".right-down").remove();
});

$(document).on("click", "#submit", function () {
  $(".error-msg").hide();
  var name = checkName($("#name"));
  var email = checkEmail($("#email"));
  var mobile = checkMobileNumbers();
  var panNumber = checkPan($("#pan"));
  var aadharNumber = checkAadhar("#aadhar");
  var is_valid_captcha = checkCaptcha();
  var address = checkAddress();

  if (
    name &&
    email &&
    mobile &&
    panNumber &&
    aadharNumber &&
    is_valid_captcha &&
    address
  ) {
    $(".main-div").css("display", "none");
    $(".emp-details-main").show();
    var userImage = $("#profile_pic");
    var name = $("#name").val();
    var email = $("#email").val();
    var mobiles = $(".mob");
    var mobile_numbers = "";

    for (var i = 0; i < mobiles.length; i++) {
      var new_mobile = $(mobiles[i]).find("input").val();
      mobile_numbers += new_mobile + ", ";
    }
    $(".emp-mob h2").html(mobile_numbers);

    var pan = $("#pan").val();
    var aadhar = $("#aadhar").val();

    var address = $(".address");
    var display_address = "";
    for (var i = 0; i < address.length; i++) {
      let country = $(address[i])
        .find(".select_country")
        .find(":selected")
        .text();
      let state = $(address[i]).find(".select_state").find(":selected").text();
      let city = $(address[i]).find(".select_city").val();
      let pincode = $(address[i]).find(".select_pincode").val();
      display_address +=
        country + "," + state + ", " + city + ", " + pincode + "<br>";
    }

    $("#display_profile_pic").attr("src", userImage[0].currentSrc);
    $(".name h1").html(name);
    $(".name h4").html(email);
    $(".emp-name h2").html(name);
    $(".emp-email h2").html(email);

    $(".emp-pan h2").html(pan);
    $(".emp-aadhar h2").html(aadhar);
    $(".emp-address-details p").html(display_address);
  } else {
    $(".valid_captcha2").show();
    $(".valid_captcha2").addClass("error");
  }
});

$(document).on("blur", ".country", function () {
  checkCountry(this);
  if (this.className === "country error") {
    checkState($(this).next(".state"));
  }
});

$(document).on("blur", ".state", function () {
  checkState(this);
});

$(document).on("blur", ".city", function () {
  checkCity(this);
});
$(document).on("blur", ".pincode", function () {
  checkPincode(this);
});

function checkName(ele) {
  var name = $.trim($(ele).val());
  name=name.replace(/\s\s+/g, ' ');
  $(ele).val(name);
  if (full_name_pattern.test(name)) {
    $(".error-mess-name").hide();
    $(".fname").removeClass("error").addClass("fname success");
    return true;
  }
  $(".error-mess-name").html(
    "Full name should only contain alphabets and must be 2-30 characters long."
  );
  $(".error-mess-name").show();
  $(".fname").removeClass("success").addClass("fname error");
  return false;
}

function checkEmail(ele) {
  var email = $(ele).val();
  if (email_pattern.test(email)) {
    $(".error-mess-email").hide();
    $(".email").removeClass("error").addClass("email success");
    return true;
  }
  $(".error-mess-email").html("Please provide a valid email address.");
  $(".error-mess-email").show();
  $(".email").removeClass("success").addClass(".email error");
  return false;
}

function checkMobileNumbers(le) {
  let is_mobile_number = true;
  var number_fields = $(".mob");

  for (var i = 0; i < number_fields.length; i++) {
    if (!checkMobile($(number_fields[i]).find("input"))) {
      is_mobile_number = false;
    }
  }
  return is_mobile_number;
}

function checkAddress() {
  var is_address = true;
  var address_fields = $(".address");

  for (var i = 0; i < address_fields.length; i++) {
    let valid_country = checkCountry($(address_fields[i]).find(".country"));
    let valid_state = checkState($(address_fields[i]).find(".state"));
    let valid_city = checkCity($(address_fields[i]).find(".city"));
    let valid_pincode = checkPincode($(address_fields[i]).find(".pincode"));
    if (
      is_address &&
      (!valid_country || !valid_state || !valid_city || !valid_pincode)
    ) {
      is_address = false;
    }
  }
  return is_address;
}

function checkMobile(ele) {
  var ele_parent = $(ele).parent()[0];
  var mobile = $(ele).val();

  if (number_pattern.test(mobile)) {
    $(ele_parent).find(".error-mess-mob").hide();
    $(ele_parent).removeClass("error").addClass("mob success");
    return true;
  }
  $(ele_parent)
    .find(".error-mess-mob")
    .html("Please provide a valid phone number.")
    .show();
  $(ele_parent).removeClass("success").addClass("mob error");
  return false;
}

function checkAadhar(ele) {
  var aadhar = $(ele).val();
  if (aadhar_pattern.test(aadhar)) {
    $(".error-mess-aadhar").hide();
    $(".aadhar").removeClass("error").addClass("success");
    return true;
  }
  $(".error-mess-aadhar").html("Please provide a valid aadhar number.").show();
  $(".aadhar").removeClass("success").addClass("error");
  return false;
}

function checkPan(ele) {
  var panNumber = $(ele).val();
  if (pan_pattern.test(panNumber)) {
    $(".error-mess-pan").hide();
    $(".pan").removeClass("error").addClass("success");
    return true;
  }
  $(".error-mess-pan").html("Please provide a valid pan number.").show();
  $(".pan").removeClass("success").addClass("error");
  return false;
}

function checkCountry(ele) {
  var country = $(ele).find(".select_country").val();
  if (country > 0) {
    $(ele).find(".error-mess-country").hide();
    $(ele).removeClass("error").addClass("success");
    return true;
  }
  $(ele).find(".error-mess-country").html("Please choose your country.");
  $(ele).find(".error-mess-country").show();
  $(ele).removeClass("success").addClass("error");
  return false;
}

function checkState(ele) {
  var state = $(ele).find(".select_state").val();
  if (state > 0) {
    $(ele).find(".error-mess-state").hide();
    $(ele).removeClass("error").addClass("success");
    return true;
  }
  $(ele).find(".error-mess-state").html("Please choose your state.");
  $(ele).find(".error-mess-state").show();
  $(ele).removeClass("success").addClass("error");
  return false;
}

function checkCity(ele) {
  var city = $.trim($(ele).find(".select_city").val());
  city = city.replace(/\s\s+/g, ' ');
  $(ele).find(".select_city").val(city);
  if (city_pattern.test(city)) {
    $(ele).find(".error-mess-city").hide();
    $(ele).removeClass("error").addClass("success");
    return true;
  }
  $(ele).find(".error-mess-city").html("Please provide your city name.").show();
  $(ele).removeClass("success").addClass("error");
  return false;
}

function checkPincode(ele) {
  var pincode = $(ele).find(".select_pincode").val();
  if (pincode_pattern.test(pincode)) {
    $(ele).find(".error-mess-pincode").hide();
    $(ele).removeClass("error").addClass("success");
    return true;
  }
  $(ele)
    .find(".error-mess-pincode")
    .html("Please provide your pincode.")
    .show();
  $(ele).removeClass("success").addClass("error");
  return false;
}

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
  const res = $("#captcha_input").val();
  let resInt = parseInt(res);
  if (isNaN(resInt)) {
    $(".captcha-error-mess").show();
    $(".captcha-error-mess").text("Please enter captcha");
    return false;
  } else {
    if (resInt === expectOutput) {
      $(".captcha-error-mess").hide();
      $(".captcha_div").addClass("captcha_div success");
      return true;
    } else {
      $(".captcha-error-mess").show();
      $(".captcha-error-mess").text("Invalid captcha");
      return false;
    }
  }
}
