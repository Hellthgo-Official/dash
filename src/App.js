import { useState, useEffect } from "react";
import logo from "./logo.svg";
import { FaClipboard } from "react-icons/fa";
import ReactDOM from "react-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const baseUrl = "https://healthgo-v1.herokuapp.com/";

function App() {
  const [copied, setCopied] = useState(false);
  const [complete, setComplete] = useState("COMPLETE");
  const [objectList, setObjectList] = useState([]);

  useEffect(() => {
    const paymentData = axios
      .post(`${baseUrl}payments/paystack-get-payments`)
      .then((response) => {
        console.log(response);
        setObjectList(response?.data?.message);
      });
  }, []);

  const resolve = (transaction) => {
    axios
      .post(`${baseUrl}payments/paystack-resolve`, { id: transaction })
      .then((response) => {
        console.log(response);
        // setComplete("COMPLETED");
      });
  };

  const delete_txns = (transaction, transactionId) => {
    axios
      .post(`${baseUrl}payments/paystack-delete-payment`, { _id: transaction })
      .then((response) => {
        console.log(response);
        toast.dismiss();
        toast.success(
          `  Transaction with Id ${transactionId} has been deleted`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });
  };

  return (
    <>
      <div className="sticky h-24 bg-primary grid grid-cols-3 pl-20 pr-20sss items-center">
        <img src={logo} alt="" className="" />
        <p className="text-5xl text-white flex-end text-center font-bold">
          MERCHANT
        </p>
      </div>

      <div className="bg-secondary p-20 h-100 text-primary grid grid-cols-4 gap-10">
        {objectList.map((transaction, i) => {
          return (
            <div class=" rounded bg-white  overflow-hidden shadow-lg">
              <div class="px-6 py-4">
                <div class="font-bold text-lg mb-2 overflow-hidden">
                  {transaction?.walletAddress}
                </div>
                <CopyToClipboard
                  text={transaction.walletAddress}
                  onCopy={() => {
                    toast.dismiss();
                    toast.success(
                      `Copied ${transaction.walletAddress} to clipboard`,
                      {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      }
                    );
                    // setCopied(true);
                  }}
                >
                  <button class="inline-flex items-center bg-secondary rounded-full px-3 py-1 text-sm text-secomdary shadow-lg font-semibold mr-2 mb-2">
                    COPY
                    <span className="ml-3">
                      <FaClipboard />
                    </span>
                  </button>
                </CopyToClipboard>
                <p class=" text-base mt-5 ">
                  {new Date(transaction?.createdAt).toDateString()}
                </p>
                <p class=" text-base ">
                  {new Date(transaction?.createdAt).toTimeString()}
                </p>
                <p class=" text-base mt-5 ">
                  <span className=""> Id - </span>
                  {transaction?.transactionId}
                </p>
                <p class=" text-base ">{transaction?.email}</p>
                <p class=" text-base ">
                  <span>#</span> {transaction?.amount}
                </p>
              </div>
              <div class="px-6 pt-4 pb-2 inline-flex">
                <button
                  onClick={() => {
                    resolve(transaction?._id);
                  }}
                  className={`inline-block ${
                    transaction?.status === true
                      ? "bg-secondary "
                      : "bg-primary text-secondary"
                  } rounded-full px-3 py-1 text-sm shadow-lg font-semibold mr-2 mb-2`}
                >
                  {transaction?.status === true ? "COMPLETED" : "RESOLVE"}
                </button>
                <button
                  onClick={() => {
                    delete_txns(transaction?._id, transaction?.transactionId);
                  }}
                  className={`inline-block bg-red-500 text-white rounded-full px-3 py-1 text-sm shadow-lg font-semibold mr-2 mb-2`}
                >
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
