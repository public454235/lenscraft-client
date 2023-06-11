import moment from "moment/moment";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import Spinner from "../../../components/Spinner";
import useEnrolledClasses from "../../../hooks/useEnrolledClasses";

const MyEnrolledClasses = () => {
  const { enrolledClasses, isLoading } = useEnrolledClasses();
  if (isLoading) return <Spinner />;
  return (
    <div className="container my-12">
      <Helmet>
        <title>My Enrolled Classes | LensCraft</title>
      </Helmet>
      <Fade direction="up" cascade damping={0.2} triggerOnce>
        <h1 className="text-3xl font-bold gradient-text w-fit mx-auto mb-12">
          My Enrolled Classes
        </h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-xl text-neutral">
                <th className="bg-neutral/10 rounded-tl-lg"></th>
                <th className="bg-neutral/10">Image</th>
                <th className="bg-neutral/10">Name</th>
                <th className="bg-neutral/10">Instructor</th>
                <th className="bg-neutral/10 rounded-tr-lg">Enrolled Date</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {enrolledClasses?.map((item, i) => (
                <tr key={item._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img src={item.classDetails.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-lg font-semibold">
                    {item.classDetails.name}
                  </td>
                  <td>
                    <h2 className="text-base font-semibold">
                      {item.classDetails.instructor.name}
                    </h2>
                    <p>{item.classDetails.instructor.email}</p>
                  </td>
                  <th className="space-x-3">
                    {moment(item.date).format("DD MMM YYYY")}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fade>
    </div>
  );
};

export default MyEnrolledClasses;
