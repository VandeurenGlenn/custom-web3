export default customElements.define('custom-web3', class CustomWeb3 extends HTMLElement {
  static get observedAttributes() {
    return ['provider']
  }
  constructor() {
    super()
  }
  
  connectedCallback() {    
    this._init()
  }
  
  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value
  }
  
  async _init() {
    this.autoConnect = true
    if (!this.isSupported || !globalThis.web3) await import('./../node_modules/web3/dist/web3.min.js')
    globalThis.web3 = this.isSupported ? globalThis.web3 : new Web3(globalThis.ethereum || web3.currentProvider)
    if (this.autoConnect) this.connect()
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
  addContract(name, address, abi) {
    globalThis[name] = web3.eth.contract(abi).at(address);
  }
  
  set autoConnect(value) {
    this._autoConnect = value
  }
  
  set provider(value) {
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
        if (version.major >= 1 && version.minor >= 13) return true
      }      
    }    
    return false
  }
  
  get autoConnect() {
    return this._autoConnect
  }
  
  get accounts() {
    return web3.eth.requestAccounts ? web3.eth.requestAccounts() : ethereum.enable()
  }
})