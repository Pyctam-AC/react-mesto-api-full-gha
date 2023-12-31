class Api {
  constructor ({url, headers}) {
    this._url = url;
    this._headers = headers
  }

  _getResult (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject (`Ошибка: ${res.status}`)
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: 'include'
    })
    .then(res => this._getResult (res))
  }

/*   getInfoProfile () {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include'
    })
    .then(res => this._getResult (res))
  } */

  setInfoProfile (data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._getResult (res))
  }

  setNewCard (data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._getResult (res))
  }

  deleteCard (cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
    .then(res => this._getResult (res))
  }

  setLikeCard (cardID, method) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: `${method ? "PUT" : "DELETE"}`,
      credentials: 'include',
      headers: this._headers,
    })
    .then(res => this._getResult (res))
  }

  setNewAvatar (data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(res => this._getResult (res))
  }
}

const api = new Api({
//  url: 'http://localhost:4000',
  url: 'https://sultangaliev.nomoredomains.work',
  headers: {
    authorization: 'dcda7652-e6c3-4950-99a4-e4a7cc367bc0',
    'Content-Type': 'application/json'
  }
});

export default api;
