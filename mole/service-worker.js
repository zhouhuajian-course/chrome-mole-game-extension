let moleShowing = false
let controllerId = ''
let timeoutId = 0

function showMole() {
  chrome.action.setIcon({ path: "icon-mole.png" })
  moleShowing = true
}
function hideMole() {
  chrome.action.setIcon({ path: "icon-hole.png" })
  moleShowing = false
}
chrome.action.onClicked.addListener(() => {
  // console.log('扩展图标被点击了') 
  if (!moleShowing) {
    console.log("地鼠没有出现，不做处理");
    return
  }
  console.log('地鼠被打中了，分数 +1')
  clearTimeout(timeoutId)
  chrome.runtime.sendMessage(controllerId, { content: '地鼠被打中了，请将分数 +1' })

  hideMole()
})

chrome.runtime.onMessageExternal.addListener((message) => {
  // console.log(message)
  controllerId = message.controllerId
  showMole()
  // 失败 没打中地鼠
  timeoutId = setTimeout(async () => {
    hideMole()
    const newTabs = await chrome.tabs.query({ title: '新标签页' })
    if (newTabs.length > 0) {
      // 错过一个地鼠关闭一个标签页的功能默认关闭，如果需要开启该功能，请反注释下面的代码
      // chrome.tabs.remove(newTabs[newTabs.length - 1].id)
    }
  }, 2000)

})

