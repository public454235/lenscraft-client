import SectionHeader from "../../components/SectionHeader";
import InstructorCard from "./InstructorCard";

const PopularInstructors = ({ contents }) => {
  return (
    <section className="container my-24">
      <SectionHeader header="Popular Instructors" />
      <h1 className="text-neutral font-bold text-5xl text-center mb-4">
        Meet Our Expert Instructors
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-center mb-12">
        Learn from the best in the industry! Our experienced and passionate
        instructors bring their expertise and insights to help you master the
        art of photography. Get inspired and enhance your skills with our
        popular instructors who specialize in various genres of photography.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contents.map((content) => (
          <InstructorCard key={content._id} content={content} />
        ))}
      </div>
    </section>
  );
};

export default PopularInstructors;
