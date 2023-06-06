import DynamicTable from "@/components/table";
import { useDispatch, useSelector } from "react-redux";
import { getRewards } from "@/slices/reward";
import { useEffect, useState } from "react";
import { rewardSchema } from "@/utils/schemas";
import Layout from "@/components/layout";
import Link from "next/link";
import withAuth from "@/hoc/withAuth";
import Modal from "@/components/modal";
import TeacherManager from "@/components/teachermanager";

const Rewards = () => {
  const dispatch = useDispatch();
  const { rewards } = useSelector((state) => state.reward);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getRewards());
  }, [dispatch]);

  return (
    <Layout>
      <div className="flex items-center justify-between p-2 m-2 align-middle">
        {" "}
        <h1 className="text-2xl font-semibold text-black">Rewards</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold
          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
          hover:bg-gray-50"
        >
          {" "}
          Teacher Management
        </button>
        <Link
          href="/addreward"
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold
          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
          hover:bg-gray-50"
        >
          {" "}
          Give Reward
        </Link>
      </div>
      <DynamicTable schema={rewardSchema} data={rewards} />
      <Modal open={open} setOpen={setOpen} title="Teacher Management">
        <TeacherManager />
      </Modal>
    </Layout>
  );
};

export default withAuth(Rewards);
