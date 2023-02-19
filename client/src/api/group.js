import client from "./client";

export const createGroup = async (object, config) => {
  try {
    const { data } = await client.post(`/grp/add`, object, config);
    return data.data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getAllGrp = async () => {
  try {
    const { data } = await client.get(`/grp/get/all`);
    return data.data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getGrpInfo = async (grpID) => {
  try {
    const { data } = await client.get(`/grp/${grpID}`);
    return data.data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
