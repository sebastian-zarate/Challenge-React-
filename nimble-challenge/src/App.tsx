import { useEffect, useState } from "react";
import { getCandidateByEmail, getJobs } from "./services/api";
import type { Candidate, Job } from "./types/index";
import JobList from "./components/JobList";

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const email = "zarateseba33@gmail.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidateData = await getCandidateByEmail(email);
        setCandidate(candidateData);
        console.log("Candidate data:", candidateData);

        const jobsData = await getJobs();


        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err: any) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Open Positions</h1>
      <div>
        cadidate: {candidate?.firstName} {candidate?.lastName}
      
       ({candidate?.email})
      </div>
      {candidate && (
        <JobList jobs={jobs} candidate={candidate} />
      )}
    </div>
  );
}

export default App;