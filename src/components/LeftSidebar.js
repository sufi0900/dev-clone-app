import React, { useState } from "react";
import {
  FcHome,
  FcReading,
  FcTodoList,
  FcVideoCall,
  FcAbout,
  FcIdea,
  FcShop,
  FcLike,
  FcBriefcase,
  FcDisclaimer,
  FcBusinessContact,
} from "react-icons/fc";
import { AiFillAudio } from "react-icons/ai";
import { FaTags, FaDev } from "react-icons/fa";
import { IoLogoTwitter, IoLogoFacebook, IoLogoGithub } from "react-icons/io";
import { RiInstagramFill, RiTwitchLine } from "react-icons/ri";
import { CgShapeHexagon } from "react-icons/cg";
import { GrFormClose } from "react-icons/gr";
import { Link } from "react-router-dom";

const tags = [
  "react",
  "graphql",
  "nodejs",
  "sass",
  "javascript",
  "html",
  "css",
  "webdev",
  "opensource",
  "beginners",
  "python",
  "git",
  "vscode",
  "npm",
  "sql",
  "ubuntu",
  "aws",
];

const LeftSidebar = (props) => {
  const [more, setmore] = useState(false);
  const toggle = () => {
    setmore(!more);
  };
  return (
    <>
      <aside className="leftBar">
        <nav className="leftBar__menu">
          <ul>
            <li>
              <Link href="/home">
                <i style={{ color: "blue" }}>
                  <FcHome />
                </i>
                Home
              </Link>
            </li>
            <li>
              <Link href="/reading">
                <i style={{ color: "blue" }}>
                  <FcReading />
                </i>
                Reading List
              </Link>
            </li>
            <li>
              <Link href="/list">
                <i style={{ color: "blue" }}>
                  <FcTodoList />
                </i>
                list
              </Link>
            </li>
            <li>
              <Link href="/podcast">
                <i style={{ color: "blue" }}>
                  <AiFillAudio />
                </i>
                Podcasts
              </Link>
            </li>
            <li>
              <Link href="/videos">
                <i style={{ color: "blue" }}>
                  <FcVideoCall />
                </i>
                Videos
              </Link>
            </li>

            <li>
              <Link href="/tags">
                <i style={{ color: "blue" }}>
                  <FaTags />
                </i>
                Tags
              </Link>
            </li>

            <li className={more ? "more hidden" : "more"}>
              <i style={{ color: "blue" }}></i>
              <Link href="/#" onClick={toggle}>
                More...
              </Link>
            </li>

            <div className={more ? "list" : "list hidden"}>
              <li>
                <Link href="/code">
                  <i style={{ color: "blue" }}>
                    <FcAbout />
                  </i>
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="/FAQ">
                  <i style={{ color: "blue" }}>
                    <FcIdea />
                  </i>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/DEV">
                  <i style={{ color: "blue" }}>
                    <FcShop />
                  </i>
                  DEV Shop
                </Link>
              </li>
              <li>
                <Link href="/sponsers">
                  <i style={{ color: "blue" }}>
                    <FcLike />
                  </i>
                  Sponsers
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <i style={{ color: "blue" }}>
                    <FaDev />
                  </i>
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <i style={{ color: "blue" }}>
                    <FcBriefcase />
                  </i>
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms">
                  <i style={{ color: "blue" }}>
                    <FcDisclaimer />
                  </i>
                  Terms of use
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <i style={{ color: "blue" }}>
                    <FcBusinessContact />
                  </i>
                  Contact
                </Link>
              </li>
            </div>
          </ul>
        </nav>

        <div className={more ? "leftBar__social" : "leftBar__social hidden"}>
          <Link href="/twitter">
            <i style={{ color: "blue" }}>
              <IoLogoTwitter />
            </i>
          </Link>
          <Link href="/facebook">
            <i style={{ color: "blue" }}>
              <IoLogoFacebook />
            </i>
          </Link>
          <Link href="/github">
            <i style={{ color: "blue" }}>
              <IoLogoGithub />
            </i>
          </Link>
          <Link href="/instagram">
            <i style={{ color: "blue" }}>
              <RiInstagramFill />
            </i>
          </Link>
          <Link href="/twitch">
            <i style={{ color: "blue" }}>
              <RiTwitchLine />
            </i>
          </Link>
        </div>
        <nav className="leftBar__taglist">
          <header>
            <h3>My Tags</h3>
            <i style={{ color: "blue" }}>
              <CgShapeHexagon />
            </i>
          </header>
          <ul>
            {tags.map((tag, id) => {
              return (
                <li key={id}>
                  <Link href="/#">#{tag}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {props.burgerMenu && (
        <div className="hamburger">
          <div className="hamburger__content">
            <header>
              <h2>DEV Community</h2>
              <button onClick={() => props.closeMenu()}>
                <GrFormClose />
              </button>
            </header>

            <div className="hamburger__content__items">
              <nav className="leftBar__menu">
                <ul>
                  <li>
                    <Link href="/home">
                      <i style={{ color: "blue" }}>
                        <FcHome />
                      </i>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/reading">
                      <i style={{ color: "blue" }}>
                        <FcReading />
                      </i>
                      Reading List
                    </Link>
                  </li>
                  <li>
                    <Link href="/list">
                      <i style={{ color: "blue" }}>
                        <FcTodoList />
                      </i>
                      list
                    </Link>
                  </li>
                  <li>
                    <Link href="/podcast">
                      <i style={{ color: "blue" }}>
                        <AiFillAudio />
                      </i>
                      Podcasts
                    </Link>
                  </li>
                  <li>
                    <Link href="/videos">
                      <i style={{ color: "blue" }}>
                        <FcVideoCall />
                      </i>
                      Videos
                    </Link>
                  </li>

                  <li>
                    <Link href="/tags">
                      <i style={{ color: "blue" }}>
                        <FaTags />
                      </i>
                      Tags
                    </Link>
                  </li>

                  <li className={more ? "more hidden" : "more"}>
                    <i style={{ color: "blue" }}></i>
                    <Link href="/#" onClick={toggle}>
                      More...
                    </Link>
                  </li>

                  <div className={more ? "list" : "list hidden"}>
                    <li>
                      <Link href="/code">
                        <i style={{ color: "blue" }}>
                          <FcAbout />
                        </i>
                        Code of Conduct
                      </Link>
                    </li>
                    <li>
                      <Link href="/FAQ">
                        <i style={{ color: "blue" }}>
                          <FcIdea />
                        </i>
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/DEV">
                        <i style={{ color: "blue" }}>
                          <FcShop />
                        </i>
                        DEV Shop
                      </Link>
                    </li>
                    <li>
                      <Link href="/sponsers">
                        <i style={{ color: "blue" }}>
                          <FcLike />
                        </i>
                        Sponsers
                      </Link>
                    </li>
                    <li>
                      <Link href="/about">
                        <i style={{ color: "blue" }}>
                          <FaDev />
                        </i>
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy">
                        <i style={{ color: "blue" }}>
                          <FcBriefcase />
                        </i>
                        Privacy Policy
                      </Link>
                    </li>

                    <li>
                      <Link href="/terms">
                        <i style={{ color: "blue" }}>
                          <FcDisclaimer />
                        </i>
                        Terms of use
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <i style={{ color: "blue" }}>
                          <FcBusinessContact />
                        </i>
                        Contact
                      </Link>
                    </li>
                  </div>
                </ul>
              </nav>
              <div
                className={more ? "leftBar__social" : "leftBar__social hidden"}
              >
                <Link href="/twitter">
                  <i style={{ color: "blue" }}>
                    <IoLogoTwitter />
                  </i>
                </Link>
                <Link href="/facebook">
                  <i style={{ color: "blue" }}>
                    <IoLogoFacebook />
                  </i>
                </Link>
                <Link href="/github">
                  <i style={{ color: "blue" }}>
                    <IoLogoGithub />
                  </i>
                </Link>
                <Link href="/instagram">
                  <i style={{ color: "blue" }}>
                    <RiInstagramFill />
                  </i>
                </Link>
                <Link href="/twitch">
                  <i style={{ color: "blue" }}>
                    <RiTwitchLine />
                  </i>
                </Link>
              </div>
            </div>
          </div>

          <div className="hamburger overlay"></div>
        </div>
      )}
    </>
  );
};

export default LeftSidebar;
