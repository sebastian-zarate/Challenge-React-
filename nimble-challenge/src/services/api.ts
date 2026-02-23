//const BASE_URL = import.meta.env.BASE_URL;
// Base URL of the backend API (can be replaced with import.meta.env.VITE_BASE_URL)
const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

// Fetch candidate information by email
export const getCandidateByEmail = async (email: string) => {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`
  );

  // Handle HTTP errors
  if (!response.ok) {
    throw new Error("Error fetching candidate");
  }

  return response.json();
};

// Fetch available job positions
export const getJobs = async () => {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!response.ok) {
    throw new Error("Error fetching jobs");
  }

  return response.json();
};

// Send application request to a specific job
export const applyToJob = async (data: {
  uuid: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
}) => {
  const response = await fetch(
    `${BASE_URL}/api/candidate/apply-to-job`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  // Debug log to verify payload being sent
  console.log("Applying to job with data:", data);

  // Handle API error response
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Error applying to job");
  }

  return response.json();
};