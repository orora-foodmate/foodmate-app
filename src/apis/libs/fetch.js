import QS from 'query-string';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import Toast from 'react-native-simple-toast';
import { getUrl } from '../libs/route';
import { getErrorResponse } from '../../helpers/responseHelper';

const parseResponse = response => {
  const { status: statusCode, ok: responseOK } = response;
  const ok = responseOK && statusCode >= 200 && statusCode < 300;

  return response.text().then(body => {
    const result = isEmpty(body) ? {} : JSON.parse(body);
    if (!ok) {
      const {data = {message: 'something is error.'}} = result;
      Toast.show(data.message);
      throw new Error(data.message);
    }
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
    headers: { ...customHeaders, 'Content-Type': 'application/json' },
  }).then(parseResponse)
};

export const fetchWithToken = async (
  url,
  method,
  authorization,
  payload = {},
  qs = {}
) => {
  try {
    const realUrl = `${url}?${QS.stringify(qs)}`;
    const { access_token } = authorization;

    const requestBody = {
      method,
      headers: { Authorization: `bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    };

    const { ok, result } = await fetch(realUrl, requestBody).then(
      parseResponse
    );

    if (ok) return { ok, result };
    throw new Error(result.data);
  } catch (error) {
    throw error;
  }
};

export const fetchWithoutToken = async (
  url,
  method = "GET",
  payload = {},
  qs = {}
) => {
  try {
    const realUrl = `${url}?${QS.stringify(qs)}`;
    const requestBody = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };

    const res = await fetch(realUrl, requestBody);
    console.log("TCL: res", res)
    const { statusCode, ok, result } = await parseResponse(res);

    return {
      statusCode,
      ok,
      result
    };

  } catch (error) {
    console.log("TCL: error", error)
    throw error;
  }
};