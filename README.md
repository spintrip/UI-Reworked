
# SpinTrip - Car Rentals Platform

 A web application for SpinTrip Car Rentals, built using React and Vite.

## Table of Contents
- [Installation](#installation)
- [Development](#development)
- [Building the Project](#building-the-project)
- [Previewing the Build](#previewing-the-build)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the project, you need to install all the required dependencies. Ensure you have [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spintrip-car-rentals.git
   cd spintrip-car-rentals
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server, run:

```bash
npm run dev
```

This will start the Vite development server and you can access the application at `http://localhost:3000`.

## Building the Project

To create an optimized production build, run:

```bash
npm run build
```

The production-ready build will be available in the `build` folder.

## Previewing the Build

To preview the build after running the build command:

```bash
npm run preview
```



## Project Structure

```
src/
├── assets/                 # Static assets like images
├── components/             # Reusable React components
├── feature-module/         # Main feature-specific modules and Redux store
├── style/                  # Global styles (SCSS, CSS)
├── index.tsx               # Entry point of the application
└── ...
```

## Technologies Used

- **React**: Frontend framework
- **Vite**: Build tool for faster development
- **Redux**: State management
- **Bootstrap**: UI framework
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client
- **Typescript**: Type safety
- **AOS**: Animate On Scroll library

## Environment Variables

The project requires the following environment variables to function:

- `VITE_BASE_URL`: Base URL for API requests.
- `VITE_API_KEY`: API Key for external services.
  
Make sure to create a `.env` file in the root directory and populate it with the required values:

```
VITE_BASE_URL=http://your-api-url.com
VITE_API_KEY=your-api-key
```

## Contributing

Feel free to fork this repository, create a branch, and submit a pull request. Contributions are always welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
