# Website

This is a static website built with Hugo, a fast and flexible static site generator.

## Prerequisites

- [Hugo](https://gohugo.io/) (extended version recommended for full functionality)
- Git (for cloning the repository)

## Installation

### Installing Hugo

#### On Arch Linux

```bash
sudo pacman -S hugo
```

#### On macOS (using Homebrew)

```bash
brew install hugo
```

#### On Ubuntu/Debian

```bash
sudo apt update
sudo apt install hugo
```

#### On Windows (using Chocolatey)

```bash
choco install hugo -confirm
```

For other operating systems or detailed instructions, refer to the [official Hugo installation guide](https://gohugo.io/getting-started/installing/).

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ComicShrimp/website.git
   cd website
   ```

2. Run the development server:

   ```bash
   hugo server
   ```

   The site will be available at `http://localhost:1313/`. Hugo will automatically reload the site when you make changes to the content.

## Building for Production

To build the static files for deployment:

```bash
hugo
```

The generated files will be in the `public/` directory.

## Project Structure

- `content/` - Website content (Markdown files)
- `themes/` - Hugo themes (if any)
- `static/` - Static assets (images, CSS, JS)
- `config/` - Configuration files (hugo.yaml)
- `archetypes/` - Content templates

## Contributing

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes
4. Test locally with `hugo server`
5. Commit and push your changes
6. Create a pull request

## License

[Specify your license here, e.g., MIT License]
