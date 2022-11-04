import Head from 'next/head'
import { useState } from 'react'
import { Button, Panel, Placeholder } from 'rsuite'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function Home() {
  const [items, setItems] = useState<number[]>([4, 3, 2, 1]);
  const [parent] = useAutoAnimate();

  return (
    <div>
      <Head>
        <title>CryptoChimp</title>
      </Head>

      <div className="hero">
        <h1 className="title" style={{ color: 'whiteSmoke' }}>CryptoChimp</h1>
        <p className="description" style={{ color: 'grey' }}>
          Ugala bugala, crazy crypto insight asdasdasdasdasdasdasd
          <br />
        </p>
        <Button appearance="primary" onClick={event => {
          setItems([...items].sort());
        }}>
          {'Click me ;)'}
        </Button>
      </div>

      <ul ref={parent as any} style={{ listStyleType: 'none' }}>
        {items.map(i => (<li key={i}><Panel header="Panel title" bordered style={{ marginTop: '2em' }}>
          {i}
          <Placeholder.Paragraph />
        </Panel></li>))}
      </ul>

      <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
        padding: 50px;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
    `}</style>
    </div>
  )
}
