# 🚁 BattalionBuzz 🚁

## A feature-rich chat application whose design is inspired by Indian Special Forces which supports real-time communication, user authentication, file sharing, image/video sharing, documents sharing, audio recording, forwarding of chat data and much more.

## 📑 Table of Contents

1. [📜 Project Description](#project-description)
2. [✨ Features](#features)
3. [🛠️ Technologies Used](#technologies-used)
4. [🚀 Getting Started](#getting-started)
   - [🔧 Installation](#installation)
   - [🔐 Environment Variables](#environment-variables)
5. [📚 Usage](#usage)
6. [🏗️ Architecture](#architecture)
7. [🤝 Contributing](#contributing)
8. [⚖️ License](#license)
9. [📞 Contact](#contact)

---

## 📝 Project Description

**BattalionBuzz** is a, real-time communication platform. The application provides a highly intuitive interface for managing user chats, file sharing, voice messages, images/videos sharing, documents sharing, message forwarding, option to delete the sent message, download them to local device and many more. Built using modern web technologies like React, Firebase, and TailwindCSS.

---

## ✨ Features

- **🔐 User Authentication**: Secure login and session management.
- **💬 Real-time Chat**: User-to-user chat with real-time updates.
- **📸 Media Sharing**: Share images, videos, and PDFs directly in the chat.
- **🎙️ Audio Messages**: Record and send audio messages using your device’s microphone.
- **😄 Emoji Support**: Express yourself with an integrated emoji picker.
- **📁 File Management**: Seamlessly upload and share documents.
- **📱💻 Responsive Design**: Works across different screen sizes.
- **🔥 Firebase Integration**: Real-time database updates and media storage using Firebase.


---

## 🛠️ Technologies Used

- **Frontend**: React.js, TailwindCSS
- **State Management**: Redux Toolkit
- **Backend/Database**: Firebase Firestore
- **Storage**: Firebase Cloud Storage
- **Authentication**: Firebase Authentication
- **Other Libraries**:
  - EmojiPicker
  - Firebase SDK
  - MediaRecorder API
  - React Modal

---

## 🚀 Getting Started

### 🔧 Prerequisites

To run this project locally, you need to have the following installed:

- Node.js (version 14 or later)
- npm
- Firebase account for Firestore and storage configuration along with email/password Authentication

### 🔧 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/para-commando/BattalionBuzz.git

2. **Navigate to the project directory:**
   ```bash
   cd BattalionBuzz

3. **Install dependencies:**
    ```bash
    npm install

3. **Configure Firebase:**
    Set up a Firebase project and Firestore.
    Enable Firebase Authentication.
    Enable Firebase Storage for media uploads.
    Enable Firebase Firestore database for chat messages


### 🔐  Environment Variables
Create a .env.local file in the root directory and provide the following environment variables:
     ```bash
    REACT_APP_FIREBASE_API_KEY=<your_firebase_api_key>
    REACT_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
    REACT_APP_FIREBASE_PROJECT_ID=<your_firebase_project_id>
    REACT_APP_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
    REACT_APP_FIREBASE_APP_ID=<your_firebase_app_id>

### 🏃 Running the app
    ```bash
    npm run dev

This will start the app on http://localhost:5173/
    ```
## 📚 Usage

- **User Registration**: Users can sign up with their credentials.🔑
- **Start a Chat**: Select or search for a user to start chatting. 🗣️
- **Media Sharing**: Send images, PDFs, and audio recordings within the chat.📂
- **Audio Recording**: Press the microphone button to record and send audio messages.🎤
- **File Management**: Upload and share files directly in the chat.📑

## 🏗️ Architecture

- **Frontend**: Built with React.js using functional components and hooks. TailwindCSS is used for styling, making the app responsive and modern.
- **State Management**: Redux Toolkit manages the application's global state efficiently.
- **Real-Time Database**: Firebase Firestore stores and synchronizes data in real time.
- **Media Upload**: Firebase Storage handles media uploads for images, videos, and audio files.

## 🤝 Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a Pull Request.

## ⚖️ License

This project is licensed under the MIT License.



