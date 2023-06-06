import DynamicTable from "@/components/table";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "@/slices/auth";
import { useEffect, useState } from "react";
import { studentSchema } from "@/utils/schemas";
import Layout from "@/components/layout";
import RegisteForm from "@/components/registerForm";
import Modal from "@/components/modal";
import withAuth from "@/hoc/withAuth";

const Students = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-between p-2 m-2 align-middle">
        {" "}
        <h1 className="text-2xl font-semibold text-black">Students</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Add Student
        </button>
      </div>
      <DynamicTable schema={studentSchema} data={students} />
      <Modal open={open} setOpen={setOpen} title="">
        <RegisteForm />
      </Modal>
    </Layout>
  );
};

export default withAuth(Students);
