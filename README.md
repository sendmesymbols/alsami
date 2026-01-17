# Al Sami Associates Website

Professional construction company website for Al Sami Associates Private Limited, Engineers & Contractors.

## Project Structure

```
AlSamiAssociates/
├── index.html              # Homepage with services grid + project slider
├── about.html              # Company history, vision, mission, team
├── services.html           # Detailed service pages
├── projects.html           # Project gallery
├── contact.html            # Contact form, map, office locations
├── css/
│   └── style.css           # Global theming with CSS variables
├── js/
│   └── script.js           # Vanilla JS interactions
├── public/
│   ├── Al Sami Associates Pvt Ltd_ 2025.pdf  # Company profile PDF
│   └── images/
│       ├── logo.jpg        # Company logo (dark purple theme)
│       └── projects/       # Project images (existing)
└── README.md               # This file
```

## Theme Switcher Guide

### How to Change the Site's Color Scheme

The website uses a CSS variable-based theming system. To change the entire site's appearance, you only need to modify the `--primary-brand-color` variable in `css/style.css`.

#### Step 1: Open the CSS File

Open `css/style.css` and locate the `:root` section at the top of the file.

#### Step 2: Modify the Primary Color

Find this section:

```css
:root {
    --primary-brand-color: #4A148C;  /* Main dark purple from logo */
    --primary-dark: #3D0F6F;
    --primary-light: #7B2CBF;
    --accent-color: #9D4EDD;
    /* ... other variables ... */
}
```

#### Step 3: Change the Color Values

Simply change the hex code for `--primary-brand-color` to your desired color. The system will automatically adjust related colors:

**Example 1: Classic Professional (Blue)**
```css
--primary-brand-color: #002e5b;
--primary-dark: #001f3f;
--primary-light: #0056b3;
--accent-color: #007bff;
```

**Example 2: Modern Green**
```css
--primary-brand-color: #27ae60;
--primary-dark: #1e8449;
--primary-light: #52c97f;
--accent-color: #58d68d;
```

**Example 3: Bold Red**
```css
--primary-brand-color: #d63031;
--primary-dark: #a71e1f;
--primary-light: #e74c3c;
--accent-color: #ff6b6b;
```

#### Step 4: Adjust Related Colors (Optional)

For best results, you may want to adjust the related color variables:
- `--primary-dark`: A darker shade of your primary color (for hover states)
- `--primary-light`: A lighter shade (for accents)
- `--accent-color`: A complementary or lighter shade (for highlights)

### Color Propagation

When you change `--primary-brand-color`, it automatically affects:
- ✅ All buttons (`.btn-primary`)
- ✅ Navigation links and hover states
- ✅ Section title underlines
- ✅ Icons and card highlights
- ✅ Footer accents
- ✅ Form focus states
- ✅ All interactive elements

### Pre-configured Theme Variations

The CSS file includes commented-out theme variations. To use them:

1. Comment out the current `:root` variables
2. Uncomment one of the pre-configured themes
3. Save the file

### Testing Your Theme

After changing colors:
1. Refresh your browser
2. Check all pages (Home, About, Services, Projects, Contact)
3. Test hover states on buttons and links
4. Verify mobile responsiveness

## Features

- ✅ Fully responsive design (Mobile, Tablet, Desktop)
- ✅ Swiper.js slider with animations
- ✅ Lazy loading for performance
- ✅ Dark purple color theme (customizable)
- ✅ Project showcase from existing images
- ✅ Contact form with validation
- ✅ Google Maps integration (snapshot)
- ✅ WhatsApp floating button
- ✅ Download Company Profile PDF button
- ✅ Mobile-optimized navigation
- ✅ Smooth scrolling
- ✅ SEO-friendly structure

## Dependencies

All dependencies are loaded via CDN:

- **Bootstrap 5.3.0**: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`
- **Swiper.js 11**: `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css`
- **Font Awesome 6.4.0**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- **Google Fonts (Inter)**: `https://fonts.googleapis.com/css2?family=Inter`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Adding New Services

1. Open `services.html`
2. Add a new service card in the appropriate section
3. Update the services grid on `index.html`
4. Add navigation link if needed

### Adding New Projects

1. Add project images to `public/images/projects/[ProjectName]/`
2. Update `projects.html` with new project card
3. Update `js/script.js` project data array

### Modifying Contact Information

Update contact details in:
- `index.html` (footer)
- `about.html` (footer)
- `services.html` (footer)
- `projects.html` (footer)
- `contact.html` (contact section and footer)
- Top bar on all pages

## Development

### Local Development

1. Open any HTML file in a modern web browser
2. For best results, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

### File Structure Notes

- All HTML files are in the root directory
- CSS is in `css/style.css`
- JavaScript is in `js/script.js`
- Images and assets are in `public/`
- PDF company profile is in `public/`

## License

© 2025 Al Sami Associates Private Limited. All rights reserved.

## Support

For website support or modifications, contact:
- **Email**: alsami.786@hotmail.com
- **Phone**: +92 300 3432141
