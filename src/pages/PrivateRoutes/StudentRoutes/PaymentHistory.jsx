import moment from "moment/moment";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import Spinner from "../../../components/Spinner";
import useEnrolledClasses from "../../../hooks/useEnrolledClasses";

const PaymentHistory = () => {
  const { enrolledClasses, isLoading } = useEnrolledClasses();
  if (isLoading) return <Spinner />;
  return (
    <div className="container my-12">
      <Helmet>
        <title>Payment History | LensCraft</title>
      </Helmet>
      <Fade direction="up" cascade damping={0.2} triggerOnce>
        <h1 className="text-3xl font-bold gradient-text w-fit mx-auto mb-12">
          Payment History
        </h1>
        <div className="w-full overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-xl text-neutral text-center">
                <th className="bg-neutral/10 rounded-tl-lg"></th>
                <th className="bg-neutral/10">Class</th>
                <th className="bg-neutral/10">
                  Payment
                  <br />
                  Amount
                </th>
                <th className="bg-neutral/10">
                  Transaction
                  <br />
                  ID
                </th>
                <th className="bg-neutral/10 rounded-tr-lg">
                  Payment
                  <br />
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {enrolledClasses.map((item, i) => (
                <tr key={item._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img src={item.classDetails.image} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base">
                          {item.classDetails.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-lg font-semibold">
                    $ {item.paymentAmount}
                  </td>
                  <td>{item.transactionId}</td>
                  <th className="space-x-3">
                    {moment(item.date).format("MMMM DD YYYY, h:mm:ss a")}
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

export default PaymentHistory;
