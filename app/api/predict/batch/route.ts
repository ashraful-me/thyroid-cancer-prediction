import { type NextRequest, NextResponse } from "next/server"

interface BatchPredictionRequest {
  data: Array<{
    id?: string
    age: number
    sex: number
    on_thyroxine: number
    query_on_thyroxine: number
    on_antithyroid_medication: number
    sick: number
    pregnant: number
    thyroid_surgery: number
    I131_treatment: number
    query_hypothyroid: number
    query_hyperthyroid: number
    lithium: number
    goitre: number
    tumor: number
    hypopituitary: number
    psych: number
    TSH: number
    T3_measured: number
    TT4_measured: number
    T4U_measured: number
    FTI_measured: number
  }>
}

export async function POST(request: NextRequest) {
  try {
    const { data }: BatchPredictionRequest = await request.json()

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: "Invalid data format. Expected array of patient records." }, { status: 400 })
    }

    if (data.length > 1000) {
      return NextResponse.json({ error: "Batch size too large. Maximum 1000 records allowed." }, { status: 400 })
    }

    // Simulate batch processing
    const results = []
    const batchSize = 10

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)

      // Simulate processing delay for each batch
      await new Promise((resolve) => setTimeout(resolve, 500))

      for (const record of batch) {
        // Simulate individual prediction (simplified for batch)
        const riskScore = Math.random() * 0.6 + 0.2 // Random score between 0.2-0.8
        const prediction = riskScore > 0.5 ? "abnormal" : "normal"

        results.push({
          id: record.id || `patient_${i + results.length + 1}`,
          prediction,
          risk_score: Math.round(riskScore * 100) / 100,
          confidence: Math.round(Math.abs(riskScore - 0.5) * 200) / 100,
        })
      }
    }

    // Calculate summary statistics
    const abnormalCount = results.filter((r) => r.prediction === "abnormal").length
    const normalCount = results.length - abnormalCount
    const avgRiskScore = results.reduce((sum, r) => sum + r.risk_score, 0) / results.length

    return NextResponse.json({
      success: true,
      summary: {
        total_processed: results.length,
        normal_cases: normalCount,
        abnormal_cases: abnormalCount,
        average_risk_score: Math.round(avgRiskScore * 100) / 100,
        high_risk_cases: results.filter((r) => r.risk_score > 0.7).length,
      },
      results,
      timestamp: new Date().toISOString(),
      model_version: "ThyroNet-XAI v1.0",
    })
  } catch (error) {
    console.error("[v0] Batch prediction error:", error)
    return NextResponse.json({ error: "Internal server error during batch prediction" }, { status: 500 })
  }
}
