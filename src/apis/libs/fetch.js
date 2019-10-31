import QS from 'query-string';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

const parseResponse = response => {
  const { status: statusCode, ok: responseOK } = response;
  const ok = responseOK && statusCode >= 200 && statusCode < 300;

  return response.text().then(body => {
    const result = isEmpty(body) ? {} : JSON.parse(body);
    return {
      statusCode,
      ok,
      result
    };
  });
};

export const fetchBasicToken = (url, customHeaders, payload) => {
  const form = new FormData();
  map(payload, (value, key) => form.append(key, value))
  const realUrl = `${url}?${QS.stringify(payload)}`;

  return fetch(realUrl, {
    method: 'POST',
    headers: { ...customHeaders,  'Content-Type': 'application/x-www-form-urlencoded'},
  }).then(parseResponse)
};
