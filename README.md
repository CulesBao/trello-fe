# 🚀 Trello Clone - Frontend

A modern Trello-like project management application built with Vue 3, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [Development](#-development)
- [Build & Deploy](#-build--deploy)
- [Contributing](#-contributing)

## ✨ Features

- 🔐 **Authentication & Authorization**

  - JWT-based authentication
  - Protected routes with middleware
  - User profile management

- 📋 **Board Management**

  - Create, update, and delete boards
  - Board member management
  - Activity tracking

- 📝 **List & Card Management**

  - Create and organize lists within boards
  - Drag-and-drop card management
  - Card details with comments and attachments

- 👥 **Team Collaboration**

  - Team creation and management
  - Member invitation and role management
  - Real-time collaboration

- 🔔 **Notifications**

  - In-app notification system
  - Activity-based notifications

- 📁 **File Management**
  - File upload and attachment
  - Image preview and download

## 🛠️ Tech Stack

### Frontend

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful and accessible UI components

### State Management

- **Pinia** - Intuitive state management for Vue

### HTTP Client

- **Axios** - Promise-based HTTP client with interceptors

### Authentication

- **JWT** - JSON Web Tokens for secure authentication
- **jwt-decode** - JWT token parsing

### UI/UX

- **Lucide Vue** - Beautiful icons
- **Vue3 Toastify** - Toast notifications
- **Radix Vue** - Unstyled, accessible UI primitives

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── constants/          # API endpoints
│   ├── services/           # API service classes
│   ├── types/              # TypeScript type definitions
│   └── axios.client.ts     # Axios configuration
├── components/             # Reusable components
│   ├── layouts/            # Layout components
│   ├── ui/                 # UI components (shadcn/ui)
│   └── ErrorBounder.vue    # Error boundary component
├── composables/            # Vue composables
├── layouts/                # Page layouts
├── middlewares/            # Route middlewares
├── router/                 # Vue Router configuration
├── stores/                 # Pinia stores
├── views/                  # Page components
└── assets/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/CulesBao/trello-fe.git
   cd trello-fe
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your API configuration:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📡 API Documentation

### Service Classes

The application uses a service-oriented architecture for API calls:

- **AuthService** - Authentication and user management
- **BoardService** - Board operations
- **ListService** - List management within boards
- **CardService** - Card operations
- **CommentService** - Comment management
- **TeamService** - Team collaboration
- **NotificationService** - Notification handling
- **FileService** - File upload and management

### Usage Example

```typescript
import { AuthService, BoardService } from "@/api";

// Login
const user = await AuthService.login({
  email: "user@example.com",
  password: "password",
});

// Get user's boards
const boards = await BoardService.getBoards();
```

## 🔐 Authentication

### JWT Token Management

```typescript
// Auth store usage
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

// Check if user is logged in
if (authStore.isLoggedIn) {
  // User is authenticated
}

// Logout
authStore.logout();
```

### Protected Routes

Routes are protected using authentication middleware:

```typescript
// Route with auth protection
{
  path: '/dashboard',
  component: Dashboard,
  meta: { requiresAuth: true }
}
```

## 🔧 Development

### Code Style

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

### Development Commands

```bash
# Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

### Error Handling

The application includes comprehensive error handling:

- **ErrorBounder** component for catching Vue errors
- **Axios interceptors** for HTTP error handling
- **Toast notifications** for user feedback

## 🏗️ Build & Deploy

### Production Build

```bash
npm run build
```

### Docker Support

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment Variables

| Variable       | Description     | Default                     |
| -------------- | --------------- | --------------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:3000/api` |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**CulesBao**

- GitHub: [@CulesBao](https://github.com/CulesBao)

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

⭐ Star this repository if you find it helpful!
