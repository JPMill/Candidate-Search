import React, { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";


const SavedCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setCandidates(savedCandidates);
  }, []);

  const removeCandidate = (username: string) => {
    const updatedCandidates = candidates.filter(c => c.username !== username);
    setCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  if (candidates.length === 0) return <p>No saved candidates available.</p>;

  return (
    <div>
      <h1>Potential Candidates</h1>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate.username}>
            <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width={50} />
            <h2>{candidate.name}</h2>
            <p>Username: {candidate.username}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email || "N/A"}</p>
            <p>Company: {candidate.company || "N/A"}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            <button onClick={() => removeCandidate(candidate.username)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
