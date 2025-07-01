// chrome.alarms.create({ periodInMinutes: (1 / 60) * 3 })
chrome.runtime.onInstalled.addListener((details) => {
  // console.log(details)
  chrome.alarms.create({ periodInMinutes: (1 / 60) * 3 })
})

chrome.alarms.onAlarm.addListener(async () => {
  // console.log('该让某个地鼠出现了 ' + new Date().getSeconds() ) 
  const moles = (await chrome.management.getAll()).filter((ext) => ext.name == '地鼠')

  chrome.runtime.sendMessage(
    moles[Math.floor(Math.random() * moles.length)].id,
    { content: '请出现地鼠', controllerId: chrome.runtime.id }
  )

})

let counter = 0
chrome.runtime.onMessageExternal.addListener((message) => {
  console.log(message)
  counter++
  chrome.action.setBadgeText({ text: counter + '' })

})
