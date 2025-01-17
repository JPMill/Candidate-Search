import * as React from "react";  // Use 'import * as React' instead of default import
import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import './SavedCandidates.css';


const SavedCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setCandidates(savedCandidates);
  }, []);

  const removeCandidate = (username: string) => {
    const updatedCandidates = candidates.filter(c => c.login !== username);
    setCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  if (candidates.length === 0) return <p className="no-candidates">No saved candidates available.</p>;

  return (
    <div className="candidates-container">
      <h1 className="title">Potential Candidates</h1>
      <ul className="candidate-list">
        {candidates.map(candidate => (
          <li key={candidate.login} className="candidate-item">
            <img 
              src={candidate.avatar_url} 
              alt={`${candidate.name}'s avatar`} 
              className="candidate-avatar" 
            />
            <div className="candidate-info">
              <h2 className="candidate-name">{candidate.name || "No Name"}</h2>
              <p className="candidate-detail">Username: {candidate.login}</p>
              <p className="candidate-detail">Location: {candidate.location || "N/A"}</p>
              <p className="candidate-detail">Email: {candidate.email || "N/A"}</p>
              <p className="candidate-detail">Company: {candidate.company || "N/A"}</p>
              <a 
                href={candidate.html_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="candidate-link"
              >
                GitHub Profile
              </a>
            </div>
            <button 
              onClick={() => removeCandidate(candidate.login)} 
              className="remove-button"
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
