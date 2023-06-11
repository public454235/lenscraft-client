import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Spinner from "../../components/Spinner";
import Contact from "./Contact";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";
import TopSlider from "./TopSlider";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["DATA"],
    queryFn: async () => {
      const instance = axios.create({
        baseURL: "https://lenscarft-sam.vercel.app/api/",
      });
      const sliderContents = await instance.get("slider-contents");
      const popularClasses = await instance.get("popular-classes");
      const popularInstructors = await instance.get("popular-instructors");

      return {
        topSlider: sliderContents.data,
        popularClasses: popularClasses.data,
        popularInstructors: popularInstructors.data,
      };
    },
  });
  if (isLoading) return <Spinner />;

  return (
    <div>
      <Helmet>
        <title>Home | LensCraft</title>
      </Helmet>
      <TopSlider contents={data?.topSlider} />
      <PopularClasses contents={data?.popularClasses} />
      <PopularInstructors contents={data?.popularInstructors} />
      <Contact />
    </div>
  );
};

export default Home;
