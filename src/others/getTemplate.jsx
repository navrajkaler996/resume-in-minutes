import { useEffect, useLayoutEffect, useRef, useState } from "react";

const getTemplate = (templateId, form, overflowHeight, contentRef) => {
  const [newHeight, setNewHeight] = useState(1122);

  useEffect(() => {
    setNewHeight((prev) => Number(prev) + overflowHeight);
  }, [overflowHeight]);

  console.log(newHeight);

  switch (templateId) {
    case 1:
      return (
        <div
          id="resume-content"
          className="resume-content"
          ref={contentRef}
          style={{ height: `${newHeight}px` }}>
          <h1>{form?.name}</h1>
          <p className="target-roles">{form?.role}</p>
          <div className="contact-row">
            <p>
              <span className="font-bold">Phone:</span> {form?.phone}
            </p>
            <p>
              <span className="font-bold">Email:</span> {form?.email}
            </p>
          </div>
          <p className="address">
            <span className="font-bold">Address:</span> {form?.address},{" "}
            {form?.city}, {form?.province}
          </p>
          <p className="summary">{form?.summary}</p>
          {/* ... */}
          <hr />
          {form?.experience?.length > 0 && (
            <>
              <h2>Experience</h2>
              {form?.experience.map((exp, idx) => (
                <div key={idx} className="experience-entry">
                  <span className="job-title">{exp?.jobTitle}</span> —{" "}
                  <span className="company-location">
                    {exp?.company}, {exp?.location}{" "}
                  </span>
                  <br />
                  <span className="date-range">
                    {exp?.startDate} - {exp?.endDate}
                  </span>
                  <ul>
                    {exp.keyPoints?.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
          <h2>Skills</h2>
          <p className="skills-section">
            {form?.skills
              ?.split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
              .map((skill, index, arr) => (
                <span key={index}>
                  {skill}
                  {index < arr.length - 1 && <span> &nbsp;&bull;&nbsp;</span>}
                </span>
              ))}
          </p>
          {form.projects && form.projects.length > 0 && (
            <>
              <h2>Projects</h2>
              {form.projects.map((proj, idx) => {
                if (proj?.title?.length === 0) return;
                return (
                  <div key={idx} className="project-entry">
                    <span className="project-title">{proj?.title}</span>
                    {proj?.link && (
                      <>
                        {" "}
                        —{" "}
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer">
                          {proj.link}
                        </a>
                      </>
                    )}
                    <br />
                    <span className="project-tech">{proj?.technologies}</span>
                    <ul>
                      {proj?.keyPoints?.length > 0
                        ? proj.keyPoints.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))
                        : proj?.description && <li>{proj.description}</li>}
                    </ul>
                  </div>
                );
              })}
            </>
          )}
          {form.education && form.education.length > 0 && (
            <>
              <h2>Education</h2>
              {form?.education.map((edu, idx) => {
                if (edu?.school?.length === 0 || edu?.degree?.length === 0)
                  return;
                return (
                  <div key={idx} className="education-entry">
                    <strong>{edu?.degree}</strong> — {edu?.school}
                    <br />
                    {edu?.field}, {edu?.start} - {edu?.end}
                  </div>
                );
              })}
            </>
          )}
          {overflowHeight > 0 && (
            <div
              className="danger-overlay"
              style={{ height: overflowHeight + "px" }}></div>
          )}
        </div>
      );

    case 2:
      return (
        <div id="resume-content" className="resume-content">
          {/* Header */}
          <div className="resume-header">
            <div>
              <div className="resume-header-name">{form?.name}</div>
              <div className="resume-header-role">{form?.role}</div>
            </div>
            <div className="resume-header-contact">
              <div>
                <span>📞</span>
                {form?.phone}
              </div>
              <div>
                <span>✉️</span>
                {form?.email}
              </div>
              <div>
                <span>🏠</span>
                {form?.address}, {form?.city}, {form?.province}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="resume-section-title">📝 Summary</div>
          <div className="resume-summary">{form?.summary}</div>

          {/* Experience */}
          {form?.experience && form.experience.length > 0 && (
            <>
              <div className="resume-section-title">💼 Experience</div>
              <div className="resume-card-list">
                {form.experience.map((exp, idx) => {
                  // Skip rendering if jobTitle or company is empty
                  if (
                    exp.jobTitle.trim().length === 0 ||
                    exp.company.trim().length === 0
                  )
                    return;
                  return (
                    <div key={idx} className="resume-card">
                      <div className="resume-title-container">
                        <div className="resume-card-title">{exp.jobTitle}</div>
                        <span className="resume-card-dates">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <span className="resume-card-subtitle">
                        {exp.company}, {exp.location}
                      </span>
                      <ul>
                        {exp?.keyPoints?.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Skills */}
          <div className="resume-section-title">🛠️ Skills</div>
          <div className="resume-skills-list">
            {form?.skills?.split(",").map((skill, i) => (
              <span key={i} className="resume-skill-badge">
                {skill.trim()}
              </span>
            ))}
          </div>

          {/* Projects */}
          {form.projects && form.projects.length > 0 && (
            <>
              <div className="resume-section-title">🚀 Projects</div>
              <div className="resume-card-list">
                {form.projects.map((proj, idx) => {
                  if (proj?.title?.length === 0) return;

                  return (
                    <div key={idx} className="resume-card">
                      <div className="resume-card-title resume-title-container">
                        {proj?.title}
                        {proj?.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-link">
                            {proj.link}
                          </a>
                        )}
                      </div>
                      <div className="resume-card-tech">
                        {proj?.technologies}
                      </div>
                      <ul>
                        {proj?.keyPoints?.length > 0
                          ? proj.keyPoints.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))
                          : proj?.description && <li>{proj.description}</li>}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Education */}
          {form?.education && form.education.length > 0 && (
            <>
              <div className="resume-section-title">🎓 Education</div>
              <div className="resume-card-list">
                {form.education.map((edu, idx) => {
                  if (
                    !edu?.school ||
                    edu.school.length === 0 ||
                    !edu?.degree ||
                    edu.degree.length === 0
                  )
                    return null;
                  return (
                    <div key={idx} className="resume-card">
                      <div className="resume-title-container">
                        <div className="resume-card-title">
                          {edu.degree}, {edu.field}
                        </div>
                        <div className="resume-card-dates">
                          {edu.start} - {edu.end}
                        </div>
                      </div>
                      <div className="resume-card-subtitle">{edu.school}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      );

    case 3:
      return (
        <div id="resume-content" className="resume-content">
          {/* Header */}
          <div className="resume-header">
            <div>
              <div className="resume-header-name">{form?.name}</div>
              <div className="resume-header-role">{form?.role}</div>
            </div>
            <div className="resume-header-contact">
              <div>
                <span>📞</span>
                {form?.phone}
              </div>
              <div>
                <span>✉️</span>
                {form?.email}
              </div>
              <div>
                <span>🏠</span>
                {form?.address}, {form?.city}, {form?.province}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="resume-section-title">Summary</div>
          <div className="resume-summary">{form?.summary}</div>

          {/* Experience */}
          {form?.experience && form?.experience?.length > 0 && (
            <>
              {" "}
              <div className="resume-section-title">Experience</div>
              <div className="resume-card-list">
                {form?.experience?.map((exp, idx) => {
                  if (
                    exp.jobTitle.trim().length === 0 ||
                    exp.company.trim().length === 0
                  )
                    return;
                  return (
                    <div key={idx} className="resume-card">
                      <div className="resume-title-container">
                        <div className="resume-card-title">{exp?.jobTitle}</div>
                        <span className="resume-card-dates">
                          {exp?.startDate} - {exp?.endDate}
                        </span>
                      </div>
                      <span className="resume-card-subtitle">
                        {exp?.company}, {exp?.location}
                      </span>

                      <ul>
                        {exp?.keyPoints?.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Skills */}
          <div className="resume-section-title">Skills</div>
          <div className="resume-skills-list">
            {form?.skills?.split(",").map((skill, i) => (
              <span key={i} className="resume-skill-badge">
                {skill.trim()}
                {i < form?.skills?.length - 1 && (
                  <span> &nbsp;&bull;&nbsp;</span>
                )}
              </span>
            ))}
          </div>

          {/* Projects */}
          {form.projects && form.projects.length > 0 && (
            <>
              <div className="resume-section-title">Projects</div>
              <div className="resume-card-list">
                {form.projects.map((proj, idx) => {
                  if (proj?.title?.length === 0) return;
                  return (
                    <div key={idx} className="resume-card">
                      <div className="resume-card-title resume-title-container">
                        {proj?.title}
                        {proj?.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-link">
                            {proj.link}
                          </a>
                        )}
                      </div>
                      <div className="resume-card-tech">
                        {proj?.technologies}
                      </div>
                      <ul>
                        {proj?.keyPoints?.length > 0
                          ? proj.keyPoints.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))
                          : proj?.description && <li>{proj.description}</li>}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Education */}
          {form?.education && form?.education?.length > 0 && (
            <>
              <div className="resume-section-title">Education</div>
              <div className="resume-card-list">
                {form?.education?.map((edu, idx) => {
                  if (edu?.school?.length === 0 || edu?.degree?.length === 0)
                    return;
                  return (
                    <div key={idx} className="resume-card">
                      <div className="resume-title-container">
                        <div className="resume-card-title">
                          {edu?.degree}, {edu?.field}
                        </div>
                        <div className="resume-card-dates">
                          {edu?.start} - {edu?.end}
                        </div>
                      </div>
                      <div className="resume-card-subtitle">{edu?.school}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      );

    default:
      return <></>;
  }
};

export default getTemplate;
