import { NextResponse } from "next/server";

function nextJsonResponse(msg: string, statusCode = 200, status = "Success") {
  return NextResponse.json(
    { status: status, message: msg },
    { status: statusCode }
  );
}

function nextJsonWithDataResponse(
  msg: string,
  data: any,
  statusCode = 200,
  status = "Success"
) {
  return NextResponse.json(
    { status: status, message: msg, data: data },
    { status: statusCode }
  );
}

function nextErrorResponse(
  errorMsg: string,
  statusCode = 500,
  status = "Error"
) {
  return NextResponse.json(
    { status: status, message: errorMsg },
    { status: statusCode }
  );
}

function nextBadRequestResponse(errorMsg: string, status = "Bad Request") {
  return NextResponse.json(
    { status: status, message: errorMsg },
    { status: 400 }
  );
}

function nextUnauthorizedResponse(errorMsg: string, status = "Unauthorized") {
  return NextResponse.json(
    { status: status, message: errorMsg },
    { status: 401 }
  );
}

type FinalResponse = {
  ok: boolean;
  statusCode: number;
  status: string;
  message: string;
  data?: any;
};

async function extractResponse(res: Response): Promise<FinalResponse> {
  const json = await res.json();
  return {
    ok: res.ok,
    statusCode: res.status,
    status: json.status,
    message: json.message,
    data: json.data ?? null,
  };
}

export {
  nextJsonResponse,
  nextJsonWithDataResponse,
  nextErrorResponse,
  nextBadRequestResponse,
  nextUnauthorizedResponse,
  extractResponse,
};
