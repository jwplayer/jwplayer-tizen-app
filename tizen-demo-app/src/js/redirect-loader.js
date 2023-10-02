class RedirectLoader {
  constructor(element, url, index) {
    this._el = element;
    this.index = index;
    this._el.setAttribute('alt', this.trimStringToIndex('loading: ' + url));
    fetch(url).then((res) => this._handleResponse(res)).catch((err) => {
      this._el.setAttribute("alt", this.trimStringToIndex('>>' + err.toString()));
    });
  }

  trimStringToIndex(str) {
    return str.slice(this.index*20, (this.index+1)*20);
  }

  _handleResponse(res) {
    res.blob().then((blob) => {
      const content = URL.createObjectURL(blob);
      this._el.setAttribute("src", content);
      this._el.setAttribute("alt", 'loaded');
    }).catch((err) => {
      this._el.setAttribute("alt", this.trimStringToIndex('>>>' + err.toString()));
    });
  }
}

export default RedirectLoader;
