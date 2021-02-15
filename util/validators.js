// Preforms checks  to see if register has any errors
module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  // checks username is not empty
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  // checks email is not empty
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    // super basic email validation
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  // checks password isn't empty
  if (password === "") {
    errors.password = "Password must not be empty";
    // checks if the password doesn't match
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password must match";
  }
  // returns errors
  // if theres no errors it will return true else it will return false
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

// login checks
// checks that username and password are not empty
module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  // checks username is not empty
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  // password is not empty
  if (password === "") {
    errors.password = "Password must not be empty";
  }

  // returns errors
  // if theres no errors it will return true else it will return false
  // this is used twice make a function
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
