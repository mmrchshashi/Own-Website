# Shashi Chaturvedi - Professional Portfolio Website

A beautiful, responsive professional portfolio website built with HTML, CSS, and JavaScript. This website showcases my skills as a Full Stack Developer and is designed to be hosted for free on GitHub Pages.

## 🌟 Features

- **Modern Design**: Beautiful UI/UX with gradient backgrounds and smooth animations
- **Fully Responsive**: Optimized for both mobile and desktop devices
- **Interactive Elements**: Smooth scrolling, hover effects, form validation with captcha, and mail app integration
- **Professional Layout**: Clean sections for About, Skills, and Contact
- **Accessibility**: Screen reader support and keyboard navigation
- **Performance Optimized**: Efficient animations and smooth scrolling

## 🚀 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Variables, Animations
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Inter (Google Fonts)
- **Responsive Design**: Mobile-first approach with CSS Media Queries

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile devices** (320px and up)
- **Tablets** (768px and up)
- **Desktop** (1200px and up)

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful color transitions
- **Glass Morphism**: Modern backdrop-filter effects
- **Smooth Animations**: CSS transitions and keyframe animations
- **Interactive Cards**: Hover effects and transformations
- **Modern Typography**: Clean, readable fonts with proper hierarchy

## 📁 File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── Shashi Photo.png    # Profile picture
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## 🚀 How to Host on GitHub Pages

### Option 1: Quick Setup (Recommended)

1. **Fork or Clone this repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Push to your GitHub repository**
   ```bash
   git add .
   git commit -m "Initial commit: Portfolio website"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "GitHub Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Your website will be available at:**
   ```
   https://yourusername.github.io/repository-name
   ```

### Option 2: Manual Setup

1. **Create a new repository** on GitHub
2. **Upload all files** to the repository
3. **Enable GitHub Pages** as described above

## 🔧 Customization

### Personal Information
Edit the following in `index.html`:
- Name and title
- About section content
- Contact information
- Social media links

### Profile Picture
Replace `Shashi Photo.png` with your own image (recommended size: 400x400px)

### Colors and Styling
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #f8fafc;    /* Background color */
    --accent-color: #06b6d4;       /* Accent color */
    /* ... other variables */
}
```

### Skills and Technologies
Update the skills section in `index.html` to match your expertise.

## 📧 Contact Form

The contact form is currently set up for demonstration purposes. To make it functional:

1. **Backend Integration**: Connect to a backend service (Formspree, Netlify Forms, etc.)
2. **Email Service**: Use services like SendGrid or AWS SES
3. **Database**: Store submissions in a database if needed

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Fallbacks**: Graceful degradation for older browsers

## 📱 PWA Features

The website includes Progressive Web App features:
- Service Worker registration
- Responsive design
- Fast loading
- Offline capabilities (with proper service worker implementation)

## 🔒 Security Considerations

- No sensitive information is exposed
- Form validation on both client and server side
- HTTPS enforced on GitHub Pages
- XSS protection through proper input sanitization

## 📊 Performance

- **Optimized Images**: Compressed profile picture
- **Minimal Dependencies**: Only essential external resources
- **Efficient CSS**: Optimized selectors and animations
- **Lazy Loading**: Images load with smooth transitions

## 🎯 SEO Optimization

- Semantic HTML structure
- Meta tags for description and keywords
- Proper heading hierarchy
- Alt text for images
- Mobile-friendly design

## 🛠️ Development

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

### Making Changes
1. Edit the HTML, CSS, or JavaScript files
2. Test locally in your browser
3. Commit and push changes
4. GitHub Pages will automatically update

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help setting up the website, please:
- Open an issue on GitHub
- Contact me at mmrchshashi@gmail.com

## 🙏 Acknowledgments

- **Font Awesome** for the beautiful icons
- **Google Fonts** for the Inter font family
- **GitHub Pages** for free hosting
- **CSS Grid and Flexbox** for modern layouts

---

**Built with ❤️ by Shashi Chaturvedi**

*Full Stack Developer | Mumbai, Maharashtra, India*
