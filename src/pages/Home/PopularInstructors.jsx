import { Fade } from "react-awesome-reveal";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import InstructorCard from "../../components/InstructorCard";
import SectionHeader from "../../components/SectionHeader";

const PopularInstructors = ({ contents }) => {
  return (
    <section className="container my-24">
      <Fade cascade triggerOnce direction="up" damping={0.2}>
        <SectionHeader header="Popular Instructors" />
        <h1 className="text-neutral font-bold text-4xl md:text-5xl text-center mb-4">
          Meet Our Expert Instructors
        </h1>
        <p className="max-w-3xl mx-auto md:text-lg text-center mb-12">
          Learn from the best in the industry! Our experienced and passionate
          instructors bring their expertise and insights to help you master the
          art of photography. Get inspired and enhance your skills with our
          popular instructors who specialize in various genres of photography.
        </p>
      </Fade>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contents.map((content) => (
          <InstructorCard key={content._id} content={content} />
        ))}
      </div>
      <Fade direction="up" triggerOnce>
        <div className="text-center mt-6">
          <Link to="/instructors" className="btn btn-gradient">
            See All Instructors
            <HiArrowRight />
          </Link>
        </div>
      </Fade>
    </section>
  );
};

export default PopularInstructors;
