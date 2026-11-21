import React from "react";
import { useRouter } from "next/router";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";
import data from "../../data/portfolio.json";

const Footer = ({ showContact = true }) => {
  const router = useRouter();

  return (
    <>
      {showContact && (
        <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
          <div>
            <h1 className="text-2xl text-bold">Contact.</h1>
            <div className="mt-10">
              <Link
                href="/collaborate"
                className={`inline-block link ${
                  data.showCursor && "cursor-none"
                }`}
              >
                <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
                  LET&apos;S WORK
                </h1>
                <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
                  TOGETHER
                </h1>
              </Link>
              <div>
                <Button
                  type="primary"
                  onClick={() => router.push("/collaborate")}
                >
                  How to collaborate
                </Button>
              </div>
              <div className="mt-10">
                <Socials />
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-sm text-bold mt-2 laptop:mt-10 p-2 laptop:p-0">
        Made with ❤ by Carlo Leonardi
      </h1>
    </>
  );
};

export default Footer;
