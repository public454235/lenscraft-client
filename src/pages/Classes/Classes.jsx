import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ClassCard from "../../components/ClassCard";
import PageHeader from "../../components/PageHeader";

const Classes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axios.get("data.json");
      return res.data?.popularClasses;
    },
  });

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
