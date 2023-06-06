import { ConnectWallet } from "@thirdweb-dev/react";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "@/utils/schemas";
import Form from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv8";
import { login } from "@/slices/auth";
import { useToast, Spinner } from "@chakra-ui/react";
import ParticlesBackground from "@/components/particles";

export default function Login() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isLoading, error } = useSelector((state) => state.auth);

  const submitData = (data) => {
    dispatch(login(data.formData)).then(() => {
      location.href = "/";
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={"sm"} />
      </div>
    );
  }

  if (error) {
    return toast({
      title: "An error occurred.",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <div className="flex h-screen bg-[#131216]">
      <ParticlesBackground/>
      <div className="w-full m-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img src="/logo_w.png" alt="logo" className="w-auto h-12 mx-auto" />
          <h1 className="text-xl font-bold text-center text-white uppercase">
            Admin
          </h1>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white border-2 border-purple-500 shadow sm:rounded-lg sm:px-10">
            <Form
              schema={loginSchema}
              onSubmit={submitData}
              validator={validator}
              liveValidate
            />


          </div>
        </div>
      </div>
    </div>
  );
}
