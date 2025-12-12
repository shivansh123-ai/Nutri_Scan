🥗 NutriScan – AI-Based Food Nutrition Analysis System

NutriScan is an AI-powered web application that analyzes food images and provides instant nutritional insights using the Google Gemini API. Users can upload a food photo, and the system generates calories, macronutrients, and a descriptive food breakdown. NutriScan also stores analysis history using Supabase, enabling users to track their eating patterns over time.

🚀 Features

📸 AI Image Analysis – Upload food images and get automatic nutrition details

🔍 Nutrient Breakdown – Calories, protein, carbs, fats, and descriptions

📊 Charts Visualization – Interactive donut charts for macro insights

💾 Save & View History – Stores user scans using Supabase

🎨 Responsive UI – Clean design built with React + Tailwind CSS

⚡ Fast Performance – Powered by Vite for instant builds

🧠 Powered by Google Gemini – Advanced multimodal AI for food recognition

🛠️ Tech Stack

Frontend: React.js, TypeScript, Tailwind CSS
AI Integration: Google Gemini API
Database: Supabase
Build Tool: Vite
Other Tools: Git, Postman, Visual Studio Code

📥 Installation
1️⃣ Clone the Repository
git clone https://github.com/your-username/nutriscan.git
cd nutriscan

2️⃣ Install Dependencies
npm install

3️⃣ Add Environment Variables

Create a .env file:

VITE_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

4️⃣ Start Development Server
npm run dev

🧑‍💻 Usage

Open the app

Upload a food image

Wait for the AI to analyze using Google Gemini

View nutritional details and charts

Save results to history for later use

📁 Project Structure
nutriscan/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── utils/
 │   ├── assets/
 │   └── main.tsx
 ├── public/
 ├── .env.example
 ├── package.json
 └── README.md

🖼️ Screenshots

(Add your screenshots here)

/screenshots
 - home.png
 - upload.png
 - results.png
 - history.png

🔮 Future Enhancements

Multi-food detection

Portion size estimation

Barcode scanning support

Mobile app version

Personalized diet recommendations

Offline AI scanning

🤝 Contributing

Pull requests are welcome! Please open an issue to discuss major changes.

📜 License

This project is licensed under MIT License.
