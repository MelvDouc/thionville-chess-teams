type HttpVerb = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

class FetchWrapper {
  constructor(private readonly _verb: HttpVerb) { }

  async json<T extends object>({ url, data }: {
    url: string;
    data?: object;
  }): Promise<T | null> {
    const requestInit: RequestInit = {
      method: this._verb
    };

    if (this._verb === "POST" || this._verb === "PUT" || this._verb === "PATCH") {
      requestInit.headers = {
        "Content-Type": "application/json"
      };
      if (data) requestInit.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, requestInit);
      const data: T = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

function createWrapper(verb: HttpVerb) {
  const wrapper = new FetchWrapper(verb);
  const json = wrapper.json.bind(wrapper);
  return json;
}

const get = createWrapper("GET");
const post = createWrapper("POST");
const put = createWrapper("PUT");
const patch = createWrapper("PATCH");
const del = createWrapper("DELETE");

export default {
  get,
  post,
  put,
  patch,
  delete: del
};