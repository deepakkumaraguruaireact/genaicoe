// MissionController.jsx
import "./MissionController.css";
import ChatbotIcon from "./ChatbotIcon";

const steps = [
  "Case Setup",
  "Claim Creator",
  "Claim Entry Bot",
  "Data Validator",
  "Medical Validator",
  "Treatment Validator",
];

const MissionController = ({ closeMenu }) => (
  <div className="mission-controller-overlay">
    <div className="mission-controller-header">
      <span className="mission-title">
        <ChatbotIcon />{" "}
      </span>{" "}
      <span>Mission Controller</span>
      <button className="close-btn" onClick={closeMenu}>
        ✖
      </button>
    </div>
    <ul className="mission-steps">
      {steps.map((step, idx) => (
        <li key={idx}>
          <span>✅</span> {step} - Completed
        </li>
      ))}
    </ul>
    <div className="mission-description">
      Now that Treatment Validator has assessed the medical treatment plan and
      identified concerns about the recovery timeline, I will invoke the{" "}
      <a href="#">Reserve Calculator</a> to determine appropriate financial
      reserves for this claim.
    </div>
  </div>
);

export default MissionController;
