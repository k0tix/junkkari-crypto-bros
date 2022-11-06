import { Badge, Loading, Popover, Spacer, Switch, Table, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes'
import { Ref, useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Message, { CryptoIcon } from '../components/_roina';

const baseUrl = 'https://cryptochimpgw-9oq2br2d.ew.gateway.dev'

const columns = [
  {
    key: "ticker",
    label: "TICKER",
  },
  {
    key: "action",
    label: "PREDICTION",
  },
  {
    key: "chimpScore",
    label: "SCORE",
  },
  {
    key: "close",
    label: "PRICE ($)"
  }
];

const tickers = ['btcusdt', 'bnbusdt', 'ethusdt'] as const
type supportedTicker = typeof tickers[number]

const message = 'Osta nyt vittu';

type data = {
  id: number
  buy: number
  sell: number
  hold: number
  close: number
  ticker: string
  timestamp: string
}

const getLatestCoins = (tableRows: tableData[]): tableData[] => {
  return tableRows.slice(0, tickers.length).sort((a, b) => b.chimpScore - a.chimpScore)
}

type action = 'buy' | 'sell' | 'hold'

type tableData = {
  ticker: string
  action: action
  timestamp: number
  id: number
  close: number
  chimpScore: number
}

const formatData = (data: data): tableData => {
  let action: action = 'buy';
  let last = data.buy;

  if (data.hold > data.buy) {
    action = 'hold';
    last = data.hold;
  }

  if (data.sell > last) {
    action = 'sell';
    last = data.sell;
  }

  const chimpScore = Number(((Math.max(data.buy, data.sell) - data.hold) * 100).toFixed(2));

  return {
    ticker: data.ticker,
    action: action,
    id: data.id,
    timestamp: Date.parse(data.timestamp),
    close: data.close,
    chimpScore,
  } as tableData
}


export default function Home() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [data, setData] = useState<tableData[]>([]);
  const [animationParent] = useAutoAnimate()

  const getData = () => {
    console.log('Getting new data')
    fetch(`${baseUrl}/getData`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error("Something went wrong");

        }

        return res.json();
      })
      .then((data) => {
        setData(data.map(formatData));
      }).catch((e) => console.log(e))
  }

  useEffect(() => {
    getData()
    let interval = setInterval(getData, 1000 * 30)

    return () => {
      clearInterval(interval);
    };
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
      <Spacer />
      {
        data.length ?
          <Table
            ref={animationParent as Ref<HTMLTableElement>}
            bordered
            shadow={false}
            css={{
              maxHeight: "auto",
              minWidth: "400px",
            }}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={getLatestCoins(data)}>
              {(item: any) => (
                <Table.Row >
                  {(columnKey) => {
                    const value = item[columnKey];
                    let cell;

                    if (columnKey === 'action') {
                      let color: 'secondary' | 'primary' | 'default';

                      if (value === 'sell') {
                        color = 'secondary';
                      } else if (value === 'buy') {
                        color = 'primary';
                      } else {
                        color = 'default';
                      }

                      cell = <Badge enableShadow disableOutline color={color}>{value}</Badge>
                    } else {
                      cell = <>{value}</>
                    }

                    return <Table.Cell><Popover>
                      <Popover.Trigger>
                        {cell}
                      </Popover.Trigger>
                      <Popover.Content>
                        <Table
                          bordered
                          shadow={false}
                          css={{
                            maxHeight: "auto",
                            minWidth: "400px",
                          }}
                        >
                          <Table.Header columns={columns}>
                            {(column) => (
                              <Table.Column key={column.key}>{column.label}</Table.Column>
                            )}
                          </Table.Header>
                          <Table.Body items={data.filter((i) => i.ticker == item.ticker)}>
                            {(item: any) => (
                              <Table.Row >
                                {(columnKey) => {
                                  const value = item[columnKey];
                                  let cell;

                                  if (columnKey === 'action') {
                                    let color: 'secondary' | 'primary' | 'default';

                                    if (value === 'sell') {
                                      color = 'secondary';
                                    } else if (value === 'buy') {
                                      color = 'primary';
                                    } else {
                                      color = 'default';
                                    }

                                    cell = <Badge enableShadow disableOutline color={color}>{value}</Badge>
                                  } else {
                                    cell = <>{value}</>
                                  }

                                  return <Table.Cell>{cell}</Table.Cell>
                                }}
                              </Table.Row>
                            )}
                          </Table.Body>
                        </Table>
                      </Popover.Content>
                    </Popover></Table.Cell>
                  }}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          : <Loading size="xl" />
      }
      <Message message={message} type='sunglasses' duration={10000000} />
    </div >
  )

}
