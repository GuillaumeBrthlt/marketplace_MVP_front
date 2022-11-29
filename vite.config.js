import react from '@vitejs/plugin-react'
import Markdown from "vite-plugin-react-markdown";

export default {
  plugins: [
    Markdown(),
    react({
      include: [/\.tsx$/, /\.md$/], // <-- add .md 
    }),
  ],
};
