"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  TrendingUp,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  PieChartIcon,
  Calendar,
  Download,
} from "lucide-react"

// Mock data for visualizations
const predictionDistribution = [
  { name: "Normal", value: 847, percentage: 68 },
  { name: "Abnormal", value: 400, percentage: 32 },
]

const riskScoreDistribution = [
  { range: "0-20%", count: 234, color: "#22c55e" },
  { range: "21-40%", count: 312, color: "#84cc16" },
  { range: "41-60%", count: 301, color: "#eab308" },
  { range: "61-80%", count: 156, color: "#f97316" },
  { range: "81-100%", count: 244, color: "#ef4444" },
]

const modelPerformanceHistory = [
  { date: "Jan", accuracy: 91.2, sensitivity: 89.1, specificity: 93.4 },
  { date: "Feb", accuracy: 92.1, sensitivity: 90.3, specificity: 94.1 },
  { date: "Mar", accuracy: 93.5, sensitivity: 91.8, specificity: 95.2 },
  { date: "Apr", accuracy: 94.2, sensitivity: 91.8, specificity: 96.5 },
]

const featureImportanceData = [
  { feature: "TSH Level", importance: 0.24, impact: "High" },
  { feature: "Age", importance: 0.19, impact: "High" },
  { feature: "Thyroid Surgery", importance: 0.16, impact: "Medium" },
  { feature: "T3 Levels", importance: 0.14, impact: "Medium" },
  { feature: "Goitre", importance: 0.12, impact: "Medium" },
  { feature: "Tumor History", importance: 0.15, impact: "High" },
]

const recentPredictions = [
  { id: "P001", timestamp: "2024-01-15 14:30", prediction: "Normal", riskScore: 0.23, confidence: 0.87 },
  { id: "P002", timestamp: "2024-01-15 14:25", prediction: "Abnormal", riskScore: 0.78, confidence: 0.92 },
  { id: "P003", timestamp: "2024-01-15 14:20", prediction: "Normal", riskScore: 0.31, confidence: 0.76 },
  { id: "P004", timestamp: "2024-01-15 14:15", prediction: "Abnormal", riskScore: 0.69, confidence: 0.84 },
  { id: "P005", timestamp: "2024-01-15 14:10", prediction: "Normal", riskScore: 0.18, confidence: 0.91 },
]

const COLORS = ["#8b5cf6", "#22c55e", "#f97316", "#ef4444", "#3b82f6"]

export function ResultsDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d")

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abnormal Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">400</div>
            <p className="text-xs text-muted-foreground">32% of total cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Cases</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">244</div>
            <p className="text-xs text-muted-foreground">Risk score &gt; 80%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">87.3%</div>
            <p className="text-xs text-muted-foreground">Model certainty</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Prediction Distribution
                </CardTitle>
                <CardDescription>Overall classification results</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={predictionDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {predictionDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "#22c55e" : "#ef4444"} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Risk Score Distribution
                </CardTitle>
                <CardDescription>Distribution of risk scores across all predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskScoreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Model Performance Over Time
              </CardTitle>
              <CardDescription>Tracking accuracy, sensitivity, and specificity trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={modelPerformanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[85, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={2} name="Accuracy" />
                  <Line type="monotone" dataKey="sensitivity" stroke="#22c55e" strokeWidth={2} name="Sensitivity" />
                  <Line type="monotone" dataKey="specificity" stroke="#3b82f6" strokeWidth={2} name="Specificity" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">94.2%</div>
                <p className="text-sm text-muted-foreground mt-1">+0.7% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sensitivity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-chart-4">91.8%</div>
                <p className="text-sm text-muted-foreground mt-1">True positive rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Specificity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-chart-2">96.5%</div>
                <p className="text-sm text-muted-foreground mt-1">True negative rate</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Global Feature Importance
              </CardTitle>
              <CardDescription>Most influential features across all predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={featureImportanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 0.3]} />
                  <YAxis dataKey="feature" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="importance" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Risk Factors</CardTitle>
                <CardDescription>Features most associated with abnormal predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {featureImportanceData.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">{feature.feature}</span>
                    </div>
                    <Badge variant="outline">{feature.impact}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Statistics</CardTitle>
                <CardDescription>Key metrics for important features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>TSH Abnormal Range</span>
                    <span className="font-medium">23.4%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Age &gt; 60 years</span>
                    <span className="font-medium">31.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Previous Surgery</span>
                    <span className="font-medium">12.8%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Goitre Present</span>
                    <span className="font-medium">18.6%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Predictions</CardTitle>
              <CardDescription>Latest individual predictions made by the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPredictions.map((prediction) => (
                  <div key={prediction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {prediction.prediction === "Normal" ? (
                          <CheckCircle2 className="w-4 h-4 text-chart-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                        )}
                        <span className="font-medium">{prediction.id}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{prediction.timestamp}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">Risk: {(prediction.riskScore * 100).toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">
                          Confidence: {(prediction.confidence * 100).toFixed(1)}%
                        </div>
                      </div>
                      <Badge
                        variant={prediction.prediction === "Normal" ? "secondary" : "destructive"}
                        className={prediction.prediction === "Normal" ? "bg-chart-4 text-white" : ""}
                      >
                        {prediction.prediction}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
