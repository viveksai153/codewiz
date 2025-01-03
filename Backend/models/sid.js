// sid.js

function generateUniqueSid() {
    const prefix = 'SNIPPET'; // Prefix for the SID
    const timestamp = Date.now(); // Current timestamp
  
    // Combine prefix and timestamp to create a unique SID
    const sid = `${prefix}_${timestamp}`;
  
    return sid;
  }
  
  module.exports = { generateUniqueSid }; // Export the function
  