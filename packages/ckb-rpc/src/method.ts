import axios from 'axios'
import { DEBUG_LEVEL, LOG_COLOR } from './enum'

class Method {
  private _options: CKBComponents.IMethod = {
    name: '',
    method: '',
    paramsFormatters: [],
    resultFormatters: undefined,
  }

  static debugLevel = DEBUG_LEVEL.OFF

  private _node: CKBComponents.INode = {
    url: '',
  }

  constructor(options: CKBComponents.IMethod, node: CKBComponents.INode) {
    this._options = options
    this._node = node
  }

  public call = (...params: (string | number)[]) => {
    const data = params.map(
      (p, i) =>
        (this._options.paramsFormatters[i]
          && this._options.paramsFormatters[i](p))
        || p,
    )
    const id = Math.round(Math.random() * 10000)
    const payload = {
      id,
      method: this._options.method,
      params: data,
      jsonrpc: '2.0',
    }
    return axios({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: payload,
      url: this._node.url,
    }).then(res => {
      if (res.data.id !== id) {
        throw new Error('JSONRPC id not match')
      }
      if (Method.debugLevel === DEBUG_LEVEL.ON) {
        /* eslint-disabled */
        console.group()
        console.group()
        console.info(
          LOG_COLOR.CYAN,
          `\n----- ${this._options.name} request -----`,
          LOG_COLOR.RESET,
        )
        console.info(JSON.stringify(payload, null, 2))
        console.groupEnd()
        console.group()
        console.info(
          LOG_COLOR.CYAN,
          `----- ${this._options.name} response -----`,
          LOG_COLOR.RESET,
        )
        console.info(JSON.stringify(res.data, null, 2))
        console.groupEnd()
        console.groupEnd()
        /* eslint-enabled */
      }
      if (res.data.result === undefined) {
        throw new Error('No Result')
      }
      return this._options.resultFormatters
        ? this._options.resultFormatters(res.data.result)
        : res.data.result
    })
  }
}

export default Method
