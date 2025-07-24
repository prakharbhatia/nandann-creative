# Nandann Creative Agency

A modern, elegant website for Nandann Creative Agency built with Next.js, featuring Apple-inspired liquid glass design effects and smooth animations.

## ✨ Features

- **Modern Glass Morphism Design** - Apple-inspired liquid glass effects
- **Responsive Layout** - Beautiful on all devices
- **Smooth Animations** - Floating elements, hover effects, and micro-interactions
- **Interactive Components** - Engaging user experience throughout
- **Performance Optimized** - Built with Next.js 12 for optimal performance
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

## 🎨 Design Highlights

- **Hero Section** - Stunning gradient text and floating background elements
- **Services** - Glass cards showcasing web development, mobile apps, and Python solutions
- **Portfolio** - Interactive project showcases with tech stack highlights
- **About** - Team presentation with company story
- **Contact** - Beautiful contact form with validation
- **Navigation** - Smooth scrolling glass navigation bar

## 🚀 Getting Started

### Prerequisites

- Node.js 12+ (or upgrade to Node 16+ for best performance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nandann-creative
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
nandann-creative/
├── components/           # React components
│   ├── Navigation.tsx   # Glass navigation bar
│   ├── Hero.tsx        # Hero section with animations
│   ├── Services.tsx    # Services showcase
│   ├── Portfolio.tsx   # Project portfolio
│   ├── About.tsx       # About section
│   └── Contact.tsx     # Contact form
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   └── index.tsx      # Home page
├── styles/            # CSS styles
│   └── globals.css    # Global styles with glass effects
├── public/            # Static assets
└── README.md         # This file
```

## 🛠 Tech Stack

- **Framework**: Next.js 12
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: CSS animations with custom keyframes
- **Icons**: Emoji icons (can be replaced with icon libraries)

## 🎯 Key Components

### Glass Morphism Effects
Custom CSS classes for beautiful glass effects:
- `.glass` - Standard glass effect
- `.glass-strong` - Enhanced glass effect
- `.glass-dark` - Dark glass variant

### Animations
- Floating elements
- Hover lift effects
- Smooth slide-up animations
- Gradient text effects

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔧 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  'nandann': {
    50: '#f0f9ff',
    500: '#0ea5e9',
    // ... more colors
  }
}
```

### Content
- Update company information in each component
- Replace placeholder project data in `Portfolio.tsx`
- Modify contact information in `Contact.tsx`
- Update team information in `About.tsx`

### Animations
Customize animations in `tailwind.config.js` and `globals.css`.

## 🚢 Deployment

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### Deploy to Vercel:
The easiest way to deploy is using [Vercel](https://vercel.com/):
```bash
npm i -g vercel
vercel
```

## 📊 Performance

The website is optimized for:
- Fast loading times
- Smooth animations
- SEO-friendly structure
- Accessibility best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and belongs to Nandann Creative Agency.

## 📞 Contact

For questions or support, contact:
- **Email**: hello@nandanncreative.com
- **Website**: [Your Domain]

---

**Built with ❤️ by Nandann Creative Agency** 