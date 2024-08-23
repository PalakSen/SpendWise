import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./Slice";

export default function LogoutComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    localStorage.clear();
    dispatch(logout());
    navigate('/')
}