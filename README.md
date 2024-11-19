## NextPlay

<div align="center">
<pre>
███╗   ██╗███████╗██╗  ██╗████████╗██████╗ ██╗      █████╗ ██╗   ██╗
████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝
██╔██╗ ██║█████╗   ╚███╔╝    ██║   ██████╔╝██║     ███████║ ╚████╔╝ 
██║╚██╗██║██╔══╝   ██╔██╗    ██║   ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  
██║ ╚████║███████╗██╔╝ ██╗   ██║   ██║     ███████╗██║  ██║   ██║   
</pre>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## Description
A game recommendation web app that helps users discover their next favorite game. By combinning data from IGDB and user-driven insights from game-focused subreddits, the platform offers personalized and community-inspired recommendations. Future updates will include advanced features like trend analysis, sentiment-based categorization, and AI-powered summaries.


## Tech Stack
- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB (Mongoose)
- **External APIs**: IGDB, Reddit API
- **Cloud Deployment**: AWS
- **DevOps**: Docker integration for streamlined development and deployment


## Core Features

### MVP Features
1. **Game Database**: Search and filter games by genre, platform, and other criteria.
2. **Personalized Recommendations**: Tailored suggestions based on IGDB data.
3. **User Lists**: Track games with custom lists (e.g., Playing, Completed, Wishlisted).
4. **Trending Games**: Highlight popular and trending titles.

### Future Features
1. **Community Insights**: NLP-powered categorization of subreddit posts into unique themes (e.g., "games I can play to forget about life" - example taken from the post: https://www.reddit.com/r/ShouldIbuythisgame/comments/1gl3xm7/a_game_that_i_can_play_to_forget_about_life_for_a/).
2. **Sentiment Analysis**: Highlight emotional and thematic trends in games based on subreddit data.
3. **AI-Generated Summaries**: Create concise overviews and FAQs for games.
4. **Community Curation**: User-created lists and insights to enrich recommendations.

## API Endpoints

### MVP Endpoints
- `GET /api/games` – Retrieve a list of all games.
- `GET /api/games/:id` – Fetch details of a specific game.
- `POST /api/user/list` – Add a game to a user's list (Playing, Completed, etc.).
- `GET /api/games/recommendations` – Get personalized recommendations.
- `GET /api/games/trending` – Fetch trending games.

### Planned Endpoints
- `GET /api/community/trends` – Analyze subreddit trends and categorize themes.
- `GET /api/community/faq` – AI-generated FAQ summaries for detailed insights.

---


## Setup Instructions

### Prerequisites
- Install [Node.js](https://nodejs.org/) (LTS version recommended)
- Install [npm](https://www.npmjs.com/) (comes with Node.js)
- Install [Typescript](https://www.typescriptlang.org/download/) and [tsx](https://www.npmjs.com/package/tsx?activeTab=readme) (I have mine installed globally)

    ```bash
    npm i -D typescript tsx
    ```



### Steps to Run Locally
1. **Clone the repository**:
    ```bash
    git clone https://github.com/xassan-cpu/nextplay.git
    cd nextplay
    ``` 

2. **Setup Backend**
    - Navigate to the `backend` folder:
        ```bash
        cd backend
        ```
    - Install backend dependencies:
        ```bash
        npm install
        ```
    - **Environment Variables**: Create a `.env` file in the `backend` folder and configure it based on the provided `.env.example` file:
        ```bash
        cp .env.example .env
        ```
    - Start the backend server:
        ```bash
        npm run start
        ```
    - By default, the backend runs on `http://localhost:5000`. You can change the port by modifying the `PORT` variable in the `.env` file.


3. **Setup Frontend**
   - Open a new terminal window and navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```
   - The frontend will be accessible at the URL provided in the terminal, typically **`http://localhost:5173`** by default.  

   - To change the port, edit the `vite.config.js` file and set the desired port:
     ```javascript
     export default defineConfig({
       server: {
         port: 3000, // Example: Change to port 3000
       },
     });
     ```

4. **Access the App**
    - Open your browser and go to `http://localhost:5173` to access the frontend.
    - The backend API is accessible at `http://localhost:5000`.


### Additional Notes
- For production, hosting solutions like AWS, Vercel, or Heroku can be used for deployment.
- Ensure backend `.env` variables (like API keys) are correctly configured in production environments.
- If issues arise, check logs for the backend and frontend processes.


---
## Project Goals
1. Build a complete full-stack application to improve technical skills.
2. Learn and apply cloud deployment using AWS.
3. Integrate Docker into the development pipeline for efficiency.
4. Develop NLP and AI-based features to create a unique and valuable user experience.
5. Create a portfolio-worthy project showcasing end-to-end software development expertise.

---

## Current Status
- **Frontend**: Will update soon
- **Backend**: Basic express server
- **Database**: Will update soon
- **Next Steps**: Integrate with IGDB and MongoDB, core endpoints for game data retrival

---

## License
This project is licensed under the `MIT` License. See the `LICENSE` file for details.


## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## Contact 
For any inquiries, reach out via `nasserha@ualberta.ca`.