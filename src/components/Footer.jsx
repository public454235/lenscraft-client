import { BiTime } from "react-icons/bi";
import {
  FaFacebookF,
  FaHome,
  FaInstagram,
  FaPhoneAlt,
  FaPinterest,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import useTheme from "../hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="pt-10 bg-neutral/5">
      <div className="footer container py-4">
        <div>
          <div className="flex items-center mb-5">
            <div className="w-10 h-10 rounded-full gradient-bg grid place-content-center">
              <div className="w-8 h-8 rounded-full bg-base-200 text-center font-bold text-2xl text-neutral">
                L
              </div>
            </div>
            <h2
              className={`ml-2 text-2xl font-bold ${
                theme === "dark" ? "text-white" : "gradient-text"
              }`}
            >
              LensCraft
            </h2>
          </div>
          <a className="link link-hover flex items-center gap-2">
            <FaFacebookF /> Facebook
          </a>
          <a className="link link-hover flex items-center gap-2">
            <FaInstagram /> Instagram
          </a>
          <a className="link link-hover flex items-center gap-2">
            <FaPinterest /> Pinterest
          </a>
        </div>
        <div>
          <span
            className="footer-title opacity-100 text-lg font-semibold"
            data-aos="zoom-in"
          >
            INFORMATION
          </span>
          <a className="link link-hover">About Search</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms & Condition</a>
          <a className="link link-hover">Faq & Help</a>
          <a className="link link-hover">Refund & Return</a>
        </div>
        <div>
          <span
            className="footer-title opacity-100 text-lg font-semibold"
            data-aos="zoom-in"
          >
            SUPPORT
          </span>
          <a className="link link-hover">Chat Support</a>
          <a className="link link-hover">Terms of Support</a>
          <a className="link link-hover">Press Release</a>
          <a className="link link-hover">Star Support</a>
        </div>
        <div>
          <span
            className="footer-title opacity-100 text-lg font-semibold"
            data-aos="zoom-in"
          >
            CONTACT US
          </span>
          <p className="flex items-center gap-2">
            <FaHome /> 5678 Bangla Main Road, cities 580
            <br />
            GBnagla, example 54786
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt /> +444 555 666 777
          </p>
          <p className="flex items-center gap-2">
            <BiTime /> 9.00AM - 6.00PM
          </p>
          <a className="link link-hover flex items-center gap-2">
            <HiMail /> admin@gmail.com
          </a>
        </div>
      </div>
      <div className="footer footer-center p-4 border-t">
        <div>
          <p>Copyright © 2023 - All right reserved by Showkat Ali Sam</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
