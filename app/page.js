/** @format */
"use client";
import HpNav from "@/components/HpNav";
import { useRef, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useAppContext } from "@/context/AppProvider";
import Link from "next/link";

export default function Home() {
  const { session , isLoadingSession } = useAppContext();
  let Home = useRef();
  let About = useRef();
  let Projects = useRef();
  let Contact = useRef();
  let notificationBar = useRef();
  let skills = useRef({});
  const [Notification, setNotification] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await fetch("./api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let status = await res.json();

      if (status.status == 200) {
        notify("Message Sent Successfully");
      } else {
        notify("An error occured!!");
      }
    } catch {
      notify("its a server error, sorry!!");
    }

    reset();
  };

  let notify = (message) => {
    setNotification(message);
    notificationBar.current.classList.add("showNotification");
    setTimeout(() => {
      notificationBar.current.classList.remove("showNotification");
    }, 5000);
  };

  const [scrollProgress, setScrollProgress] = useState(0);
  const updateScrollProgress = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const totalHeight = scrollHeight - clientHeight;
    const progress = (scrollTop / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    // Animate statistics
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".skill").forEach((el) => observer.observe(el));
    document
      .querySelectorAll(".stat-number")
      .forEach((el) => observer.observe(el));
    document
      .querySelectorAll(".timeline-item")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div
        ref={notificationBar}
        className="fixed min-[640px]:top-28 -right-96 max-[640px]:bottom-12 transition-all max-w-xs w-full bg-white border border-blue-400 shadow-lg rounded-xl flex items-center p-4 gap-4 z-50"
      >
        {/* Icon */}
        <div className="text-blue-500 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
            />
          </svg>
        </div>

        {/* Message */}
        <div className="flex-1 text-sm text-gray-800">{Notification}</div>

        {/* Close Button */}
        <button
          onClick={() => {
            notificationBar.current.classList.remove("showNotification");
          }}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <HpNav Home={Home} About={About} Projects={Projects} Contact={Contact} />
      <div
        ref={Home}
        id="Home"
        className="Home w-full flex justify-center items-center mt-36 flex-col overflow-hidden"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="relative">
            <div className="-z-10 skill opacity-0 translate-y-4 transition-all duration-700 delay-500 max-[1140px]:hidden absolute w-96 h-72 rounded-tl-full  rounded-br-full glass-leaf-r "></div>
            <div className="-z-10 skill opacity-0 translate-y-4 transition-all duration-700 delay-500 max-[1140px]:hidden absolute w-96 h-72 rounded-tr-full rounded-bl-full glass-leaf-l right-0"></div>
          </div>
          <h1 className="text-7xl skill opacity-0 translate-y-4 transition-all duration-700 max-[640px]:text-5xl max-[640px]:mt-8 max-[390px]:text-[44px] comic-relief-bold">
            I&apos;m <span className="text-[#FD853A]">Amrit</span>,
          </h1>
          <h1 className="text-7xl skill opacity-0 translate-y-4 transition-all duration-700 delay-300 max-[640px]:text-5xl max-[390px]:text-[44px] max-[640px]:mb-8 comic-relief-bold">
            <span className="text-blue-400">Web</span> Developer
          </h1>
        </div>
        <div className="min-[880px]:hidden mt-16 flex flex-col">
          <div className="flex flex-row">
            <svg
              width="14"
              height="28"
              viewBox="0 0 14 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.135 13.445H2.1C2.22 6.44 3.6 5.285 7.905 2.735C8.4 2.435 8.565 1.805 8.265 1.295C7.98 0.800003 7.335 0.635003 6.84 0.935003C1.77 3.935 0 5.765 0 14.48V22.565C0 25.13 2.085 27.2 4.635 27.2H9.135C11.775 27.2 13.77 25.205 13.77 22.565V18.065C13.77 15.44 11.775 13.445 9.135 13.445Z"
                fill="#344054"
              />
            </svg>
            <svg
              width="14"
              height="28"
              viewBox="0 0 14 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.135 13.445H2.1C2.22 6.44 3.6 5.285 7.905 2.735C8.4 2.435 8.565 1.805 8.265 1.295C7.98 0.800003 7.335 0.635003 6.84 0.935003C1.77 3.935 0 5.765 0 14.48V22.565C0 25.13 2.085 27.2 4.635 27.2H9.135C11.775 27.2 13.77 25.205 13.77 22.565V18.065C13.77 15.44 11.775 13.445 9.135 13.445Z"
                fill="#344054"
              />
            </svg>
          </div>
          <h2 className=" text-md w-80 mt-2 mb-4 comic-relief-regular font-medium">
            Web developer crafting fast, responsive, and scalable digital
            experiences with modern tech.
          </h2>
        </div>
        <div className="flex flex-row w-full justify-around max-[880px]:mt-0 mt-16">
          <div className="max-[880px]:hidden flex flex-col">
            <div className="flex flex-row">
              <svg
                width="14"
                height="28"
                viewBox="0 0 14 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.135 13.445H2.1C2.22 6.44 3.6 5.285 7.905 2.735C8.4 2.435 8.565 1.805 8.265 1.295C7.98 0.800003 7.335 0.635003 6.84 0.935003C1.77 3.935 0 5.765 0 14.48V22.565C0 25.13 2.085 27.2 4.635 27.2H9.135C11.775 27.2 13.77 25.205 13.77 22.565V18.065C13.77 15.44 11.775 13.445 9.135 13.445Z"
                  fill="#344054"
                />
              </svg>
              <svg
                width="14"
                height="28"
                viewBox="0 0 14 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.135 13.445H2.1C2.22 6.44 3.6 5.285 7.905 2.735C8.4 2.435 8.565 1.805 8.265 1.295C7.98 0.800003 7.335 0.635003 6.84 0.935003C1.77 3.935 0 5.765 0 14.48V22.565C0 25.13 2.085 27.2 4.635 27.2H9.135C11.775 27.2 13.77 25.205 13.77 22.565V18.065C13.77 15.44 11.775 13.445 9.135 13.445Z"
                  fill="#344054"
                />
              </svg>
            </div>
            <h2 className=" text-md w-80 mt-2 comic-relief-regular font-medium">
              Web developer crafting fast, responsive, and scalable digital
              experiences with modern tech.
            </h2>
          </div>
          <div className="h-80 max-[880px]:h-52 w-auto comic-relief-bold flex justify-center items-center text-gray-400">
            <div className="border-1 min-[640px]:mr-20 border-[#D0D5DD] rounded-full">
              <button
                onClick={() => {
                  About.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-32 h-12 m-1 border-1 border-white hover:bg-purple-400 transition-all duration-300 bg-blue-600 rounded-full text-white"
              >
                Learn more
              </button>{" "}
              <button
                onClick={() => {
                  Contact.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="comic-relief-regular pr-5 hover:scale-105 transition-all hover:text-amber-400"
              >
                Hire me
              </button>
            </div>
          </div>
          <div className="text-md-14 mt-2 comic-relief-regular font-medium flex flex-col max-[880px]:justify-center max-[880px]:mb-3 items-center gap-2">
            <h2 className="max-[640px]:hidden">
              {" "}
              Check out my blogging webpage
            </h2>
            <Link
              href={"https://blogspace-amrs.vercel.app/"}
              className="comic-relief-bold hover:scale-110 transition-all bg-[#FD853A] duration-300 h-12 text-white rounded-full flex flex-row justify-center items-center"
            >
              <h3 className="px-2">/Blogs</h3>
              <div className="aspect-square h-9 rounded-full mr-2 flex justify-center items-center bg-[#d06625]">
                <svg
                  fill="#fff"
                  height="15px"
                  width="15px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 330 330"
                  xmlSpace="preserve"
                >
                  <path
                    id="XMLID_222_"
                    d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	C255,161.018,253.42,157.202,250.606,154.389z"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div
          ref={About}
          id="About"
          className="About w-full px-15 max-[640px]:px-2 max-[640px]:pt-10 max-[640px]:pb-10 pt-20 pb-32 rounded-4xl max-[640px]:rounded-2xl border-white/10 border min-[640px]:w-[90%] skillBg"
        >
          <h1 className="text-4xl max-[640px]:text-3xl text-white font-semibold pb-10 max-[640px]:pb-10 max-[640px]:px-8">
            My <span className="text-[#FD853A]">Skills</span>
          </h1>
          <div className="cont mx-auto flex justify-center flex-wrap gap-10 max-[640px]:gap-4  roboto-mono-regular">
            <div
              onMouseEnter={() => {
                skills.current["javascript"].style.opacity = "1";
                skills.current["javascript"].style.bottom = "0px";
              }}
              onMouseLeave={() => {
                skills.current["javascript"].style.opacity = "0";
                skills.current["javascript"].style.bottom = "-56px";
              }}
              className=" w-60 h-24 skill opacity-0 translate-y-4 transition-all duration-700 relative max-[640px]:w-28 max-[640px]:mb-4 max-[640px]:h-auto hover:z-20 hover:scale-105 rounded-xl border-1 border-[#686868] backdrop-blur-sm flex flex-col"
            >
              <div className="w-full flex justify-around items-center cursor-pointer max-[640px]:flex-col flex-row py-3 text-white font-semibold">
                <div className="h-full flex justify-center items-center">
                  <div className="relative w-18 h-18 max-[640px]:w-16 max-[640px]:h-6">
                    <Image
                      src="/hps1.png"
                      alt="Picture of the javascript"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="text-xl max-[640px]:text-sm mx-2">
                  JavaScript
                </span>
                <button
                  ref={(el) => {
                    skills.current["javascript"] = el;
                  }}
                  onClick={() => {
                    window.open(
                      "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                    );
                  }}
                  className="absolute text-sm text-white px-2 py-1 max-[640px]:text-[11px] flex flex-row gap-1 rounded-b-xl rounded-tl-[15px] bg-blue-500 -bottom-14 opacity-0 transition-all duration-300 right-0"
                >
                  <h3>View Docs</h3>
                  <svg
                    className="max-[640px]:w-4 w-[22px]"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              onMouseEnter={() => {
                skills.current["CSS"].style.opacity = "1";
                skills.current["CSS"].style.bottom = "0px";
              }}
              onMouseLeave={() => {
                skills.current["CSS"].style.opacity = "0";
                skills.current["CSS"].style.bottom = "-56px";
              }}
              className=" w-60 h-24 relative max-[640px]:w-28 max-[640px]:mb-4 max-[640px]:h-auto hover:z-20 hover:scale-105 rounded-xl border-1 skill opacity-0 translate-y-4 transition-all duration-700 border-[#686868] backdrop-blur-sm flex flex-col"
            >
              <div className="w-full flex justify-center gap-10 max-[640px]:gap-2 items-center max-[640px]:flex-col cursor-pointer flex-row py-3 text-white font-semibold">
                <div className="h-full flex justify-center items-center">
                  <div className="relative h-20 w-20 -mt-3 max-[640px]:w-7 max-[640px]:h-7 max-[640px]:-mt-[2px]">
                    <Image
                      src="/hps2.png"
                      alt="Picture of the css"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="text-xl max-[640px]:text-sm">CSS</span>
                <button
                  ref={(el) => {
                    skills.current["CSS"] = el;
                  }}
                  onClick={() => {
                    window.open(
                      "https://developer.mozilla.org/en-US/docs/Web/CSS"
                    );
                  }}
                  className="absolute text-sm text-white px-2 py-1 max-[640px]:text-[11px] flex flex-row gap-1 rounded-b-xl rounded-tl-[15px] bg-blue-500 -bottom-14 opacity-0 transition-all duration-300 right-0"
                >
                  <h3>View Docs</h3>
                  <svg
                    className="max-[640px]:w-4 w-[22px]"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              onMouseEnter={() => {
                skills.current["tailwind"].style.opacity = "1";
                skills.current["tailwind"].style.bottom = "0px";
              }}
              onMouseLeave={() => {
                skills.current["tailwind"].style.opacity = "0";
                skills.current["tailwind"].style.bottom = "-56px";
              }}
              className=" w-60 h-24 relative max-[640px]:w-28 max-[640px]:mb-4 max-[640px]:h-auto hover:z-20 hover:scale-105 rounded-xl border-1 skill opacity-0 translate-y-4 transition-all duration-700 border-[#686868] backdrop-blur-sm flex flex-col justify-center"
            >
              <div className="w-full flex justify-around items-center cursor-pointer flex-row max-[640px]:flex-col py-3 text-white font-semibold">
                <div className="h-full flex justify-center items-center">
                  <div className="relative h-16 w-16 -mt-3 max-[640px]:w-7 max-[640px]:h-7 max-[640px]:-mt-[2px]">
                    <Image
                      src="/hps3.png"
                      alt="Picture of the css"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="text-xl max-[640px]:text-sm">Tailwind</span>
                <button
                  ref={(el) => {
                    skills.current["tailwind"] = el;
                  }}
                  onClick={() => {
                    window.open(
                      "https://tailwindcss.com/docs/installation/using-vite"
                    );
                  }}
                  className="absolute text-sm text-white px-2 py-1 max-[640px]:text-[11px] flex flex-row gap-1 rounded-b-xl rounded-tl-[15px] bg-blue-500 -bottom-14 opacity-0 transition-all duration-300 right-0"
                >
                  <h3>View Docs</h3>
                  <svg
                    className="max-[640px]:w-4 w-[22px]"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              onMouseEnter={() => {
                skills.current["mongoDB"].style.opacity = "1";
                skills.current["mongoDB"].style.bottom = "0px";
              }}
              onMouseLeave={() => {
                skills.current["mongoDB"].style.opacity = "0";
                skills.current["mongoDB"].style.bottom = "-56px";
              }}
              className=" w-60 h-24 relative max-[640px]:w-28 max-[640px]:mb-4 max-[640px]:h-auto hover:z-20 hover:scale-105 rounded-xl border-1 skill opacity-0 translate-y-4 transition-all duration-700 border-[#686868] backdrop-blur-sm flex flex-col justify-center"
            >
              <div className="w-full flex justify-center items-center cursor-pointer flex-row py-3 text-white font-semibold">
                <div className="h-full flex justify-center items-center">
                  <div className="relative w-44 max-[640px]:w-24 h-12 ">
                    <Image
                      src="/hps7.png"
                      alt="Picture of the css"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <button
                  ref={(el) => {
                    skills.current["mongoDB"] = el;
                  }}
                  onClick={() => {
                    window.open("https://www.mongodb.com/docs/");
                  }}
                  className="absolute text-sm text-white px-2 py-1 max-[640px]:text-[11px] flex flex-row gap-1 rounded-b-xl rounded-tl-[15px] bg-blue-500 -bottom-14 opacity-0 transition-all duration-300 right-0"
                >
                  <h3>View Docs</h3>
                  <svg
                    className="max-[640px]:w-4 w-[22px]"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              onMouseEnter={() => {
                skills.current["express"].style.opacity = "1";
                skills.current["express"].style.bottom = "0px";
              }}
              onMouseLeave={() => {
                skills.current["express"].style.opacity = "0";
                skills.current["express"].style.bottom = "-56px";
              }}
              className=" w-60 h-24 relative max-[640px]:w-28 max-[640px]:mb-4 max-[640px]:h-auto hover:z-20 hover:scale-105 rounded-xl border-1 skill opacity-0 translate-y-4 transition-all duration-700 border-[#686868] backdrop-blur-sm flex flex-col justify-center"
            >
              <div className="w-full flex justify-around items-center cursor-pointer flex-row max-[640px]:flex-col py-3 text-white font-semibold">
                <div className="h-full flex justify-center items-center">
                  <div className="relative w-14 max-[640px]:w-7 max-[640px]:h-10 invert h-14 ">
                    <Image
                      src="/hps8.png"
                      alt="Picture of the css"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="text-xl max-[640px]:text-sm">Express.js</span>
                <button
                  ref={(el) => {
                    skills.current["express"] = el;
                  }}
                  onClick={() => {
                    window.open(
                      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs"
                    );
                  }}
                  className="absolute text-sm text-white px-2 py-1 max-[640px]:text-[11px] flex flex-row gap-1 rounded-b-xl rounded-tl-[15px] bg-blue-500 -bottom-14 opacity-0 transition-all duration-300 right-0"
                >
                  <h3>View Docs</h3>
                  <svg
                    className="max-[640px]:w-4 w-[22px]"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              onMouseEnter={() => {
                skills.current["react"].style.opacity = "1";
                skills.current["react"].style.bottom = "0px";
              }}
              onMouseLeave={() => {
                skills.current["react"].style.opacity = "0";
                skills.current["react"].style.bottom = "-56px";
              }}
              className=" w-60 h-24 relative max-[640px]:w-28 max-[640px]:mb-4 max-[640px]:h-auto hover:z-20 hover:scale-105 rounded-xl border-1 skill opacity-0 translate-y-4 transition-all duration-700 border-[#686868] backdrop-blur-sm flex flex-col justify-center"
            >
              <div className="w-full flex justify-center gap-8 max-[640px]:gap-2 items-center cursor-pointer flex-row max-[640px]:flex-col py-3 text-white font-semibold">
                <div className="h-full flex justify-center items-center">
                  <div className="relative h-14 max-[640px]:h-7 w-14 ">
                    <Image
                      src="/hps4.png"
                      alt="Picture of the css"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="text-xl max-[640px]:text-sm">React.js</span>
                <button
                  ref={(el) => {
                    skills.current["react"] = el;
                  }}
                  onClick={() => {
                    window.open(
                      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started"
                    );
                  }}
                  className="absolute text-sm text-white px-2 py-1 max-[640px]:text-[11px] flex flex-row gap-1 rounded-b-xl rounded-tl-[15px] bg-blue-500 -bottom-14 opacity-0 transition-all duration-300 right-0"
                >
                  <h3>View Docs</h3>
                  <svg
                    className="max-[640px]:w-4 w-[22px]"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              onMouseEnter={() => {
                skills.current["node"].style.opacity = "1";
                skills.current["node"].style.bottom = "0px";
              }}
              onMouseLeave={() => {
                skills.current["node"].style.opacity = "0";
                skills.current["node"].style.bottom = "-56px";
              }}
              className=" w-60 h-24 relative max-[640px]:w-28 max-[640px]:mb-4 max-[640px]:h-auto hover:z-20 hover:scale-105 rounded-xl border-1 skill opacity-0 translate-y-4 transition-all duration-700 border-[#686868] backdrop-blur-sm flex flex-col justify-center"
            >
              <div className="w-full flex justify-center items-center cursor-pointer flex-row text-white font-semibold">
                <div className="h-full flex justify-center items-center">
                  <div className="relative w-32 max-[640px]:w-20 max-[640px]:h-20 h-40 ">
                    <Image
                      src="/hps6.png"
                      alt="Picture of the css"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <button
                  ref={(el) => {
                    skills.current["node"] = el;
                  }}
                  onClick={() => {
                    window.open("https://nodejs.org/docs/latest/api/");
                  }}
                  className="absolute text-sm text-white px-2 py-1 max-[640px]:text-[11px] flex flex-row gap-1 rounded-b-xl rounded-tl-[15px] bg-blue-500 -bottom-14 opacity-0 transition-all duration-300 right-0"
                >
                  <h3>View Docs</h3>
                  <svg
                    className="max-[640px]:w-4 w-[22px]"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              onMouseEnter={() => {
                skills.current["next"].style.opacity = "1";
                skills.current["next"].style.bottom = "0px";
              }}
              onMouseLeave={() => {
                skills.current["next"].style.opacity = "0";
                skills.current["next"].style.bottom = "-56px";
              }}
              className=" w-60 h-24 relative max-[640px]:w-28 max-[640px]:mb-4 max-[640px]:h-auto hover:z-20 hover:scale-105 rounded-xl border-1 skill opacity-0 translate-y-4 transition-all duration-700 border-[#686868] backdrop-blur-sm flex flex-col justify-center"
            >
              <div className="w-full flex justify-center items-center cursor-pointer flex-row py-3 text-white font-semibold">
                <div className="h-full flex justify-center items-center">
                  <div className="w-[80%] max-[640px]:h-5 invert">
                    <Image
                      src="/hps5.png"
                      width={200}
                      height={200}
                      alt="Picture of the author"
                    />
                  </div>
                </div>
                <button
                  ref={(el) => {
                    skills.current["next"] = el;
                  }}
                  onClick={() => {
                    window.open("https://nextjs.org/docs");
                  }}
                  className="absolute text-sm text-white px-2 py-1 max-[640px]:text-[11px] flex flex-row gap-1 rounded-b-xl rounded-tl-[15px] bg-blue-500 -bottom-14 opacity-0 transition-all duration-300 right-0"
                >
                  <h3>View Docs</h3>
                  <svg
                    className="max-[640px]:w-4 w-[22px]"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="progressBar relative">
          <div
            style={{
              width: `${scrollProgress}%`,
            }}
            className={`h-1 bg-cyan-600 fixed z-20 top-0`}
          ></div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-8 mt-8">
        {/* About Me */}
        <section className="glass-card p-8">
          <h2 className="text-3xl font-bold mb-6 gradient-text">About Me</h2>
          <p className="text-lg leading-relaxed mb-8">
            I&apos;m a passionate Computer Application student with a keen
            interest in web development. Currently pursuing my degree while
            building real-world projects. I enjoy building responsive,
            user-friendly websites and web apps that solve real-world problems.
            Over the past few months, I&apos;ve completed several personal
            projects, including a messaging app and a social-freelance hybrid
            platform.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 text-center stat-number opacity-0 translate-y-4 transition-all duration-700">
              <h3 className="text-4xl font-bold text-purple-400">1+</h3>
              <p className="text-purple-200">Years Coding</p>
            </div>
            <div className="glass-card p-6 text-center stat-number opacity-0 translate-y-4 transition-all duration-700 delay-200">
              <h3 className="text-4xl font-bold text-purple-400">5+</h3>
              <p className="text-purple-200">Projects Built</p>
            </div>
          </div>

          {/* Timeline */}
          <div id="Projects" ref={Projects} className="space-y-6">
            <div className="timeline-item opacity-0 translate-y-4 transition-all duration-700 delay-200">
              <div className="glass-card p-6 hover-lift">
                <h3 className="text-xl font-bold mb-2">Personal Web Project</h3>
                <p className="text-purple-200 mb-2">
                  Independent Work • Winter 2025
                </p>
                <p className="text-gray-300">
                  Built a full-stack web app using React, Node.js, and MongoDB
                  to connect freelancers with clients in a social-style
                  interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Learning */}
        <section className="glass-card p-8">
          <h2 className="text-3xl font-bold mb-6 gradient-text">
            Current Learning Focus
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["js libraries", "TypeScript", "DSA", "WebRTC"].map((tech) => (
              <div key={tech} className="glass-card p-4 text-center hover-lift">
                <p className="font-medium">{tech}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="glass-card p-8">
          <h2 className="text-3xl font-bold mb-6 gradient-text">
            Personal Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 hover-lift">
              <h3 className="text-xl font-bold mb-2">Messaging App</h3>
              <p className="text-gray-300 mb-4">
                A full-stack application to gain experience with web Sockets.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "MongoDB"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-purple-500/20 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 hover-lift">
              <h3 className="text-xl font-bold mb-2">Task Management App</h3>
              <p className="text-gray-300 mb-4">
                A collaborative project management tool.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "Firebase", "Tailwind"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-purple-500/20 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={Contact} id="Contact" className="py-8 mx-5">
          <h2 className="text-3xl font-bold mb-6">
            Get <span className="text-orange-400">in Touch</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: true })}
                  className="w-full px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register("email")}
                  className="w-full px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="form-group">
                <textarea
                  {...register("message", { required: true })}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-lg focus:outline-none focus:border-blue-500 transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 flex justify-center bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transform hover:scale-105 transition-all duration-300"
              >
                {isSubmitting && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {!isSubmitting && "Send Message"}
              </button>
            </form>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-leaf-r p-6 hover-lift">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-blue-200">
                      Amritpalonly13571@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span className="text-blue-200">75892 09234</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-blue-200">Amritsar, Punjab</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-leaf-r p-6">
                <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "GitHub",
                      icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z",
                    },
                    {
                      name: "LinkedIn",
                      icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
                    },
                    {
                      name: "Twitter",
                      icon: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/30 transform hover:scale-110 transition-all duration-300"
                      title={social.name}
                    >
                      <svg
                        className="w-5 h-5 text-blue-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-16 border-t border-purple-500/20 bg-black">
        <div className="w-[90vw] mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold gradient-text">Quick Links</h3>
              <ul className="space-y-2">
                {["About", "Projects", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link}`}
                      className="text-purple-200 hover:text-purple-400 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold gradient-text">Stay Updated</h3>
              <p className="text-purple-200">
                Visit my /Blogs to know whats going on.
              </p>
              <Link
              href={"https://blogspace-amrs.vercel.app/"}
                className="comic-relief-bold bg-purple-900 hover:scale-105 transition-all h-12 text-white rounded-full flex flex-row justify-center items-center"
              >
                <h3 className="px-2">/Blogs</h3>
                <div className="aspect-square h-9 rounded-full mr-2 flex justify-center items-center bg-purple-400">
                  <svg
                    fill="#fff"
                    height="15px"
                    width="15px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xmlSpace="preserve"
                  >
                    <path
                      id="XMLID_222_"
                      d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	C255,161.018,253.42,157.202,250.606,154.389z"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold gradient-text">Connect</h3>
              <div className="flex space-x-4">
                {[
                  {
                    name: "GitHub",
                    icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z",
                  },
                  {
                    name: "LinkedIn",
                    icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
                  },
                  {
                    name: "Twitter",
                    icon: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transform hover:scale-110 transition-all duration-300"
                    title={social.name}
                  >
                    <svg
                      className="w-5 h-5 text-purple-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
                {(!isLoadingSession && session ) && <button onClick={() => {
                  redirect("/contacts")
                }}>Open Admin&apos;s Portal</button>}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-purple-500/20 text-center">
            <p className="text-purple-200">
              © {new Date().getFullYear()} Amritpal Singh. All rights reserved.
            </p>
            <p className="text-sm text-purple-300/70 mt-2">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
