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

function handleInputErrors({fullName,phoneNumber,password,confirmPassword,pincode}){
    
    if(!fullName || !phoneNumber || !password || !confirmPassword || !pincode){
        toast.error("Please fill all fields")
        return false
    }

    if(password!==confirmPassword){
        toast.error("Passwords do not match")
        return false
    }

    if(password.length<4){
        toast.error("Password must be of atleast 4 characters")
    }

    return true;
}
