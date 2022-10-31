// Coloque aqui suas actions
export default function submitAction(typeAction, value) {
  return {
    type: typeAction,
    payload: value,
  };
}
