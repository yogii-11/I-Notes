import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  let navigate = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "", name: "", cpassword: "" })
  const { name, email, password } = credential

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, name }),
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate("/");
      props.showAlert("Account Created Successfully", "success")
    } else {
      props.showAlert("Invalid credentials", "danger")
    }
    
  }


  return (
    <>
      <div className='container col-md-6'>
        <h2 className='my-4 text-center'>Sign Up</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' onChange={onChange} value={credential.name}  required/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credential.email}  required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credential.password} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credential.cpassword} minLength={5} required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup