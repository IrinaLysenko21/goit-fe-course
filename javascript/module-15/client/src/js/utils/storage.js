const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    throw new Error('Get state error: ', err);
  }
};

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    throw new Error('Set state error: ', err);
  }
};

const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    throw new Error('Remove state error: ', err);
  }
};

export default { load, save, remove };
