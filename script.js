const btn = document.getElementById('btn');
const audioElement = document.getElementById('audio');

// Toggle Button
function toggleButton() {
  btn.disabled = !btn.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  console.log('tell me: ', joke);
  VoiceRSS.speech({
    key: '54f21078e10f4bcb96bd3275b659d2a9',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // TTS
    tellMe(joke);

    //Disable Button
    toggleButton();
  } catch (e) {
    // Catch Errors Here
    console.log('whoops', e);
  }
}

// Event Listeners
btn.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
