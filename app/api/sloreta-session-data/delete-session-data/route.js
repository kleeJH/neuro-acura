import supabase from "../../../../utils/supabase/adminClient.ts";
import { PostgrestError } from '@supabase/supabase-js';
import { nextBadRequestResponse, nextErrorResponse, nextJsonResponse } from "../../../../utils/response.ts";

export async function DELETE(request) {
    try {
        const body = await request.json()

        // Check if session exist
        const { data: sessionData, error: sessionError } = await supabase
            .from('sloreta_sessions')
            .select('id')
            .eq('user_id', body.user_id)
            .eq('session_number', body.session_number)
            .single()

        if (sessionData) {
            // Delete the session, it will cascade to the brainwave data
            const { error: deleteSessionError } = await supabase
                .from('sloreta_sessions')
                .delete()
                .eq('id', sessionData.id)

            if (deleteSessionError) {
                throw deleteSessionError;
            }

            return nextJsonResponse(`Session ${body.session_number} has been deleted from the database`, 200);
        } else {
            return nextJsonResponse('Session data was not found, so no data was deleted.', 200);
        }
    } catch (err) {
        // console.log("Error:", err)
        if (err instanceof PostgrestError) {
            return nextErrorResponse(err.message, err.code);
        } else {
            return nextBadRequestResponse('There was an issue when delete all data.');
        }
    }
}

