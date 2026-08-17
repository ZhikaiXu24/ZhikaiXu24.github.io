(function () {
  "use strict";

  const demoTopic = "Reasoning in Large Language Models";
  const manuscriptTitle = "Reasoning in Large Language Models: A Survey";
  const subsectionTitle = "3.1.2 Adaptive Test-Time Scaling";
  const subsectionDescription =
    "How inference-time compute is allocated across sampling, search, verification, and adaptive stopping.";
  const routedSet = "[18, 27, 34, 43, 46, 52, 57, 63]";

  const steps = [
    [
      "Candidate-grounded taxonomy planning",
      "The Taxonomy Planner agent organizes candidate representations into a rooted taxonomy whose nodes define semantic scopes, structural roles, and writing objectives.",
    ],
    [
      "Reverse paper-to-section routing",
      "The Paper Router agent evaluates each candidate against eligible taxonomy nodes and assigns it to every section it can substantively support—or to none.",
    ],
    [
      "Adaptive paragraph planning",
      "The Paragraph Planner agent decomposes each Route-B section into ordered paragraph themes, argumentative roles, target lengths, and paper assignments.",
    ],
    [
      "Claim and citation planning",
      "The Claim Planner agent turns each paragraph objective into ordered claims with supporting citation groups and required technical details.",
    ],
    [
      "Paragraph realization",
      "The Drafter agent realizes each claim plan with its supporting evidence and preceding validated paragraphs, producing citation-grounded prose.",
    ],
    [
      "Deterministic validation",
      "Deterministic checks verify citations, placeholders, paragraph boundaries, formatting, and LaTeX constraints before content enters the writing state.",
    ],
    [
      "Scoped semantic review & repair",
      "The Reviewer agent selects the repair scope and reactivates only the affected writing state for re-evaluation.",
    ],
  ];

  const prose = [
    [
      "Test-time scaling improves reasoning by spending additional inference compute on the search for a better solution rather than relying on a single decoding trajectory. A common strategy is to generate multiple candidate reasoning paths and select or aggregate them, increasing the chance that at least one trajectory reaches a useful intermediate state ",
      "[18, 34]",
      ". The benefit, however, is not determined by sample count alone. When additional generations collapse to similar reasoning patterns, marginal gains can diminish quickly, making candidate diversity an important factor in effective inference-time scaling ",
      "[34]",
      ".",
    ],
    [
      "Sampling is only one way to spend additional inference compute. Search-based methods organize candidate trajectories into an explicit exploration process and use intermediate scores, rewards, or learned verifiers to prioritize promising branches ",
      "[46, 52]",
      ". This can concentrate computation on difficult decisions instead of expanding every path uniformly. Verifier-guided selection further helps rank competing solutions and filter weak trajectories, but its effectiveness depends on the reliability of the verifier itself ",
      "[52, 57]",
      ". As search becomes deeper or the candidate pool grows, systematic verifier errors can be amplified rather than averaged away ",
      "[57, 63]",
      ".",
    ],
    [
      "Because reasoning difficulty varies substantially across prompts, a fixed inference budget is often inefficient. Adaptive test-time policies estimate uncertainty, progress, or problem difficulty and allocate more computation only when additional reasoning is likely to help ",
      "[27, 43]",
      ". The same principle motivates explicit stopping criteria: a system should terminate search when the expected improvement from another sample or branch no longer justifies its latency and computation cost ",
      "[27, 43, 63]",
      ". Effective test-time scaling therefore depends not only on how additional compute is used, but also on when the system decides that further reasoning is no longer worthwhile.",
    ],
  ];

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function replace(node, children) {
    if (node) node.replaceChildren(...children);
  }

  function citation(text, malformed, repaired) {
    const node = element("span", `mini-citation${malformed ? " malformed-citation" : ""}${repaired ? " repaired-citation" : ""}`, text);
    return node;
  }

  function richParagraph(parts, malformed) {
    const paragraph = element("p");
    parts.forEach((part, index) => {
      if (index % 2 === 0) paragraph.append(document.createTextNode(part));
      else paragraph.append(citation(malformed && part === "[52, 57]" ? "[52, 57" : part, malformed && part === "[52, 57]", !malformed && part === "[52, 57]"));
    });
    return paragraph;
  }

  function publicationAccent(text) {
    return element("strong", "publication-accent", text);
  }

  function colorDAS() {
    const mark = element("span", "colored-das");
    mark.append(element("b", "initial-d", "D"), element("b", "initial-a", "A"), element("b", "initial-s", "S"));
    return mark;
  }

  function setCandidate(row) {
    if (!row) return;
    const heading = row.querySelector(":scope > strong, :scope > .candidate-copy strong");
    if (heading && !row.querySelector(":scope > .candidate-copy")) {
      const old = heading;
      const copy = element("span", "candidate-copy");
      copy.append(element("strong", "", "Candidate papers on"), element("small", "", demoTopic));
      old.replaceWith(copy);
    } else if (row.querySelector(":scope > .candidate-copy")) {
      const copy = row.querySelector(":scope > .candidate-copy");
      copy.querySelector("strong").textContent = "Candidate papers on";
      copy.querySelector("small").textContent = demoTopic;
    }
  }

  function updateHeroAndWhy() {
    const statement = document.querySelector(".hero-statement");
    if (statement) {
      replace(statement, [
        document.createTextNode("The first "),
        element("strong", "hero-tagline-accent", "stateful agentic"),
        document.createTextNode(" framework for "),
        element("strong", "hero-tagline-accent", "automatically generating"),
        document.createTextNode(" "),
        element("strong", "hero-tagline-accent", "publication-oriented"),
        document.createTextNode(" academic surveys "),
        element("strong", "hero-tagline-accent", "within 1 hour"),
        document.createTextNode("."),
      ]);
    }

    const title = document.querySelector(".motivation-title");
    if (title) {
      replace(title, [
        document.createTextNode("Designed to automatically turn a research topic into a "),
        element("strong", "why-title-accent", "publication-oriented"),
        document.createTextNode(" survey "),
        element("strong", "why-title-accent", "within 1 hour"),
        document.createTextNode("."),
      ]);
    }
    const correspondingMark = document.querySelector(".hero-authors span:last-of-type sup");
    if (correspondingMark && !correspondingMark.dataset.correspondingAuthor) {
      correspondingMark.dataset.correspondingAuthor = "true";
      const emailIcon = element("span", "corresponding-author-email", "✉");
      emailIcon.setAttribute("role", "img");
      emailIcon.setAttribute("aria-label", "Corresponding author");
      emailIcon.title = "Corresponding author";
      replace(correspondingMark, [document.createTextNode("1,"), emailIcon]);
    }
    const benchmarkHighlight = document.querySelectorAll(".highlight-name")[2];
    if (benchmarkHighlight) {
      replace(benchmarkHighlight, [colorDAS(), document.createTextNode("-Bench:")]);
    }
    const audience = document.querySelectorAll(".audience-statements p span");
    if (audience[0]) audience[0].textContent = "Build a structured map of an unfamiliar field.";
    if (audience[1]) audience[1].textContent = "Track a fast-moving field and its latest advances.";
    const highlights = document.querySelector(".highlights > h3");
    if (highlights) highlights.textContent = "Highlights";
  }

  function updateTopicSurfaces() {
    const topicInput = document.querySelector(".topic-input strong");
    if (topicInput) replace(topicInput, [element("span", "", "User survey topic:"), element("b", "", demoTopic)]);
    const candidateStack = document.querySelector(".candidate-stack");
    if (candidateStack) {
      const heading = candidateStack.querySelector(":scope > strong");
      const detail = candidateStack.querySelector(":scope > small");
      if (heading) heading.textContent = "Candidate papers on";
      if (detail) detail.textContent = demoTopic;
    }
    document.querySelectorAll(".candidate-row, .candidate-source-row, .candidate-flight").forEach(setCandidate);
  }

  function outlineNode(number, label, badge, target) {
    const node = element("div", `outline-node${target ? " outline-target" : ""}`);
    node.append(element("span", "", number), element("b", "", label));
    if (badge) node.append(citation(badge));
    return node;
  }

  function outlineChild(label, badge, target, level = 2) {
    const node = element("div", `${target ? "outline-target " : ""}outline-level-${level}`.trim());
    node.append(element("i"), element("span", "outline-child-label", label));
    if (badge) node.append(citation(badge));
    return node;
  }

  function manuscriptHeader() {
    return [element("div", "paper-title", manuscriptTitle), element("div", "paper-rule")];
  }

  function renderTaxonomy(outline, routed) {
    if (!outline) return;
    const tree = element("div", "outline-tree");
    tree.append(
      outlineNode("1", "Introduction", routed ? "[2, 7, 12]" : ""),
      outlineNode("2", "Foundations of LLM Reasoning", routed ? "[4, 9, 15]" : ""),
      outlineNode("3", "Methods", routed ? "[5, 18, 27, 34, 43]" : ""),
    );
    const methods = element("div", "outline-children outline-level-2");
    methods.append(outlineChild("3.1 Test-Time Reasoning", "", false, 2));
    const testTime = element("div", "outline-children outline-level-3");
    testTime.append(
      outlineChild("3.1.1 Sampling and Search", routed ? "[18, 34, 46, 52, 57, 63]" : "", false, 3),
      outlineChild("3.1.2 Adaptive Test-Time Scaling", routed ? routedSet : "", true, 3),
      outlineChild("3.1.3 Verification and Self-Correction", routed ? "[27, 43, 57, 63]" : "", false, 3),
      outlineChild("...", "", false, 3),
    );
    methods.append(testTime, outlineChild("...", "", false, 2));
    tree.append(
      methods,
      outlineNode("4", "Challenges and Prospects", routed ? "[16, 31, 48]" : ""),
      outlineNode("5", "Conclusion", routed ? "[11, 22, 39]" : ""),
    );
    replace(outline, [...manuscriptHeader(), tree]);
  }

  function subsectionHeader(view) {
    return [element("h3", "", subsectionTitle), element("p", "section-objective", subsectionDescription)];
  }

  function renderParagraphPlan(view) {
    if (!view) return;
    const stack = element("div", "plan-stack");
    [
      ["Para 01", "Compute scaling and candidate diversity", "[18, 34]"],
      ["Para 02", "Sampling, search, and verifier-guided selection", "[46, 52, 57, 63]"],
      ["Para 03", "Adaptive budgeting and stopping", "[27, 43, 63]"],
    ].forEach(([label, title, refs]) => {
      const card = element("div", "plan-card");
      card.append(element("span", "", label), element("b", "", title), element("small", "", refs));
      stack.append(card);
    });
    replace(view, [...subsectionHeader(view), stack]);
  }

  function claimRow(label, text, refs) {
    const row = element("div", "claim-row");
    row.append(element("span", "", label), element("p", "", text), element("small", "", `Support · ${refs}`));
    return row;
  }

  function renderClaims(view) {
    if (!view) return;
    const stack = element("div", "claim-groups");
    [
      ["Para 01", [
        ["Claim 01", "Additional inference compute can improve reasoning by exploring multiple candidate trajectories.", "[18, 34]"],
        ["Claim 02", "The benefit of additional sampling depends on whether new generations provide genuinely diverse reasoning paths.", "[34]"],
      ]],
      ["Para 02", [
        ["Claim 01", "Sampling-based scaling broadens solution coverage through additional candidate generation.", "[46, 52]"],
        ["Claim 02", "Search-based methods use intermediate evaluation to focus inference compute on promising trajectories.", "[52, 57]"],
        ["Claim 03", "Verifier quality can become a bottleneck as search depth or candidate count increases.", "[57, 63]"],
      ]],
      ["Para 03", [
        ["Claim 01", "Adaptive policies allocate more inference budget to harder problems rather than using a fixed budget.", "[27, 43]"],
        ["Claim 02", "Stopping criteria balance marginal reasoning gains against latency and computation cost.", "[27, 43, 63]"],
      ]],
    ].forEach(([label, claims]) => {
      const group = element("section", "claim-paragraph-group");
      const claimList = element("div", "claim-paragraph-claims");
      claims.forEach((claim) => claimList.append(claimRow(...claim)));
      group.append(element("h4", "", label), claimList);
      stack.append(group);
    });
    replace(view, [...subsectionHeader(view), stack]);
  }

  function renderProse(view, malformed) {
    if (!view) return;
    const content = [...subsectionHeader(view)];
    prose.forEach((paragraph, index) => content.push(richParagraph(paragraph, malformed && index === 1)));
    replace(view, content);
  }

  function renderReview(view) {
    if (!view) return;
    const actions = view.querySelector(".review-actions") || element("div", "review-actions");
    const proseNode = element("div", "review-prose");
    proseNode.append(richParagraph(prose[0]), richParagraph(prose[1]));
    proseNode.append(richParagraph([
      "Because reasoning difficulty varies substantially across prompts, a fixed inference budget is often inefficient. Adaptive test-time policies estimate uncertainty, progress, or problem difficulty and allocate more computation only when additional reasoning is likely to help ",
      "[27, 43]",
      ". ...",
    ]));
    const note = actions.querySelector("small");
    if (note) note.textContent = "In DAS, the Reviewer agent automatically selects and executes the scoped action.";
    replace(view, [...subsectionHeader(view), proseNode, actions]);
  }

  function configureMethod() {
    const story = document.querySelector(".story-sequence");
    if (!story) return;
    const kicker = story.querySelector(".story-kicker");
    if (kicker) kicker.textContent = "The Agentic Survey in Action";
    const outcome = story.querySelector(".story-outcome");
    if (outcome) replace(outcome, [
      document.createTextNode("A stateful agentic closed loop for "),
      publicationAccent("publication-oriented"),
      document.createTextNode(" survey construction."),
    ]);
    story.querySelectorAll(".story-step-button").forEach((button, index) => {
      const [title, description] = steps[index] || [];
      const titleNode = button.querySelector(".step-copy > strong");
      const descriptionNode = button.querySelector(".step-copy > span");
      if (titleNode) titleNode.textContent = title;
      if (descriptionNode) descriptionNode.textContent = description;
      button.setAttribute("aria-label", `Show ${title}`);
    });
    story.querySelectorAll(".paper-canvas.empty").forEach((canvas) => {
      canvas.querySelector(".initial-manuscript")?.remove();
      const initial = element("div", "initial-manuscript paper-view");
      initial.append(...manuscriptHeader());
      canvas.append(initial);
    });
    const outlines = story.querySelectorAll(".outline-view");
    renderTaxonomy(outlines[0], false);
    renderTaxonomy(outlines[1], true);
    renderParagraphPlan(story.querySelector(".plan-view"));
    renderClaims(story.querySelector(".claim-view"));
    const proseViews = story.querySelectorAll(".prose-view");
    renderProse(proseViews[0], true);
    renderProse(proseViews[1], false);
    renderReview(story.querySelector(".review-view"));
  }

  function scrollToSection(id) {
    const section = id === "top" ? document.querySelector(".hero") : document.getElementById(id);
    if (!section) return;
    document.documentElement.classList.add("direct-section-jump");
    history.pushState(null, "", id === "top" ? `${window.location.pathname}${window.location.search}` : `#${id}`);
    window.scrollTo({
      top: id === "top" ? 0 : window.scrollY + section.getBoundingClientRect().top,
      behavior: "auto",
    });
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.documentElement.classList.remove("direct-section-jump");
    }));
  }

  function syncNavigation() {
    const targets = ["motivation", "method", "manuscripts", "benchmark"];
    const sidebarLabels = ["Why DAS", "How DAS Works", "220 Popular Topic Surveys by DAS", "DAS-Bench & Results"];
    document.querySelectorAll(".section-navigation nav button").forEach((button, index) => {
      button.dataset.target = targets[index];
      const number = button.querySelector("span");
      const label = button.querySelector("strong");
      if (number) number.textContent = String(index + 1).padStart(2, "0");
      if (label) {
        label.textContent = sidebarLabels[index];
        colorBrandText(label);
      }
    });
    document.querySelectorAll(".hero-button").forEach((button, index) => {
      const target = ["motivation", "method", "manuscripts", "benchmark"][index];
      const label = ["Why DAS", "How DAS Works", "220 Popular Topic Surveys by DAS", "DAS-Bench & Results"][index];
      button.dataset.target = target;
      button.setAttribute("href", `#${target}`);
      const text = button.querySelector("span:not(.hero-button-index)");
      if (text) {
        text.textContent = label;
        colorBrandText(text);
      }
    });
    const home = document.querySelector(".navigation-brand");
    if (home) {
      home.dataset.target = "top";
      home.setAttribute("role", "button");
      home.setAttribute("tabindex", "0");
      home.setAttribute("aria-label", "Back to DAS home");
      home.title = "Back to home";
    }
  }

  function colorBrandText(node) {
    if (!node || node.closest(".hero-abstract, .colored-das")) return;
    if (node.textContent.startsWith("220 Popular Topic Surveys by DAS")) {
      const text = node.textContent;
      node.replaceChildren(element("span", "initial-d", "220"), document.createTextNode(text.slice(3)));
    }
    const textNodes = [];
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode(textNode) {
        return textNode.nodeValue?.includes("DAS")
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((textNode) => {
      const fragment = document.createDocumentFragment();
      textNode.nodeValue.split(/(DAS)/g).forEach((part) => {
        fragment.append(part === "DAS" ? colorDAS() : document.createTextNode(part));
      });
      textNode.replaceWith(fragment);
    });
  }

  function markActiveNavigation() {
    const targets = ["motivation", "method", "manuscripts", "benchmark"];
    const anchor = window.innerHeight * 0.38;
    let active = targets[0];
    targets.forEach((id) => {
      const section = document.getElementById(id);
      if (section && section.getBoundingClientRect().top <= anchor) active = id;
    });
    document.querySelectorAll(".section-navigation nav button").forEach((button) => {
      const selected = button.dataset.target === active;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-current", selected ? "page" : "false");
    });
  }

  function placeSections() {
    const benchmark = document.getElementById("benchmark");
    const gallery = document.getElementById("manuscripts");
    const parent = benchmark?.parentElement;
    if (parent && benchmark && gallery && benchmark.previousElementSibling !== gallery) parent.insertBefore(gallery, benchmark);
  }

  function bindSectionNavigation() {
    if (document.documentElement.dataset.dasFinalNavigation) return;
    document.documentElement.dataset.dasFinalNavigation = "true";
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".hero-button, .section-navigation nav button, .navigation-brand");
      if (!button?.dataset.target) return;
      event.preventDefault();
      event.stopPropagation();
      scrollToSection(button.dataset.target);
    }, true);
    document.addEventListener("keydown", (event) => {
      const home = event.target.closest(".navigation-brand");
      if (!home || !["Enter", " "].includes(event.key)) return;
      event.preventDefault();
      scrollToSection("top");
    }, true);
  }

  function rebuildSurveyGallery() {
    const gallery = document.getElementById("manuscripts");
    const groups = window.DASSurveyTopicGroups;
    const manifest = window.DAS_GALLERY_MANIFEST;
    if (!gallery || !Array.isArray(groups) || groups.length !== 10 || !Array.isArray(manifest) || manifest.length !== 220) return;
    if (gallery.dataset.finalGallery) return;
    gallery.dataset.finalGallery = "true";
    const files = new Map(manifest.map((item) => [Number(item.id), item]));
    let activeGroup = groups[0];
    let activeTopic = activeGroup.topics[0];
    const heading = element("h2", "gallery-headline");
    heading.append(element("strong", "gallery-count", "220"), document.createTextNode(" Popular Topic Surveys by "), colorDAS());
    const shell = element("div", "das-gallery-shell");
    const library = element("aside", "gallery-library");
    const categories = element("div", "gallery-category-grid");
    const topicList = element("div", "gallery-topic-list");
    const reader = element("article", "gallery-reader");
    const readerHead = element("header", "gallery-reader-head");
    const readerIndex = element("span", "gallery-reader-index");
    const readerTitle = element("h3", "gallery-reader-title");
    const shellPdf = element("div", "gallery-pdf-shell");
    const frame = element("iframe", "gallery-pdf");
    frame.loading = "lazy";
    shellPdf.append(frame);
    readerHead.append(readerIndex, readerTitle);
    reader.append(readerHead, shellPdf);
    library.append(categories, topicList);
    shell.append(library, reader);
    const groupButtons = [];
    let topicButtons = [];

    function refreshReader() {
      const padded = String(activeTopic.id).padStart(3, "0");
      readerIndex.replaceChildren(document.createTextNode("Manuscript "), element("b", "", padded), document.createTextNode(" / 220"));
      const file = files.get(activeTopic.id);
      readerTitle.textContent = file?.title || activeTopic.title;
      frame.src = file ? encodeURI(`./examples/gallery/${file.category}/${file.file}`) : "about:blank";
      frame.title = `${padded}: ${file?.title || activeTopic.title}`;
      groupButtons.forEach(([group, button]) => button.classList.toggle("active", group.id === activeGroup.id));
      topicButtons.forEach(([topic, button]) => {
        const active = topic.id === activeTopic.id;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
      });
    }
    function renderTopics() {
      replace(topicList, []);
      topicButtons = [];
      activeGroup.topics.forEach((topic) => {
        const button = element("button", "gallery-topic");
        button.type = "button";
        button.setAttribute("role", "option");
        button.append(element("span", "gallery-topic-id", String(topic.id).padStart(3, "0")), element("strong", "gallery-topic-title", topic.title));
        button.addEventListener("click", () => { activeTopic = topic; refreshReader(); });
        topicButtons.push([topic, button]);
        topicList.append(button);
      });
    }
    groups.forEach((group, index) => {
      const button = element("button", `gallery-category${index === groups.length - 1 ? " gallery-category-wide" : ""}`, group.title);
      button.type = "button";
      button.addEventListener("click", () => {
        activeGroup = group;
        activeTopic = group.topics[0];
        renderTopics();
        topicList.scrollTop = 0;
        refreshReader();
      });
      groupButtons.push([group, button]);
      categories.append(button);
    });
    renderTopics();
    replace(gallery, [heading, shell]);
    refreshReader();
  }

  function run() {
    updateHeroAndWhy();
    updateTopicSurfaces();
    configureMethod();
    placeSections();
    syncNavigation();
    bindSectionNavigation();
    rebuildSurveyGallery();
  }

  function initialize() {
    requestAnimationFrame(() => {
      let applying = false;
      const apply = () => {
        applying = true;
        run();
        requestAnimationFrame(() => { applying = false; });
      };
      apply();
      let scheduled = false;
      const schedule = () => {
        if (applying) return;
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => { scheduled = false; apply(); });
      };
      const root = document.getElementById("root");
      if (root) new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
      const refreshNavigation = () => requestAnimationFrame(() => {
        syncNavigation();
        markActiveNavigation();
        // The original React scroll spy commits on the same event. Reapply
        // our reordered section mapping once that commit has settled.
        window.setTimeout(markActiveNavigation, 80);
      });
      markActiveNavigation();
      window.addEventListener("scroll", refreshNavigation, { passive: true });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
