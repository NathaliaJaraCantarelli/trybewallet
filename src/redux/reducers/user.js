// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'EMAIL-LOGIN':
    return {
      ...state,
      email: payload,
    };
  default:
    return state;
  }
};

export default user;
