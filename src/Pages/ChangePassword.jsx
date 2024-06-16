import React, { useState } from 'react';
import api from '../Utils/Axios';
import { Button } from "@/Components/ui/button";
import { useNavigate } from 'react-router-dom';
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

function ChangePassword() {
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [c_password, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [load, setLoad] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        setLoad(true);

        if (new_password !== c_password) {
            setLoad(false);
            setMsg("Password mismatch");
        } else {
            try {
                const res = await api.post(`/api/changepassword`, { old_password, new_password });
                setMsg(res.data.msg);
            } catch (error) {
                setMsg("Please enter correct old password");
            } finally {
                setLoad(false);
            }
        }
    }

    return (
        load ? (<h1>Loading...</h1>) : (
            <>
                <div className="flex justify-center mt-20">
                    <Card className="w-full max-w-xl mx-auto">
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your password below</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit}>
                                <div className="grid gap-4">
                                    {msg && <div className="text-red-500">{msg}</div>}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="old_password">Old Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="old_password"
                                                name="old_password"
                                                type={showOldPassword ? "text" : "password"}
                                                value={old_password}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                placeholder="Old Password"
                                                required
                                                maxLength="12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowOldPassword(!showOldPassword)}
                                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                                            >
                                                <i className={`fas ${showOldPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="new_password">New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="new_password"
                                                name="new_password"
                                                type={showNewPassword ? "text" : "password"}
                                                value={new_password}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="New Password"
                                                required
                                                minLength="8"
                                                maxLength="12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                                            >
                                                <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="c_password">Confirm Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="c_password"
                                                name="c_password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={c_password}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm Password"
                                                required
                                                minLength="8"
                                                maxLength="12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                                            >
                                                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <CardFooter className="flex justify-between mt-6">
                                    <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                                    <Button type="submit" disabled={load}>Change</Button>
                                </CardFooter>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </>
        )
    );
}

export default ChangePassword;
