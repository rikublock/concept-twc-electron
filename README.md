# Proof of Concept (Electron + Trust Wallet Core)

> Tested on a Linux Ubuntu machine

The Trustwallet project recently added beta support for WASM (WebAssembly) to its wallet-core implementation.
- the implementation can be found on github: https://github.com/trustwallet/wallet-core
- the compiled `@trustwallet/wallet-core` npm package is available from: https://www.npmjs.com/package/@trustwallet/wallet-core

Based on the electron app tutorial found here: https://www.electronjs.org/docs/latest/tutorial/quick-start

The goal is to quickly explore the support of the WASM Trustwallet core in electron apps. 

## Setup

Install dependencies.

```shell
yarn
```

## Run

Launch the electron app.

```shell
yarn start
```

## Build

> Note: Has lots of dependencies (especially when cross compiling for windows).

Detailed build instructions can be found here: https://www.electronjs.org/docs/latest/development/build-instructions-gn

```shell
yarn make
yarn make:win
```
