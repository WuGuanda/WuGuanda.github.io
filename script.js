(() => {
  "use strict";

  const content = window.siteContent || {};

  function createElement(tagName, options = {}) {
    const element = document.createElement(tagName);

    if (options.className) element.className = options.className;
    if (options.text !== undefined) element.textContent = options.text;

    return element;
  }

  function cleanText(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function safePdfFilename(value) {
    const filename = cleanText(value);
    if (!filename || !/\.pdf$/i.test(filename)) return "";
    if (filename.includes("/") || filename.includes("\\") || filename.includes("\0") || filename.includes("..")) return "";
    return filename;
  }

  function safeUrl(value) {
    const url = cleanText(value);
    if (!url) return "";

    try {
      const parsed = new URL(url, window.location.href);
      return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.href : "";
    } catch {
      return "";
    }
  }

  function displayDate(value) {
    const date = cleanText(value);
    if (!date) return "";

    const yearMatch = /^(\d{4})$/.exec(date);
    if (yearMatch) return yearMatch[1];

    const monthMatch = /^(\d{4})-(\d{2})$/.exec(date);
    if (monthMatch) {
      const month = Number(monthMatch[2]);
      if (month >= 1 && month <= 12) {
        return new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" })
          .format(new Date(Date.UTC(Number(monthMatch[1]), month - 1, 1)));
      }
    }

    const dayMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (dayMatch) {
      const parsed = new Date(`${date}T00:00:00Z`);
      const isExactDate =
        !Number.isNaN(parsed.getTime()) &&
        parsed.getUTCFullYear() === Number(dayMatch[1]) &&
        parsed.getUTCMonth() + 1 === Number(dayMatch[2]) &&
        parsed.getUTCDate() === Number(dayMatch[3]);

      if (isExactDate) {
        return new Intl.DateTimeFormat("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC"
        }).format(parsed);
      }
    }

    return date;
  }

  function appendMetadata(parent, values) {
    const metadata = values.map(cleanText).filter(Boolean);
    if (!metadata.length) return;

    parent.append(createElement("p", { className: "entry-meta", text: metadata.join(" · ") }));
  }

  function renderDocuments(items) {
    const validItems = Array.isArray(items)
      ? items.filter((item) => item && cleanText(item.title) && safePdfFilename(item.filename))
      : [];

    if (!validItems.length) return;

    const section = document.querySelector("#documents");
    const list = document.querySelector("#documents-list");
    const navItem = document.querySelector("#documents-nav-item");

    validItems.forEach((item) => {
      const filename = safePdfFilename(item.filename);
      const fileUrl = `assets/pdfs/${encodeURIComponent(filename)}`;
      const entry = createElement("article", { className: "entry" });
      entry.append(createElement("h3", { text: cleanText(item.title) }));

      const actions = createElement("p", { className: "entry-actions" });
      const viewLink = createElement("a", { text: "View" });
      viewLink.href = fileUrl;
      viewLink.target = "_blank";
      viewLink.rel = "noopener";
      viewLink.setAttribute("aria-label", `View ${cleanText(item.title)} (PDF, opens in a new tab)`);

      const downloadLink = createElement("a", { text: "Download" });
      downloadLink.href = fileUrl;
      downloadLink.download = filename;
      downloadLink.setAttribute("aria-label", `Download ${cleanText(item.title)} (PDF)`);
      actions.append(viewLink, downloadLink);

      appendMetadata(entry, [item.category, displayDate(item.date)]);
      const description = cleanText(item.description);
      if (description) entry.append(createElement("p", { className: "entry-description", text: description }));
      entry.append(actions);
      list.append(entry);
    });

    section.hidden = false;
    navItem.hidden = false;
  }

  function renderProjects(items) {
    const validItems = Array.isArray(items)
      ? items.filter((item) => item && cleanText(item.title))
      : [];

    if (!validItems.length) return;

    const section = document.querySelector("#projects");
    const list = document.querySelector("#projects-list");
    const navItem = document.querySelector("#projects-nav-item");

    validItems.forEach((item) => {
      const entry = createElement("article", { className: "entry" });
      entry.append(createElement("h3", { text: cleanText(item.title) }));

      const url = safeUrl(item.url);
      if (url) {
        const actions = createElement("p", { className: "entry-actions" });
        const projectLink = createElement("a", { text: "Visit" });
        projectLink.href = url;
        if (new URL(url).origin !== window.location.origin) {
          projectLink.target = "_blank";
          projectLink.rel = "noopener";
          projectLink.setAttribute("aria-label", `Visit ${cleanText(item.title)} (opens in a new tab)`);
        }
        actions.append(projectLink);
        entry.append(actions);
      }

      const description = cleanText(item.description);
      if (description) entry.append(createElement("p", { className: "entry-description", text: description }));
      appendMetadata(entry, [displayDate(item.date)]);
      list.append(entry);
    });

    section.hidden = false;
    navItem.hidden = false;
  }

  renderDocuments(content.documents);
  renderProjects(content.projects);
  const navigation = document.querySelector("#site-navigation");
  if (navigation) {
    navigation.hidden = document.querySelector("#documents").hidden && document.querySelector("#projects").hidden;
  }
})();
