import BrainwaveData from "./sloreta-brainwave-data-model";

type SloretaSession = {
  id: number;
  created_at: string;
  session_number: number;
  user_id: string;
  sloreta_brainwave_data: BrainwaveData[];
};

export default SloretaSession;
