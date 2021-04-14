import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { signIn, signout, useSession } from "next-auth/client";

const Profile = styled.div`
  font-family: "Source Sans Pro";
  margin-top: 10vw;
  display: flex;
  justify-content: space-evenly;
  .faculty-img-row {
    margin-top: 5vh;
    justify-content: center;
    text-align: center;
    .facmail {
      position: absolute;
      margin-top: -70px;
      margin-left: 60px;
    }
    h3 {
      color: #4e4e4e;
    }
    font-family: "Source Sans Pro";
    .faculty-img-wrap {
      overflow: hidden;
      width: 250px;
      height: 250px;
      min-width: 250px;
      border-radius: 50%;

      img {
        width: 100%;
        height: auto;
        align-self: center;
      }
    }
  }
  .faculty-details-row {
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    #dir {
      line-height: 1.5;
      letter-spacing: 1px;
      padding-right: 3vw;
      padding-top: 50px;
    }
    .fac-card {
      width: 90%;
      margin-top: 3vh;
      margin-bottom: 3vh;
      background: #ffffff;
      box-shadow: 0px 0px 18px rgba(156, 156, 156, 0.38);
      border-radius: 5px;
      padding-left: 5%;
      padding-bottom: 15px;
      font-family: "Source Sans Pro";
      list-style: disc;
      h3 {
        color: #2f2f2f;
      }
      .factable {
        overflow: hidden;
        max-width: 90%;
        overflow-x: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .factable:-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
      table {
        min-width: 90%;
        width: 90%;
      }
    }
  }
`;

export default function Profilepage(props) {
  const [detail, useDetail] = useState(JSON.parse(props.details));
  console.log(props.details);
  const [session, loading] = useSession();

  return (
    <>
      {session && (
        <Profile>
          <div className="faculty-img-row">
            <div className="faculty-img-wrap">
              {/* <img
                src={`${process.env.GATSBY_API_URL}/profile/image?id=${detail.profile.id}`}
                className="facultypic"
              /> */}
            </div>
            <a href={`mailto:${detail.profile.email}`} target="blank">
              {/* <img src={mail} className="img-fluid facmail" /> */}
            </a>
            <h2>{detail.profile.name}</h2>
            <h3>{detail.profile.designation}</h3>
          </div>

          <div className="faculty-details-row">
            <h1>Profile</h1>
            <div className="fac-card" data-aos="fade-up">
              <h3>Research Interest:-</h3>
              <p>{detail.profile.research_interest}</p>
              <h3>Email:-</h3>
              <p>{detail.profile.email}</p>
              <h3>Phone:-</h3>
              <p>{detail.profile.ext_no}</p>
            </div>

            {detail.subjects_teaching && (
              <div className="fac-card" data-aos="fade-up">
                <h3>Subjects</h3>
                {detail.subjects.map((item) => {
                  return <li>{item}</li>;
                })}
              </div>
            )}
            {detail.memberships && (
              <div className="fac-card" data-aos="fade-up">
                <h3>Memberships & Society</h3>
                <div className="factable">
                  <table>
                    <tr>
                      <td>
                        <h4>Membership</h4>
                      </td>
                      <td>
                        <h4>Membership Society</h4>
                      </td>
                    </tr>
                    {detail.memberships.map((item) => {
                      return (
                        <tr>
                          <td>
                            <li>{item.membership_id}</li>
                          </td>
                          <td>
                            <li>{item.membership_society}</li>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            )}
            {detail.education && (
              <div className="fac-card" data-aos="fade-up">
                <h3>Educational Qualification</h3>
                <div className="factable">
                  <table>
                    <tr>
                      <td>
                        <h4>Certification</h4>
                      </td>
                      <td>
                        <h4>Institute Name</h4>
                      </td>
                      <td>
                        <h4>Passing Year</h4>
                      </td>
                    </tr>
                    {detail.qualification.map((item) => {
                      return (
                        <tr>
                          <td>
                            <li>{item.certification}</li>
                          </td>
                          <td>
                            <li>{item.institution}</li>
                          </td>
                          <td>
                            <li>{item.passing_year}</li>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            )}
            {detail.curr_admin_responsibility && (
              <div className="fac-card" data-aos="fade-up">
                <h3>Current Administrative Responsibility</h3>
                {detail.currResponsibility.map((item) => {
                  return <li>{item}</li>;
                })}
              </div>
            )}
            {detail.past_admin_reponsibility && (
              <div className="fac-card" data-aos="fade-up">
                <h3>Past Administrative Responsibility</h3>
                {detail.pastreponsibility.map((item) => {
                  return <li>{item}</li>;
                })}
              </div>
            )}
            {detail.work_experience && (
              <div className="fac-card" data-aos="fade-up">
                <h3>Work Experiences</h3>
                {detail.workExperience.map((item) => {
                  return <li>{item}</li>;
                })}
              </div>
            ) }
            {detail.professional_service && (
              <div className="fac-card" data-aos="fade-up">
                <h3>Professional Services</h3>
                {detail.services.map((item) => {
                  return <li>{item}</li>;
                })}
              </div>
            )}
            {detail.project && (
              <div className="fac-card" data-aos="fade-up">
                <h3>Projects</h3>
                {detail.projects.map((item) => {
                  return <li>{item}</li>;
                })}
              </div>
            )}
            {detail.phd_candidates && (
              <div className="fac-card" data-aos="fade-up">
                <h3>Phd Candidates</h3>
                {detail.phdCandidates.map((item) => {
                  return <li>{item}</li>;
                })}
              </div>
            )}
          </div>
        </Profile>
      )}
    </>
  );
}
