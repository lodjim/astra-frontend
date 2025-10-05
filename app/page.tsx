"use client";

import { useState } from "react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Zap, Upload, Database } from "lucide-react";

// Define the exoplanet data structure based on TESS TOI columns
interface ExoplanetData {
  st_pmra: string;      // PMRA [mas/yr] - Angular change in right ascension
  st_pmdec: string;     // PMDec [mas/yr] - Angular change in declination
  pl_tranmid: string;   // Planet Transit Midpoint [BJD]
  pl_orbper: string;    // Planet Orbital Period [days]
  pl_trandurh: string;  // Planet Transit Duration [hours]
  pl_trandep: string;   // Planet Transit Depth [ppm]
  pl_rade: string;      // Planet Radius [R_Earth]
  pl_insol: string;     // Planet Insolation [Earth flux]
  pl_eqt: string;       // Planet Equilibrium Temperature [K]
  st_tmag: string;      // TESS Magnitude
  st_teff: string;      // Stellar Effective Temperature [K]
  st_logg: string;      // Stellar log(g) [cm/s**2]
  st_rad: string;       // Stellar Radius [R_Sun]
}

const initialData: ExoplanetData = {
  st_pmra: "",
  st_pmdec: "",
  pl_tranmid: "",
  pl_orbper: "",
  pl_trandurh: "",
  pl_trandep: "",
  pl_rade: "",
  pl_insol: "",
  pl_eqt: "",
  st_tmag: "",
  st_teff: "",
  st_logg: "",
  st_rad: "",
};

const fieldLabels: Record<keyof ExoplanetData, { label: string; description: string; unit: string }> = {
  st_pmra: { label: "PMRA", description: "Angular change in right ascension", unit: "mas/yr" },
  st_pmdec: { label: "PMDec", description: "Angular change in declination", unit: "mas/yr" },
  pl_tranmid: { label: "Transit Midpoint", description: "Planet transit midpoint", unit: "BJD" },
  pl_orbper: { label: "Orbital Period", description: "Time for complete orbit", unit: "days" },
  pl_trandurh: { label: "Transit Duration", description: "Length of transit", unit: "hours" },
  pl_trandep: { label: "Transit Depth", description: "Relative flux decrement", unit: "ppm" },
  pl_rade: { label: "Planet Radius", description: "Radius of the planet", unit: "R⊕" },
  pl_insol: { label: "Insolation", description: "Stellar radiation received", unit: "Earth flux" },
  pl_eqt: { label: "Equilibrium Temp", description: "Equilibrium temperature", unit: "K" },
  st_tmag: { label: "TESS Magnitude", description: "Brightness in TESS-band", unit: "mag" },
  st_teff: { label: "Stellar Temp", description: "Effective temperature", unit: "K" },
  st_logg: { label: "Stellar log(g)", description: "Gravitational acceleration", unit: "cm/s²" },
  st_rad: { label: "Stellar Radius", description: "Radius of the star", unit: "R☉" },
};

