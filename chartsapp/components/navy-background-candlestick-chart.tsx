"use client"

import React, { useEffect, useRef } from 'react'
import { createChart, ColorType } from 'lightweight-charts'

const generateData = (count: number) => {
  const data = []
  let time = new Date('2023-01-01').getTime()
  let open = 100
  let high = 105
  let low = 95
  let close = 100

  for (let i = 0; i < count; i++) {
    const randomChange = (Math.random() - 0.5) * 10
    close = Math.max(0, close + randomChange)
    high = Math.max(open, close) + Math.random() * 5
    low = Math.min(open, close) - Math.random() * 5

    data.push({
      time: new Date(time).toISOString().split('T')[0],
      open,
      high,
      low,
      close,
    })

    time += 24 * 60 * 60 * 1000 // Add one day
    open = close
  }

  return data
}

export function NavyBackgroundCandlestickChartComponent() {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: 600,
        height: 300,
        layout: {
          background: { type: ColorType.Solid, color: '#1E2130' },
          textColor: '#E0E0E0',
        },
        grid: {
          vertLines: { color: '#2A2E3E' },
          horzLines: { color: '#2A2E3E' },
        },
        rightPriceScale: {
          borderColor: '#2A2E3E',
        },
        timeScale: {
          borderColor: '#2A2E3E',
        },
      })

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#4CAF50',
        downColor: '#EF5350',
        borderVisible: false,
        wickUpColor: '#4CAF50',
        wickDownColor: '#EF5350',
      })

      const data = generateData(50) // Generate 50 days of mock data
      candlestickSeries.setData(data)

      chart.timeScale().fitContent()

      return () => {
        chart.remove()
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-[#151A2D]">
      <h2 className="text-2xl font-bold mb-4 text-white">Navy Background Stock Candlestick Chart</h2>
      <div ref={chartContainerRef} className="border border-[#2A2E3E] rounded-lg overflow-hidden" />
    </div>
  )
}