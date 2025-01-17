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
      <table className="candidate-table">
        <thead>
          <tr className="table-header">
            <th>Avatar</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.login} className="candidate-item">
              <td>
                <img
                  src={candidate.avatar_url}
                  alt={`${candidate.name}'s avatar`}
                  className="candidate-avatar"
                />
              </td>
              <td className="candidate-name">{candidate.name || "No Name"}</td>
              <td className="candidate-detail">{candidate.login}</td>
              <td className="candidate-detail">{candidate.location || "N/A"}</td>
              <td className="candidate-detail">{candidate.email || "N/A"}</td>
              <td className="candidate-detail">{candidate.company || "N/A"}</td>
              <td>
                <button
                  onClick={() => removeCandidate(candidate.login)}
                  className="remove-button"
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
