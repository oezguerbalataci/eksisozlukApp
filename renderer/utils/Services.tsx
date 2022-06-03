import axios from "axios";

const get = async () => {
  const response = await axios.get("http://localhost:3000/api/basliklar");
  return response.data;
};

const getBaslik = async (slug: string) => {
  const response = await axios.get(`http://localhost:3000/baslik/${slug}`);
  return response.data;
};

export default { get, getBaslik };
