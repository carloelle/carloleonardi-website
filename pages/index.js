import { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import PaperItem from "../components/PaperItem";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";

// Local Data
import data from "../data/portfolio.json";

// Render **keywords** as blue text and [text](url) as blue links
const renderHighlighted = (text = "") =>
  text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <span key={i} className="text-blue-500 dark:text-blue-400">
          {part.slice(2, -2)}
        </span>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 dark:text-blue-400 underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const photoRef = useRef();

  // Photo: fade in on load, fade out while scrolling down
  const [photoVisible, setPhotoVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPhotoVisible(true), 300);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return () => clearTimeout(timer);

    let ticking = false;
    const update = () => {
      const el = photoRef.current;
      if (el) {
        const y = window.scrollY;
        const fade = Math.max(0, 1 - y / 450);
        el.style.opacity = fade;
        el.style.transform = `translateY(${-y * 0.2}px) scale(${
          0.9 + 0.1 * fade
        })`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div
      className={`relative ${data.showCursor && "cursor-none"}`}
      style={{ overflowX: "clip" }}
    >
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
        <meta
          name="description"
          content="Carlo Leonardi – computational biologist working on machine learning, spatial omics and tumour immunology at the Wellcome Sanger Institute."
        />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-20 mt-10 flex flex-col laptop:flex-row laptop:items-center gap-6 laptop:gap-10">
          <div className="w-full laptop:w-3/5">
            <div className="mt-5">
              <h1
                ref={textOne}
                className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full"
              >
                {data.headerTaglineOne}
              </h1>
              <h1
                ref={textTwo}
                className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-1 tablet:p-2 text-bold w-full"
              >
                {data.headerTaglineTwo}
              </h1>
              <h1
                ref={textThree}
                className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-1 tablet:p-2 text-bold w-full"
              >
                {data.headerTaglineThree}
              </h1>
              <h1
                ref={textFour}
                className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-1 tablet:p-2 text-bold w-full"
              >
                {data.headerTaglineFour}
              </h1>
            </div>

            <Socials className="mt-2 laptop:mt-5" />
          </div>

          <div className="order-first laptop:order-last w-full laptop:w-2/5 flex justify-center laptop:justify-end">
            <div
              className={`transition-all duration-1000 ease-out ${
                photoVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <img
                ref={photoRef}
                src="/images/carlo-photo.png"
                alt="Carlo Leonardi"
                className="w-48 tablet:w-64 laptop:w-full max-w-md h-auto"
                style={{ willChange: "transform, opacity" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {renderHighlighted(data.aboutpara)}
          </p>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Interests.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Ambitions.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {renderHighlighted(data.ambitions)}
          </p>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Papers.</h1>

          <ul className="mt-5 laptop:mt-10 flex flex-col gap-2 laptop:w-4/5">
            {data.projects.map((project) => (
              <li key={project.id}>
                <PaperItem
                  title={project.title}
                  description={project.description}
                  url={project.url}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
