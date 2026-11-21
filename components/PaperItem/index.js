import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import data from "../../data/portfolio.json";

const PaperItem = ({ title, description, url }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
        mounted && theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50"
      } link ${data.showCursor && "cursor-none"}`}
    >
      <h2 className="text-xl tablet:text-2xl laptop:text-3xl font-medium flex items-start gap-2">
        <span>{title}</span>
        <span
          aria-hidden="true"
          className="text-base tablet:text-lg opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all ease-out duration-300"
        >
          ↗
        </span>
      </h2>
      {description && (
        <p className="mt-1 text-base laptop:text-xl opacity-50">
          {description}
        </p>
      )}
    </a>
  );
};

export default PaperItem;
