import { Fade } from "react-awesome-reveal";
import { FaHeadphones } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import SectionHeader from "../../components/SectionHeader";
import GoogleMap from "./GoogleMap";

const Contact = () => {
  return (
    <section className="container my-24">
      <Fade cascade triggerOnce direction="up" damping={0.2}>
        <SectionHeader header="Contact Form" />
        <h1 className="text-neutral font-bold text-4xl md:text-5xl text-center mb-12">
          Our Contact Address Here.
        </h1>
      </Fade>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Fade triggerOnce direction="up">
          <div className="w-full bg-base-200 rounded-md overflow-hidden px-8 py-10">
            <FaHeadphones className="text-5xl text-primary mb-4" />
            <h2 className="text-neutral text-xl font-semibold mb-4">
              Contact Phone Number
            </h2>
            <p className="text-lg">+444 555 666 777</p>
            <p className="text-lg">+222 222 333 555</p>
          </div>
        </Fade>
        <Fade triggerOnce direction="up">
          <div className="w-full bg-base-200 rounded-md overflow-hidden px-8 py-10">
            <FiMail className="text-5xl text-primary mb-4" />
            <h2 className="text-neutral text-xl font-semibold mb-4">
              Our Email Address
            </h2>
            <p className="text-lg">admin@gmail.com</p>
            <p className="text-lg">hr@gmail.com</p>
          </div>
        </Fade>

        <Fade triggerOnce direction="up">
          <div className="w-full bg-base-200 rounded-md overflow-hidden px-8 py-10">
            <HiOutlineLocationMarker className="text-5xl text-primary mb-4" />
            <h2 className="text-neutral text-xl font-semibold mb-4">
              Our Location
            </h2>
            <p className="text-lg">5678 Bangla Main Road, cities 580</p>
            <p className="text-lg">GBnagla, example 54786</p>
          </div>
        </Fade>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Fade triggerOnce direction="up">
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered py-8 w-full focus:outline-none focus:border-primary bg-inherit"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered py-8 w-full focus:outline-none focus:border-primary bg-inherit"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered py-8 w-full focus:outline-none focus:border-primary bg-inherit"
            />
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered py-8 w-full focus:outline-none focus:border-primary bg-inherit"
            />
            <textarea
              placeholder="Your Message"
              className="input input-bordered py-8 w-full focus:outline-none focus:border-primary bg-inherit min-h-[200px] resize-none"
            />
            <button
              type="button"
              className="btn md:btn-lg btn-gradient normal-case"
            >
              Submit Now
            </button>
          </form>
        </Fade>
        <Fade triggerOnce direction="up">
          <GoogleMap />
        </Fade>
      </div>
    </section>
  );
};

export default Contact;
