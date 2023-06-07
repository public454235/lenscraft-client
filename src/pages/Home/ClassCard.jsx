const ClassCard = ({ content }) => {
  return (
    <div className="w-full bg-base-200 rounded-md overflow-hidden">
      <img
        src={content.image}
        alt=""
        className="w-full aspect-[1.4/1] object-cover object-center"
      />
      <div className="p-5">
        <h2 className="text-neutral text-xl font-bold">{content.title}</h2>
      </div>
    </div>
  );
};

export default ClassCard;
