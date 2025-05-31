import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  
    const [loading,setLoading]=useState(false);
    const { setAuthUser } = useAuthContext();

    const navigate = useNavigate();

    const signup = async({fullName,phoneNumber,password,confirmPassword,pincode}) => {

        const success = handleInputErrors({fullName,phoneNumber,password,confirmPassword,pincode});

        if(!success){
            return;
        }

        setLoading(true);

        try {
            
            const res = await fetch("/api/auth/signup", {
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body: JSON.stringify({fullName,phoneNumber,password,confirmPassword,pincode})
            })

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem("medi-user",JSON.stringify(data));
            setAuthUser(data);
            toast.success("Signup successful!");
            navigate("/");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    return { loading , signup }

}

export default useSignup

function handleInputErrors({ fullName, phoneNumber, password, confirmPassword, pincode }) {
    if (!fullName || !phoneNumber || !password || !confirmPassword || !pincode) {
        toast.error("Please fill all fields");
        return false;
    }

    if (!/^[a-zA-Z\s]{3,}$/.test(fullName)) {
        toast.error("Full name must be at least 3 characters and contain only letters");
        return false;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
        toast.error("Phone number must be exactly 10 digits");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
        toast.error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character");
        return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
        toast.error("Pincode must be exactly 6 digits");
        return false;
    }

    return true;
}

