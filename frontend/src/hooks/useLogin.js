import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();

	const login = async (phoneNumber, password) => {
		const success = handleInputErrors(phoneNumber, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ phoneNumber, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("medi-user", JSON.stringify(data));
			setAuthUser(data);
			toast.success("Login successful!");
			navigate("/");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(phoneNumber, password) {
	if (!phoneNumber || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}