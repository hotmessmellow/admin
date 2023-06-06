import DynamicTable from "@/components/table";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "@/slices/auth";
import { useEffect, useState } from "react";
import { teacherSchema } from "@/utils/schemas";
import Layout from "@/components/layout";
import Modal from "@/components/modal";
import RegisterForm from "@/components/registerForm";
import withAuth from "@/hoc/withAuth";

const Teachers = () => {
  const dispatch = useDispatch();
  const { teachers } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getTeachers());
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-between p-2 m-2 align-middle">
        {" "}
        <h1 className="text-2xl font-semibold text-black">Teachers</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Add Teacher
        </button>
      </div>
      <DynamicTable schema={teacherSchema} data={teachers} />
      <Modal open={open} setOpen={setOpen} title="">
        <RegisterForm />
      </Modal>
    </Layout>
  );
};

export default withAuth(Teachers);
