[![Build Status](https://img.shields.io/travis/vandeurenglenn/custom-web3/master.svg?style=for-the-badge)](https://travis-ci.org/vandeurenglenn/custom-web3)
[![npm](https://img.shields.io/npm/dt/@vandeurenglenn/custom-web3.svg?style=for-the-badge)](https://www.npmjs.com/package/@vandeurenglenn/custom-web3)
[![David](https://img.shields.io/david/vandeurenglenn/custom-web3.svg?style=for-the-badge)](https://github.com/vandeurenglenn/custom-web3)
[![npm](https://img.shields.io/npm/v/@vandeurenglenn/custom-web3.svg?style=for-the-badge)](https://www.npmjs.com/package/@vandeurenglenn/custom-web3)
[![node](https://img.shields.io/node/v/@vandeurenglenn/custom-web3?style=for-the-badge)]((https://www.npmjs.com/package/@vandeurenglenn/custom-web3))

# custom-web3
 Web3 custom-element, brings the whole api and a bit more.

## Install
```sh
npm i --save @vandeurenglenn/custom-web3
```

## Usage
```html
<custom-web3></custom-web3>
<script type="module">
  import '@vandeurenglenn/custom-web3'
  
  customElements.whenDefined('custom-web3').then(() => {
    const abi = [{}]
    document.querySelector('custom-web3').addContract('contract name', 'contract address', abi)
  })
</script>
```

## API

### addContract(name, address, abi)

`name` contract name (makes the contract available in globalThis)<br>
`address` contract address<br>
`abi` contract abi<br>

```js
const name = 'mycontract'

document.querySelector('custom-web3').addContract('mycontract', '0x0...', [{}])

globalThis.mycontract
```

### connect()
Show Dialog and connect account (done automaticly if autoConnect = true)
```js
document.querySelector('custom-web3').connect()
```

### accounts
Returns connected accounts
```js
document.querySelector('custom-web3').accounts
```

### autoConnect
true or false (defaults to true)
```js
document.querySelector('custom-web3').autoConnect = false
```

### isSupported

If not supported, imports our web3 version

```js
document.querySelector('custom-web3').isSupported()
```


## Powered by
- [web3@1.3.0](https://github.com/ethereum/web3.js/tree/1.x)
- [customElements@v1](https://developers.google.com/web/fundamentals/web-components/customelements)

## Build/Packaged with
- [rollup@2.32.1](https://rollupjs.org/)