# Astra - Automatic Discovery of Exoplanets

A modern web application for detecting exoplanets using machine learning on TESS (Transiting Exoplanet Survey Satellite) mission data.

## Features

### 🌟 Beautiful UI
- **Modern Design**: Built with shadcn/ui components and Aceternity UI for stunning visual effects
- **Dark Mode Support**: Fully responsive design with automatic dark mode
- **Space-themed Background**: Animated background beams for an immersive experience
- **Hero Section**: Eye-catching hero with gradient highlights and smooth animations

### 📊 Data Input Methods

#### 1. CSV Upload
Upload a CSV file containing TESS Objects of Interest (TOI) data with the following columns:
- `st_pmra` - Angular change in right ascension (mas/yr)
- `st_pmdec` - Angular change in declination (mas/yr)
- `pl_tranmid` - Planet Transit Midpoint (BJD)
- `pl_orbper` - Planet Orbital Period (days)
- `pl_trandurh` - Planet Transit Duration (hours)
- `pl_trandep` - Planet Transit Depth (ppm)
- `pl_rade` - Planet Radius (R⊕)
- `pl_insol` - Planet Insolation (Earth flux)
- `pl_eqt` - Planet Equilibrium Temperature (K)
- `st_tmag` - TESS Magnitude
- `st_teff` - Stellar Effective Temperature (K)
- `st_logg` - Stellar log(g) (cm/s²)
- `st_rad` - Stellar Radius (R☉)

#### 2. Manual Input
Enter values manually through an intuitive form with labeled inputs for each parameter.

### 🤖 Prediction Models

#### Quick Prediction
- **Fast Processing**: Get results in ~1 second
- **Use Case**: Quick approximations for initial screening
- **Accuracy**: Moderate confidence levels

#### Deep Prediction
- **ML Model**: Advanced machine learning analysis
- **LLM Analysis**: Natural language explanation of results
- **Processing Time**: ~3 seconds for comprehensive analysis
- **High Accuracy**: Detailed confidence metrics and interpretations

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: 
  - shadcn/ui (Button, Card, Input, Label, Tabs, Textarea)
  - Aceternity UI (Background Beams, Hero Highlight, File Upload)
- **Animations**: Framer Motion
- **Icons**: Lucide React, Tabler Icons
- **File Handling**: react-dropzone

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Data Source

This application uses data from the [TESS Objects of Interest (TOI) table](https://exoplanetarchive.ipac.caltech.edu/docs/API_TOI_columns.html), maintained by NASA's Exoplanet Archive.

The TOI list contains parameters for objects identified by the Transiting Exoplanet Survey Satellite mission, including:
- Planetary properties (radius, orbital period, transit characteristics)
- Stellar properties (temperature, radius, brightness)
- Position and proper motion data

## How It Works

1. **Data Input**: Users provide exoplanet observation data either via CSV upload or manual entry
2. **Preprocessing**: The system validates and processes the input data
3. **ML Analysis**: Machine learning models analyze the data to predict exoplanet likelihood
4. **LLM Enhancement**: For deep predictions, an LLM provides human-readable analysis
5. **Results**: Users receive confidence scores and detailed explanations

## Future Enhancements

- [ ] Real-time API integration with NASA Exoplanet Archive
- [ ] Interactive visualization of orbital parameters
- [ ] Batch processing for multiple candidates
- [ ] Export results to various formats
- [ ] Historical prediction tracking
- [ ] Advanced filtering and sorting options

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- NASA Exoplanet Archive for the TESS TOI data
- shadcn for the beautiful component library
- Aceternity UI for stunning animations and effects
- The TESS mission team for their groundbreaking work

---

**Note**: The prediction functionality is currently simulated for demonstration purposes. In a production environment, this would connect to actual ML models and APIs.