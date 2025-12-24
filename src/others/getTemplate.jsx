import { useEffect, useState } from "react";

const getTemplate = (
  templateId,
  form,
  overflowHeight,
  contentRef,
  isDownloading,
  fontSize,
  fontFamily
) => {
  const [newHeight, setNewHeight] = useState(1122);

  const [tempForm, setTempForm] = useState({
    ...form,
    address: form?.address + ", " + form?.city + ", " + form?.province,
  });
  const [editing, setEditing] = useState({
    name: false,
    role: false,
    phone: false,
    email: false,
    address: false,
    summary: false,
  });
  const [editingPoint, setEditingPoint] = useState({});
  const [tempPoint, setTempPoint] = useState({});
  const [editingProjectPoint, setEditingProjectPoint] = useState({});

  useEffect(() => {
    setNewHeight((prev) => Number(prev) + overflowHeight);
  }, [overflowHeight]);

  const saveName = (name, value) => {
    console.log("----", name, value);
    setTempForm((prev) => ({ ...prev, [name]: value }));
    setEditing((prev) => ({ ...prev, [name]: false }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveName(e.target.dataset.field, e.target.value);
    }
    if (e.key === "Escape") {
      setTempForm((prev) => ({
        ...prev,
        [e.target.dataset.field]: form[e.target.dataset.field] || "",
      }));
      setEditing((prev) => ({ ...prev, [e.target.dataset.field]: false }));
    }
  };

  const startEdit = (expIdx, pointIdx, value) => {
    setEditingPoint({ [expIdx]: pointIdx });
    setTempPoint({ [expIdx]: value });
  };

  const savePoint = (expIdx, pointIdx, value) => {
    const updatedExperience = tempForm.experience.map((exp, i) => {
      if (i !== expIdx) return exp;
      const updatedPoints = Array.isArray(exp.keyPoints)
        ? exp.keyPoints.map((point, j) => (j === pointIdx ? value : point))
        : [];
      return { ...exp, keyPoints: updatedPoints };
    });
    setTempForm({ ...tempForm, experience: updatedExperience });
    setEditingPoint({});
    setTempPoint({});
  };

  const cancelEdit = () => {
    setEditingPoint({});
    setTempPoint({});
  };

  const deletePoint = (expIdx, pointIdx) => {
    setTempForm((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === expIdx && Array.isArray(exp.keyPoints)
          ? {
              ...exp,
              keyPoints: exp.keyPoints.filter((_, j) => j !== pointIdx),
            }
          : exp
      ),
    }));
    cancelEdit();
  };

  const deleteExperience = (expIdx) => {
    setTempForm((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== expIdx),
    }));
    cancelEdit();
  };

  const startProjectEdit = (projIdx, pointIdx, value) => {
    setEditingProjectPoint({ [projIdx]: pointIdx });
    setTempPoint({ [projIdx]: value });
  };

  const saveProjectPoint = (projIdx, pointIdx, value) => {
    setTempForm((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === projIdx && Array.isArray(proj.keyPoints)
          ? {
              ...proj,
              keyPoints: proj.keyPoints.map((pt, j) =>
                j === pointIdx ? value : pt
              ),
            }
          : proj
      ),
    }));
    setEditingProjectPoint({});
    setTempPoint({});
  };

  const deleteProjectPoint = (projIdx, pointIdx) => {
    setTempForm((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === projIdx && Array.isArray(proj.keyPoints)
          ? {
              ...proj,
              keyPoints: proj.keyPoints.filter((_, j) => j !== pointIdx),
            }
          : proj
      ),
    }));
    setEditingProjectPoint({});
  };

  const deleteProject = (projIdx) => {
    setTempForm((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== projIdx),
    }));
    setEditingProjectPoint({});
  };

  const deleteEducation = (eduIdx) => {
    setTempForm((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== eduIdx),
    }));
  };

  console.log("fff", fontFamily);

  switch (templateId) {
    case 1:
      return (
        <>
          <div
            id="resume-content-1"
            className="resume-content-1  rounded-2xl"
            ref={contentRef}
            style={{
              height: `${newHeight}px`,
              fontSize: `${fontSize}rem`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              fontFamily: fontFamily,
            }}>
            {editing.name ? (
              <input
                data-field="name"
                type="text"
                value={tempForm?.name || ""}
                onChange={(e) =>
                  setTempForm({
                    ...tempForm,
                    [e.target.dataset.field]: e.target.value,
                  })
                }
                onBlur={(e) => saveName(e.target.dataset.field, e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="resume-editable-input-1 resume-editable-input-heading-1"
                placeholder="Your Name"
              />
            ) : (
              <div
                className="resume-header-name-1"
                data-field="name"
                onClick={(e) =>
                  setEditing((prev) => ({
                    ...prev,
                    [e.target.dataset.field]: true,
                  }))
                }
                tabIndex={0}
                title="Click to edit">
                {tempForm?.name || "Your Name"}
              </div>
            )}

            {editing.role ? (
              <input
                data-field="role"
                type="text"
                value={tempForm?.role || ""}
                onChange={(e) =>
                  setTempForm({
                    ...tempForm,
                    [e.target.dataset.field]: e.target.value,
                  })
                }
                onBlur={(e) => saveName(e.target.dataset.field, e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="resume-editable-input-1 target-roles"
                placeholder="Your role"
              />
            ) : (
              <div
                className="resume-header-role-1"
                data-field="role"
                onClick={(e) =>
                  setEditing((prev) => ({
                    ...prev,
                    [e.target.dataset.field]: true,
                  }))
                }
                tabIndex={0}
                title="Click to edit">
                {tempForm?.role || "Your Role"}
              </div>
            )}
            <div className="contact-row">
              <p>
                <span className="font-bold">Phone:</span>{" "}
                {editing.phone ? (
                  <input
                    data-field="phone"
                    type="text"
                    value={tempForm?.phone || ""}
                    onChange={(e) =>
                      setTempForm({
                        ...tempForm,
                        [e.target.dataset.field]: e.target.value,
                      })
                    }
                    onBlur={(e) =>
                      saveName(e.target.dataset.field, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="resume-editable-input"
                    placeholder="Your phone"
                  />
                ) : (
                  <span
                    data-field="phone"
                    onClick={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: true,
                      }))
                    }
                    tabIndex={0}
                    title="Click to edit">
                    {tempForm?.phone || "Your Phone"}
                  </span>
                )}
              </p>
              <p>
                <span className="font-bold">Email:</span>{" "}
                {editing.email ? (
                  <input
                    data-field="email"
                    type="email"
                    value={tempForm?.email || ""}
                    onChange={(e) =>
                      setTempForm({
                        ...tempForm,
                        [e.target.dataset.field]: e.target.value,
                      })
                    }
                    onBlur={(e) =>
                      saveName(e.target.dataset.field, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="resume-editable-input"
                    placeholder="Your email"
                  />
                ) : (
                  <span
                    data-field="email"
                    onClick={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: true,
                      }))
                    }
                    tabIndex={0}
                    title="Click to edit">
                    {tempForm?.email || "Your Email"}
                  </span>
                )}
              </p>
            </div>

            {tempForm?.linkedin ||
              (tempForm?.website && (
                <div className="contact-row">
                  {tempForm?.linkedin && (
                    <p>
                      <span className="font-bold">LinkedIn:</span>{" "}
                      {editing.linkedin ? (
                        <input
                          data-field="linkedin"
                          type="text"
                          value={tempForm?.linkedin || ""}
                          onChange={(e) =>
                            setTempForm({
                              ...tempForm,
                              [e.target.dataset.field]: e.target.value,
                            })
                          }
                          onBlur={(e) =>
                            saveField(e.target.dataset.field, e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, e.target.dataset.field)
                          }
                          autoFocus
                          className="resume-editable-input"
                          placeholder="Your LinkedIn URL"
                        />
                      ) : (
                        <span
                          data-field="linkedin"
                          onClick={() =>
                            setEditing((prev) => ({ ...prev, linkedin: true }))
                          }
                          tabIndex={0}
                          title="Click to edit">
                          {tempForm?.linkedin || "Your LinkedIn URL"}
                        </span>
                      )}
                    </p>
                  )}
                  {tempForm?.website && (
                    <p>
                      <span className="font-bold">Website:</span>{" "}
                      {editing.website ? (
                        <input
                          data-field="website"
                          type="text"
                          value={tempForm?.website || ""}
                          onChange={(e) =>
                            setTempForm({
                              ...tempForm,
                              [e.target.dataset.field]: e.target.value,
                            })
                          }
                          onBlur={(e) =>
                            saveField(e.target.dataset.field, e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, e.target.dataset.field)
                          }
                          autoFocus
                          className="resume-editable-input"
                          placeholder="Your Website URL"
                        />
                      ) : (
                        <span
                          data-field="website"
                          onClick={() =>
                            setEditing((prev) => ({ ...prev, website: true }))
                          }
                          tabIndex={0}
                          title="Click to edit">
                          {tempForm?.website || "Your Website URL"}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              ))}
            <p className="address">
              <span className="font-bold">Address:</span>{" "}
              {editing.address ? (
                <input
                  data-field="address"
                  type="text"
                  value={tempForm?.address}
                  onChange={(e) =>
                    setTempForm({
                      ...tempForm,
                      [e.target.dataset.field]: e.target.value,
                    })
                  }
                  onBlur={(e) =>
                    saveName(e.target.dataset.field, e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="resume-editable-input"
                  placeholder="Your address"
                />
              ) : (
                <span
                  data-field="address"
                  onClick={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      [e.target.dataset.field]: true,
                    }))
                  }
                  tabIndex={0}
                  title="Click to edit">
                  {tempForm?.address || "Your Address"}
                </span>
              )}
            </p>
            {editing.summary ? (
              <input
                data-field="summary"
                type="text"
                value={tempForm?.summary || ""}
                onChange={(e) =>
                  setTempForm({
                    ...tempForm,
                    [e.target.dataset.field]: e.target.value,
                  })
                }
                onBlur={(e) =>
                  saveField(e.target.dataset.field, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(e, e.target.dataset.field)}
                autoFocus
                className="resume-editable-input-2 resume-summary"
                placeholder="Your Summary"
              />
            ) : (
              <p
                className="resume-summary"
                data-field="summary"
                onClick={() =>
                  setEditing((prev) => ({ ...prev, summary: true }))
                }
                tabIndex={0}
                title="Click to edit">
                {tempForm?.summary || "Your Summary"}
              </p>
            )}

            <hr />
            {Array.isArray(tempForm?.experience) &&
              tempForm.experience.length > 0 && (
                <>
                  <h2>Experience</h2>
                  {tempForm.experience.map(
                    (exp, expIdx) =>
                      exp &&
                      Array.isArray(exp.keyPoints) && (
                        <div
                          key={expIdx}
                          className="experience-entry"
                          style={{ position: "relative" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}>
                            <span>
                              <span className="job-title">
                                {exp.jobTitle || "Job Title"}
                              </span>{" "}
                              —{" "}
                              <span className="company-location">
                                {exp.company || "Company"},{" "}
                                {exp.location || "Location"}
                              </span>
                            </span>
                            {!isDownloading && (
                              <button
                                type="button"
                                onClick={() => deleteExperience(expIdx)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#e2e8f0",
                                  fontSize: "2em",
                                  marginLeft: "0.5em",
                                  cursor: "pointer",
                                }}
                                aria-label="Delete experience"
                                tabIndex={0}>
                                ×
                              </button>
                            )}
                          </div>
                          <span className="date-range">
                            {exp.startDate || "Start Date"} -{" "}
                            {exp.endDate || "End Date"}
                          </span>
                          <ul>
                            {exp.keyPoints
                              .map((point, pointIdx) => ({ point, pointIdx }))
                              .filter(
                                ({ point }) => point && point.trim() !== ""
                              )
                              .map(({ point, pointIdx }) =>
                                editingPoint[expIdx] === pointIdx ? (
                                  <li
                                    key={pointIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      listStyleType: "disc",
                                      fontSize: `${fontSize}rem`,
                                    }}>
                                    <input
                                      type="text"
                                      className="resume-editable-input resume-editable-input-experience-point"
                                      value={tempPoint[expIdx] || point}
                                      onChange={(e) =>
                                        setTempPoint({
                                          [expIdx]: e.target.value,
                                        })
                                      }
                                      onBlur={() =>
                                        savePoint(
                                          expIdx,
                                          pointIdx,
                                          tempPoint[expIdx] || point
                                        )
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          savePoint(
                                            expIdx,
                                            pointIdx,
                                            tempPoint[expIdx] || point
                                          );
                                        if (e.key === "Escape") cancelEdit();
                                      }}
                                      autoFocus
                                    />
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deletePoint(expIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </li>
                                ) : (
                                  <div
                                    style={
                                      {
                                        // display: "flex",
                                        // alignItems: "center",
                                      }
                                    }>
                                    <span
                                      style={{
                                        marginRight: "0.5em",
                                      }}>
                                      •
                                    </span>
                                    <span
                                      onClick={() =>
                                        startEdit(expIdx, pointIdx, point)
                                      }
                                      style={{ cursor: "pointer", flex: 1 }}
                                      title="Click to edit">
                                      {point}
                                    </span>
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deletePoint(expIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </div>
                                  // </li>
                                )
                              )}
                          </ul>
                        </div>
                      )
                  )}
                </>
              )}

            <h2>Skills</h2>
            <p className="skills-section">
              {tempForm?.skills
                ?.split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
                .map((skill, index, arr) => (
                  <span key={index}>
                    {skill}
                    {index < arr.length - 1 && <span> • </span>}
                  </span>
                ))}
            </p>
            {tempForm.projects && tempForm.projects.length > 0 && (
              <>
                <h2>Projects</h2>
                {tempForm.projects.map((proj, projIdx) => {
                  if (!proj?.title || proj.title.length === 0) return null;
                  return (
                    <div
                      key={projIdx}
                      className="project-entry"
                      style={{ position: "relative" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}>
                        <span>
                          <span className="project-title">{proj.title}</span>
                          {proj.link && (
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
                        </span>
                        {!isDownloading && (
                          <button
                            type="button"
                            onClick={() => deleteProject(projIdx)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#e2e8f0",
                              fontSize: "2em",
                              marginLeft: "0.5em",
                              cursor: "pointer",
                            }}
                            aria-label="Delete project"
                            tabIndex={0}>
                            ×
                          </button>
                        )}
                      </div>
                      <span className="project-tech">
                        {proj.technologies || "Technologies"}
                      </span>
                      <ul>
                        {proj.keyPoints && proj.keyPoints.length > 0
                          ? proj.keyPoints
                              .map((point, pointIdx) => ({ point, pointIdx }))
                              .filter(
                                ({ point }) => point && point.trim() !== ""
                              )
                              .map(({ point, pointIdx }) =>
                                editingProjectPoint[projIdx] === pointIdx ? (
                                  <li
                                    key={pointIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: `${fontSize}rem`,
                                    }}>
                                    <input
                                      type="text"
                                      className="resume-editable-input resume-editable-input-project-point"
                                      value={tempPoint[projIdx] || point}
                                      onChange={(e) =>
                                        setTempPoint({
                                          [projIdx]: e.target.value,
                                        })
                                      }
                                      onBlur={() =>
                                        saveProjectPoint(
                                          projIdx,
                                          pointIdx,
                                          tempPoint[projIdx] || point
                                        )
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          saveProjectPoint(
                                            projIdx,
                                            pointIdx,
                                            tempPoint[projIdx] || point
                                          );
                                        if (e.key === "Escape")
                                          cancelProjectEdit();
                                      }}
                                      autoFocus
                                    />
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteProjectPoint(projIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete project key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </li>
                                ) : (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}>
                                    <span
                                      style={{
                                        marginRight: "0.5em",
                                      }}>
                                      •
                                    </span>
                                    <span
                                      onClick={() =>
                                        startProjectEdit(
                                          projIdx,
                                          pointIdx,
                                          point
                                        )
                                      }
                                      style={{ cursor: "pointer", flex: 1 }}
                                      title="Click to edit">
                                      {point}
                                    </span>
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteProjectPoint(projIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete project key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </div>
                                )
                              )
                          : proj.description && <li>{proj.description}</li>}
                      </ul>
                    </div>
                  );
                })}
              </>
            )}

            {tempForm.education && tempForm.education.length > 0 && (
              <>
                <h2>Education</h2>
                {tempForm.education.map((edu, idx) => {
                  if (
                    !edu?.school ||
                    edu.school.length === 0 ||
                    !edu?.degree ||
                    edu.degree.length === 0
                  )
                    return null;
                  return (
                    <div
                      key={idx}
                      className="education-entry"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
                      <div>
                        <strong>{edu.degree || "Degree"}</strong> —{" "}
                        {edu.school || "School"}
                        <br />
                        {edu.field || "Field of Study"},{" "}
                        {edu.start || "Start Year"} - {edu.end || "End Year"}
                      </div>
                      {!isDownloading && (
                        <button
                          type="button"
                          onClick={() => deleteEducation(idx)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#e2e8f0",
                            fontSize: "2em",
                            marginLeft: "0.5em",
                            cursor: "pointer",
                          }}
                          aria-label="Delete education"
                          tabIndex={0}>
                          ×
                        </button>
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {!isDownloading && overflowHeight > 0 && (
              <div
                className="danger-overlay"
                style={{ height: overflowHeight + "px" }}></div>
            )}
          </div>
        </>
      );

    case 2:
      return (
        <div
          id="resume-content-2"
          className="resume-content-2"
          ref={contentRef}
          style={{ height: `${newHeight}px` }}>
          {/* Header */}
          <div className="resume-header">
            <div>
              {editing.name ? (
                <input
                  data-field="name"
                  type="text"
                  value={tempForm?.name || ""}
                  onChange={(e) =>
                    setTempForm((prev) => ({
                      ...prev,
                      [e.target.dataset.field]: e.target.value,
                    }))
                  }
                  onBlur={(e) =>
                    saveName(e.target.dataset.field, e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="resume-editable-input resume-editable-input-heading"
                  placeholder="Your Name"
                />
              ) : (
                <div
                  className="resume-header-name"
                  data-field="name"
                  onClick={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      [e.target.dataset.field]: true,
                    }))
                  }
                  tabIndex={0}
                  title="Click to edit">
                  {tempForm?.name || "Your Name"}
                </div>
              )}
              {editing.role ? (
                <input
                  data-field="role"
                  type="text"
                  value={tempForm?.role || ""}
                  onChange={(e) =>
                    setTempForm((prev) => ({
                      ...prev,
                      [e.target.dataset.field]: e.target.value,
                    }))
                  }
                  onBlur={(e) =>
                    saveName(e.target.dataset.field, e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="resume-editable-input target-roles"
                  placeholder="Your role"
                />
              ) : (
                <div
                  className="resume-header-role"
                  data-field="role"
                  onClick={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      [e.target.dataset.field]: true,
                    }))
                  }
                  tabIndex={0}
                  title="Click to edit">
                  {tempForm?.role || "Your Role"}
                </div>
              )}
            </div>
            <div className="resume-header-contact">
              <div>
                <span>📞</span>
                {editing.phone ? (
                  <input
                    data-field="phone"
                    type="text"
                    value={tempForm?.phone || ""}
                    onChange={(e) =>
                      setTempForm((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: e.target.value,
                      }))
                    }
                    onBlur={(e) =>
                      saveName(e.target.dataset.field, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="resume-editable-input"
                    placeholder="Your phone"
                  />
                ) : (
                  <span
                    data-field="phone"
                    onClick={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: true,
                      }))
                    }
                    tabIndex={0}
                    title="Click to edit">
                    {tempForm?.phone || "Your Phone"}
                  </span>
                )}
              </div>
              <div>
                <span>✉️</span>
                {editing.email ? (
                  <input
                    data-field="email"
                    type="email"
                    value={tempForm?.email || ""}
                    onChange={(e) =>
                      setTempForm((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: e.target.value,
                      }))
                    }
                    onBlur={(e) =>
                      saveName(e.target.dataset.field, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="resume-editable-input"
                    placeholder="Your email"
                  />
                ) : (
                  <span
                    data-field="email"
                    onClick={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: true,
                      }))
                    }
                    tabIndex={0}
                    title="Click to edit">
                    {tempForm?.email || "Your Email"}
                  </span>
                )}
              </div>
              <div>
                <span>🏠</span>
                {editing.address ? (
                  <input
                    data-field="address"
                    type="text"
                    value={`${tempForm?.address || ""}, ${
                      tempForm?.city || ""
                    }, ${tempForm?.province || ""}`}
                    onChange={(e) =>
                      setTempForm((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: e.target.value,
                      }))
                    }
                    onBlur={(e) =>
                      saveName(e.target.dataset.field, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="resume-editable-input"
                    placeholder="Your address"
                  />
                ) : (
                  <span
                    data-field="address"
                    onClick={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: true,
                      }))
                    }
                    tabIndex={0}
                    title="Click to edit">
                    {tempForm?.address || "Your Address"},{" "}
                    {tempForm?.city || "City"},{" "}
                    {tempForm?.province || "Province"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="resume-section-title">📝 Summary</div>
          {editing.summary ? (
            <input
              data-field="summary"
              type="text"
              value={tempForm?.summary || ""}
              onChange={(e) =>
                setTempForm({
                  ...tempForm,
                  [e.target.dataset.field]: e.target.value,
                })
              }
              onBlur={(e) => saveField(e.target.dataset.field, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, e.target.dataset.field)}
              autoFocus
              className="resume-editable-input-2 resume-summary"
              placeholder="Your Summary"
            />
          ) : (
            <p
              className="resume-summary"
              data-field="summary"
              onClick={() => setEditing((prev) => ({ ...prev, summary: true }))}
              tabIndex={0}
              title="Click to edit">
              {tempForm?.summary || "Your Summary"}
            </p>
          )}

          {/* Experience */}
          {Array.isArray(tempForm?.experience) &&
            tempForm.experience.length > 0 && (
              <>
                <div className="resume-section-title">💼 Experience</div>
                <div className="resume-card-list">
                  {tempForm.experience.map(
                    (exp, expIdx) =>
                      exp &&
                      Array.isArray(exp.keyPoints) && (
                        <div key={expIdx} className="resume-card">
                          <div
                            className="resume-title-container"
                            style={{ position: "relative" }}>
                            <div className="resume-card-title">
                              {exp.jobTitle || "Job Title"}
                            </div>
                            <span className="resume-card-dates">
                              {exp.startDate || "Start Date"} -{" "}
                              {exp.endDate || "End Date"}
                            </span>
                            {!isDownloading && (
                              <button
                                type="button"
                                onClick={() => deleteExperience(expIdx)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#e2e8f0",
                                  fontSize: "2em",
                                  marginLeft: "0.5em",
                                  cursor: "pointer",
                                  position: "absolute",
                                  top: 10,
                                  right: "-5px",
                                }}
                                aria-label="Delete experience"
                                tabIndex={0}>
                                ×
                              </button>
                            )}
                          </div>
                          <span className="resume-card-subtitle">
                            {exp.company || "Company"},{" "}
                            {exp.location || "Location"}
                          </span>
                          <ul>
                            {exp.keyPoints
                              .map((point, pointIdx) => ({ point, pointIdx }))
                              .filter(
                                ({ point }) => point && point.trim() !== ""
                              )
                              .map(({ point, pointIdx }) =>
                                editingPoint[expIdx] === pointIdx ? (
                                  <li
                                    key={pointIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      listStyleType: "disc",
                                      fontSize: `${fontSize}rem`,
                                    }}>
                                    <input
                                      type="text"
                                      className="resume-editable-input resume-editable-input-experience-point"
                                      value={tempPoint[expIdx] || point}
                                      onChange={(e) =>
                                        setTempPoint({
                                          [expIdx]: e.target.value,
                                        })
                                      }
                                      onBlur={() =>
                                        savePoint(
                                          expIdx,
                                          pointIdx,
                                          tempPoint[expIdx] || point
                                        )
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          savePoint(
                                            expIdx,
                                            pointIdx,
                                            tempPoint[expIdx] || point
                                          );
                                        if (e.key === "Escape") cancelEdit();
                                      }}
                                      autoFocus
                                    />
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deletePoint(expIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </li>
                                ) : (
                                  <li
                                    key={pointIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      listStyleType: "disc",
                                    }}>
                                    <span
                                      onClick={() =>
                                        startEdit(expIdx, pointIdx, point)
                                      }
                                      style={{
                                        cursor: "pointer",
                                        flex: 1,
                                        fontSize: `${fontSize}rem`,
                                      }}
                                      title="Click to edit">
                                      {point}
                                    </span>
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deletePoint(expIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </li>
                                )
                              )}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              </>
            )}

          {/* Skills */}
          <div className="resume-section-title">🛠️ Skills</div>
          <div className="resume-skills-list">
            {tempForm?.skills
              ?.split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
              .map((skill, index, arr) => (
                <span key={index} className="resume-skill-badge">
                  {skill}
                  {index < arr.length - 1 && <span> • </span>}
                </span>
              ))}
          </div>

          {/* Projects */}
          {tempForm.projects && tempForm.projects.length > 0 && (
            <>
              <div className="resume-section-title">🚀 Projects</div>
              <div className="resume-card-list">
                {tempForm.projects.map((proj, projIdx) => {
                  if (!proj?.title || proj.title.length === 0) return null;
                  return (
                    <div key={projIdx} className="resume-card">
                      <div
                        className="resume-card-title resume-title-container"
                        style={{ position: "relative" }}>
                        {proj.title}
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-link">
                            {proj.link}
                          </a>
                        )}
                        {!isDownloading && (
                          <button
                            type="button"
                            onClick={() => deleteProject(projIdx)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#e2e8f0",
                              fontSize: "2em",
                              marginLeft: "0.5em",
                              cursor: "pointer",
                              position: "absolute",
                              right: "-5px",
                              top: 10,
                              fontWeight: "normal",
                            }}
                            aria-label="Delete project"
                            tabIndex={0}>
                            ×
                          </button>
                        )}
                      </div>
                      <div className="resume-card-tech">
                        {proj.technologies || "Technologies"}
                      </div>
                      <ul>
                        {proj.keyPoints && proj.keyPoints.length > 0
                          ? proj.keyPoints
                              .map((point, pointIdx) => ({ point, pointIdx }))
                              .filter(
                                ({ point }) => point && point.trim() !== ""
                              )
                              .map(({ point, pointIdx }) =>
                                editingProjectPoint[projIdx] === pointIdx ? (
                                  <li
                                    key={pointIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: `${fontSize}rem`,
                                    }}>
                                    <input
                                      type="text"
                                      className="resume-editable-input resume-editable-input-project-point"
                                      value={tempPoint[projIdx] || point}
                                      onChange={(e) =>
                                        setTempPoint({
                                          [projIdx]: e.target.value,
                                        })
                                      }
                                      onBlur={() =>
                                        saveProjectPoint(
                                          projIdx,
                                          pointIdx,
                                          tempPoint[projIdx] || point
                                        )
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          saveProjectPoint(
                                            projIdx,
                                            pointIdx,
                                            tempPoint[projIdx] || point
                                          );
                                        if (e.key === "Escape")
                                          cancelProjectEdit();
                                      }}
                                      autoFocus
                                    />
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteProjectPoint(projIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete project key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </li>
                                ) : (
                                  <li
                                    key={pointIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: `${fontSize}rem`,
                                    }}>
                                    <span
                                      onClick={() =>
                                        startProjectEdit(
                                          projIdx,
                                          pointIdx,
                                          point
                                        )
                                      }
                                      style={{ cursor: "pointer", flex: 1 }}
                                      title="Click to edit">
                                      {point}
                                    </span>
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteProjectPoint(projIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete project key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </li>
                                )
                              )
                          : proj.description && <li>{proj.description}</li>}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Education */}
          {tempForm.education && tempForm.education.length > 0 && (
            <>
              <div className="resume-section-title">🎓 Education</div>
              <div className="resume-card-list">
                {tempForm.education.map((edu, idx) => {
                  if (
                    !edu?.school ||
                    edu.school.length === 0 ||
                    !edu?.degree ||
                    edu.degree.length === 0
                  )
                    return null;
                  return (
                    <div
                      key={idx}
                      className="resume-card"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                      }}>
                      <div>
                        <div className="resume-card-title">
                          {edu.degree || "Degree"},{" "}
                          {edu.field || "Field of Study"}
                        </div>
                        <div className="resume-card-subtitle">
                          {edu.school || "School"}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="resume-card-dates">
                          {edu.start || "Start Year"} - {edu.end || "End Year"}
                        </div>
                        {!isDownloading && (
                          <button
                            type="button"
                            onClick={() => deleteEducation(idx)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#e2e8f0",
                              fontSize: "2em",
                              marginLeft: "0.5em",
                              cursor: "pointer",
                            }}
                            aria-label="Delete education"
                            tabIndex={0}>
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {!isDownloading && overflowHeight > 0 && (
            <div
              className="danger-overlay"
              style={{ height: overflowHeight + "px" }}></div>
          )}
        </div>
      );

    case 3:
      return (
        <div
          id="resume-content"
          className="resume-content"
          ref={contentRef}
          style={{ height: `${newHeight}px` }}>
          {/* Header */}
          <div className="resume-header">
            <div>
              {editing.name ? (
                <input
                  data-field="name"
                  type="text"
                  value={tempForm?.name || ""}
                  onChange={(e) =>
                    setTempForm((prev) => ({
                      ...prev,
                      [e.target.dataset.field]: e.target.value,
                    }))
                  }
                  onBlur={(e) =>
                    saveName(e.target.dataset.field, e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="resume-editable-input resume-editable-input-heading"
                  placeholder="Your Name"
                />
              ) : (
                <div
                  className="resume-header-name"
                  data-field="name"
                  onClick={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      [e.target.dataset.field]: true,
                    }))
                  }
                  tabIndex={0}
                  title="Click to edit">
                  {tempForm?.name || "Your Name"}
                </div>
              )}
              {editing.role ? (
                <input
                  data-field="role"
                  type="text"
                  value={tempForm?.role || ""}
                  onChange={(e) =>
                    setTempForm((prev) => ({
                      ...prev,
                      [e.target.dataset.field]: e.target.value,
                    }))
                  }
                  onBlur={(e) =>
                    saveName(e.target.dataset.field, e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="resume-editable-input target-roles"
                  placeholder="Your role"
                />
              ) : (
                <div
                  className="resume-header-role"
                  data-field="role"
                  onClick={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      [e.target.dataset.field]: true,
                    }))
                  }
                  tabIndex={0}
                  title="Click to edit">
                  {tempForm?.role || "Your Role"}
                </div>
              )}
            </div>
            <div className="resume-header-contact">
              <div>
                <span>📞</span>
                {editing.phone ? (
                  <input
                    data-field="phone"
                    type="text"
                    value={tempForm?.phone || ""}
                    onChange={(e) =>
                      setTempForm((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: e.target.value,
                      }))
                    }
                    onBlur={(e) =>
                      saveName(e.target.dataset.field, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="resume-editable-input"
                    placeholder="Your phone"
                  />
                ) : (
                  <span
                    data-field="phone"
                    onClick={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: true,
                      }))
                    }
                    tabIndex={0}
                    title="Click to edit">
                    {tempForm?.phone || "Your Phone"}
                  </span>
                )}
              </div>
              <div>
                <span>✉️</span>
                {editing.email ? (
                  <input
                    data-field="email"
                    type="email"
                    value={tempForm?.email || ""}
                    onChange={(e) =>
                      setTempForm((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: e.target.value,
                      }))
                    }
                    onBlur={(e) =>
                      saveName(e.target.dataset.field, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="resume-editable-input"
                    placeholder="Your email"
                  />
                ) : (
                  <span
                    data-field="email"
                    onClick={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: true,
                      }))
                    }
                    tabIndex={0}
                    title="Click to edit">
                    {tempForm?.email || "Your Email"}
                  </span>
                )}
              </div>
              <div>
                <span>🏠</span>
                {editing.address ? (
                  <input
                    data-field="address"
                    type="text"
                    value={`${tempForm?.address || ""}, ${
                      tempForm?.city || ""
                    }, ${tempForm?.province || ""}`}
                    onChange={(e) =>
                      setTempForm((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: e.target.value,
                      }))
                    }
                    onBlur={(e) =>
                      saveName(e.target.dataset.field, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="resume-editable-input"
                    placeholder="Your address"
                  />
                ) : (
                  <span
                    data-field="address"
                    onClick={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        [e.target.dataset.field]: true,
                      }))
                    }
                    tabIndex={0}
                    title="Click to edit">
                    {tempForm?.address || "Your Address"},{" "}
                    {tempForm?.city || "City"},{" "}
                    {tempForm?.province || "Province"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          {editing.summary ? (
            <input
              data-field="summary"
              type="text"
              value={tempForm?.summary || ""}
              onChange={(e) =>
                setTempForm({
                  ...tempForm,
                  [e.target.dataset.field]: e.target.value,
                })
              }
              onBlur={(e) => saveField(e.target.dataset.field, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, e.target.dataset.field)}
              autoFocus
              className="resume-editable-input-2 resume-summary"
              placeholder="Your Summary"
            />
          ) : (
            <p
              className="resume-summary"
              data-field="summary"
              onClick={() => setEditing((prev) => ({ ...prev, summary: true }))}
              tabIndex={0}
              title="Click to edit">
              {tempForm?.summary || "Your Summary"}
            </p>
          )}
          <div className="resume-summary">
            {tempForm?.summary || "Your Summary"}
          </div>

          {/* Experience */}
          {Array.isArray(tempForm?.experience) &&
            tempForm.experience.length > 0 && (
              <>
                <div className="resume-section-title">Experience</div>
                <div className="resume-card-list">
                  {tempForm.experience.map(
                    (exp, expIdx) =>
                      exp &&
                      Array.isArray(exp.keyPoints) && (
                        <div key={expIdx} className="resume-card">
                          <div
                            className="resume-title-container"
                            style={{ position: "relative" }}>
                            <div className="resume-card-title">
                              {exp.jobTitle || "Job Title"}
                            </div>
                            <span className="resume-card-dates">
                              {exp.startDate || "Start Date"} -{" "}
                              {exp.endDate || "End Date"}
                            </span>
                            {!isDownloading && (
                              <button
                                type="button"
                                onClick={() => deleteExperience(expIdx)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#e2e8f0",
                                  fontSize: "2em",
                                  marginLeft: "0.5em",
                                  cursor: "pointer",
                                  position: "absolute",
                                  top: 10,
                                  right: "-5px",
                                }}
                                aria-label="Delete experience"
                                tabIndex={0}>
                                ×
                              </button>
                            )}
                          </div>
                          <span className="resume-card-subtitle">
                            {exp.company || "Company"},{" "}
                            {exp.location || "Location"}
                          </span>
                          <ul>
                            {exp.keyPoints
                              .map((point, pointIdx) => ({ point, pointIdx }))
                              .filter(
                                ({ point }) => point && point.trim() !== ""
                              )
                              .map(({ point, pointIdx }) =>
                                editingPoint[expIdx] === pointIdx ? (
                                  <li
                                    key={pointIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}>
                                    <input
                                      type="text"
                                      className="resume-editable-input resume-editable-input-experience-point"
                                      value={tempPoint[expIdx] || point}
                                      onChange={(e) =>
                                        setTempPoint({
                                          [expIdx]: e.target.value,
                                        })
                                      }
                                      onBlur={() =>
                                        savePoint(
                                          expIdx,
                                          pointIdx,
                                          tempPoint[expIdx] || point
                                        )
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          savePoint(
                                            expIdx,
                                            pointIdx,
                                            tempPoint[expIdx] || point
                                          );
                                        if (e.key === "Escape") cancelEdit();
                                      }}
                                      autoFocus
                                    />
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deletePoint(expIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </li>
                                ) : (
                                  <li
                                    key={pointIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: `${fontSize}rem`,
                                    }}>
                                    <span
                                      onClick={() =>
                                        startEdit(expIdx, pointIdx, point)
                                      }
                                      style={{ cursor: "pointer", flex: 1 }}
                                      title="Click to edit">
                                      {point}
                                    </span>
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deletePoint(expIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </li>
                                )
                              )}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              </>
            )}

          {/* Skills */}
          <div className="resume-section-title">Skills</div>
          <div className="resume-skills-list">
            {tempForm?.skills
              ?.split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
              .map((skill, index, arr) => (
                <span key={index} className="resume-skill-badge">
                  {skill}
                  {index < arr.length - 1 && <span> • </span>}
                </span>
              ))}
          </div>

          {/* Projects */}
          {tempForm.projects && tempForm.projects.length > 0 && (
            <>
              <div className="resume-section-title">Projects</div>
              <div className="resume-card-list">
                {tempForm.projects.map((proj, projIdx) => {
                  if (!proj?.title || proj.title.length === 0) return null;
                  return (
                    <div key={projIdx} className="resume-card">
                      <div
                        className="resume-card-title resume-title-container"
                        style={{ position: "relative" }}>
                        {proj.title}
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-link">
                            {proj.link}
                          </a>
                        )}
                        {!isDownloading && (
                          <button
                            type="button"
                            onClick={() => deleteProject(projIdx)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#e2e8f0",
                              fontSize: "2em",
                              marginLeft: "0.5em",
                              cursor: "pointer",
                              position: "absolute",
                              right: "-5px",
                              top: 10,
                              fontWeight: "normal",
                            }}
                            aria-label="Delete project"
                            tabIndex={0}>
                            ×
                          </button>
                        )}
                      </div>
                      <div className="resume-card-tech">
                        {proj.technologies || "Technologies"}
                      </div>
                      <ul>
                        {proj.keyPoints && proj.keyPoints.length > 0
                          ? proj.keyPoints
                              .map((point, pointIdx) => ({ point, pointIdx }))
                              .filter(
                                ({ point }) => point && point.trim() !== ""
                              )
                              .map(({ point, pointIdx }) =>
                                editingProjectPoint[projIdx] === pointIdx ? (
                                  <li
                                    key={pointIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: `${fontSize}rem`,
                                    }}>
                                    <input
                                      type="text"
                                      className="resume-editable-input resume-editable-input-project-point"
                                      value={tempPoint[projIdx] || point}
                                      onChange={(e) =>
                                        setTempPoint({
                                          [projIdx]: e.target.value,
                                        })
                                      }
                                      onBlur={() =>
                                        saveProjectPoint(
                                          projIdx,
                                          pointIdx,
                                          tempPoint[projIdx] || point
                                        )
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          saveProjectPoint(
                                            projIdx,
                                            pointIdx,
                                            tempPoint[projIdx] || point
                                          );
                                        if (e.key === "Escape")
                                          cancelProjectEdit();
                                      }}
                                      autoFocus
                                    />
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteProjectPoint(projIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete project key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </li>
                                ) : (
                                  <li
                                    key={pointIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}>
                                    <span
                                      onClick={() =>
                                        startProjectEdit(
                                          projIdx,
                                          pointIdx,
                                          point
                                        )
                                      }
                                      style={{
                                        cursor: "pointer",
                                        flex: 1,
                                        fontSize: `${fontSize}rem`,
                                      }}
                                      title="Click to edit">
                                      {point}
                                    </span>
                                    {!isDownloading && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteProjectPoint(projIdx, pointIdx)
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e2e8f0",
                                          fontSize: "1.2em",
                                          marginLeft: "0.5em",
                                          cursor: "pointer",
                                        }}
                                        aria-label="Delete project key point"
                                        tabIndex={0}>
                                        ×
                                      </button>
                                    )}
                                  </li>
                                )
                              )
                          : proj.description && <li>{proj.description}</li>}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Education */}
          {tempForm.education && tempForm.education.length > 0 && (
            <>
              <div className="resume-section-title">Education</div>
              <div className="resume-card-list">
                {tempForm.education.map((edu, idx) => {
                  if (
                    !edu?.school ||
                    edu.school.length === 0 ||
                    !edu?.degree ||
                    edu.degree.length === 0
                  )
                    return null;
                  return (
                    <div
                      key={idx}
                      className="resume-card"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                      }}>
                      <div>
                        <div className="resume-card-title">
                          {edu.degree || "Degree"},{" "}
                          {edu.field || "Field of Study"}
                        </div>
                        <div className="resume-card-subtitle">
                          {edu.school || "School"}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="resume-card-dates">
                          {edu.start || "Start Year"} - {edu.end || "End Year"}
                        </div>
                        {!isDownloading && (
                          <button
                            type="button"
                            onClick={() => deleteEducation(idx)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#e2e8f0",
                              fontSize: "2em",
                              marginLeft: "0.5em",
                              cursor: "pointer",
                            }}
                            aria-label="Delete education"
                            tabIndex={0}>
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {!isDownloading && overflowHeight > 0 && (
            <div
              className="danger-overlay"
              style={{ height: overflowHeight + "px" }}></div>
          )}
        </div>
      );

    default:
      return <></>;
  }
};

export default getTemplate;
