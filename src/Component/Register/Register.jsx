

const Register = () => {
    const handleRegister = e =>{
        e.preventDefault();
        const email =e.target.email.value;
        const password =e.target.password.value;
        console.log(email,password)
    }
    return (
        <div>
            <h1>plaese register</h1>
            <form onSubmit={handleRegister}>
                <input type="email" name="email" /><br />
                <br />
                <input type="password" name="password" /><br />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default Register;