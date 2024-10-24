# Country info app

## Overview 
This project is a **Vue.js** application that provides detailed information about countries and country holidays for the current week and selected year using the [Nager.Date API](https://date.nager.at/swagger/index.html).

## Features 

### Home page 

- **Country Search**: Users can easily find required country by country name in the list.
- **Country List**: Users can preview each country in the separate card and navigate to single country page by clinking either on the card or the country name.
- **Select desire number of upcoming holidays**: Users can change number of holidays.
- **Upcoming Holiday List**: Users can preview holidays as separate card with following properties - holiday name, local holiday name, country (with possibility to navigate to single country page), holiday type, date and holiday visits.


### Single country page

- **Country Details**: Users can get more info about desired country - country name, official name, country code, region, border countries (each border country name navigate to dedicated country page) and preview country flag. 
- **Year list**: Users can switch between years within a range of 10 years before and after the current year to view holidays for different years. The preselected year is current one.
- **Holidays List**: Users can preview holidays for desired year as separate card with following properties - holiday name, local holiday name, country (with possibility to navigate to single country page), holiday type, date and holiday visits.
- **SEO**: The title of each country page is dynamically generated to improve SEO optimization.

### About page
- **Details about the app**: A test page showcasing different page titles.

## Instalation

1. Clone the respository:

```bash
git clone https://github.com/irenako/developers-today-vue.git desired-path
```

2. Install dependencies:

```bash 
npm install 
```

3. Set up environment variables:

Copy the .env.example or just rename it to the .env. Paste following environment variables.

```bash 
VITE_BASE_API_URL=https://date.nager.at/api/v3/
VITE_FLAG_API_URL=https://flagsapi.com/
VITE_DEFAULT_APP_TITLE="🗺️ Countries info'
```

4. Run the development server:

It will start the app in development mode, and it will be accessible at http://localhost:5173/.

```bash 
npm run dev
```

5. To build the application for production, run: 

```bash 
npm run build
```

## Project structure
```bash 
.
├── public/             # Public assets
├── src/
│   ├── components/     # Vue components (Country, ErrorMessage, HolidayFeature and UpcomingHoliday widgets)
│   ├── views/          # Pages (HomeView.vue, SingleCountryView.vue, AboutView.vue)
│   ├── router/         # Vue Router setup
│   ├── assets/         # Images, styles
│   ├── types.ts        # TypeScript types
│   ├── App.vue         # Root component
│   ├── main.ts         # Entry point for the app
├── .env                # Environment variables
├── .env.example        # Environment variables example file
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── .tailwind.config.js # Tailwind configuration
├── .postcss.config.js  # PostCSS configuration
├── README.md           # Project documentation
└── package.json  
```

## Libraries and Tools

- **Vue.js**: The main framework for the app
- **TypeScript**: For typing and better code maintance.
- **Vue Router**: For navigation in SPA.
- **ESLint & Prettier**: To ensure consistent code quality and styling.
- **Moment js**: Library for handling dates

## API

For the app were used 2 API:
- **Nager.Date API** - to fetch countries lists, upcoming holidays, country details, country holidays per year.
- **Flags API** - to fetch each country flag.