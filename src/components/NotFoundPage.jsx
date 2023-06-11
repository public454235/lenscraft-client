import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom"; // Assuming you are using React Router
import NotFoundImage from "./../assets/404page.webp";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <img src={NotFoundImage} alt="404 Not Found" className="w-64" />
      <h1 className="text-4xl font-bold text-white mt">Page Not Found</h1>
      <p className="mt-2 text-gray-300/70">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-4 btn btn-gradient normal-case border-0">
        <HiArrowLeft />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
