// import the requiered types for strong typing 
import type { Candidate, Job } from "../types/index";
// Import te JonItem component that renders each individual job 
import JobItem from "./JobItem";

// define the props interface for the JobList component, which includes an array of jobs and a candidate object
interface Props {
  jobs: Job[];
  candidate: Candidate;
}
// The JobList component receives a list of jobs and a candidate,
//  and renders a JobItem for each job, passing the job and candidate as props
const JobList = ({ jobs, candidate }: Props) => {
  return (
    <div>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
};
// Export the component for use in other parts of the application
export default JobList;