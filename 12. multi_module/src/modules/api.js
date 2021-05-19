export const getData = (base = "USD") => {
  return fetch(
    `https://api.ratesapi.io/api/latest?access_key=cf865dddff6410a7cb3ccd2b1df9aaa2&base=${base}`
  )
    .then((response) => {
      if (response.ok) return response.json();
      throw "Request failed";
    })
    .catch((err) => alert(err));
};