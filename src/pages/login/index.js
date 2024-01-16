import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [required, setRequired] = useState("");

  const handleChangeEmail = (event) => {
    const email = event.target.value;
    if (email.includes("@")) {
      setEmailError("");
    } else {
      setEmailError("Please enter valid email");
    }
    setEmail(email);
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

  const handleSignup = async () => {
    if (email === "" || password === "") {
      setRequired("Please enter all inputs");
    } else {
      await axios
        .post("https://quizapp-backend-87e5.onrender.com/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          const user = res.data;
          localStorage.setItem("user", user);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          setRequired(err.message);
        });
    }
  };

  const change = () => {
    router.push("/sign");
  };

  return (
    <div style={styles.container}>
      <img
        src="https://images.unsplash.com/photo-1551600854-b0d4f3f09bc6?q=80&w=2424&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={styles.background}
      />
      <div style={styles.box}>
        <div style={styles.loginbox}>
          <div>
            <div
              style={{
                width: "200px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                <h3 style={styles.text}>WELCOME BACK</h3>
                <p style={styles.text}>log in to continue </p>
              </div>
            </div>
            <br></br>
            <br></br>

            <br></br>
            <input
              placeholder="email"
              value={email}
              onChange={handleChangeEmail}
              style={styles.inp}
            ></input>
            <div style={styles.error}>{emailError}</div>

            <br></br>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={handleChangePassword}
              style={styles.inp}
            ></input>
            <div style={styles.error}>{passwordError}</div>
            <br></br>

            <div style={styles.butdiv}>
              <div style={styles.error}>{required}</div>
              <button onClick={handleSignup} style={styles.buttons}>
                LOGIN
              </button>

              <p style={{ color: "white" }}>or</p>

              <button onClick={() => change()} style={styles.buttons}>
                SIGN IN
              </button>
              <br></br>
              <button onClick={() => router.push("/")} style={styles.back}>
                back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "300px",
    height: "500px",
    display: "flex",
    borderRadius: "20px",
    backgroundColor: "",
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
  buttons: {
    width: "100px",
    height: "20px",
    borderRadius: "10px",
    backgroundColor: "black",
    color: "white",
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
  text: {
    color: "white",
  },
  label: { color: "white" },
  back: {
    width: "100px",
    height: "20px",
    borderRadius: "10px",
    backgroundColor: "grey",
    color: "white",
  },
  error: {
    color: "red",
  },
};

export default Login;
