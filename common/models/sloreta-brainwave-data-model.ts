type BrainwaveData = {
  id: number;
  brainwave_band: string;
  z_score: number;
  frequency: number;
  lobe?: string | null;
  region?: string | null;
  brodmann_area: number;
  functions?: string | null;
  possible_symptoms_of_defect?: string | null;
  created_at: string;
  session_id: number;
};

export default BrainwaveData;
