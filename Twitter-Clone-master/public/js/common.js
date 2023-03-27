// $(document).ready(() => alert('loool'))

// const postTextArea = document
// var go = $('#postTextArea')
// console.log(go)
// go.addEventListener(
//   ('click',
//   () => {
//     console.log('gooo')
//   })
// )

const postTextarea = document.querySelector('#postTextarea')
const submitPostButton = document.querySelector('#submitPostButton')
var textboxValue
postTextarea.addEventListener('keyup', (e) => {
  textboxValue = e.target.value.trim()
  if (submitPostButton.length == 0) {
    return
  }
  if (textboxValue == '') {
    submitPostButton.disabled = true
  } else {
    submitPostButton.disabled = false
  }
})

submitPostButton.addEventListener('click', async () => {
  var data = {
    content: textboxValue,
  }

  // $.post() method allows you to send asynchronous http POST request to submit and retrieve the data from the server without reloading whole page.
  // $.post(url, [data], [callback], [type])
  // $.post('/api/post', data, (postData, status, xhr) => {})

  const response = await fetch('/api/posts', {
    method: 'post',
    body: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  //   const responseData = await response.json()
  console.log(response)
})
