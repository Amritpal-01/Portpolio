/** @format */

"use client";
import React, { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";

const HpNav = ({ About, Home, Projects, Contact }) => {
  let menu = useRef();
  const [menuToggle, setMenuToggle] = useState(false);
  const menuAbout = useRef();
  const menuHome = useRef();
  const menuProjects = useRef();
  const menuContact = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const menu = {
          Home: menuHome,
          About: menuAbout,
          Projects: menuProjects,
          Contact: menuContact,
        };
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleClick(menu[entry.target.id].current);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const currentElements = [
      Home.current,
      About.current,
      Projects.current,
      Contact.current,
    ];

    currentElements.forEach((element) => {
      if (element) {
        observer.observe(element); // ✅ use element, not element.target
      }
    });

    return () => {
      currentElements.forEach((element) => {
        if (element) {
          observer.unobserve(element); // ✅ again, element directly
        }
      });
      observer.disconnect();
    };
  }, [Home,About,Contact,Projects]);

  let handleClick = (e) => {
    let Items = menu.current.querySelectorAll("li");
    Items.forEach((item) => {
      if (item == e) {
        item.classList.add("a");
      } else {
        item.classList.remove("a");
      }
    });
  };

  return (
    <div
      className={`fixed min-[1140]:top-1 transition-all ${
        menuToggle ? "top-0" : "-top-[370px]"
      } w-screen flex justify-center roboto-mono-regular z-10`}
    >
      <div
        ref={menu}
        className={`cont min-[1140px]:w-[80%] w-[100%] bg-[#171717] max-[1140px]:pb-4 min-h-12  min-[1140px]:rounded-b-[150px] rounded-b-2xl min-[1140]:rounded-t-2xl pb-1 pt-0.5 justify-between items-center flex flex-row max-[1140px]:flex-col relative`}
      >
        <ul
          className={`menu1 flex flex-row text-white gap-5 px-2 py-1 max-[1140px]:flex-col`}
        >
          <li
            ref={menuHome}
            onClick={(e) => {
              handleClick(e.target);
              setMenuToggle(!menuToggle);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="menuItem a w-28 h-12 flex justify-center items-center cursor-pointer max-[1140px]:rounded-lg rounded-bl-[140px] rounded-tl-lg rounded-tr-3xl rounded-br-3xl"
          >
            Home
          </li>
          <li
            ref={menuAbout}
            onClick={(e) => {
              handleClick(e.target);
              setMenuToggle(!menuToggle);
              About.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="menuItem w-28 h-12 flex justify-center items-center cursor-pointer rounded-lg"
          >
            About
          </li>
          <li
            ref={menuProjects}
            onClick={(e) => {
              handleClick(e.target);
              setMenuToggle(!menuToggle);
              Projects.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="menuItem w-28 h-12 flex justify-center items-center cursor-pointer rounded-lg"
          >
            Projects
          </li>
        </ul>
        <h1 className="text-white text-2xl font-bold max-[1140px]:hidden">
          Portfolio
        </h1>
        <ul
          className={`menu1 flex flex-row text-white gap-5 px-2 py-1 max-[1140px]:flex-col`}
        >
          <li
            onClick={(e) => {
              window.open("/resume.pdf", "_blank");
            }}
            className="menuItem w-28 h-12 flex justify-center items-center cursor-pointer rounded-lg"
          >
            Resume
          </li>
          <li
            onClick={() => {
              redirect("/blogs");
            }}
            className="menuItem w-28 h-12 flex justify-center items-center cursor-pointer rounded-lg"
          >
            Blogs
          </li>
          <li
            ref={menuContact}
            onClick={(e) => {
              handleClick(e.target);
              setMenuToggle(!menuToggle);
              Contact.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="menuItem w-28 h-12 flex justify-center items-center cursor-pointer max-[1140px]:rounded-lg rounded-br-[140px] rounded-tr-lg rounded-tl-3xl rounded-bl-3xl"
          >
            Contact
          </li>
        </ul>
        <button
          className="text-white p-4 rounded-full bg-amber-400 min-[1140]:hidden absolute -bottom-16"
          onClick={(e) => {
            setMenuToggle(!menuToggle);
          }}
        >
          {!menuToggle && (
            <svg
              fill="#000"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xmlSpace="preserve"
            >
              <path
                id="XMLID_225_"
                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
              />
            </svg>
          )}
          {menuToggle && (
            <svg
              fill="#000000"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512.01 512.01"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path
                    d="M505.755,358.256L271.088,123.589c-8.341-8.341-21.824-8.341-30.165,0L6.256,358.256c-8.341,8.341-8.341,21.824,0,30.165
			s21.824,8.341,30.165,0l219.584-219.584l219.584,219.584c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251
			C514.096,380.08,514.096,366.597,505.755,358.256z"
                  />
                </g>
              </g>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default HpNav;
