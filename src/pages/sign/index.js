import { useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "400px",
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "",
    borderRadius: "20px",
    boxShadow: "5px 5px 5px 10px black",
  },
  background: {
    position: "absolute",
    zIndex: "-1",
    width: "100vw",
    height: "100vh",
  },

  loginbox: {
    width: "300px",
    width: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  inp: {
    height: "25px",
    width: "250px",
    borderRadius: "5px",
    border: "1px solid",
    backgroundColor: "black",
    color: "white",
  },
  butdiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100px",
    height: "20px",
    borderRadius: "10px",
    backgroundColor: "black",
    color: "white",
    backgroundColor: "black",
  },
  label: {
    color: "white",
  },
  smallbox: {
    width: "200px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    width: "100px",
    height: "20px",
    borderRadius: "10px",
    backgroundColor: "grey",
    color: "white",
  },
  error: {
    color: "blue",
  },
};

function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [required, setRequired] = useState("");

  const handleChangeUsername = (event) => {
    const username = event.target.value;
    if (username.length < 4) {
      setUsernameError("Username must be more than 4 characters");
    } else {
      setUsernameError("");
    }
    setUsername(username);
  };
  const handleChangePassword = (event) => {
    const password = event.target.value;
    if (password.length < 8) {
      setPasswordError("Password must be more than 8 characters");
    } else {
      setPasswordError("");
    }
    setPassword(password);
  };

  const handleChangeEmail = (event) => {
    const email = event.target.value;
    if (email.includes("@")) {
      setEmailError("");
    } else {
      setEmailError("Please enter valid email");
    }
    setEmail(email);
  };

  const handleChangeAge = (event) => {
    const age = event.target.value;
    if (age >= 18) {
      setAgeError("");
    } else {
      setAgeError("Too young");
    }
    setAge(age);
  };

  const handleChangeConfirmPassword = (event) => {
    const confirmPassword = event.target.value;
    if (confirmPassword.length < 8) {
      setConfirmPasswordError("Password must be more than 8 characters");
    } else {
      setConfirmPasswordError("");
    }
    setConfirmPassword(confirmPassword);
  };

  const handleSignup = () => {
    if (
      username === "" ||
      confirmPassword === "" ||
      age === "" ||
      email === "" ||
      password === ""
    ) {
      setRequired("Please enter all inputs");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords doesn't match");
    } else {
      axios
        .post("https://quizapp-backend-87e5.onrender.com/sign", {
          email: email,
          password: password,
          age: age,
          username: username,
        })
        .then((res) => {
          router.push("/");
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
          setRequired("Email address is already used");
        });
    }
  };

  const change = () => {
    router.replace("/");
  };

  return (
    <div style={styles.container}>
      <img
        src="https://images.unsplash.com/photo-1568642271196-72dcb45ffd2a?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={styles.background}
      />
      <div style={styles.box}>
        <div style={styles.loginbox}>
          <div>
            <div style={styles.smallbox}>
              <h1>SIGN UP</h1>
            </div>

            <br></br>
            <div style={styles.inpdiv}>
              <input
                type="text"
                placeholder=" username"
                value={username}
                style={styles.inp}
                onChange={handleChangeUsername}
              ></input>
              <div style={styles.error}>{usernameError}</div>
              <br></br>

              <input
                type="text"
                placeholder=" email"
                value={email}
                style={styles.inp}
                onChange={handleChangeEmail}
              ></input>
              <div style={styles.error}>{emailError}</div>

              <br></br>
              <input
                type="text"
                placeholder=" age"
                value={age}
                style={styles.inp}
                onChange={handleChangeAge}
              ></input>
              <div style={styles.error}>{ageError}</div>
              <br></br>
              <input
                type="password"
                placeholder=" password"
                value={password}
                style={styles.inp}
                onChange={handleChangePassword}
              ></input>

              <div style={styles.error}>{passwordError}</div>
              <br></br>

              <input
                type="password"
                placeholder=" Confirm password"
                value={confirmPassword}
                style={styles.inp}
                onChange={handleChangeConfirmPassword}
              ></input>
              <div style={styles.error}>{confirmPasswordError}</div>
            </div>
            <br></br>
            <br></br>
            <div style={styles.butdiv}>
              <div style={styles.error}>{required}</div>
              <button
                //   onClick={() => createUser(email, password)}
                style={styles.buttons}
                onClick={handleSignup}
              >
                SIGN
              </button>

              <p style={{ color: "white" }}>or</p>
              <button style={styles.buttons} onClick={() => change()}>
                LOG IN
              </button>
              <br></br>
              <button onClick={() => router.push("/")} style={styles.back}>
                back
              </button>
            </div>
            <br></br>
            <br></br>

            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
