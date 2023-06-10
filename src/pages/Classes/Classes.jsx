import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ClassCard from "../../components/ClassCard";
import PageHeader from "../../components/PageHeader";
import Spinner from "../../components/Spinner";

const Classes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axios.get(
        "https://lenscarft-sam.vercel.app/api/classes"
      );
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <PageHeader title="Our Classes">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Classes</li>
      </PageHeader>

      <section className="container my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((item) => (
          <ClassCard key={item._id} content={item} />
        ))}
      </section>
    </>
  );
};

export default Classes;
