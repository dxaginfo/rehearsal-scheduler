# Rehearsal Scheduler

A web application to help bands and music groups efficiently schedule rehearsals, track attendance, send reminders, and suggest optimal rehearsal times based on member availability.

## 🎵 Features

- **User Management**
  - User registration and authentication
  - Role-based access control (band leader, member)
  - Profile management with instrument/role information

- **Band/Group Management**
  - Create and manage multiple bands/groups
  - Invite members via email
  - Assign roles within groups

- **Availability Tracking**
  - Members can set recurring availability
  - Calendar view for indicating available time slots
  - Conflict detection with existing events

- **Rehearsal Scheduling**
  - Create rehearsal events with location, time, and duration
  - Automatic suggestion of optimal rehearsal times based on member availability
  - Ability to specify required members for specific rehearsals

- **Notification System**
  - Automated email/push notifications for new rehearsals
  - Reminder notifications (24h, 1h before rehearsal)
  - Cancellation and rescheduling alerts

- **Attendance Tracking**
  - RSVP functionality (attending, maybe, not attending)
  - Attendance history and statistics
  - Late/no-show tracking

- **Rehearsal Content Management**
  - Set list planning for rehearsals
  - Song/piece assignment for practice
  - File sharing for sheet music or practice tracks

- **Reporting and Analytics**
  - Attendance reports by member
  - Rehearsal frequency metrics
  - Progress tracking for repertoire

## 🚀 Technology Stack

### Frontend
- React.js with hooks and functional components
- Redux for global state, Context API for component-level state
- Material-UI for responsive design and pre-built components
- FullCalendar.js for interactive calendar views
- Formik with Yup for validation
- Axios for HTTP requests

### Backend
- Node.js with Express
- RESTful API architecture
- JWT (JSON Web Tokens) for authentication
- Nodemailer with SMTP provider (SendGrid or Mailgun)
- Web Push API for browser notifications
- Socket.io for real-time updates

### Database
- PostgreSQL for relational data storage
- Redis for caching and session management
- Sequelize ORM for database interactions

### DevOps
- AWS or Heroku for hosting
- GitHub Actions for CI/CD
- Docker for containerization
- Sentry for error tracking, New Relic for performance monitoring

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL (v13+)
- Redis (v6+)
- Git

## 🔧 Installation & Setup

### Clone the repository
```bash
git clone https://github.com/dxaginfo/rehearsal-scheduler.git
cd rehearsal-scheduler
```

### Set up the backend
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and other settings

# Run database migrations
npm run migrate

# Seed the database with initial data (optional)
npm run seed

# Start the development server
npm run dev
```

### Set up the frontend
```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL and other settings

# Start the development server
npm run start
```

### Docker setup (alternative)
```bash
# Build and run the application using Docker Compose
docker-compose up -d
```

## 🗂️ Project Structure

```
rehearsal-scheduler/
├── backend/                # Backend API server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── app.js          # Express app setup
│   ├── migrations/         # Database migrations
│   ├── seeders/            # Database seeders
│   └── tests/              # Backend tests
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── containers/     # Container components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── redux/          # Redux store, actions, reducers
│   │   ├── services/       # API client services
│   │   ├── styles/         # CSS/SCSS styles
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main React component
│   └── tests/              # Frontend tests
├── docker/                 # Docker configuration
│   ├── backend/            # Backend Docker setup
│   └── frontend/           # Frontend Docker setup
├── docker-compose.yml      # Docker Compose configuration
├── .github/                # GitHub Actions workflows
└── README.md               # Project documentation
```

## 🧪 Testing

### Backend tests
```bash
cd backend
npm run test
```

### Frontend tests
```bash
cd frontend
npm run test
```

## 📚 API Documentation

API documentation is available at `/api/docs` when running the backend server. The documentation is generated using Swagger/OpenAPI.

## 🔒 Environment Variables

### Backend
- `NODE_ENV` - Environment mode (development, test, production)
- `PORT` - Server port
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - Secret for JWT signing
- `SMTP_HOST` - SMTP server for sending emails
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `CLIENT_URL` - Frontend URL for CORS and links

### Frontend
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_WS_URL` - WebSocket URL for real-time updates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project Link: [https://github.com/dxaginfo/rehearsal-scheduler](https://github.com/dxaginfo/rehearsal-scheduler)