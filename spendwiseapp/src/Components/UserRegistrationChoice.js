import { useNavigate } from "react-router-dom";

export default function UserRegistrationChoice() {
    const navigate = useNavigate();

    return (
        <div className="registration-choice-card">
            <h1 className="choice-title">Register As</h1>
            <div className="choice-container">
                <div className="choice-box" onClick={() => navigate("/singlereg")}>
                    <h2>Single User</h2>
                    <p>Register as an individual user.</p>
                </div>
                <div className="choice-box" onClick={() => navigate("/orgreg")}>
                    <h2>Organization</h2>
                    <p>Register as an organization.</p>
                </div>
            </div>
        </div>
    );
}