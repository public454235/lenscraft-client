import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import InstructorCard from "../../components/InstructorCard";
import PageHeader from "../../components/PageHeader";
import Spinner from "../../components/Spinner";

const Instructors = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/instructors");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

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
