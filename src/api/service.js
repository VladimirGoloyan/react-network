class Service {
  constructor() {
    this.baseUrl = "https://jsonplaceholder.typicode.com";
  }

  _request = (method = "GET", url, data = null) => {
    return fetch(`${this.baseUrl}${url}`, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : null,
    }).then((res) => {
      if (res.status >= 400) {
        const error = new Error("Error status :", res.status);
        throw error;
      }
      return res.json();
    });
  };

  getPosts = (start,limit)=>{
      return this._request("GET", `/posts?_start=${start}&_limit=${limit}`)
  }

  getAllPosts = () => {
    return this._request("GET", "/posts");
  };

  getPost = (id) => {
    return this._request("GET", `/posts/${id}`);
  };

  createPost = (data) => {
    return this._request("POST", "/posts", data);
  };

  updatePost = (id,data) => {
    return this._request("PATCH", `/posts/${id}`, data);
  };
  
  deletePost = (id) =>{
    return this._request("DELETE", `/posts/${id}`)
  }
}

const service = new Service();
export default service;