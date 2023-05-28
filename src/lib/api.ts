const API_BASE_URL = "/api/v1";

async function getResponse<T>(path: `/${string}`, requestInit?: RequestInit) {
  try {
    const response = await fetch(API_BASE_URL + path, requestInit);
    return response.json() as Promise<T>;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const create = <T>(entity: string, data: T) => {
  return getResponse<InsertResult>(`/${entity}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

const update = <T>(entity: string, id: string, data: T) => {
  return getResponse<UpdateResult>(`/${entity}/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

export {
  create,
  update
};