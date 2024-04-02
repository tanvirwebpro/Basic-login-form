import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroRegister = () => {
    const [registerError,setRegisterError]=useState(" ")
    const [success,setSuccess]=useState(' ');
    const [showPassword,setShowPassword]=useState(false);
    const handleRegister=e=>{
        e.preventDefault();
        const name= e.target.name.value;
        const email =e.target.email.value;
        const password=e.target.password.value;
        const terms =e.target.terms.checked;

        console.log(name,email,password,terms);
        if (password.length < 6) {
            setRegisterError('password should be at least 6 character');
            return;
        }
        else if(!/[A_Z]/.test(password)) {
          setRegisterError('your password should be an uppercase')
          return;
        }
        else if (!terms) {
          setRegisterError('Please accept our terms and condition')
          return;
        }
        setRegisterError(" ");
        setSuccess(' ');
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
           console.log(userCredential.user);
           setSuccess("user Created Successfully")

          //  update profile
          updateProfile(userCredential.user,{
            displayName:name 
          })
          .then(() => {
            console.log('profile updated')
            // ...
          }).catch((error) => {
            console.log(error)
            // ...
          });
          

          //send verification email:
          sendEmailVerification(userCredential.user)  
          .then(()=>{
            alert('Please check your email and verify your account')
          })

        })
        .catch((error) => {
         console.error(error);
         setRegisterError(error.message)
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
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" name="name" placeholder="Your name" className="input input-bordered" required />
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relative ">
          <input 
          type={showPassword ?  "text" :"password" } 
          name="password" 
          placeholder="password" 
          className="input input-bordered" 
          required />
          <span className="absolute left-" onClick={()=> setShowPassword(!showPassword)}>{
                  showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                  }
          </span>
          </div>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
          <br />
         <div className="flex gap-4 justify-start">
         <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms"><a>Accept terms and condition</a></label>
         </div>
        </div>
        <div className="form-control mt-6">
          <input type="submit" value="Register Now" />
        </div>
      </form>
      {
        registerError && <p>{registerError}</p>
      }
      {
        success && <p className="text-green-600">{success}</p>
      }
      <p>Already have an account <Link to='/login'><span className="underline">Login Now</span></Link></p>
    </div>
  </div>
</div>
        </div>
    );
};

export default HeroRegister;