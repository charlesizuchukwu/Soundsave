export const errorMsg = (err) => {
  if (err?.response) {
    return err?.response?.data?.message;
  } else if (err?.request) {
    return err?.message;
  } else {
    return err?.message;
  }
};
