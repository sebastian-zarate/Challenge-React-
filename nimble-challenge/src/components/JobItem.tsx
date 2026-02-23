import { useState } from "react";
import { applyToJob } from "../services/api";
import type { Candidate, Job } from "../types/index";

interface Props {
  job: Job;
  candidate: Candidate;
}

const JobItem = ({ job, candidate }: Props) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage("");

      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl,
      });

      setMessage("Aplicación enviada con éxito ✅");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>{job.title}</h3>

      <input
        type="text"
        placeholder="https://github.com/your-repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ marginRight: "1rem" }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Enviando..." : "Submit"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default JobItem;