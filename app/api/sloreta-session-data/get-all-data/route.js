import supabase from "../../../../utils/supabase/adminClient.ts";
import { PostgrestError } from '@supabase/supabase-js';
import { nextBadRequestResponse, nextErrorResponse, nextJsonWithDataResponse } from "../../../../utils/response.ts";

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const user_id = url.searchParams.get('user_id');

        const { data: sessionData, error: sessionError } = await supabase
            .from('sloreta_sessions')
            .select('*, sloreta_brainwave_data(*)')
            .eq('user_id', user_id)
            .order('session_number', { ascending: true });

        if (sessionError) {
            throw sessionError;
        }

        return nextJsonWithDataResponse('Data retrieved successfully.', sessionData);
    } catch (err) {
        if (err instanceof PostgrestError) {
            return nextErrorResponse(err.message, err.code);
        } else {
            return nextBadRequestResponse('There was an issue when retrieving the session data.');
        }
    }
}