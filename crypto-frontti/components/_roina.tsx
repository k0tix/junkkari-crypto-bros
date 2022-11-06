import { useEffect, useState } from "react";
import { Card, Image } from '@nextui-org/react';
import { Bitcoin, Binance } from 'cryptocons'

export type MonkeyType = 'hold' | 'idle' | 'buysell';

type MessageProps = {
    message: string
    type: MonkeyType
}

const monkeyTypeToPath = (type: MonkeyType): string => {
    if (type === 'hold') {
        return '/chimp.gif'
    }


    if (type === 'idle') {
        return '/chimp-yes.gif'
    }

    if (type === 'buysell') {
        return '/chimp-spin.gif'
    }

    return '/chimp.gif'
}

const monkeyWidthHeight: Record<MonkeyType, { width: number, height: number }> = {
    'buysell': { height: 150, width: 150 },
    'hold': { height: 120, width: 120 },
    'idle': { height: 100, width: 100 },
}

export default function Message({ message, type }: MessageProps) {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            margin: '1em',
            padding: '1em'
        }}>
            {message.length ?
                <Card style={{
                    margin: '1em',
                    padding: '1em'
                }} isHoverable variant="bordered">{message}</Card> : <></>}

            <Image src={monkeyTypeToPath(type)} alt="me" width={monkeyWidthHeight[type].width} height={monkeyWidthHeight[type].height} />

        </div>
    )
}

type CryptoIconProps = {
    ticker: string
}

export function CryptoIcon({ ticker }: CryptoIconProps) {
    if (ticker === 'btcusdt') {
        return <Bitcoin />
    }

    if (ticker === 'bnbusdt') {
        return <Binance />
    }

    return <>{ticker}</>
}