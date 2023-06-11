import { Fade } from "react-awesome-reveal";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import ClassCard from "../../components/ClassCard";
import SectionHeader from "../../components/SectionHeader";

const PopularClasses = ({ contents }) => {
  return (
    <section className="container my-24">
      <Fade cascade triggerOnce direction="up" damping={0.2}>
        <SectionHeader header="Popular Classes" />
        <h1 className="text-neutral font-bold text-4xl md:text-5xl text-center mb-4">
          Welcome to LensCraft
        </h1>
        <p className="max-w-3xl mx-auto md:text-lg text-center mb-12">
          Your ultimate destination for photography education and inspiration!
          Our photography school offers a wide range of classes and workshops
          designed to enhance your skills and unleash your creative potential.
          Check out our popular classes below:
        </p>
      </Fade>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contents.map((content) => (
          <ClassCard key={content._id} content={content} />
        ))}
      </div>
      <Fade direction="up" triggerOnce>
        <div className="text-center mt-6">
          <Link to="/classes" className="btn btn-gradient">
            See All Classes
            <HiArrowRight />
          </Link>
        </div>
      </Fade>
    </section>
  );
};

export default PopularClasses;
