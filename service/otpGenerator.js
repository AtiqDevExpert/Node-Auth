const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
  return otp.toString(); // Convert the number to a string
};

module.exports = { generateOTP };
