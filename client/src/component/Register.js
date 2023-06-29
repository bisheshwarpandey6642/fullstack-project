import React, {useState} from 'react';


function Register() {

    //const history = useHistory
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }


const handleRegistration =  async () => {
    try {
const formData = new URLSearchParams()
formData.append('username', username)
formData.append('password', password)

const response = await fetch('http://localhost:8080/register', {
    method: 'POST',
    header: {'Content-Type': 'application/x-form-urlencoded'},
    body: formData.toString
})

if(response.ok) {
    //history.push('/home')
}else{
    const errorData =  await response.json()
    console.error("Registration error", errorData)
}
    }catch(error) {
        console.error("Registration error", error)
    }
}



  return (
   <div>
    <h1>Register a user</h1>
    <div>
        <label>username:</label>
        <input type='text' value={username} onchange={handleUsernameChange}/>
    </div>
    <div>
    <label>Password:</label>
        <input type='password' value={password} onchange={handlePasswordChange}/>
        </div>
        <div>
            <button onClick={handleRegistration}>Register</button>
        </div>
   </div>
  );
}

export default Register;