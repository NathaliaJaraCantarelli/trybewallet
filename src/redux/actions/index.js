// Coloque aqui suas actions
export async function getAPI() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => json);
}

export function submitAction(typeAction, value) {
  return {
    type: typeAction,
    payload: value,
  };
}
