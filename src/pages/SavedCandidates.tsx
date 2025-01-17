import * as React from "react";  // Use 'import * as React' instead of default import
import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
// import './SavedCandidates.css';


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

  if (candidates.length === 0) return <p>No saved candidates available.</p>;

  return (
    <div>
      <h1>Saved Candidates</h1>
      <table className="table">
        <thead>
          <tr>
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
            <tr key={candidate.login}>
              <td>
                <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width={50} />
              </td>
              <td>{candidate.name || "No Name"}</td>
              <td>{candidate.login}</td>
              <td>{candidate.location || "N/A"}</td>
              <td>{candidate.email || "N/A"}</td>
              <td>{candidate.company || "N/A"}</td>
              <td>
                <button onClick={() => removeCandidate(candidate.login)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
