import { useDispatch, useSelector } from "react-redux";
import { userSchema } from "@/utils/schemas";
import Form from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv8";
import { register } from "@/slices/auth";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, error, auth } = useSelector((state) => state.auth);
  const toast = useToast();
  const submitData = (data) => {
    dispatch(register(data.formData));
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
    <>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <Form
              schema={userSchema}
              onSubmit={submitData}
              validator={validator}
              liveValidate
            />
          </div>
        </div>
      </div>
    </>
  );
}
