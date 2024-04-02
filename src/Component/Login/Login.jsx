import { signInWithEmailAndPassword,getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [success,setSuccess]=useState(' ');  
    const [loginError,setLoginError]=useState(' ');
    const emailRef =useRef(null)


    const handleLogin =e=>{
        e.preventDefault();
        const email =e.target.email.value;
        const password =e.target.password.value;
        console.log(email,password);

        setLoginError(' ');
        setSuccess(' ')

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user);

            if (result.user) {
                setSuccess('login successfully');
            }
            else{
                alert('At first verifiy your account')
            }
        })
        .catch(error=>{ 
            console.error(error)
            setLoginError('something wrong , Give us a valid email and password')
        })
    }

    const handleForgetPassword =()=>{

        const auth = getAuth(app);

        const email =emailRef.current.value;
        if (!email) {
            console.log('give  a email',emailRef.current.value)
            return;
        }
        else if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)) {
            console.log('please write a valid email')
            return;
        }
        // send validation email
        sendPasswordResetEmail(auth,email)
        .then(() => {

            alert('Please check your email')
            // Password reset email sent!
            // ..
          })
          .catch((error) => {
            console.log(error)
          });
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
           type="email"
            name="email"
            ref={emailRef}
             placeholder="email"
              className="input input-bordered"
               required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {
        success && <p>{success}</p>
      }
      {
        loginError && <p className="text-red-700 text-[40px]">{loginError}</p>
      }
      <p>Have no account ? <Link to='/hero'><span className="underline">Register Now</span></Link></p>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;