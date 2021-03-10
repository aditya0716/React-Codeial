export function getFormBody(params) {
  let formBody = []; //  ['username=aadi', 'password=1234']
  for (let property in params) {
    let encodedKey = encodeURIComponent(property); //'user name---> user%20name'
    let encodedValue = encodeURIComponent(params[property]); //'akash kr----> akash%20kr'
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&"); //'username=aadi&password=1234'
}
