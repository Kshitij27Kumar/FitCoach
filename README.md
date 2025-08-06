# FitCoach - AI Fitness & Health Coach

A beautiful, modern AI-powered fitness and health coaching chatbot built with React, TypeScript, and Vercel AI SDK. FitCoach provides personalized advice on fitness, nutrition, workouts, and general wellness with a stunning dark/light mode interface.

![FitCoach Demo](https://img.shields.io/badge/FitCoach-AI%20Fitness%20Coach-purple)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)
![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-5.0.0-green)

## 🏃‍♂️ Features

### 🤖 AI-Powered Coaching

- **Comprehensive Health Guidance**: Nutrition, fitness, workouts, and wellness advice
- **Personalized Responses**: Tailored recommendations based on your questions
- **Expert Knowledge**: Powered by GPT-4o for accurate, up-to-date information
- **Contextual Conversations**: Maintains conversation context for better coaching

### 🎨 Beautiful User Interface

- **Dark/Light Mode**: Toggle between elegant themes with smooth transitions
- **Modern Design**: Clean, professional interface with health-themed styling
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Animated Elements**: Smooth animations and interactive feedback
- **Health Icons**: Beautiful animated health and fitness icons

### 💪 Fitness & Health Focus

- **Workout Planning**: Get personalized exercise routines and training plans
- **Nutrition Guidance**: Meal planning, dietary advice, and healthy eating tips
- **Wellness Support**: General health, lifestyle, and wellness recommendations
- **Quick Suggestions**: Pre-built suggestion chips for common fitness questions

### 🔧 Technical Excellence

- **TypeScript**: Full type safety and better development experience
- **Vite**: Fast development and optimized builds
- **Modern React**: Hooks, functional components, and best practices
- **AI SDK Integration**: Seamless OpenAI integration via Vercel AI SDK

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fitcoach
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your OpenAI API key**

   ```bash
   # Create .env file
   echo "VITE_OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```

   Replace `your_openai_api_key_here` with your actual OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3001` (or the port shown in your terminal)

## 🎯 How to Use FitCoach

### Getting Started

1. **Configure API Key**: Ensure your OpenAI API key is set in the `.env` file
2. **Choose Your Theme**: Toggle between light and dark mode using the sun/moon icon
3. **Start Chatting**: Type your fitness or health questions in the chat input

### Quick Suggestions

Use the suggestion chips to quickly ask common questions:

- 🍳 **Breakfast ideas** - Get healthy breakfast recommendations
- 📊 **Calorie advice** - Learn about daily calorie needs
- 🥜 **Healthy snacks** - Discover nutritious snack options
- 💪 **Workout tips** - Get exercise and fitness advice

### Example Questions

- "What should I eat for breakfast?"
- "How many calories should I eat to lose weight?"
- "Can you create a workout plan for beginners?"
- "What are good pre-workout snacks?"
- "How can I improve my running endurance?"
- "What's a healthy meal plan for muscle building?"

## 🎨 Customization

### Modifying the AI Assistant

The AI's behavior and expertise can be customized in `src/aiService.ts`:

```typescript
const systemPrompt =
  "You are a helpful AI fitness and health coach assistant. " +
  "Provide clear, accurate, and helpful responses about fitness, nutrition, workouts, and general health. " +
  "If the query is not related to fitness, nutrition, health, or wellness, respond with " +
  "'I'm sorry, I can only help with fitness, nutrition, and health related questions.'";
```

### Styling Customization

- **Colors**: Modify the color scheme in `src/index.css`
- **Animations**: Adjust animation timings and effects
- **Layout**: Customize spacing, fonts, and component styling

### Adding New Features

- **New Suggestion Chips**: Add more quick-start questions
- **Additional Icons**: Include more health and fitness icons
- **Enhanced Prompts**: Expand the AI's capabilities with specialized prompts

## 🏗️ Project Structure

```
src/
├── App.tsx              # Main application component with chat interface
├── aiService.ts         # AI integration and OpenAI API calls
├── main.tsx             # Application entry point
├── index.css            # Comprehensive styling with dark/light themes
└── vite-env.d.ts        # TypeScript environment declarations

public/                  # Static assets
package.json             # Dependencies and scripts
vite.config.ts           # Vite configuration
tsconfig.json            # TypeScript configuration
.env                     # Environment variables (create this)
README.md                # Project documentation
```

## 🔧 Technical Implementation

### AI Integration

FitCoach uses direct OpenAI API calls for reliable performance:

```typescript
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userInput },
    ],
    max_tokens: 1000,
    temperature: 0.7,
  }),
});
```

### Theme System

Smooth dark/light mode transitions with CSS custom properties:

```typescript
// Theme toggle
const [isDarkMode, setIsDarkMode] = useState(false);

// Apply theme to body
useEffect(() => {
  document.body.className = isDarkMode ? "dark-mode" : "light-mode";
}, [isDarkMode]);
```

### Responsive Design

Mobile-first approach with breakpoint-specific styling:

```css
@media (max-width: 768px) {
  .app {
    border-radius: 0;
    min-height: 100vh;
  }

  .suggestion-chips {
    flex-direction: column;
    align-items: center;
  }
}
```

## 🎨 Design Features

### Color Schemes

- **Light Mode**: Clean white backgrounds with purple-blue gradients
- **Dark Mode**: Deep slate backgrounds with elegant contrast
- **Accent Colors**: Purple-blue gradients for primary actions
- **Health Theme**: Green and blue tones for wellness focus

### Animations

- **Smooth Transitions**: 0.3s ease transitions for all theme changes
- **Loading Animations**: Animated dots for AI response loading
- **Hover Effects**: Interactive feedback on buttons and elements
- **Floating Icons**: Subtle animations for health-themed icons

### Accessibility

- **High Contrast**: Excellent readability in both themes
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Touch Friendly**: Optimized for mobile and tablet use

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key (required)

## 🤝 Contributing

We welcome contributions to improve FitCoach! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Maintain responsive design principles
- Test in both light and dark modes
- Ensure accessibility standards
- Add proper error handling

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Vercel AI SDK** for seamless AI integration
- **Lucide React** for beautiful icons
- **OpenAI** for powerful AI capabilities
- **React & TypeScript** communities for excellent tooling

## 🔗 Resources

- [Vercel AI SDK Documentation](https://ai-sdk.dev/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**FitCoach** - Your AI Fitness & Health Coach 💪

_Empowering your fitness journey with AI-powered guidance and beautiful design._
