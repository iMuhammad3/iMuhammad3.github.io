// display the details of the url that was shortened in the html
async function displayShortenedUrl(longUrl, shortUrl){
    return `
        <span class="url-to-be-shortened">${longUrl}</span>
        <div>
            <span class="shortened-url">${await shortUrl}</span>
            <button class="copy-url-button cyan rounded">Copy</button>
        </div>
    `
}

// shorten the url using api
export async function shortenUrl(longUrl) {
    try {
      const response = await fetch('http://tinyurl.com/api-create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `url=${encodeURIComponent(longUrl)}`,
      });
  
      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }
  
      const data = await response.text();
      return data
    } catch (error) {
      console.error('Error:', error);
    }
}

// display a status message (whether url is invalid, etc)
export function displayMessage(element, status = 'error', display = true, message){
    if(display){
        element.classList.remove('hidden')
        element.classList.add(status)
        element.innerText = message
    } else {
        element.classList.add('hidden')
        element.classList.remove(status)
    }
}

// create the div containing the longUrl that was pasted, the shorturl and the copy button
export async function createDiv(longUrl, shortUrl, shortUrlContainer) {
  if (longUrl.length > 60) {
    const urlArray = longUrl.split('');
    urlArray.splice(60, longUrl.length - 60, '...');
    longUrl = urlArray.join('');
  }
    const div = document.createElement('div')
    div.innerHTML = await displayShortenedUrl(longUrl, shortUrl)
    shortUrlContainer.appendChild(div)
    // copy the url to clipboard
    const copyButton = div.querySelector('.copy-url-button')
    copyButton.addEventListener('click', () => {
      copyToClipboard(shortUrl)
      // toggle active state of button
      copyButton.classList.add('copied')
      copyButton.textContent = 'Copied!'
    })
}

function copyToClipboard(textToCopy) {
  navigator.clipboard.writeText(textToCopy)
}
