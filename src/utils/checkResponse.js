import { baseUrl } from './baseURL'

class Api {
  constructor(data) {
    this._baseUrl = data;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Ошибка: ${res.status} - ${res.statusText}`
      );
    }
  }

  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`).then((res) => this._requestResult(res));
  }

  sendIngredients(ingredientsIds) {
    const burgerData = {
      'ingredients': ingredientsIds
    }

    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(burgerData)
    }).then((res) => this._requestResult(res));
  }
}

const mainApi = new Api(baseUrl);

export default mainApi;