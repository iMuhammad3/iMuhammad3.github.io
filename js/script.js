import { createDiv, shortenUrl, displayMessage} from './functions.js'


const navBarBtn = document.querySelector('#navBarBtn');
const shortenUrlBtn = document.querySelector('#shortenUrlBtn')
const shortenUrlInput = document.querySelector('#shortenUrlInput')
const shortUrlContainer = document.querySelector('.shortened-url-container')
const message = document.querySelector('#message')

navBarBtn.addEventListener('click', () => {
  document.querySelector('.nav-mobile').classList.toggle('hidden')
})
shortenUrlBtn.addEventListener('click', async () => {
  const inputValue = shortenUrlInput.value
  if(inputValue){
    shortenUrlInput.classList.remove('error')
    const shortenedUrl = await shortenUrl(inputValue)
    if(shortenedUrl){
      createDiv(inputValue, shortenedUrl, shortUrlContainer)
      displayMessage(message, 'error', false)
    } else {
      displayMessage(message, 'error', true, 'Please input a valid URL')
    }
  } else {
    shortenUrlInput.classList.add('error')
    displayMessage(message, 'error', true, 'Please input a URL')
  }
  shortenUrlInput.value = ''
})