export default function ExoplanetDiscovery() {
  const [formData, setFormData] = useState<ExoplanetData>(initialData);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setUploadedFile(files[0]);
      // Here you would parse the CSV file
      console.log("File uploaded:", files[0].name);
    }
  };

  const handleInputChange = (field: keyof ExoplanetData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuickPrediction = async () => {
    setIsLoading(true);
    setResult(null);
    // Simulate API call
    setTimeout(() => {
      setResult("Quick Prediction: Exoplanet candidate detected! Confidence: 72%");
      setIsLoading(false);
    }, 1000);
  };

  const handleDeepPrediction = async () => {
    setIsLoading(true);
    setResult(null);
    // Simulate API call with longer processing time
    setTimeout(() => {
      setResult(
        "Deep Prediction: Strong exoplanet signature detected! ML Confidence: 94% | LLM Analysis: This appears to be a hot Jupiter-like planet orbiting a sun-like star with a period of ~3.5 days. The transit depth suggests a planet radius of approximately 1.2 Jupiter radii."
      );
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="absolute inset-0 z-0" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <HeroHighlight containerClassName="h-auto py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Automatic Discovery of{" "}
              <Highlight className="text-foreground">Exoplanets</Highlight>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              Detect exoplanets based on machine learning using tabular data from the TESS
              (Transiting Exoplanet Survey Satellite) mission. Upload CSV data or enter
              parameters manually to analyze potential exoplanet candidates.
            </p>
            <div className="flex gap-4 justify-center mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>TESS TOI Data</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>ML Powered</span>
              </div>
            </div>
          </div>
        </HeroHighlight>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto mt-8 space-y-6">
          <Card className="backdrop-blur-sm bg-card/80 border-2">
            <div className="p-6 space-y-6">
              <div>
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl">Input Method</CardTitle>
                  <CardDescription>
                    Choose how you want to provide your exoplanet data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="csv" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="csv" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        CSV Upload
                      </TabsTrigger>
                      <TabsTrigger value="manual" className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Manual Input
                      </TabsTrigger>
                    </TabsList>

                    {/* CSV Upload Tab */}
                    <TabsContent value="csv" className="mt-6">
                      <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium mb-2">Required CSV columns:</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 font-mono text-xs bg-muted/50 p-4 rounded-lg">
                            {Object.keys(fieldLabels).map((key) => (
                              <span key={key} className="text-foreground/80">
                                {key}
                              </span>
                            ))}
                          </div>
                        </div>
                        <FileUpload onChange={handleFileUpload} />
                        {uploadedFile && (
                          <div className="text-sm text-green-600 dark:text-green-400">
                            ✓ File uploaded: {uploadedFile.name}
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Manual Input Tab */}
                    <TabsContent value="manual" className="mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto p-2">
                        {(Object.keys(fieldLabels) as Array<keyof ExoplanetData>).map((field) => (
                          <div key={field} className="space-y-2">
                            <Label htmlFor={field} className="text-sm font-medium">
                              {fieldLabels[field].label}
                              <span className="text-xs text-muted-foreground ml-2">
                                ({fieldLabels[field].unit})
                              </span>
                            </Label>
                            <Input
                              id={field}
                              type="number"
                              step="any"
                              placeholder={fieldLabels[field].description}
                              value={formData[field]}
                              onChange={(e) => handleInputChange(field, e.target.value)}
                              className="w-full"
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </div>

              {/* Prediction Buttons */}
              <div className="pt-6 border-t border-border">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">Run Prediction</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose between fast approximation or deep analysis
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleQuickPrediction}
                    disabled={isLoading}
                    className="h-auto py-6 flex flex-col items-center gap-2"
                    variant="outline"
                  >
                    <div>
                      <div className="font-bold">Quick Prediction</div>
                      <div className="text-xs font-normal text-muted-foreground">
                        Fast but less accurate
                      </div>
                    </div>
                  </Button>
                  <Button
                    onClick={handleDeepPrediction}
                    disabled={isLoading}
                    className="h-auto py-6 flex flex-col items-center gap-2"
                  >
                    <div>
                      <div className="font-bold">Deep Prediction</div>
                      <div className="text-xs font-normal">ML Model + LLM Analysis</div>
                    </div>
                  </Button>
                </div>

                {isLoading && (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-4 text-sm text-muted-foreground">Processing your data...</p>
                  </div>
                )}

                {result && (
                  <div className="mt-6 p-6 bg-primary/10 border border-primary/20 rounded-lg">
                    <h3 className="font-bold text-lg mb-2 text-primary">Results</h3>
                    <p className="text-sm leading-relaxed">{result}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Information Card */}
          <Card className="backdrop-blur-sm bg-card/80 border-2">
            <CardHeader>
              <CardTitle className="text-lg">About the Data</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                This tool uses data from the{" "}
                <a
                  href="https://exoplanetarchive.ipac.caltech.edu/docs/API_TOI_columns.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  TESS Objects of Interest (TOI)
                </a>{" "}
                table, which lists parameters for objects identified by the Transiting Exoplanet
                Survey Satellite mission.
              </p>
              <p>
                The machine learning model analyzes stellar and planetary parameters to determine
                the likelihood of exoplanet candidates being confirmed planets versus false
                positives.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
