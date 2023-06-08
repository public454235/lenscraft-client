import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import InstructorCard from "../../components/InstructorCard";
import PageHeader from "../../components/PageHeader";

const Instructors = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axios.get("data.json");
      return res.data?.popularInstructors;
    },
  });

  return (
    <>
      <PageHeader title="Our Instructors">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Instructors</li>
      </PageHeader>

      <section className="container my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((item) => (
          <InstructorCard key={item._id} content={item} />
        ))}
      </section>
    </>
  );
};

export default Instructors;
