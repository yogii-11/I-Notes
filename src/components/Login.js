import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  let navigate = useNavigate();
  const [credential, setCredential] = useState({email: "", password: ""})
  const handleSubmit = async (e)=>{
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: credential.email, password: credential.password}),
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      props.showAlert("Logged In Successfully", "success")
      navigate("/");
    }
    else{
      props.showAlert("Invalid credentials", "danger")
    }
  }

  const onChange=(e)=>{
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  return (
    <>
    <div className='container col-md-6'>
      <h2 className='my-4 text-center'>Log In</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credential.email}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credential.password}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    </>
  )
}

export default Login
