import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Home() {
  const askQuestion = async (question) => {
    const response = await (await fetch('/api/god', {
        method: 'POST',
        body: JSON.stringify({
        question: question,
      })
    })).json();

    console.log(response);
  }

  const commands = [{
    command: 'Hi Simon *',
    callback: (question) => askQuestion(question)
  }]

  const {
    transcript,
    listening,
    resetTranscript
  } = useSpeechRecognition({ commands });

  return (
    <div className={styles.container}>
      <Head>
        <title>Lifely Assistant</title>
        <meta name="description" content="Lifely Applied AI Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Lifely Assistant Demo
        </h1>

        <p className={styles.description}>
          Hit the Start button to ask questions from the Lifely Handbook.
        </p>

        <div className={styles.grid}>
          <p>Microphone: {listening ? 'on' : 'off'}</p>

          <button onClick={SpeechRecognition.startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          
          <p>{transcript}</p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://lifely.nl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image src="/logo.svg" alt="Lifely Logo" width={150} height={30} />
          </span>
        </a>
      </footer>
    </div>
  )
}
