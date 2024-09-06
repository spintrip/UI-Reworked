import React, { useEffect } from "react";
import Breadcrumbs from "../../common/Breadcrumbs";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TeamMember } from "../../../core/data/interface/interface";

const OurTeam = () => {
  const data = useSelector((state: TeamMember) => state.ourteamdata);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);
  return (
    <div className="main-wrapper">
      <Breadcrumbs
        maintitle="Meet our Team"
        title="Meet our Team"
        subtitle="Pages"
      />
      <section className="our-team-section">
        <div className="container">
          <div className="row">
            {data.map(
              (
                member: {
                  image: string;
                  name:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  designation:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                },
                index: React.Key | null | undefined,
              ) => (
                <div
                  className="col-lg-4 col-md-6 col-12"
                  data-aos="fade-down"
                  data-aos-duration={1200}
                  data-aos-delay={100}
                  key={index}
                >
                  <div className="our-team" key={index}>
                    <div className="profile-pic">
                      <ImageWithBasePath src={member.image} alt="Our Team" />
                    </div>
                    <div className="team-prof">
                      <h3 className="team-post-title">{member.name}</h3>
                      <span className="team-designation">
                        {member.designation}
                      </span>
                      <div className="footer-social-links m-0">
                        <ul className="nav">
                          <li>
                            <Link to="#">
                              <i className="fa-brands fa-facebook-f fa-facebook fi-icon" />
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="fab fa-twitter fi-icon" />
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="fab fa-linkedin fi-icon" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
