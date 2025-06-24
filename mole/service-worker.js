let moleShowing = false
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
  hideMole()
})

