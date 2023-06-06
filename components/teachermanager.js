import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const TeacherManager = () => {
  const toast = useToast();
  const [address, setAddress] = useState("");
  const contractAddress = "0x4785A899efc52b0eDC4C3715AA027A647a78A861";
  const { contract, error } = useContract(contractAddress);

  const submitToast = () => {
    toast({
      title: "Success!",
      description: "Your transaction has been submitted.",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  const successToast = () => {
    setAddress("");
    toast({
      title: "Success!",
      description: "Your transaction has been completed.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const errorToast = () => {
    toast({
      title: "Error!",
      description: "Your transaction has failed.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <p className="italic text-left text-red-500">
        Input the address of the teacher you want to add or remove from the
        contract.
      </p>
      <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
          className="block w-full p-0 text-gray-900 border-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="0x0000000"
        />
      </div>
      <div className="flex justify-between mt-2">
        <Web3Button
          contractAddress={contractAddress}
          action={async (contract) => {
            await contract.call("addTeacher", [address.toString()]);
          }}
          onSuccess={successToast}
          onSubmit={submitToast}
          onError={errorToast}
        >
          {" "}
          Add Teacher
        </Web3Button>
        <Web3Button
          contractAddress={contractAddress}
          action={async (contract) => {
            await contract.call("removeTeacher", [address.toString()]);
          }}
          onSuccess={successToast}
          onSubmit={submitToast}
          onError={errorToast}
        >
          Remove Teacher
        </Web3Button>
      </div>
    </>
  );
};

export default TeacherManager;
