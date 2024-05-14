import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';


interface Joke {
  setup: string;
  punchline: string;
};

function App() {
  const textUrl = useRef('');
  const [loading, setLoading] = useState<boolean>(true)
  const [joke, setJoke] = useState<Joke>({
    setup: '',
    punchline: ''
  });

  const getRandomColor = () => {
    const colors = ['#FC4100', '#FFC55A', '#00215E', '#2C4E80', '#FE4A49', '#2AB7CA', '#FED766' ];
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
  }

  const getTextUrl = () => {
    const setupUrl = joke.setup.split(' ').join('%20');
    const punclineUrl = joke.punchline.split(' ').join('%20');

    return setupUrl.concat(punclineUrl);
  }

  const fetchJoke = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const { setup, punchline } = await response.json();

      setJoke({setup, punchline});
      document.body.style.backgroundColor = getRandomColor();
      document.body.style.transition = 'background-color 800ms ease-in';
      textUrl.current = getTextUrl();

    } catch (err) {
      console.log('Error fetching joke:', (err as Error).message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJoke();
    console.log('fired')
  }, []);


  return (
    <div id='container'>
      {loading ? <span>Loading...</span> : 
      <>
        <p id='setup'>{ joke.setup }</p>
        <p id='punchline'>{ joke.punchline }</p>
        <div id='buttons'>
          <button>
            <a href={`https://twitter.com/intent/post?text=${textUrl.current}`} target='_blank'>
              <FontAwesomeIcon icon={faXTwitter} />
              Share
            </a>
          </button>
          <button onClick={fetchJoke}>Get New Joke</button>
        </div>
      </>
      }
    </div>
  )
}

export default App
