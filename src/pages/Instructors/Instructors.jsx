import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import InstructorCard from "../../components/InstructorCard";
import PageHeader from "../../components/PageHeader";
import Spinner from "../../components/Spinner";

const Instructors = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axios.get(
        "https://lenscraft-sam.vercel.app/api/instructors"
      );
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>Instructors | LensCraft</title>
      </Helmet>
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
