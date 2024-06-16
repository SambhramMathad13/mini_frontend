import React, { useState, useRef, useEffect } from "react";
import api from "../Utils/Axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

function Register() {
  const formRef = useRef();
  const [load, setLoad] = useState(false);
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validatePasswords();
  }, [password, confirmPassword]);

  const validatePasswords = () => {
    const passwordLengthValid = password.length >= 5 && password.length <= 12;
    const passwordsMatch = password === confirmPassword;

    setPasswordValid(passwordLengthValid);
    setConfirmPasswordValid(passwordsMatch);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function submit(event) {
    setLoad(true);
    event.preventDefault();
    const user = formRef.current.user.value;
    const email = formRef.current.email.value;

    if (!passwordValid || !confirmPasswordValid) {
      setMsg("Please fill out all required fields correctly.");
      setLoad(false);
      return;
    }

    try {
      const res = await api.post("/api/createuser", {
        username: user,
        email: email,
        password: password,
      });
      setMsg("An account verification link has been sent to your given email address.");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const usermsg = error.response.data.username[0];
        setMsg(usermsg);
      }
    } finally {
      setLoad(false);
    }
  }

  return load ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Navbar isauth={false} />
      <div className="mt-12">
        <Card className="w-[400px] mx-auto">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} ref={formRef} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
              <div className="grid w-full items-center gap-4">
                {msg && <div className="text-red-500">{msg}</div>}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="user">Username</Label>
                  <Input
                    id="user"
                    name="user"
                    placeholder="Username"
                    required
                    minLength="5"
                    maxLength="12"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    minLength="13"
                    maxLength="30"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="pass">Password</Label>
                  <div className="relative">
                    <Input
                      id="pass"
                      name="pass"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      minLength="5"
                      maxLength="12"
                      value={password}
                      onChange={handlePasswordChange}
                      style={{ borderColor: passwordValid ? 'green' : 'red' }}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPass">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPass"
                      name="confirmPass"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      required
                      maxLength="12"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      style={{ borderColor: confirmPasswordValid && confirmPassword ? 'green' : 'red' }}
                    />
                    <button
                      type="button"
                      onClick={toggleShowConfirmPassword}
                      className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                    >
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
              </div>
              <CardFooter className="flex flex-col space-y-3 mt-6">
                <Link to="/login">Already have an account? <span className="text-blue-500">Login</span></Link>
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => navigate('/')}>Cancel</Button>
                  <Button type="submit" disabled={!passwordValid || !confirmPasswordValid}>Submit</Button>
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Register;
