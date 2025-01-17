import { useState, useEffect } from 'react';
import { Candidate } from "../interfaces/Candidate.interface";
import { searchGithub, searchGithubUser } from '../api/API';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!candidate) return <p>No more candidates available.</p>;

  return (
    <div>
      <h1>Candidate Search</h1>
      <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width={100} />
      <h2>{candidate.name}</h2>
      <p>Username: {candidate.username}</p>
      <p>Location: {candidate.location || "N/A"}</p>
      <p>Email: {candidate.email || "N/A"}</p>
      <p>Company: {candidate.company || "N/A"}</p>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        GitHub Profile
      </a>
      <div>
        <button onClick={saveCandidate}>+</button>
        <button onClick={skipCandidate}>-</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
