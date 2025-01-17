import { useState, useEffect } from 'react';
import { Candidate } from "../interfaces/Candidate.interface";
import { searchGithub, searchGithubUser } from '../api/API';
import './CandidateSearch.css';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async () => {
    try {
      setLoading(true);
      const userList = await searchGithub();
      if (!userList || userList.length === 0) {
        setError("No candidates available.");
        setCandidate(null);
        return;
      }
      const randomUser = userList[Math.floor(Math.random() * userList.length)];
      const detailedUser = await searchGithubUser(randomUser.login);

      console.log(detailedUser);

      setCandidate(detailedUser);
      setError(null);
    } catch (err: any) {
      setError("Failed to fetch candidate data.");
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
      localStorage.setItem("savedCandidates", JSON.stringify([...savedCandidates, candidate]));
      fetchCandidate();
    }
  };

  const skipCandidate = () => {
    fetchCandidate();
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!candidate) return <p className="no-candidates-message">No more candidates available.</p>;

  return (
    <div className="candidate-card">
      <h1 className="candidate-title">Candidate Search</h1>
      <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} className="candidate-avatar" />
      <h2 className="candidate-name">{candidate.name || "No Name"}</h2>
      <p className="candidate-info">Username: {candidate.login}</p>
      <p className="candidate-info">Location: {candidate.location || "N/A"}</p>
      <p className="candidate-info">Email: {candidate.email || "N/A"}</p>
      <p className="candidate-info">Company: {candidate.company || "N/A"}</p>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" className="candidate-link">
        GitHub Profile
      </a>
      <div className="candidate-buttons">
        <button onClick={saveCandidate} className="save-button">+</button>
        <button onClick={skipCandidate} className="skip-button">-</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
