import axios from "axios";
import { useQuery } from "react-query";
import Contact from "./Contact";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";
import TopSlider from "./TopSlider";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["DATA"],
    queryFn: async () => {
      const res = await axios("data.json");
      return res.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <TopSlider contents={data?.topSlider} />
      <PopularClasses contents={data?.popularClasses} />
      <PopularInstructors contents={data?.popularInstructors} />
      <Contact />
    </div>
  );
};

export default Home;
