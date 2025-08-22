"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle2, AlertCircle, Download, Eye } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UploadedFile {
  name: string
  size: number
  type: string
  lastModified: number
}

export function DataUpload() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewData, setPreviewData] = useState<string[][] | null>(null)
  const [isValidFormat, setIsValidFormat] = useState(false)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 100)

    // Process file
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n").slice(0, 6) // Preview first 5 rows + header
      const data = lines.map((line) => line.split(";"))

      setPreviewData(data)
      setIsValidFormat(data[0]?.length >= 21) // Check if has expected columns

      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      })
    }
    reader.readAsText(file)
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
  }, [])

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      if (file && file.type === "text/csv") {
        const fakeEvent = { target: { files: [file] } } as React.ChangeEvent<HTMLInputElement>
        handleFileUpload(fakeEvent)
      }
    },
    [handleFileUpload],
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const downloadSampleData = () => {
    const sampleData = `Age;Sex;on_thyroxine;query_on_thyroxine;on_antithyroid_medication;sick;pregnant;thyroid_surgery;I131_treatment;query_hypothyroid;query_hyperthyroid;lithium;goitre;tumor;hypopituitary;psych;TSH;T3_measured;TT4_measured;T4U_measured;FTI_measured;Outlier_label
0.46;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.00189;0.0206;93;91;102;n
0.52;1.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.00234;0.0198;87;89;95;n`

    const blob = new Blob([sampleData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "thyroid_sample_data.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Dataset
          </CardTitle>
          <CardDescription>Upload a CSV file containing thyroid cancer data for batch prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!uploadedFile ? (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
                  <p className="text-muted-foreground mb-4">Drag and drop your file here, or click to browse</p>
                  <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload">
                    <Button asChild>
                      <span>Choose File</span>
                    </Button>
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <FileText className="w-12 h-12 text-accent mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold">{uploadedFile.name}</h3>
                  <p className="text-muted-foreground">
                    {formatFileSize(uploadedFile.size)} • {new Date(uploadedFile.lastModified).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  {isValidFormat ? (
                    <Badge variant="secondary" className="bg-chart-4 text-white">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Valid Format
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Invalid Format
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {previewData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Data Preview
            </CardTitle>
            <CardDescription>First 5 rows of your uploaded dataset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b">
                    {previewData[0]?.slice(0, 8).map((header, index) => (
                      <th key={index} className="text-left p-2 font-medium">
                        {header}
                      </th>
                    ))}
                    <th className="text-left p-2 font-medium">...</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.slice(1, 6).map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b">
                      {row.slice(0, 8).map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-2">
                          {cell}
                        </td>
                      ))}
                      <td className="p-2">...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={downloadSampleData}>
          <Download className="w-4 h-4 mr-2" />
          Download Sample Data
        </Button>

        {uploadedFile && isValidFormat && <Button>Process Dataset</Button>}
      </div>

      {uploadedFile && !isValidFormat && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            The uploaded file doesn't match the expected format. Please ensure your CSV has all required columns.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
