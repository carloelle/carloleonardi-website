import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Socials from "../components/Socials";
// Data
import data from "../data/portfolio.json";
const { name, collaborate = {} } = data;

// Bodies may be a single string (paragraphs separated by blank lines)
// or an array of paragraph strings.
const toParagraphs = (body) => {
  if (Array.isArray(body)) return body.filter(Boolean);
  if (typeof body !== "string") return [];
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

const Collaborate = () => {
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const sections = collaborate.sections || [];

  return (
    <>
      <Head>
        <title>{`Collaborate – ${name}`}</title>
        <meta
          name="description"
          content={collaborate.intro || `Collaborate with ${name}.`}
        />
      </Head>
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && "cursor-none"
        }`}
      >
        <Header isBlog />
        <div className="mt-10 w-full flex flex-col items-center">
          <div
            className={`w-full ${
              mount && theme.theme === "dark" ? "bg-slate-800" : "bg-gray-50"
            } max-w-4xl p-5 tablet:p-10 desktop:p-20 rounded-lg shadow-sm`}
          >
            <h1 className="text-3xl font-bold">Collaborate.</h1>
            {collaborate.title && (
              <h2 className="text-xl mt-5">{collaborate.title}</h2>
            )}
            {collaborate.intro && (
              <p className="w-full laptop:w-4/5 text-xl mt-5 opacity-50">
                {collaborate.intro}
              </p>
            )}

            {sections.map((section, index) => (
              <section key={index} className="mt-10">
                <h2 className="text-2xl font-bold">{section.heading}</h2>
                {toParagraphs(section.body).map((paragraph, pIndex) => (
                  <p key={pIndex} className="mt-2 text-lg opacity-75">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <div className="mt-10">
              <Socials />
            </div>
          </div>
        </div>
        <Footer showContact={false} />
      </div>
    </>
  );
};

export default Collaborate;
