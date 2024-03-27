import validator from 'validator'
import { User } from '../models/user.model.js';
// Function to check if an email is in a valid format
 function isValidEmail(email) {
  return validator.isEmail(email);
}

// Function to check if a password meets the required format
 function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return passwordRegex.test(password);
}

 function isValidFullName(name) {
  // Regular expression for alphabetic characters, spaces, hyphens, and apostrophes
  const nameRegex = /^[A-Za-z\s'-]+$/;

  // Check if the name matches the regular expression
  return nameRegex.test(name);
}

 function getFirstName(fullName) {
  // Split the full name into parts based on whitespace
  const nameParts = fullName.trim().split(/\s+/);

  // Take the first part as the first name
  const firstName = nameParts[0];

  return firstName;
}

const generateRandomString = (length) => {
  return Math.random().toString(36).substring(2, length + 2);
};

// Function to generate a unique username based on the full name
const generateUsername = async (fullName) => {
  const firstName = getFirstName(fullName);
  let username = firstName + generateRandomString(6);
  while (true) {
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
          return username;
      }
      username = firstName + generateRandomString(6);
  }
};

export {
    generateRandomString,
    isValidEmail,
    isValidPassword,
    isValidFullName,
    generateUsername
}