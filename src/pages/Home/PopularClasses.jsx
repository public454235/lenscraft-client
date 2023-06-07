import SectionHeader from "../../components/SectionHeader";
import ClassCard from "./ClassCard";

const PopularClasses = ({ contents }) => {
  return (
    <section className="container my-24">
      <SectionHeader header="Popular Classes" />
      <h1 className="text-neutral font-bold text-5xl text-center mb-4">
        Welcome to LensCraft
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-center mb-12">
        Your ultimate destination for photography education and inspiration! Our
        photography school offers a wide range of classes and workshops designed
        to enhance your skills and unleash your creative potential. Check out
        our popular classes below:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contents.map((content) => (
          <ClassCard key={content._id} content={content} />
        ))}
      </div>
    </section>
  );
};

export default PopularClasses;
