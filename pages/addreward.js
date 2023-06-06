import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/layout";
import { upload } from "@/slices/cloudinary";
import { uploadMetadata } from "@/slices/storage";
import { giveReward } from "@/slices/reward";
import { getStudents } from "@/slices/auth";
import { Spinner, Badge, useToast } from "@chakra-ui/react";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import withAuth from "@/hoc/withAuth";

const AddReward = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { students } = useSelector((state) => state.auth);
  const { isLoading, url } = useSelector((state) => state.cloudinary);

  const { storage, isLoadingStorage } = useSelector((state) => state.storage);

  const [search, setSearch] = useState("");
  const [supply, setSupply] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState({});
  const address = useAddress();
  const contractAddress = "0x4785A899efc52b0eDC4C3715AA027A647a78A861";
  const { contract } = useContract(contractAddress);

  const [reward, setReward] = useState({
    name: "",
    description: "",
    image: url,
    student: selectedStudent,
    teacher: { name: "Mr. John Doe", walletAddress: address },
    rewardId: 0,
    metadataURI: storage?.hash,
    transactionHash: "",
  });
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setImage(file);
  };

  const uploadImage = () => {
    dispatch(upload(image))
      .unwrap()
      .then(() => {
        setReward({ ...reward, image: url });
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const saveMetadata = async () => {
    await contract
      .call("getTotalSupply")
      .then((data) => {
        setReward({ ...reward, rewardId: data.toNumber() + 1 });
        setSupply(data.toNumber() + 1);

        const metadata = {
          name: reward.name,
          description: reward.description,
          image: url,
          attributes: [
            {
              trait_type: "Reward",
              value: reward?.name,
            },
            { trait_type: "Edition", value: data.toNumber() + 1 },

            {
              trait_type: "Student",
              value: selectedStudent?.walletAddress,
            },
            {
              trait_type: "Teacher",
              value: address,
            },
            {
              trait_type: "Date",
              value: new Date().toDateString(),
            },
          ],
        };

        dispatch(uploadMetadata(metadata))
          .unwrap()
          .then((data) => {
            setReward({ ...reward, metadataURI: data });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    await saveMetadata();
  };

  const submitReward = async () => {
    await contract.call("getTotalSupply").then((data) => {
      setReward({ ...reward, rewardId: data.toNumber() + 1 });
      console.log("add reward", data.toNumber() + 1);

      dispatch(
        giveReward({
          name: reward.name,
          description: reward.description,
          image: reward.image,
          student: selectedStudent.walletAddress,
          teacher: reward.teacher.walletAddress,
          college: selectedStudent.college,
          rewardId: data.toNumber() + 1,
          metadataURI: reward.metadataURI,
        })
      );
    });

    setReward({
      name: "",
      description: "",
      image: "",
      student: {},
      teacher: {},
      rewardId: 0,
      metadataURI: "",
      transactionHash: "",
    });
    location.href = "/rewards";
  };

  const submitToast = () => {
    toast({
      title: "Submited successfully.",
      description: "You have successfully submitted a reward.",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  const successToast = () => {
    toast({
      title: "Reward given successfully.",
      description: "You have successfully given a reward.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    submitReward();
  };

  const errorToast = () => {
    toast({
      title: "Error.",
      description: "Something went wrong.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <Layout>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Reward Details
            </h2>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Reward Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={reward.name}
                        onChange={(e) => {
                          setReward({ ...reward, name: e.target.value });
                        }}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Reward Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Reward Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      value={reward.description}
                      onChange={(e) => {
                        setReward({ ...reward, description: e.target.value });
                      }}
                      rows={3}
                      className="block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Reward Image (Certificate, Award etc.)
                  </label>
                  <label
                    for="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {!image ? (
                        <>
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload Banner
                            </span>{" "}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </>
                      ) : (
                        <img
                          src={imageUrl}
                          alt="preview"
                          className="object-cover h-56 rounded-lg w-100"
                        />
                      )}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={(event) => {
                        handleFileChange(event);
                      }}
                    />
                  </label>
                  {url != "" && (
                    <Badge variant="outline" colorScheme="green">
                      Image Successfully Uploaded!
                    </Badge>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => uploadImage()}
                    >
                      {isLoading ? <Spinner size={"sm"} /> : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 pt-10 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Student Details
            </h2>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Search For Student{" "}
                    <span className="italic text-red-500">
                      *(Click to select Student)
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search by username, email or wallet address"
                      value={search}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <section aria-labelledby="applicant-information-title">
                    {students
                      .filter(
                        (student) =>
                          student.username
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          student.email
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          student.walletAddress
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((student) => (
                        <div
                          className={
                            selectedStudent.id == student.id
                              ? "bg-white shadow sm:rounded-lg border-4 border-indigo-600 m-2"
                              : "bg-white shadow sm:rounded-lg m-2"
                          }
                          onClick={() => setSelectedStudent(student)}
                          key={student.id}
                        >
                          <div className="px-4 py-5 sm:px-6">
                            <h2
                              id="applicant-information-title"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              {student.walletAddress}
                            </h2>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500">
                              Wallet Address
                            </p>
                          </div>
                          <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Student Name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {student.username}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Email address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {student.email}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Role
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {student.role}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Phone
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {student.phoneNumber}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  college Details
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {student.college}
                                </dd>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {student.major}
                                </dd>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {student.class}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end px-4 py-4 border-t gap-x-6 border-gray-900/10 sm:px-8">
              {!storage?.hash ? (
                <button
                  onClick={() => handleSubmit()}
                  className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoadingStorage ? (
                    <Spinner size={"sm"} />
                  ) : (
                    "Submit Metadata"
                  )}
                </button>
              ) : (
                <Web3Button
                  contractAddress={contractAddress}
                  action={async (contract) => {
                    await contract.call("awardReward", [
                      supply,
                      selectedStudent.walletAddress,
                      storage.hash,
                    ]);
                  }}
                  onSuccess={successToast}
                  onError={errorToast}
                  onSubmit={submitToast}
                >
                  Send Reward
                </Web3Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(AddReward);
