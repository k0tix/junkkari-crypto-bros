import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Switch, Table, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes'

const columns = [
  {
    key: "currency",
    label: "CURRENCY",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];
const rows = [
  {
    key: "1",
    currency: "BTC",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    currency: "ETH",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    currency: "Dogecoin",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    currency: "Joku muu",
    role: "Community Manager",
    status: "Vacation",
  },
];

export default function Home() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <div>
      The current theme is: {type}
      <Switch
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />

      <Table
        bordered
        shadow={false}
        selectionMode="multiple"
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
        <Table.Body items={rows}>
          {(item: any) => (
            <Table.Row key={item.key}>
              {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )

}
