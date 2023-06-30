import axios from 'axios';

const API_URL = 'https://users-test-xcdhbgn6qa-uc.a.run.app/users/signup/';

export const signup = async (email, password, username, phoneNumber) => {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
      username,
      phone_number: phoneNumber
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
