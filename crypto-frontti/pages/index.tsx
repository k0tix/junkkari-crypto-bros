import { Badge, Spacer, Switch, Table, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes'
import { Ref, useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Message from '../components/_roina';

const baseUrl = 'https://cryptochimpgw-9oq2br2d.ew.gateway.dev'

const columns = [
  {
    key: "coin",
    label: "TICKER",
  },
  {
    key: "prediction",
    label: "PREDICTION",
  },
  {
    key: "price",
    label: "PRICE",
  },
];

const message = 'Osta nyt vittu';

type data = {
  coin: string
  id: number
  prediction: string
  price: string
  timestamp: string
}

export default function Home() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [data, setData] = useState<data[]>([]);
  const [animationParent] = useAutoAnimate()


  useEffect(() => {
    fetch(`${baseUrl}/getData`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      }).catch((e) => console.log(e))
  }, [])


  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '2em',
      //background: 'linear-gradient(#e66465, #9198e5);'
    }}>
      <h1>Crypto chimp</h1>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h4>Theme: {type}</h4>
        <Spacer />
        <Switch shadow
          about='theme'
          title='theme'
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />

      </div>
      {
        data.length ?
          <Table
            ref={animationParent as Ref<HTMLTableElement>}
            bordered
            shadow={false}
            aria-label="Example static bordered collection table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={data}>
              {(item: any) => (
                <Table.Row >
                  {(columnKey) => {
                    const value = item[columnKey];

                    if (columnKey === 'prediction') {
                      let color: 'secondary' | 'primary' | 'default';

                      if (value === 'sell') {
                        color = 'secondary';
                      } else if (value === 'buy') {
                        color = 'primary';
                      } else {
                        color = 'default';
                      }

                      return <Table.Cell><Badge enableShadow disableOutline color={color}>{value}</Badge></Table.Cell>
                    }

                    return <Table.Cell>{value}</Table.Cell>
                  }}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          : <>No data</>
      }
      <Message message={message} type='sunglasses' duration={10000000} />
    </div >
  )

}
