import type { Candidate, Job } from "../types/index";
import JobItem from "./JobItem";

interface Props {
  jobs: Job[];
  candidate: Candidate;
}

const JobList = ({ jobs, candidate }: Props) => {
  return (
    <div>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
};

export default JobList;