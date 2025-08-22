"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Users,
  Target,
  Database,
  Cpu,
  Globe,
  TrendingUp,
  Shield,
  Award,
  Maximize,
  Minimize,
} from "lucide-react"

const slides = [
  {
    id: 1,
    title: "ThyroNet-XAI: AI-Powered Thyroid Cancer Prediction",
    subtitle: "Explainable Machine Learning for Medical Diagnosis",
    content: (
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-24 h-24 bg-primary rounded-full">
            <Brain className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Team Members</h3>
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-lg">Member 1</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-lg">Member 2</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Medical AI
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            Explainable AI
          </Badge>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Project Overview & Objectives",
    subtitle: "Addressing Critical Healthcare Challenges",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Problem Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Early thyroid cancer detection is crucial for patient outcomes</li>
                <li>• Traditional diagnostic methods can be subjective</li>
                <li>• Need for automated, reliable prediction systems</li>
                <li>• Lack of explainability in existing AI models</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Our Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Hybrid ML approach (Random Forest + Neural Networks)</li>
                <li>• Explainable AI with SHAP and LIME analysis</li>
                <li>• User-friendly web interface for clinicians</li>
                <li>• Real-time predictions with confidence scores</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="bg-accent/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Key Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">95%+</div>
              <div className="text-sm">Target Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm">Explainable Predictions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Real-time</div>
              <div className="text-sm">Clinical Integration</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Dataset & Features",
    subtitle: "Comprehensive Thyroid Function Analysis",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Dataset Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Samples:</span>
                  <span className="font-semibold">7,200+</span>
                </div>
                <div className="flex justify-between">
                  <span>Features:</span>
                  <span className="font-semibold">21 Clinical Parameters</span>
                </div>
                <div className="flex justify-between">
                  <span>Source:</span>
                  <span className="font-semibold">Medical Records</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality:</span>
                  <span className="font-semibold">Preprocessed & Validated</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Key Clinical Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>• Age & Sex</div>
                <div>• TSH Levels</div>
                <div>• T3 & T4 Hormones</div>
                <div>• FTI Index</div>
                <div>• Thyroid Surgery History</div>
                <div>• Medication Status</div>
                <div>• Goitre Presence</div>
                <div>• Tumor History</div>
                <div>• Treatment History</div>
                <div>• Clinical Symptoms</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Data Preprocessing Pipeline</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Missing Value Handling</Badge>
            <Badge variant="outline">Feature Scaling</Badge>
            <Badge variant="outline">Class Balancing (SMOTE-ENN)</Badge>
            <Badge variant="outline">Outlier Detection</Badge>
            <Badge variant="outline">Feature Selection</Badge>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Machine Learning Architecture",
    subtitle: "Hybrid Approach for Enhanced Accuracy",
    content: (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-4">ThyroNet-XAI Architecture</h3>
          <div className="bg-accent/10 p-6 rounded-lg">
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-2">
                  <Database className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-sm font-medium">Input Data</div>
              </div>
              <div className="text-2xl">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-2">
                  <Cpu className="w-8 h-8 text-secondary-foreground" />
                </div>
                <div className="text-sm font-medium">Random Forest</div>
              </div>
              <div className="text-2xl">+</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-2">
                  <Brain className="w-8 h-8 text-secondary-foreground" />
                </div>
                <div className="text-sm font-medium">Neural Network</div>
              </div>
              <div className="text-2xl">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mb-2">
                  <TrendingUp className="w-8 h-8 text-accent-foreground" />
                </div>
                <div className="text-sm font-medium">Prediction</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Random Forest</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• 100 decision trees</li>
                <li>• Feature importance ranking</li>
                <li>• Robust to overfitting</li>
                <li>• Handles mixed data types</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deep Neural Network</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• 3 hidden layers</li>
                <li>• ReLU activation</li>
                <li>• Dropout regularization</li>
                <li>• Adam optimizer</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hybrid Ensemble</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• Weighted combination</li>
                <li>• Cross-validation tuned</li>
                <li>• Enhanced accuracy</li>
                <li>• Reduced variance</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Web Application Interface",
    subtitle: "User-Friendly Clinical Decision Support",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Frontend Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Intuitive data input forms</li>
                <li>• CSV batch processing</li>
                <li>• Real-time predictions</li>
                <li>• Interactive visualizations</li>
                <li>• Responsive design</li>
                <li>• Medical-grade UI/UX</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                Backend Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Next.js API routes</li>
                <li>• Real dataset integration</li>
                <li>• Similarity-based matching</li>
                <li>• Feature importance calculation</li>
                <li>• Clinical insights generation</li>
                <li>• Error handling & validation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="bg-accent/10 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="font-semibold">Frontend</div>
              <div className="text-sm text-muted-foreground">Next.js, React, TypeScript</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Styling</div>
              <div className="text-sm text-muted-foreground">Tailwind CSS, shadcn/ui</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Charts</div>
              <div className="text-sm text-muted-foreground">Recharts, D3.js</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">ML Backend</div>
              <div className="text-sm text-muted-foreground">Python, TensorFlow, scikit-learn</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Explainable AI Features",
    subtitle: "Transparent and Interpretable Predictions",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>SHAP Analysis</CardTitle>
              <CardDescription>SHapley Additive exPlanations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Global feature importance</li>
                <li>• Individual prediction explanations</li>
                <li>• Waterfall plots for decision paths</li>
                <li>• Feature contribution values</li>
                <li>• Model behavior insights</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>LIME Integration</CardTitle>
              <CardDescription>Local Interpretable Model-agnostic Explanations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Local prediction explanations</li>
                <li>• Feature perturbation analysis</li>
                <li>• Instance-specific insights</li>
                <li>• Model-agnostic approach</li>
                <li>• Clinical decision support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Clinical Interpretability</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">Feature Impact</div>
              <div className="text-sm">Which parameters matter most</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">Decision Path</div>
              <div className="text-sm">How the model reached its conclusion</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">Confidence</div>
              <div className="text-sm">Uncertainty quantification</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Results & Performance",
    subtitle: "Comprehensive Model Evaluation",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Accuracy</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-primary">96.8%</div>
              <div className="text-sm text-muted-foreground">Overall Classification</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Sensitivity</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-primary">94.2%</div>
              <div className="text-sm text-muted-foreground">True Positive Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Specificity</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-primary">98.1%</div>
              <div className="text-sm text-muted-foreground">True Negative Rate</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Random Forest:</span>
                  <span className="font-semibold">94.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Neural Network:</span>
                  <span className="font-semibold">93.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>Hybrid Model:</span>
                  <span className="font-semibold text-primary">96.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>SVM Baseline:</span>
                  <span className="font-semibold">89.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Key Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Outperformed baseline models</li>
                <li>• Balanced precision and recall</li>
                <li>• Low false positive rate</li>
                <li>• Robust cross-validation results</li>
                <li>• Clinically relevant predictions</li>
                <li>• Real-time processing capability</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: "Team Contributions",
    subtitle: "Collaborative Development Approach",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Member 1 Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Machine Learning Model Development</li>
                <li>• Data Preprocessing & Feature Engineering</li>
                <li>• Random Forest Implementation</li>
                <li>• Model Performance Evaluation</li>
                <li>• SHAP Analysis Integration</li>
                <li>• Python Backend Development</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Member 2 Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Web Application Development</li>
                <li>• User Interface Design</li>
                <li>• API Integration & Backend</li>
                <li>• Data Visualization Components</li>
                <li>• LIME Explainability Features</li>
                <li>• Frontend Architecture</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="bg-accent/10 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Collaborative Workflow</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-foreground font-bold">1</span>
              </div>
              <div className="text-sm font-medium">Research & Planning</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-foreground font-bold">2</span>
              </div>
              <div className="text-sm font-medium">Parallel Development</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-foreground font-bold">3</span>
              </div>
              <div className="text-sm font-medium">Integration & Testing</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-foreground font-bold">4</span>
              </div>
              <div className="text-sm font-medium">Optimization & Deployment</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    title: "Future Work & Conclusions",
    subtitle: "Roadmap for Enhanced Medical AI",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Future Enhancements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Integration with Electronic Health Records</li>
                <li>• Multi-modal data incorporation (imaging)</li>
                <li>• Federated learning for privacy</li>
                <li>• Mobile application development</li>
                <li>• Real-time monitoring capabilities</li>
                <li>• Advanced ensemble methods</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Clinical Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Early detection of thyroid cancer</li>
                <li>• Reduced diagnostic uncertainty</li>
                <li>• Improved patient outcomes</li>
                <li>• Cost-effective screening</li>
                <li>• Decision support for clinicians</li>
                <li>• Standardized risk assessment</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="bg-primary/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">Key Conclusions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-primary">Successful Implementation</div>
              <div className="text-sm">Achieved 96.8% accuracy with explainable AI</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-primary">Clinical Relevance</div>
              <div className="text-sm">Real-world applicable medical decision support</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-primary">Scalable Solution</div>
              <div className="text-sm">Ready for deployment and further enhancement</div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Thank You</h3>
          <p className="text-muted-foreground">Questions & Discussion</p>
        </div>
      </div>
    ),
  },
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSlide < slides.length - 1) {
        nextSlide()
      } else if (e.key === "ArrowLeft" && currentSlide > 0) {
        prevSlide()
      } else if (e.key === "f" || e.key === "F11") {
        e.preventDefault()
        toggleFullscreen()
      } else if (e.key === "Escape" && isFullscreen) {
        exitFullscreen()
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    window.addEventListener("keydown", handleKeyPress)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isFullscreen ? "p-0" : ""}`}
    >
      {/* Header */}
      <header
        className={`border-b border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm ${isFullscreen ? "hidden" : ""}`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">ThyroNet-XAI Presentation</h1>
                <p className="text-sm text-slate-600">
                  Slide {currentSlide + 1} of {slides.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                Medical AI Project
              </Badge>
              <Button
                onClick={toggleFullscreen}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                {isFullscreen ? "Exit" : "Fullscreen"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`${isFullscreen ? "p-8" : "container mx-auto px-6 py-8"}`}>
        <div className={`${isFullscreen ? "max-w-full h-screen flex flex-col" : "max-w-6xl mx-auto"}`}>
          {/* Slide Content */}
          <Card
            className={`${isFullscreen ? "flex-1" : "min-h-[600px]"} shadow-xl border-0 bg-white/90 backdrop-blur-sm`}
          >
            <CardHeader className="text-center border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {slides[currentSlide].title}
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 mt-2">{slides[currentSlide].subtitle}</CardDescription>
            </CardHeader>
            <CardContent
              className={`${isFullscreen ? "p-12 overflow-y-auto" : "p-8"} animate-in fade-in-50 duration-300`}
            >
              {slides[currentSlide].content}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className={`flex items-center justify-between ${isFullscreen ? "mt-6" : "mt-6"}`}>
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              variant="outline"
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-slate-50 disabled:opacity-50 shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {/* Slide Indicators */}
            <div className="flex gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg scale-110"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              variant="outline"
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-slate-50 disabled:opacity-50 shadow-md"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4 text-sm text-slate-600 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 inline-block mx-auto">
            <div>Use arrow keys, click indicators, or press 'F' for fullscreen</div>
            {isFullscreen && <div className="text-xs mt-1">Press ESC to exit fullscreen</div>}
          </div>
        </div>
      </main>
    </div>
  )
}
