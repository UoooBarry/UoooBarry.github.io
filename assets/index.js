const SERVER_ADDRESS = 'http://168.138.40.63:3000'
document.getElementById("short-url-form").addEventListener("submit", (event) => {
  url = document.querySelector('#url').value;

  if(url){
    fetch(`${SERVER_ADDRESS}/api/v0/urls/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url: url})
    })
    .then((response) => {
      response.json()
              .then((content) => {
                if(content.payload){
                  const uuid = content.payload.uuid
                  const redirectUrl = `${SERVER_ADDRESS}/redirect/${uuid}`
                  document.querySelector('#result').innerHTML = redirectUrl
                  document.querySelector('#result').href = redirectUrl
                  new QRCode(document.getElementById("qrcode"), redirectUrl);
                }else{
                  document.querySelector('#result').innerHTML = 'Error happened when shorting your URL, please check the format, is it start with www or http/s ?';
                  document.querySelector('#result').style.color = 'red';
                }
              })
    })
    .catch((err) => {
    })
  }
  event.preventDefault();
});