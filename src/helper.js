// Helper to check for numbers/metrics in description
function hasMetrics(description) {
  return /\d/.test(description); // Checks for any digit
}

// Helper to check for achievement/action verbs (expand as needed)
function hasAchievementVerb(description) {
  const verbs = [
    "improved",
    "increased",
    "reduced",
    "achieved",
    "led",
    "delivered",
    "generated",
    "managed",
    "optimized",
    "created",
    "built",
    "developed",
    "launched",
    "designed",
    "implemented",
  ];
  return verbs.some((verb) => description.toLowerCase().includes(verb));
}

export function calculateResumeScore(form) {
  let score = 0;

  // Personal Info (20%)
  const personalFields = [
    form.name,
    form.email,
    form.phone,
    form.address,
    form.city,
    form.province,
  ];
  const personalFilled = personalFields.filter(Boolean).length;
  score += (personalFilled / personalFields.length) * 20;

  // Education (15%)
  if (form.education.length > 0) {
    // Filter out entries where degree or school is empty
    let educationModified = form.education.filter(
      (exp) => exp?.degree?.length > 0 && exp?.school?.length > 0
    );

    // Calculate score for each valid education entry and sum up
    let eduScore = 0;
    educationModified.forEach((edu) => {
      const eduFields = [edu.school, edu.degree, edu.field, edu.start, edu.end];
      const eduFilled = eduFields.filter(Boolean).length;
      eduScore += (eduFilled / eduFields.length) * 15;
    });

    score += eduScore;
  }

  function calculateExperienceScore(experiences) {
    let experienceModified = experiences?.filter(
      (exp) => exp?.jobTitle?.length > 0 && exp?.company?.length > 0
    );

    let expScore = 0;
    experienceModified.forEach((exp) => {
      const expFields = [
        exp.jobTitle,
        exp.company,
        exp.location,
        exp.startDate,
        exp.endDate,
        exp.description,
      ];
      const expFilled = expFields.filter(Boolean).length;
      let baseScore = expFilled / expFields.length;

      // Add bonus for metrics/achievements
      let bonus = 0;
      if (exp.description) {
        if (hasMetrics(exp.description)) bonus += 0.15; // 15% bonus for metrics
        if (hasAchievementVerb(exp.description)) bonus += 0.1; // 10% bonus for verbs
      }
      expScore += Math.min(baseScore + bonus, 1); // Cap at 1 per experience
    });
    return expScore / experienceModified.length;
  }

  let experience = true;

  // Usage in your main score function:
  if (form.experience.length > 0) {
    const expScore = calculateExperienceScore(form.experience);
    score += expScore * 25;
  } else experience = false;

  // Projects (10% or 35%)
  if (form.projects.length > 0) {
    let projScore = 0;

    let projectsModified = form?.projects?.filter(
      (proj) => proj?.title?.length > 0
    );
    projectsModified.forEach((proj) => {
      const projFields = [
        proj.title,
        proj.description,
        proj.technologies,
        proj.link,
      ];
      const projFilled = projFields.filter(Boolean).length;
      projScore += projFilled / projFields.length;
    });

    if (experience) score += (projScore / projectsModified.length) * 10;
    else score += (projScore / projectsModified.length) * 35;
  }

  // Skills (10%)
  const skillsCount = form.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean).length;
  score += Math.min(skillsCount / 3, 1) * 10; // full points for 3+ skills

  // Summary (10%)
  score +=
    form.summary && form.summary.length >= 30
      ? 10
      : form.summary
      ? (form.summary.length / 30) * 10
      : 0;

  // Links (10%)
  let linksScore = 0;
  if (form.linkedin && form.linkedin.length > 0) linksScore += 5;
  if (form.website && form.website.length > 0) linksScore += 5;
  score += linksScore;

  return Math.round(score);
}

export function getSuggestions(form) {
  const critical = [];
  const moderate = [];
  const low = [];

  // Critical
  if (!form.phone)
    critical.push(
      "Add your phone number so you never miss an opportunity to connect!"
    );
  if (!form.website)
    critical.push(
      "Have a portfolio or website? Share it to stand out even more!"
    );
  if (form.experience.length) {
    form.experience.forEach((exp) => {
      if (exp.description && !hasMetrics(exp.description))
        critical.push(
          "Try adding numbers or results to your experience—did you increase revenue, save time, or lead a team? Recruiters love to see real impact!"
        );
    });
  }
  if (!form.email)
    critical.push(
      "A professional email helps recruiters reach out—pop yours in!"
    );

  // Moderate
  if (!form.city)
    moderate.push(
      "Your city helps employers know where you’re based—let’s add it!"
    );
  if (!form.province)
    moderate.push(
      "Adding your province or state helps local recruiters find you."
    );
  if (!form.linkedin)
    moderate.push(
      "Show off your professional network—add your LinkedIn profile!"
    );

  if (!form.education.length) {
    moderate.push(
      "Your education is a big part of your story—add your school or university!"
    );
  } else {
    const edu = form.education[0];
    if (!edu.school || !edu.degree || !edu.field || !edu.start || !edu.end) {
      moderate.push(
        "Let’s complete your education details to highlight your academic journey."
      );
    }
  }

  if (!form.experience.length) {
    moderate.push(
      "Share your work experience to show what you’ve accomplished!"
    );
  }

  //   else {
  //     form.experience.forEach((exp) => {
  //       if (!exp.jobTitle)
  //         moderate.push("Add your job title to let employers know your role.");
  //       if (!exp.company)
  //         moderate.push("Which company did you work for? Let’s add it!");
  //       if (!exp.location)
  //         moderate.push(
  //           "Where was this job? Location helps paint the full picture."
  //         );
  //       if (!exp.startDate)
  //         moderate.push("When did you start? Add your start date.");
  //       if (!exp.endDate)
  //         moderate.push("When did you finish? Add your end date.");
  //       if (!exp.description)
  //         moderate.push(
  //           "Tell us more about what you did—describe your impact and achievements!"
  //         );
  //     });
  //   }

  if (!form.projects.length) {
    moderate.push("Projects show your hands-on skills—add one to shine!");
  }

  //   else {
  //     form.projects.forEach((proj) => {
  //       if (!proj.title) moderate.push("Give your project a catchy title!");
  //       if (!proj.description)
  //         moderate.push(
  //           "Describe what you built and your role—let your work speak for itself."
  //         );
  //       if (!proj.technologies)
  //         moderate.push("List the technologies you used to show your expertise.");
  //       if (!proj.link)
  //         moderate.push(
  //           "Have a link to your project? Share it so others can see your work!"
  //         );
  //     });
  //   }

  const skillsCount = form.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean).length;
  if (skillsCount < 3)
    moderate.push(
      "List a few more skills—let’s show off everything you can do!"
    );

  if (form.experience.length) {
    form.experience.forEach((exp) => {
      if (exp.description && !hasAchievementVerb(exp.description))
        moderate.push(
          "Use action words like 'improved', 'led', or 'achieved' to highlight your contributions!"
        );
    });
  }

  //   if (!form.summary || form.summary.length < 30)
  //     moderate.push(
  //       "Write a quick summary about yourself—this is your chance to shine!"
  //     );

  // Low
  if (!form.address)
    low.push("Including your address gives your resume a personal touch.");

  return { critical, moderate, low };
}

export const getColorClasses = (score) => {
  if (score > 80) {
    return "text-[#29f400] border-[#29f400] ";
  } else if (score >= 50) {
    return "text-yellow-900 border-yellow-900";
  } else {
    return "text-red-900 border-red-900";
  }
};
