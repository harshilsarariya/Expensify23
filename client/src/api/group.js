import client from "./client";

export const createGroup = async (object) => {
  try {
    const data = await client.post(`/grp/add`, object);
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

export const grpSettle = async (grpID, ofUserdId, withUserId) => {
  try {
    const { data } = await client.get(
      `/grp/${grpID}/tx/settle/${ofUserdId}/${withUserId}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const grpSettleExpense = async (grpID, ofUserdId, withUserId) => {
  try {
    const { data } = await client.put(
      `/grp/${grpID}/tx/settle/${ofUserdId}/${withUserId}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const grpDelete = async (grpID) => {
  try {
    const { data } = await client.delete(`/grp/deleteGrp/${grpID}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const addGrpTxs = async (grpID, obj) => {
  try {
    const { data } = await client.post(`/grp/${grpID}/tx/add`, obj);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const updateGrpTxs = async (grpID, txId, obj) => {
  try {
    const { data } = await client.put(`/grp/${grpID}/tx/${txId}/update`, obj);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const deleteGrpTxs = async (grpID, txId) => {
  try {
    const { data } = await client.put(`/grp/${grpID}/tx/${txId}/remove`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
