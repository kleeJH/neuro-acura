import supabase from "../../../../utils/supabase/adminClient.ts";
import { PostgrestError } from '@supabase/supabase-js';
import { nextBadRequestResponse, nextErrorResponse, nextJsonResponse } from "../../../../utils/response.ts";

export async function POST(request) {
    try {
        const body = await request.json();

        // Example
        // {
        //     user_id: '27d967df-9f16-491f-9da6-903363f58fa2',
        //     session_number: 1,
        //     bands: [
        //     {
        //         z_score: 3.5,
        //         brainwave_band: 'delta',
        //         frequency: 10,
        //         brodmann_area: 46,
        //         lobe: 'Frontal',
        //         region: 'Prefrontal Cortex',
        //         functions: '',
        //         possible_symptoms_of_defect: ''
        //     },
        //     ...
        //     ]
        //  }

        // Check if session exist
        const { data: sessionData, error: sessionError } = await supabase
            .from('sloreta_sessions')
            .select('id')
            .eq('session_number', body.session_number)
            .eq('user_id', body.user_id)
            .single()

        if (sessionData) {
            // Delete existing session data
            const { error: deleteError } = await supabase
                .from('sloreta_sessions')
                .delete()
                .eq('session_number', body.session_number)
                .eq('user_id', body.user_id)

            if (deleteError) {
                // console.log("Error deleting existing session data:", deleteError)
                throw new deleteError;
            }
        }

        // Insert into sloreta_sessions
        const { data: newSessionData, error: newSessionError } = await supabase
            .from('sloreta_sessions')
            .upsert([
                { session_number: body.session_number, user_id: body.user_id },
            ])
            .select()

        if (newSessionError) {
            // console.log("Error inserting into sloreta_sessions:", newSessionError)
            throw new newSessionError;
        }

        const sessionId = newSessionData[0]?.id

        // Insert into second table, using sessionId as foreign key
        let sessionBrainwaveDataInserts = []
        body.bands.forEach((band) => {
            sessionBrainwaveDataInserts.push({
                brainwave_band: band.brainwave_band,
                z_score: band.z_score,
                frequency: band.frequency,
                lobe: band.lobe,
                region: band.region,
                brodmann_area: band.brodmann_area,
                functions: band.functions,
                possible_symptoms_of_defect: band.possible_symptoms_of_defect,
                session_id: sessionId,
            })
        })


        const { data: brainwaveBandData, error: brainwaveBandError } = await supabase
            .from('sloreta_brainwave_data')
            .insert(sessionBrainwaveDataInserts)
            .select()

        if (brainwaveBandError) {
            // console.log("Error inserting into sloreta_brainwave_data:", brainwaveBandError)
            throw new brainwaveBandError;
        }

        return nextJsonResponse('Data inserted into the database.', 200, 'Saved!');
    } catch (err) {
        // console.log("Error:", err)
        if (err instanceof PostgrestError) {
            return nextErrorResponse(err.message, err.code);
        } else {
            return nextBadRequestResponse('There was an issue when inserting the session data.');
        }
    }
}
