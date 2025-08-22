"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Shield, Activity } from "lucide-react"
import { DataInputForm } from "@/components/data-input-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ThyroNetDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ThyroNet-XAI</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Thyroid Cancer Prediction</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/presentation">
                <Button variant="outline" size="sm">
                  View Presentation
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  <Shield className="w-3 h-3 mr-1" />
                  Medical Grade
                </Badge>
                <Badge variant="outline">
                  <Activity className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Thyroid Cancer Prediction</CardTitle>
            <CardDescription>Enter patient thyroid test data for AI-powered cancer risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <DataInputForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
