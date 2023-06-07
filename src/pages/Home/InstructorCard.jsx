import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const InstructorCard = ({ content }) => {
  const { name, imageUrl, specialty } = content;
  return (
    <div className="w-full relative mt-16 bg-base-200 rounded-xl pt-16 text-center p-6">
      <div className="bg-base-200 w-32 h-32 rounded-full p-2 overflow-hidden absolute z-10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src={imageUrl}
          alt=""
          className="w-full aspect-square object-cover rounded-full object-center"
        />
      </div>
      <h1 className="text-3xl font-bold text-neutral mb-4">{name}</h1>
      <p>Specialized in</p>
      <h3 className="text-xl font-semibold gradient-text mb-6">{specialty}</h3>
      <div className="menu menu-horizontal gap-3 text-lg">
        <a href="">
          <FaFacebookF />
        </a>
        <a href="">
          <FaTwitter />
        </a>
        <a href="">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default InstructorCard;
