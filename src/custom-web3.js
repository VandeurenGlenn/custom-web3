import './../node_modules/web3/dist/web3.min.js'

globalThis.contracts = globalThis.contracts || {}


export default customElements.define('custom-web3', class CustomWeb3 extends HTMLElement {
  static get observedAttributes() {
    return ['provider']
  }
  constructor() {
    super()
  }

  connectedCallback() {
    globalThis.web3 = this.isSupported ? globalThis.web3 : new Web3()
  }

  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value
  }

  connect() {
    return this.accounts
  }

  /**
   * Add a contract
   *
   * @params {object} name - contract name
   * @params {object} address - contact address
   * @params {object} abi - contract abi
   */
  async addContract(name, address, abi) {
    globalThis.contracts[name] = new globalThis.web3.eth.Contract(abi, address)

    const methods = globalThis.contracts[name].methods

    globalThis[name] = new Proxy(methods, {
      get(target, propKey, receiver) {
        return (...args) => {
          const result = target[propKey].apply(this, args);
          return result.call();
        }
      }
    })
  }

  set provider(value) {
    if (typeof value === 'string') {
      let Provider = value
      const protocol = value.split('://')[0]
      if (protocol.includes('http')) Provider = Web3.providers.HttpProvider
      else if (protocol.includes('ipc')) Provider = Web3.providers.IpcProvider
      else Provider = Web3.providers.WebsocketProvider

      value = new Provider(value)
    }
    web3.setProvider(value)
  }

  get isSupported() {
    if (globalThis.web3) {
      let version = globalThis.web3.version
      if (typeof version === 'string') {
        version = version.split('.')
        version = {
          major: version[0],
          minor: version[1],
          patch: version[2]
        }
        if (version.major >= 1 && version.minor >= 3) return true
      }
    }
    return false
  }

  get accounts() {
    return new Promise(async (resolve, reject) => {
      let accounts = []
      try {
        // check if Metamask or similar is used as wallet
        if (web3.eth.requestAccounts) accounts = await web3.eth.requestAccounts()
      } catch (e) {
        // else get accounts from web3 directly
        const wallet = web3.eth.accounts.wallet
        for (var i = 0; i < wallet.length; i++) {
          accounts.push(wallet[0])
        }
      }
      resolve(accounts)
    })
  }
})
