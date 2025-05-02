from flask import jsonify

class HTTPResponse:
  def __init__(self, status_code=200):
    self.status_code = status_code
    self._message = None
    self._error = None
    self._data = {}

  def message(self, text):
    self._message = text
    return self

  def error(self, text):
    self._error = text
    return self

  def data(self, data_dict):
    self._data.update(data_dict)
    return self

  def to_dict(self):
    body = {**self._data}
    if self._message is not None:
      body["message"] = self._message
    if self._error is not None:
      body["error"] = self._error
    return body

  def send(self):
    return jsonify(self.to_dict()), self.status_code
