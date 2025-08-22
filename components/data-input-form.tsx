"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, User, Activity, Beaker, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PredictionResults } from "./prediction-results"

interface PatientData {
  age: string
  sex: string
  on_thyroxine: boolean
  query_on_thyroxine: boolean
  on_antithyroid_medication: boolean
  sick: boolean
  pregnant: boolean
  thyroid_surgery: boolean
  I131_treatment: boolean
  query_hypothyroid: boolean
  query_hyperthyroid: boolean
  lithium: boolean
  goitre: boolean
  tumor: boolean
  hypopituitary: boolean
  psych: boolean
  TSH: string
  T3_measured: string
  TT4_measured: string
  T4U_measured: string
  FTI_measured: string
}

const initialData: PatientData = {
  age: "",
  sex: "",
  on_thyroxine: false,
  query_on_thyroxine: false,
  on_antithyroid_medication: false,
  sick: false,
  pregnant: false,
  thyroid_surgery: false,
  I131_treatment: false,
  query_hypothyroid: false,
  query_hyperthyroid: false,
  lithium: false,
  goitre: false,
  tumor: false,
  hypopituitary: false,
  psych: false,
  TSH: "",
  T3_measured: "",
  TT4_measured: "",
  T4U_measured: "",
  FTI_measured: "",
}

export function DataInputForm() {
  const [patientData, setPatientData] = useState<PatientData>(initialData)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [predictionResult, setPredictionResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof PatientData, value: string | boolean) => {
    const newData = { ...patientData, [field]: value }
    setPatientData(newData)

    // Basic validation
    const requiredFields = ["age", "sex", "TSH", "T3_measured", "TT4_measured", "T4U_measured", "FTI_measured"]
    const isFormValid = requiredFields.every((field) => newData[field as keyof PatientData] !== "")
    setIsValid(isFormValid)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Convert form data to API format
      const apiData = {
        age: Number.parseFloat(patientData.age),
        sex: Number.parseFloat(patientData.sex),
        on_thyroxine: patientData.on_thyroxine ? 1 : 0,
        query_on_thyroxine: patientData.query_on_thyroxine ? 1 : 0,
        on_antithyroid_medication: patientData.on_antithyroid_medication ? 1 : 0,
        sick: patientData.sick ? 1 : 0,
        pregnant: patientData.pregnant ? 1 : 0,
        thyroid_surgery: patientData.thyroid_surgery ? 1 : 0,
        I131_treatment: patientData.I131_treatment ? 1 : 0,
        query_hypothyroid: patientData.query_hypothyroid ? 1 : 0,
        query_hyperthyroid: patientData.query_hyperthyroid ? 1 : 0,
        lithium: patientData.lithium ? 1 : 0,
        goitre: patientData.goitre ? 1 : 0,
        tumor: patientData.tumor ? 1 : 0,
        hypopituitary: patientData.hypopituitary ? 1 : 0,
        psych: patientData.psych ? 1 : 0,
        TSH: Number.parseFloat(patientData.TSH),
        T3_measured: Number.parseFloat(patientData.T3_measured),
        TT4_measured: Number.parseFloat(patientData.TT4_measured),
        T4U_measured: Number.parseFloat(patientData.T4U_measured),
        FTI_measured: Number.parseFloat(patientData.FTI_measured),
      }

      console.log("[v0] Sending prediction request:", apiData)

      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Prediction failed")
      }

      console.log("[v0] Prediction result:", result)
      setPredictionResult(result)
    } catch (err) {
      console.error("[v0] Prediction error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during prediction")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setPatientData(initialData)
    setIsValid(false)
    setPredictionResult(null)
    setError(null)
  }

  // Show results if we have them
  if (predictionResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Prediction Results</h3>
          <Button variant="outline" onClick={handleReset}>
            New Prediction
          </Button>
        </div>
        <PredictionResults
          result={predictionResult.data}
          timestamp={predictionResult.timestamp}
          modelVersion={predictionResult.model_version}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Patient Information
          </CardTitle>
          <CardDescription>Enter patient demographic and clinical information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={patientData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sex">Sex *</Label>
              <Select value={patientData.sex} onValueChange={(value) => handleInputChange("sex", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Female</SelectItem>
                  <SelectItem value="1">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Medical History
          </CardTitle>
          <CardDescription>Select all applicable medical conditions and treatments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { key: "on_thyroxine", label: "On Thyroxine" },
              { key: "query_on_thyroxine", label: "Query on Thyroxine" },
              { key: "on_antithyroid_medication", label: "On Antithyroid Medication" },
              { key: "sick", label: "Currently Sick" },
              { key: "pregnant", label: "Pregnant" },
              { key: "thyroid_surgery", label: "Thyroid Surgery" },
              { key: "I131_treatment", label: "I131 Treatment" },
              { key: "query_hypothyroid", label: "Query Hypothyroid" },
              { key: "query_hyperthyroid", label: "Query Hyperthyroid" },
              { key: "lithium", label: "On Lithium" },
              { key: "goitre", label: "Goitre" },
              { key: "tumor", label: "Tumor" },
              { key: "hypopituitary", label: "Hypopituitary" },
              { key: "psych", label: "Psychiatric Condition" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={patientData[key as keyof PatientData] as boolean}
                  onCheckedChange={(checked) => handleInputChange(key as keyof PatientData, checked as boolean)}
                />
                <Label htmlFor={key} className="text-sm font-normal">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="w-5 h-5" />
            Laboratory Values
          </CardTitle>
          <CardDescription>Enter thyroid function test results (all fields required)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="TSH">TSH (mU/L) *</Label>
              <Input
                id="TSH"
                type="number"
                step="0.001"
                placeholder="0.000"
                value={patientData.TSH}
                onChange={(e) => handleInputChange("TSH", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="T3_measured">T3 (nmol/L) *</Label>
              <Input
                id="T3_measured"
                type="number"
                step="0.1"
                placeholder="0.0"
                value={patientData.T3_measured}
                onChange={(e) => handleInputChange("T3_measured", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="TT4_measured">TT4 (nmol/L) *</Label>
              <Input
                id="TT4_measured"
                type="number"
                step="1"
                placeholder="0"
                value={patientData.TT4_measured}
                onChange={(e) => handleInputChange("TT4_measured", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="T4U_measured">T4U *</Label>
              <Input
                id="T4U_measured"
                type="number"
                step="1"
                placeholder="0"
                value={patientData.T4U_measured}
                onChange={(e) => handleInputChange("T4U_measured", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="FTI_measured">FTI *</Label>
              <Input
                id="FTI_measured"
                type="number"
                step="1"
                placeholder="0"
                value={patientData.FTI_measured}
                onChange={(e) => handleInputChange("FTI_measured", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isValid ? (
            <Badge variant="secondary" className="bg-chart-4 text-white">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Form Complete
            </Badge>
          ) : (
            <Badge variant="outline">
              <AlertCircle className="w-3 h-3 mr-1" />
              Required Fields Missing
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={isLoading}>
            Reset Form
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Run Prediction"
            )}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isValid && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fill in all required fields marked with * to proceed with the prediction.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
