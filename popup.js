let btnId = document.querySelector(".colorPickerBtn")


btnId.addEventListener('click', async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log('tab', tab)

    chrome.scripting
    .executeScript({
        target: { tabId: tab.id },
        func : getColorPicker,
    }, async (scriptVal) => {
        const [data] = scriptVal
        let pickedColor =  document.querySelector(".pickedColor")
        let hexValue = document.querySelector(".hexValue")
        hexValue.innerHTML = data?.result?.sRGBHex
        pickedColor.style.backgroundColor = data?.result?.sRGBHex
    })
})


async function getColorPicker(){
    const eyeDropper = new window.EyeDropper()
    return await eyeDropper.open()
    

}