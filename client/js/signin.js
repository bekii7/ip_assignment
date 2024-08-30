document.addEventListener('DOMContentLoaded', () => {
  const signInTab = document.getElementById('signInTab');
  const signUpTab = document.getElementById('signUpTab');
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const signInButton = document.getElementById('signInButton');
  const signUpButton = document.getElementById('signUpButton');
  const togglePasswordSignIn = document.getElementById('togglePasswordSignIn');
  const togglePasswordSignUp = document.getElementById('togglePasswordSignUp');
  const errorDiv = document.getElementById('error');
  const userTakenError = document.getElementById('userTakenError');
  const passwordLengthErrorSignIn = document.getElementById('passwordLengthErrorSignIn');
  const passwordLengthErrorSignUp = document.getElementById('passwordLengthErrorSignUp');
  
  // Handle tab switching
  signInTab.addEventListener('click', () => {
      signInForm.style.display = 'block';
      signUpForm.style.display = 'none';
      signInTab.classList.add('active');
      signUpTab.classList.remove('active');
      errorDiv.style.display = 'none';
  });

  signUpTab.addEventListener('click', () => {
      signInForm.style.display = 'none';
      signUpForm.style.display = 'block';
      signInTab.classList.remove('active');
      signUpTab.classList.add('active');
      errorDiv.style.display = 'none';
  });

  // Toggle password visibility
  togglePasswordSignIn.addEventListener('click', () => {
      const passwordField = document.getElementById('signInPassword');
      if (passwordField.type === 'password') {
          passwordField.type = 'text';
          togglePasswordSignIn.innerHTML = '<i class="fa fa-eye-slash"></i>'; // Change to eye-slash icon
      } else {
          passwordField.type = 'password';
          togglePasswordSignIn.innerHTML = '<i class="fa fa-eye"></i>'; // Change to eye icon
      }
  });

  togglePasswordSignUp.addEventListener('click', () => {
      const passwordField = document.getElementById('signUpPassword');
      if (passwordField.type === 'password') {
          passwordField.type = 'text';
          togglePasswordSignUp.innerHTML = '<i class="fa fa-eye-slash"></i>'; // Change to eye-slash icon
      } else {
          passwordField.type = 'password';
          togglePasswordSignUp.innerHTML = '<i class="fa fa-eye"></i>'; // Change to eye icon
      }
  });

  // Sign In
  signInButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const userName = document.getElementById('signInUserName').value;
      const password = document.getElementById('signInPassword').value;

      // Validate inputs
      if (password.length < 8) {
          passwordLengthErrorSignIn.style.display = 'block';
          return;
      } else {
          passwordLengthErrorSignIn.style.display = 'none';
      }

      try {
          const response = await fetch('http://localhost:3000/signin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userName, password })
          });
          const data = await response.json();

          if (data.success) {
              window.location.href = `../client/homePage.html?user=${userName}`;
          } else {
              errorDiv.textContent = 'Incorrect UserName or Password';
              errorDiv.style.display = 'block';
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });

  // Sign Up
  signUpButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const userName = document.getElementById('signUpUserName').value;
      const email = document.getElementById('signUpEmail').value;
      const password = document.getElementById('signUpPassword').value;

      // Validate inputs
      if (password.length < 8) {
          passwordLengthErrorSignUp.style.display = 'block';
          return;
      } else {
          passwordLengthErrorSignUp.style.display = 'none';
      }

      if (!email.endsWith('@gmail.com')) {
          errorDiv.textContent = 'Email must end with @gmail.com';
          errorDiv.style.display = 'block';
          return;
      }

      try {
          const response = await fetch('http://localhost:3000/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userName, email, password })
          });
          const data = await response.json();

          if (data.success) {
              window.location.href = '../client/homePage.html';;
          } else {
              errorDiv.textContent = data.message;
              errorDiv.style.display = 'block';
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
});
