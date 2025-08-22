"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertTriangle, Brain, Activity, TrendingUp, Info, Eye } from "lucide-react"
import { ExplainabilityDashboard } from "./explainability-dashboard"

interface PredictionResult {
  prediction: "normal" | "abnormal"
  confidence: number
  risk_score: number
  model_outputs: {
    random_forest: number
    deep_neural_network: number
    hybrid_ensemble: number
  }
  feature_importance: Array<{
    feature: string
    importance: number
    impact: "positive" | "negative"
  }>
  clinical_insights: string[]
}

interface PredictionResultsProps {
  result: PredictionResult
  timestamp: string
  modelVersion: string
}

export function PredictionResults({ result, timestamp, modelVersion }: PredictionResultsProps) {
  const isAbnormal = result.prediction === "abnormal"
  const riskLevel = result.risk_score > 0.7 ? "high" : result.risk_score > 0.4 ? "medium" : "low"

  return (
    <div className="space-y-6">
      <Tabs defaultValue="results" className="space-y-4">
        <TabsList>
          <TabsTrigger value="results">Prediction Results</TabsTrigger>
          <TabsTrigger value="explainability" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            AI Explainability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-6">
          {/* Main Result */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isAbnormal ? (
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-chart-4" />
                )}
                Prediction Result
              </CardTitle>
              <CardDescription>
                Generated on {new Date(timestamp).toLocaleString()} • {modelVersion}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {result.prediction.charAt(0).toUpperCase() + result.prediction.slice(1)}
                  </h3>
                  <p className="text-muted-foreground">Classification Result</p>
                </div>
                <Badge
                  variant={isAbnormal ? "destructive" : "secondary"}
                  className={isAbnormal ? "" : "bg-chart-4 text-white"}
                >
                  {(result.confidence * 100).toFixed(1)}% Confidence
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Risk Score</span>
                  <span className="font-medium">{(result.risk_score * 100).toFixed(1)}%</span>
                </div>
                <Progress value={result.risk_score * 100} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low Risk</span>
                  <span>High Risk</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Model Outputs
              </CardTitle>
              <CardDescription>Individual model predictions and ensemble result</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Random Forest</span>
                    <span className="font-medium">{(result.model_outputs.random_forest * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={result.model_outputs.random_forest * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Deep Neural Network</span>
                    <span className="font-medium">{(result.model_outputs.deep_neural_network * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={result.model_outputs.deep_neural_network * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>Hybrid Ensemble</span>
                    <span className="text-accent">{(result.model_outputs.hybrid_ensemble * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={result.model_outputs.hybrid_ensemble * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Importance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Feature Importance
              </CardTitle>
              <CardDescription>Key factors influencing the prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.feature_importance.slice(0, 6).map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span>{feature.feature}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            feature.impact === "positive"
                              ? "border-destructive text-destructive"
                              : "border-chart-4 text-chart-4"
                          }`}
                        >
                          {feature.impact === "positive" ? "↑" : "↓"}
                        </Badge>
                      </div>
                      <span className="font-medium">{(feature.importance * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={feature.importance * 100} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clinical Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Clinical Insights
              </CardTitle>
              <CardDescription>AI-generated clinical observations and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.clinical_insights.map((insight, index) => (
                  <Alert key={index}>
                    <Info className="h-4 w-4" />
                    <AlertDescription>{insight}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explainability">
          <ExplainabilityDashboard predictionResult={result} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
