import { useEffect, useState } from "react";
import { getCandidateByEmail, getJobs } from "./services/api";
import type { Candidate, Job } from "./types/index";
import JobList from "./components/JobList";

function App() {
  // State to store candidate information
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  // State to store available job positions
  const [jobs, setJobs] = useState<Job[]>([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Candidate email used to fetch data
  const email = "zarateseba33@gmail.com";

  useEffect(() => {
    // Fetch candidate and jobs data on component mount
    const fetchData = async () => {
      try {
        const candidateData = await getCandidateByEmail(email);
        setCandidate(candidateData);
        console.log("Candidate data:", candidateData);

        const jobsData = await getJobs();
        setJobs(jobsData);

      } catch (err: any) {
        // Handle API errors
        setError(err.message);
      } finally {
        // Stop loading after request finishes
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Conditional rendering for loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Open Positions</h1>

      {/* Display candidate information */}
      <div>
        Candidate: {candidate?.firstName} {candidate?.lastName}
        ({candidate?.email})
      </div>

      {/* Render job list if candidate exists */}
      {candidate && (
        <JobList jobs={jobs} candidate={candidate} />
      )}
    </div>
  );
}

export default App;