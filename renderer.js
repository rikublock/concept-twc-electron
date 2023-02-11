const setButton = document.getElementById("btn");
const coinSelect = document.getElementById("coins");
const resultMnemonic = document.getElementById("coin-mnemonic");
const resultAddress = document.getElementById("coin-address");

setButton.addEventListener("click", async () => {
    const coinType = coinSelect.value;
    const [ mnemonic, address ] = await window.API.generateAddress(coinType);
    resultMnemonic.innerText = mnemonic;
    resultAddress.innerText = address;
});
