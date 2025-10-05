// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Type definitions based on OpenAPI spec
export interface PredictionRequest {
  dec: number;
  st_pmra: number;
  st_pmdec: number;
  pl_tranmid: number;
  pl_orbper: number;
  pl_trandurh: number;
  pl_trandep: number;
  pl_rade: number;
  pl_insol: number;
  st_tmag: number;
  st_dist: number;
  st_teff: number;
  st_logg: number;
  st_rad: number;
}

export interface PredictionResponse {
  message: string;
  prediction_probability: number;
  prediction_class: number;
  input_data: Record<string, any>;
}

export interface LLMPredictionResponse {
  prediction: string;
  confidence: number;
  explanation: string;
}

export interface CSVPredictionItem {
  dec: number;
  st_pmra: number;
  st_pmdec: number;
  pl_tranmid: number;
  pl_orbper: number;
  pl_trandurh: number;
  pl_trandep: number;
  pl_rade: number;
  pl_insol: number;
  st_tmag: number;
  st_dist: number;
  st_teff: number;
  st_logg: number;
  st_rad: number;
  prediction_probability: number;
  prediction_class: number;
}

export interface CSVPredictionResponse {
  message: string;
  data: CSVPredictionItem[];
  rows_count: number;
}

export interface HealthCheckResponse {
  message: string;
  model_status: string;
  model_available: boolean;
}

// API Client Class
class AstraAPIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    const response = await fetch(`${this.baseURL}/health-check`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Quick prediction using ML model
   */
  async predict(data: PredictionRequest): Promise<PredictionResponse> {
    const response = await fetch(`${this.baseURL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(error.detail || 'Prediction failed');
    }

    return response.json();
  }

  /**
   * Deep prediction with LLM analysis
   */
  async llmPredict(data: PredictionRequest): Promise<LLMPredictionResponse> {
    const response = await fetch(`${this.baseURL}/llm-predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(error.detail || 'LLM prediction failed');
    }

    return response.json();
  }

  /**
   * CSV file upload for batch predictions
   */
  async predictCSV(file: File): Promise<CSVPredictionResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/predict-csv`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(error.detail || 'CSV prediction failed');
    }

    return response.json();
  }
}

// Export singleton instance
export const apiClient = new AstraAPIClient(API_BASE_URL);
