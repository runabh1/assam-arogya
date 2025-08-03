# Assam Arogya

Assam Arogya is a healthcare platform designed to provide real-time health monitoring and analysis for healthcare providers in Assam. It aims to visualize symptom clusters, manage health alerts, and provide tools for better patient care and public health management.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (v18 or later recommended)
*   npm or yarn
*   Git

### Installation

1.  Clone the repository:

    
```
bash
    git clone https://github.com/runabh1/assam-arogya.git
    
```
2.  Navigate into the project directory:
```
bash
    cd assam-arogya
    
```
3.  Install the dependencies:
```
bash
    npm install
    # or
    yarn install
    
```
### Configuration

This project utilizes the Google Maps JavaScript API for visualizing health data on a map of Assam.

1.  **Obtain a Google Maps API Key:**
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Create a new project or select an existing one.
    *   Enable the **Maps JavaScript API** for your project.
    *   Create API credentials (an API key). Restrict the API key to your website or IP addresses for security.

2.  **Add the API Key to the Project:**
    *   Locate the file where the Google Maps JavaScript API is loaded. This is typically done in your main HTML file (e.g., `pages/_document.tsx` or `public/index.html`) or dynamically within a component.
    *   Find the script tag that loads the Google Maps API. It will look something like this:
        
```
html
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap"></script>
        
```
*   Replace `YOUR_GOOGLE_MAPS_API_KEY` with the Google Maps API key you obtained in step 1.
    *   If the API is loaded dynamically within a component (like `src/app/provider/pulse-map/page.tsx`), find where the API key is used in the loading process and replace the placeholder with your key.

3.  **Environment Variables (Recommended):** For better security, it's recommended to use environment variables to store your API key.
    *   Create a `.env.local` file in the root of your project.
    *   Add a variable for your API key:
        
```
env
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
        
```
Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key.
    *   In your code where the API key is used, access it via `process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

### Running the Project

To run the project locally in development mode:
```
bash
npm run dev
# or
yarn dev
```
The application will be accessible at `http://localhost:3000`.

## Project Structure

The project follows a standard Next.js application structure. Key directories include:

*   `src/app`: Contains the application's pages and routes.
*   `src/components`: Reusable UI components.
*   `src/lib`: Utility functions and libraries.
*   `src/ai`: AI-related code and flows.
*   `public`: Static assets.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add your feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Create a new Pull Request.

Please ensure your code adheres to the project's coding style and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE).