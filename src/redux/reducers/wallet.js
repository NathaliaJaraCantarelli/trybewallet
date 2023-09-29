// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RETURN_API':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'CHANGE_EXPENSE':
    return {
      ...state,
      expenses: action.payload,
      editor: false,
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
