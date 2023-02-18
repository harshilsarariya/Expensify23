import client from "./client";

export const sendOTP = async (phoneNumber) => {
  try {
    const { data } = await client.post(`/send-otp?phoneNumber=${phoneNumber}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const { data } = await client.post(
      `/verify-otp?phoneNumber=${phoneNumber}&otp=${otp}`
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

export const createUser = async (object, config) => {
  try {
    const data = await client.post(`/user/add`, object, config);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const addTransaction = async (object, config) => {
  try {
    const { data } = await client.put(`/user/tx/add`, object, config);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const fetchLatestTransactions = async (userId) => {
  try {
    const { data } = await client.get(
      `/user/fetchLatestTransactions/${userId}`
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

export const fetchCategories = async (userId) => {
  try {
    const { data } = await client.get(`/user/fetchCategories/${userId}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const fetchCategoryWiseExpense = async (userId, category) => {
  try {
    const { data } = await client.get(
      `/user/fetchCategoryWiseExpense/${userId}?category=${category}`
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

export const fetchCurrentMonthTransactions = async (userId) => {
  try {
    const { data } = await client.get(
      `/user/fetchCategoryWiseExpense/${userId}`
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

export const fetchTodaysTransactions = async (userId) => {
  try {
    const { data } = await client.get(
      `/user/fetchTodaysTransactions/${userId}`
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

export const addBudget = async (userId, object, config) => {
  try {
    const { data } = await client.put(
      `/user/addBudget/${userId}`,
      object,
      config
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

export const getBudget = async (userId) => {
  try {
    const { data } = await client.get(`/user/getBudget/${userId}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
