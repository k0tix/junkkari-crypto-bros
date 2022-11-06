import { useEffect, useState } from "react";
import { Card, Image } from '@nextui-org/react';
import { Bitcoin, Binance } from 'cryptocons'

type MonkeyType = 'sunglasses' | 'yes' | 'sad' | 'spin';

type MessageProps = {
    message: string
    duration: number
    type: MonkeyType
}

const monkeyTypeToPath = (type: MonkeyType): string => {
    if (type === 'sunglasses') {
        return '/chimp.gif'
    }

    if (type === 'sad') {
        return '/chimp.gif'
    }

    if (type === 'yes') {
        return '/chimp-yes.gif'
    }

    if (type === 'spin') {
        return '/chimp-spin.gif'
    }

    return '/chimp.gif'
}

const monkeyWidthHeight: Record<MonkeyType, { width: number, height: number }> = {
    'spin': { height: 150, width: 150 },
    'sad': { height: 100, width: 100 },
    'sunglasses': { height: 120, width: 120 },
    'yes': { height: 100, width: 100 },
}

export default function Message({ message, duration, type }: MessageProps) {
    const [m, setMessage] = useState<string>(message);

    useEffect(() => {
        setTimeout(() => {
            setMessage('');
        }, duration)
    }, [])

    return (
        m.length ? <div style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            margin: '1em',
            padding: '1em'
        }}>
            <Card style={{
                margin: '1em',
                padding: '1em'
            }} isHoverable variant="bordered">{message}</Card>

            <Image src={monkeyTypeToPath(type)} alt="me" width={monkeyWidthHeight[type].width} height={monkeyWidthHeight[type].height} />

        </div> : <></>
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