const userName = document.getElementById('username')
const email = document.getElementById('email')
const userNameInput = document.getElementById('newUsername')
const emailInput = document.getElementById('newEmail')
const profilePic = document.querySelector('profile-pic')
const ppInput = document.getElementById('newProfilePic')
const update = document.getElementById('update')



update.addEventListener('click',(e)=>{

  e.preventDefault()
  console.log(emailInput)
  let newUsername= userNameInput.value
  let newEmail = emailInput.value

  userName.innerText= newUsername
  email.innerText = newEmail

})