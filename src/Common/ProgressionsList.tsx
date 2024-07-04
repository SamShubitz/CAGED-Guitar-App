import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProgressionType } from "../types";
import axios from "axios";

const exampleProgression: ProgressionType = {
  title: "Autumn Leaves",
  chordList: [
    {
      name: "Cm7",
      shape: [24, 1, 1, 26, 27, 28, 5, 5],
      mutedFrets: [1, 5],
      barre: "",
      barreIndicator: "5",
    },
    {
      name: "F7b9",
      shape: [22, 27, 20, 25, 0, 0, 5, 5, 5],
      mutedFrets: [0, 5],
      barre: "",
      barreIndicator: "5",
    },
    {
      name: "Bbmaj7",
      shape: [12, 1, 1, 1, 20, 21, 16, 5, 5, 5],
      mutedFrets: [1, 5],
      barre: "",
      barreIndicator: "5",
    },
    {
      name: "Ebmaj9",
      shape: [13, 8, 21, 16, 0, 0, 0, 5, 5, 5],
      mutedFrets: [0, 5],
      barre: "",
      barreIndicator: "5",
    },
    {
      name: "Am7b5",
      shape: [0, 0, 0, 1, 28, 33, 32, 5, 5, 5],
      mutedFrets: [0, 5],
      barre: "",
      barreIndicator: "",
    },
    {
      name: "D7",
      shape: [22, 33, 26, 31, 0, 0, 0, 5, 5, 5],
      mutedFrets: [0, 5],
      barre: "",
      barreIndicator: "",
    },
    {
      name: "Gm6",
      shape: [18, 1, 1, 14, 21, 22, 5, 5],
      mutedFrets: [1, 5],
      barre: "",
      barreIndicator: "",
    },
    {
      name: "G7b13",
      shape: [18, 1, 1, 1, 20, 27, 28, 5, 5, 5],
      mutedFrets: [1, 5],
      barre: "",
      barreIndicator: "",
    },
  ],
};

const ProgressionsList = () => {
  const [progressionTitles, setProgressionTitles] = useState<string[]>([]);

  const api = axios.create({
    baseURL: "http://localhost:5108",
  });

  const getTitles = async () => {
    try {
      const response = await api.get("/progressions");
      const titles = response.data.map((p: ProgressionType) => p.title);
      setProgressionTitles(titles);
    } catch (error) {
      console.log(error);
    }
  };

  const addTitle = async () => {
    try {
      const matches = await api.get(
        `/progressions?title=${exampleProgression.title}`
      );
      if (matches.data.length === 0) {
        const postResponse = await api.post(
          "/progressions",
          exampleProgression
        );
        console.log("post response", postResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTitles();
    if (progressionTitles.length === 0) addTitle();
  }, []);

  const titleList = progressionTitles.map((title, index) => {
    const safeTitle = encodeURIComponent(title);
    return (
      <li className="side-nav-list" key={index}>
        <Link to={`Progressions/${safeTitle}`}>{title}</Link>
      </li>
    );
  });

  return <ul className="progression-list">{titleList}</ul>;
};

export default ProgressionsList;
