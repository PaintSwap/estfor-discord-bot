// Convert the unix time in ms to formatted date as "Feb 21, 2021 - 05:42 AM"
export const formatDate = (unix: number, skipYear = false, skipTime = false) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const date = new Date(unix)
  return `${months[date.getMonth()]} ${date.getDate()}${!skipYear ? `, ${date.getFullYear()}` : ``}${
    !skipTime ? ` - ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}` : ``
  }`
}