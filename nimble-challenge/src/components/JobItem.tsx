// Import React hook for managing component state
import { useState } from "react";

// Import API function to apply to a job
import { applyToJob } from "../services/api";

// Import strong TypeScript types
import type { Candidate, Job } from "../types/index";

// Define the props expected by this component
interface Props {
  job: Job;               // The job position data
  candidate: Candidate;   // The logged-in candidate data
}

// JobItem component renders a single job and handles the application process
const JobItem = ({ job, candidate }: Props) => {
  // State to store the GitHub repository URL entered by the user
  const [repoUrl, setRepoUrl] = useState("");

  // State to control loading state while submitting
  const [loading, setLoading] = useState(false);

  // State to display success or error messages
  const [message, setMessage] = useState("");

  // Function triggered when the user clicks the Submit button
  const handleSubmit = async () => {
    try {
      // Activate loading state and clear previous messages
      setLoading(true);
      setMessage("");

      // Call the API to apply for the selected job
      await applyToJob({
        uuid: candidate.uuid,                 // Candidate unique identifier
        jobId: job.id,                        // Selected job ID
        candidateId: candidate.candidateId,   // Candidate ID
        repoUrl,                              // GitHub repository URL
      });

      // Show success message if request succeeds
      setMessage("Application submitted successfully");
    } catch (error: any) {
      // Show error message if request fails
      setMessage(`Error: ${error.message}`);
    } finally {
      // Disable loading state regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      {/* Display job title */}
      <h3>{job.title}</h3>

      {/* Input field for GitHub repository */}
      GitHub Repository:
      <input
        type="text"
        placeholder="https://github.com/your-repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)} // Update repoUrl state on change
        style={{ marginRight: "1rem" }}
      />

      {/* Submit button triggers handleSubmit */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {/* Display success or error message */}
      {message && <p>{message}</p>}
    </div>
  );
};

// Export component for use in JobList
export default JobItem;