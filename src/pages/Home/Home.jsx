import axios from "axios";
import { useQuery } from "react-query";
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
  console.log(data);
  return (
    <div>
      <TopSlider contents={data?.topSlider} />
    </div>
  );
};

export default Home;
