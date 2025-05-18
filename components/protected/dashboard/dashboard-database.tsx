import SloretaSession from "@common/models/sloreta-session-model";
import { useToast } from "@providers/toast-provider/toastProvider";
import { useUserStore } from "@stores/useUserStore";
import { extractResponse } from "@utils/response";
import { get } from "@utils/supabase/helper";
import React, { useEffect, useState } from "react";
import BrainwaveDataTable from "./brainwave-data-table";
import { Heading } from "@radix-ui/themes";
import { RadixColorOptions } from "@common/enum";

const DashboardDatabase = () => {
  const user = useUserStore((state) => state.user);
  const { showToast } = useToast();
  const [data, setData] = useState<SloretaSession[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const nextResponse = await get(
        `/api/sloreta-session-data/get-all-data?user_id=${user?.id}`
      );
      const response = await extractResponse(nextResponse);

      if (response.ok) {
        setData(response.data ?? []);
      } else {
        showToast({
          title: response.status,
          description: response.message,
          color: "error",
        });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {data.map((session) => (
        <div id={session.id.toString()} className="mt-4">
          <Heading
            size={{ initial: "5", sm: "6" }}
            color={RadixColorOptions.CYAN}
            className="mb-4"
          >{`Session ${session.session_number}`}</Heading>
          <BrainwaveDataTable brainwaveData={session.sloreta_brainwave_data} />
        </div>
      ))}
    </>
  );
};

export default DashboardDatabase;
