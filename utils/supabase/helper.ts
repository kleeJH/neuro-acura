export const requestHelper = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any
) => {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  return res;
};

export const get = (url: string, data: any = undefined) =>
  requestHelper("GET", url, data);

export const post = (url: string, data: any = undefined) =>
  requestHelper("POST", url, data);

export const put = (url: string, data: any = undefined) =>
  requestHelper("PUT", url, data);

export const del = (url: string, data: any = undefined) =>
  requestHelper("DELETE", url, data);
