// menu
const menu = document.querySelector(".navbar__links");
const menuButton = document.querySelector(".navbar__icons");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("navbar__open");
  menuButton.classList.toggle("navbar__close");
})


// icon footer
let iconFooters = document.querySelectorAll(".footer-icons i");
for (let i = 0; i < iconFooters.length; i++) {
  iconFooters[i].addEventListener("mouseover", () => {
    iconFooters[i].style.color = "white";
  })
  iconFooters[i].addEventListener("mouseout", () => {
    iconFooters[i].style.color = "var(--green)";
  })
}


// heme
const currentPage = window.location.pathname;
const currentPageWithoutSlash = currentPage.slice(1);
console.log(currentPageWithoutSlash);
const menuItems = document.querySelectorAll(".navbar__link a");
menuItems.forEach((item) => {
  const href = item.getAttribute('href');
  if (currentPageWithoutSlash === href) {
    item.classList.add('abc');
  }
  else {
    item.classList.remove('abc');
  }
});


// eye password
// <i class="fa-regular fa-eye-slash"></i>
// <i class="fa-sharp fa-regular fa-eye"></i> 
const iconPasswords = document.querySelectorAll(".form__cart.cart_password .fa-sharp.fa-regular.fa-eye");
const inputPasswords = document.querySelectorAll(".form__cart.cart_password input");
for (let i = 0; i < iconPasswords.length; i++) {
  iconPasswords[i].addEventListener("click", () => {
    if (inputPasswords[i].type === "password") {
      inputPasswords[i].type = "text";
      iconPasswords[i].classList.remove("fa-sharp");
      iconPasswords[i].classList.remove("fa-eye");
      iconPasswords[i].classList.add("fa-eye-slash");
    }
    else {
      inputPasswords[i].type = "password";
      iconPasswords[i].classList.add("fa-sharp");
      iconPasswords[i].classList.add("fa-eye");
      iconPasswords[i].classList.remove("fa-eye-slash");
    }
  })
}


// validate form


function Validator(options) {

  function validate(inputElement, rule,errorElement) {
    var errorMessage = rule.test(inputElement.value);
    if (errorMessage) {
      errorElement.innerText = errorMessage;
    } else {
      errorElement.innerText = "";
    }
  }

  var formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
      if (inputElement) {
        // xử lý trường hợp blur khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule,errorElement);
        }

        // Xử lý khi người dùng nhập
        inputElement.oninput = function(){
          errorElement.innerText = "";
        }
      }
    })
  }
}

Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined :message || "Vui lòng nhập trường này";
    }
  }
}
Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)? undefined :message || "Trường này phải là email";
    }
  }
}
Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min ? undefined :message || "Phải nhập tối thiểu " + min + " kí tự";
    }
  };
};
Validator.isComfirm = function (selector, getComfirm, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getComfirm()?undefined:message || "Mật khẩu không khớp";
    }
  };
};




Validator({
  form: "#SignUp_form",
  errorSelector: "#error_message",
  rules: [
    Validator.isRequired("#name"),
    Validator.isEmail("#email"),
    Validator.minLength("#pass", 6),
    Validator.isComfirm("#repass", function(){
      return document.querySelector("#SignUp_form #pass").value;
    }, "Mật khẩu nhập lại không chính xác"),
  ]
});
