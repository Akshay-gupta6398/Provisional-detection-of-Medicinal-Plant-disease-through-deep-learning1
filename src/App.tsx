import React, { useState, useCallback } from 'react';
import { Upload, Camera, Leaf, AlertCircle, CheckCircle, Info, Download, RotateCcw } from 'lucide-react';

interface PredictionResult {
  disease: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  treatment: string;
  description: string;
  plantInfo: {
    scientificName: string;
    commonName: string;
    family: string;
    medicinalUses: string[];
  };
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Mock prediction results for demonstration
  const mockPredictions: PredictionResult[] = [
    {
      disease: 'Powdery Mildew',
      confidence: 94.2,
      severity: 'Medium',
      treatment: 'Apply neem oil solution twice weekly. Improve air circulation around plants.',
      description: 'A fungal disease that appears as white powdery spots on leaves, potentially reducing photosynthesis and plant vigor.',
      plantInfo: {
        scientificName: 'Ocimum sanctum',
        commonName: 'Holy Basil (Tulsi)',
        family: 'Lamiaceae',
        medicinalUses: ['Respiratory disorders', 'Stress relief', 'Immune system support', 'Anti-inflammatory']
      }
    },
    {
      disease: 'Leaf Spot Disease',
      confidence: 87.6,
      severity: 'Low',
      treatment: 'Remove affected leaves and apply copper-based fungicide. Avoid overhead watering.',
      description: 'Circular or irregular brown spots on leaves caused by bacterial or fungal infection.',
      plantInfo: {
        scientificName: 'Aloe vera',
        commonName: 'Aloe Vera',
        family: 'Asphodelaceae',
        medicinalUses: ['Wound healing', 'Skin care', 'Digestive health', 'Burns treatment']
      }
    },
    {
      disease: 'Healthy Plant',
      confidence: 96.8,
      severity: 'Low',
      treatment: 'Continue current care routine. Monitor regularly for any changes.',
      description: 'Plant shows no signs of disease. Leaves are healthy with good coloration.',
      plantInfo: {
        scientificName: 'Echinacea purpurea',
        commonName: 'Purple Coneflower',
        family: 'Asteraceae',
        medicinalUses: ['Immune support', 'Cold and flu prevention', 'Anti-inflammatory', 'Wound healing']
      }
    }
  ];

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      simulateAnalysis();
    };
    reader.readAsDataURL(file);
  }, []);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setPrediction(null);
    
    setTimeout(() => {
      const randomPrediction = mockPredictions[Math.floor(Math.random() * mockPredictions.length)];
      setPrediction(randomPrediction);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const resetAnalysis = () => {
    setUploadedImage(null);
    setPrediction(null);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              MediPlant AI
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered medicinal plant disease detection and diagnosis system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Camera className="w-6 h-6 text-green-600" />
                  Upload Plant Image
                </h2>
                <p className="text-gray-600 mt-2">Upload an image of your medicinal plant for AI analysis</p>
              </div>

              <div className="p-6">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragOver
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {!uploadedImage ? (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          Drag and drop your image here
                        </p>
                        <p className="text-gray-500 mt-1">or click to browse</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded plant"
                        className="mx-auto max-h-64 rounded-lg shadow-md"
                      />
                      <button
                        onClick={resetAnalysis}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Upload Different Image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isAnalyzing && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Analyzing Image</h3>
                    <p className="text-gray-600">AI is processing your plant image...</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            )}

            {prediction && !isAnalyzing && (
              <div className="space-y-6">
                {/* Disease Detection Results */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-blue-600" />
                      Detection Results
                    </h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                        <p className="text-sm font-medium text-gray-600">Disease Detected</p>
                        <p className="text-xl font-semibold text-gray-800 mt-1">{prediction.disease}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                        <p className="text-sm font-medium text-gray-600">Confidence</p>
                        <p className={`text-xl font-semibold mt-1 ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Severity Level</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(prediction.severity)}`}>
                          {prediction.severity}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Description</p>
                      <p className="text-gray-800 leading-relaxed">{prediction.description}</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Recommended Treatment</p>
                          <p className="text-gray-800 leading-relaxed">{prediction.treatment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plant Information */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                      <Info className="w-6 h-6 text-green-600" />
                      Plant Information
                    </h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Scientific Name</p>
                        <p className="text-lg font-semibold text-gray-800 italic">{prediction.plantInfo.scientificName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Common Name</p>
                        <p className="text-lg font-semibold text-gray-800">{prediction.plantInfo.commonName}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-sm font-medium text-gray-600">Family</p>
                        <p className="text-lg font-semibold text-gray-800">{prediction.plantInfo.family}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-3">Medicinal Uses</p>
                      <div className="flex flex-wrap gap-2">
                        {prediction.plantInfo.medicinalUses.map((use, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                    <Download className="w-5 h-5" />
                    Download Report
                  </button>
                  <button 
                    onClick={resetAnalysis}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Analyze Another Plant
                  </button>
                </div>
              </div>
            )}

            {!uploadedImage && !isAnalyzing && !prediction && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Analyze</h3>
                <p className="text-gray-600">Upload a plant image to get started with AI-powered disease detection</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
              <Camera className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Advanced AI Detection</h3>
            <p className="text-gray-600 leading-relaxed">
              State-of-the-art computer vision models trained on thousands of medicinal plant images
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Comprehensive Database</h3>
            <p className="text-gray-600 leading-relaxed">
              Extensive knowledge base of medicinal plants and their common diseases and treatments
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Treatment Recommendations</h3>
            <p className="text-gray-600 leading-relaxed">
              Get detailed treatment plans and care instructions for identified plant diseases
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;