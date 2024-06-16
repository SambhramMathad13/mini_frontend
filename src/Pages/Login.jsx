import React, { useRef, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import api from '../Utils/Axios';
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

function Login() {
    const formRef = useRef();
    const [load, setLoad] = useState(false);
    const [msg, setMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    async function submit(event) {
        event.preventDefault();
        const username = formRef.current.user.value;
        const password = formRef.current.pass.value;
        setLoad(true);

        try {
            const res = await api.post('/api/gettoken', { username, password });
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            navigate("/home", { state: { userData: username } });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMsg("Invalid Username or Password");
            }
        } finally {
            setLoad(false);
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        load ? (
             <div className="loader-container">
      <div className="loader"></div>
    </div>
        ) : (
            <>
                <Navbar isauth={false}/>
                <Card className="w-[400px] mx-auto">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} ref={formRef} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
                            <div className="grid w-full items-center gap-4">
                                {msg && <div className="text-red-500">{msg}</div>}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="user">Username</Label>
                                    <Input id="user" name="user" placeholder="Username" required minLength="5" maxLength="12" />
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
                            </div>
                            <CardFooter className="flex flex-col space-y-3 mt-6">
                                <Link to="/forgotpassword" className="text-blue-500">Forgot password?</Link>
                                <Link to="/register">Don't have an account? <span className="text-blue-500">Register</span></Link>
                                <div className="flex justify-between w-full">
                                    <Button variant="outline" onClick={() => navigate('/')}>Back</Button>
                                    <Button type="submit">Submit</Button>
                                </div>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </>
        )
    );
}

export default Login;
