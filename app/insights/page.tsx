"use client"

import { MarketInsights } from '@/components/market-insights'

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Market Insights</h1>
        <MarketInsights />
      </div>
    </div>
  )
}
