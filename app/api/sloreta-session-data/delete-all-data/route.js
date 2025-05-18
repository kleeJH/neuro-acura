import supabase from "../../../../utils/supabase/adminClient.ts";
import { PostgrestError } from '@supabase/supabase-js';
import { nextBadRequestResponse, nextErrorResponse, nextJsonResponse } from "../../../../utils/response.ts";

export async function DELETE(request) {
    try {
        const body = await request.json()

        // Delete all sessions from the same user
        const { error: deleteError } = await supabase
            .from('sloreta_sessions')
            .delete()
            .eq('user_id', body.user_id)

        if (deleteError) {
            throw deleteError;
        }

        return nextJsonResponse('All data deleted from the database.', 200);
    } catch (err) {
        // console.log("Error:", err)
        if (err instanceof PostgrestError) {
            return nextErrorResponse(err.message, err.code);
        } else {
            return nextBadRequestResponse('There was an issue when delete all data.');
        }
    }
}

