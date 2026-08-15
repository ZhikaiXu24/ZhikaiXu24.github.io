(function () {
  "use strict";

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const surveyTopic = "Reasoning in Large Language Models";
  const benchmarkTopics = [
    ["001", "Tool Learning and Function Calling for LLM Agents"],
    ["002", "Memory and Long-Context Mechanisms for Long-Horizon LLM Agents"],
    ["003", "Retrieval-Augmented Generation for Large Language Models"],
    ["004", "Planning and Self-Reflection in Large Language Model Reasoning"],
    ["005", "Prompt Injection and Tool-Use Security in LLM Agents"],
    ["006", "Program Repair and Automated Debugging with Code LLMs"],
    ["007", "Multimodal Retrieval-Augmented Generation for Chart and Document Understanding"],
    ["008", "Vision-Language Models for Embodied Reasoning"],
    ["009", "Diffusion and Flow-Based Models for Controllable Image Generation"],
    ["010", "Gaussian Splatting and Neural Rendering for Dynamic 3D Scene Reconstruction"],
    ["011", "Multi-Sensor Fusion for Autonomous Driving Perception"],
    ["012", "Continual Learning and Model Editing for Foundation Models"],
    ["013", "Offline and Preference-Based Reinforcement Learning for Robotics"],
    ["014", "Graph Neural Networks and Graph Foundation Models for Scientific Discovery"],
    ["015", "Efficient LLM Serving with KV Cache, Speculative Decoding, and Quantization"],
    ["016", "Vector Databases and Retrieval Systems for Large-Scale AI Applications"],
    ["017", "Privacy-Preserving Machine Learning with Federated Learning and Differential Privacy"],
    ["018", "AI Software Supply-Chain Security and Vulnerability Detection"],
    ["019", "Human-AI Collaboration in Scientific Writing and Research Workflows"],
    ["020", "Causal Representation Learning and Causal Discovery in Deep Learning"],
    ["021", "Large Language Models for Generative Recommendation and User Behavior Modeling"],
    ["022", "AI-Driven Protein Design with Diffusion and Language Models"],
    ["023", "Single-Cell Foundation Models for Cell Type Annotation and Perturbation Prediction"],
    ["024", "Radiomics and Deep Learning for Tumor Diagnosis and Prognosis"],
    ["025", "Machine Learning for Solid-State Battery Materials Discovery"],
    ["026", "Machine Learning for Electrocatalyst Discovery in Energy Conversion"],
    ["027", "Deep Learning for Extreme Weather Forecasting"],
    ["028", "Foundation Models for Satellite Earth Observation"],
    ["029", "Deep Learning for Financial Risk Modeling under Uncertainty"],
    ["030", "Bayesian Deep Learning for Uncertainty Quantification"],
  ].map(([id, title]) => ({ id, title }));
  const benchmarkMethods = [
    { id: "codex", label: "Codex", date: "26'07" },
    { id: "gptdr", label: "GPT DR", date: "26'07" },
    { id: "geminidr", label: "Gemini DR", date: "26'07" },
    { id: "naive_rag", label: "RAG", date: "26'07" },
    { id: "autosurvey", label: "AutoSurvey", date: "24'12", csOnly: true },
    { id: "surveyforge", label: "SurveyForge", date: "25'07", csOnly: true },
    { id: "lira", label: "LiRA", date: "26'02" },
    { id: "interactivesurvey", label: "InteractiveSurvey", date: "25'03" },
  ];
  let wheelLocked = false;
  let lakeAutoplaying = false;
  let lakeHasPlayed = false;

  function replaceChildren(element, children) {
    if (!element) return;
    element.replaceChildren(...children);
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function citation(text) {
    return createElement("span", "mini-citation", text);
  }

  function coloredDAS() {
    const acronym = createElement("span", "colored-das");
    acronym.append(
      createElement("b", "initial-d", "D"),
      createElement("b", "initial-a", "A"),
      createElement("b", "initial-s", "S"),
    );
    return acronym;
  }

  function accentDAS(root) {
    if (!root) return;
    const textNodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (
          !node.nodeValue?.includes("DAS") ||
          node.parentElement?.closest(".colored-das, .hero-abstract")
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      node.nodeValue.split(/(DAS)/g).forEach((part) => {
        fragment.append(part === "DAS" ? coloredDAS() : document.createTextNode(part));
      });
      node.replaceWith(fragment);
    });
  }

  function setRichParagraph(element, pieces) {
    if (!element) return;
    replaceChildren(
      element,
      pieces.map((piece) =>
        typeof piece === "string" ? document.createTextNode(piece) : citation(piece.citation),
      ),
    );
  }

  function updateOutlineLabel(element, label) {
    if (!element) return;
    const textNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.nodeValue = ` ${label}`;
  }

  function enhanceCandidateRows(root = document) {
    const rows = [];
    if (root instanceof Element && root.matches(".candidate-row, .candidate-source-row, .candidate-flight")) {
      rows.push(root);
    }
    root.querySelectorAll?.(".candidate-row, .candidate-source-row, .candidate-flight").forEach((row) => {
      rows.push(row);
    });

    Array.from(new Set(rows)).forEach((row) => {
      const oldTitle = row.querySelector(":scope > strong");
      if (oldTitle && !row.querySelector(":scope > .candidate-copy")) {
        const copy = createElement("span", "candidate-copy");
        copy.append(
          createElement("strong", "", "Candidate papers on"),
          createElement("small", "", surveyTopic),
        );
        oldTitle.replaceWith(copy);
      }
    });
  }

  function polishLakeLabel() {
    const label = document.querySelector(".lake-label");
    if (!label || label.dataset.polished) return;
    label.dataset.polished = "true";
    label.setAttribute("aria-label", "Literature Metadata Lake, dynamically updated");
    const arc = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    arc.setAttribute("class", "lake-label-arc");
    arc.setAttribute("viewBox", "0 0 1000 150");
    arc.setAttribute("aria-hidden", "true");
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const titlePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    titlePath.setAttribute("id", "lake-label-title-path");
    titlePath.setAttribute("d", "M 80 92 Q 500 120 920 92");
    const detailPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    detailPath.setAttribute("id", "lake-label-detail-path");
    detailPath.setAttribute("d", "M 210 128 Q 500 145 790 128");
    defs.append(titlePath, detailPath);

    const makeArcText = (className, href, content) => {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("class", className);
      const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
      textPath.setAttribute("href", href);
      textPath.setAttribute("startOffset", "50%");
      textPath.setAttribute("text-anchor", "middle");
      textPath.textContent = content;
      text.append(textPath);
      return text;
    };
    arc.append(
      defs,
      makeArcText("lake-label-title-arc", "#lake-label-title-path", "Literature Metadata Lake"),
      makeArcText("lake-label-detail-arc", "#lake-label-detail-path", "(Dynamically Updated)"),
    );
    replaceChildren(label, [arc]);
    const lake = document.querySelector(".lake-object");
    if (lake && label.parentElement !== lake) lake.append(label);
  }

  function polishNavigationToggle() {
    const toggle = document.querySelector(".navigation-toggle");
    if (!toggle || toggle.dataset.polished) return;
    toggle.dataset.polished = "true";
    toggle.setAttribute("aria-label", "Toggle section navigation");
    toggle.setAttribute("title", "Toggle navigation");
    replaceChildren(toggle, [createElement("span", "navigation-toggle-glyph")]);
  }

  function benchmarkPdf(method, topicId) {
    const folder = method === "das" ? "DAS" : method;
    return `./examples/benchmark/pdfs/${folder}/${topicId}.pdf`;
  }

  function buildBenchmarkReader(method, topic) {
    const reader = createElement("article", "benchmark-reader");

    if (method.csOnly && Number(topic.id) > 21) {
      const missing = createElement("div", "benchmark-result-missing");
      missing.append(
        createElement("strong", "", "No PDF result is available."),
        createElement(
          "span",
          "",
          `${method.label} uses a released corpus covering CS topics only; Topic ${topic.id} is outside that scope.`,
        ),
      );
      reader.append(missing);
      return reader;
    }

    const frame = createElement("iframe", "benchmark-pdf");
    frame.src = benchmarkPdf(method.id, topic.id);
    frame.title = `${method.label} survey on ${topic.title}`;
    frame.loading = "lazy";
    reader.append(frame);
    return reader;
  }

  function rebuildBenchmark() {
    const benchmark = document.querySelector(".benchmark");
    if (!benchmark || benchmark.dataset.rebuilt) return;
    benchmark.dataset.rebuilt = "true";
    let activeTopic = benchmarkTopics[2];
    let activeMethod = benchmarkMethods[0];

    const overview = createElement("section", "benchmark-overview");
    const benchmarkTitle = createElement("h2", "benchmark-title");
    benchmarkTitle.append(coloredDAS(), document.createTextNode("-Bench"));
    const evidence = createElement("div", "benchmark-evidence");
    [
      ["01", "./assets/das_bench_web.png", "DAS-Bench & Results quantitative results"],
      ["02", "./assets/das_exps_web.png", "Qualitative manuscript comparison results"],
    ].forEach(([index, source, alt]) => {
      const figureClass = index === "01" ? "benchmark-result-figure" : "benchmark-qualitative-figure";
      const figure = createElement("figure", `benchmark-image-panel ${figureClass}`);
      const link = createElement("a");
      link.href = source;
      link.target = "_blank";
      link.rel = "noreferrer";
      const image = createElement("img");
      image.src = source;
      image.alt = alt;
      link.append(image);
      figure.append(link);
      evidence.append(figure);
    });
    overview.append(benchmarkTitle, evidence);

    const explorer = createElement("section", "benchmark-explorer");
    const matrix = createElement("div", "benchmark-matrix");
    const corner = createElement("div", "benchmark-corner");
    corner.append(createElement("strong", "", "Methods"), createElement("span", "", "30 Topics"));

    const methodPanel = createElement("div", "benchmark-methods");
    const ours = createElement("div", "benchmark-ours");
    ours.append(createElement("strong", "", "DAS (Ours)"));
    methodPanel.append(ours);
    const baselineButtons = createElement("div", "benchmark-method-buttons");

    const topicPanel = createElement("div", "benchmark-topics");
    const topicButtons = [];
    benchmarkTopics.forEach((topic) => {
      const button = createElement("button", "benchmark-topic");
      button.type = "button";
      button.append(createElement("span", "topic-index", topic.id), createElement("strong", "topic-title", topic.title));
      button.addEventListener("click", () => {
        activeTopic = topic;
        refresh();
      });
      topicButtons.push([topic, button]);
      topicPanel.append(button);
    });

    const readers = createElement("div", "benchmark-readers");
    const methodButtons = [];
    benchmarkMethods.forEach((method) => {
      const button = createElement("button", "benchmark-method-button");
      button.type = "button";
      button.append(createElement("strong", "", method.label), createElement("small", "", `(${method.date})`));
      button.addEventListener("click", () => {
        activeMethod = method;
        refresh();
      });
      methodButtons.push([method, button]);
      baselineButtons.append(button);
    });
    methodPanel.append(baselineButtons);

    function refresh() {
      topicButtons.forEach(([topic, button]) => button.classList.toggle("active", topic.id === activeTopic.id));
      methodButtons.forEach(([method, button]) => button.classList.toggle("active", method.id === activeMethod.id));
      replaceChildren(readers, [
        buildBenchmarkReader({ id: "das", label: "DAS (Ours)", date: "" }, activeTopic),
        buildBenchmarkReader(activeMethod, activeTopic),
      ]);
    }

    matrix.append(corner, methodPanel, topicPanel, readers);
    explorer.append(matrix);
    replaceChildren(benchmark, [overview, explorer]);
    refresh();
  }

  const galleryCategories = [
    ["1_Foundation Model", "Foundation Model"],
    ["2_Vision Foundation Model", "Vision Foundation Model"],
    ["3_Multimodal Large Models", "Multimodal Large Models"],
    ["4_Generative AI", "Generative AI / Diffusion / Video Generation"],
    ["5_3D Spatial Intelligence", "3D / Spatial Intelligence"],
    ["6_Embodied AI Robotics", "Embodied AI / Robotics"],
    ["7_AI Agent Reasoning", "AI Agent / Reasoning"],
    ["8_Data-centric AI", "Data-centric AI"],
    ["9_Emerging Cross-disciplinary Topics", "Emerging Cross-disciplinary Topics"],
    ["TOP_Popularity", "Top 20 High-Potential Topics"],
  ].map(([id, label]) => ({ id, label }));

  function galleryPdf(topic) {
    return encodeURI(`./examples/gallery/${topic.category}/${topic.file}`);
  }

  function rebuildGallery() {
    const gallery = document.querySelector(".gallery");
    const manifest = window.DAS_GALLERY_MANIFEST;
    if (!gallery || gallery.dataset.rebuilt || !Array.isArray(manifest) || manifest.length !== 220) return;
    gallery.dataset.rebuilt = "true";

    let activeCategory = galleryCategories[0];
    let activeTopic = manifest.find((topic) => topic.category === activeCategory.id);

    const heading = createElement("h2", "gallery-headline");
    heading.append(
      createElement("strong", "gallery-count", "220"),
      document.createTextNode(" topics automatically generated by "),
      coloredDAS(),
    );

    const shell = createElement("div", "das-gallery-shell");
    const library = createElement("aside", "gallery-library");
    library.setAttribute("aria-label", "Survey topic library");
    const categoryGrid = createElement("div", "gallery-category-grid");
    const topicList = createElement("div", "gallery-topic-list");
    topicList.setAttribute("role", "listbox");
    topicList.setAttribute("aria-label", "Topics in selected research area");

    const reader = createElement("article", "gallery-reader");
    const readerHead = createElement("header", "gallery-reader-head");
    const readerIndex = createElement("span", "gallery-reader-index");
    const readerTitle = createElement("h3", "gallery-reader-title");
    readerHead.append(readerIndex, readerTitle);
    const pdfShell = createElement("div", "gallery-pdf-shell");
    const frame = createElement("iframe", "gallery-pdf");
    frame.loading = "lazy";
    pdfShell.append(frame);
    reader.append(readerHead, pdfShell);
    library.append(categoryGrid, topicList);
    shell.append(library, reader);

    const categoryButtons = [];
    const topicButtons = [];

    function setReader(topic) {
      readerIndex.replaceChildren(
        document.createTextNode("Manuscript "),
        createElement("b", "", topic.id),
        document.createTextNode(" / 220"),
      );
      readerTitle.textContent = topic.title;
      frame.src = galleryPdf(topic);
      frame.title = `${topic.id}: ${topic.title}`;
    }

    function renderTopics() {
      replaceChildren(topicList, []);
      topicButtons.length = 0;
      manifest.filter((topic) => topic.category === activeCategory.id).forEach((topic) => {
        const button = createElement("button", "gallery-topic");
        button.type = "button";
        button.setAttribute("role", "option");
        button.append(
          createElement("span", "gallery-topic-id", topic.id),
          createElement("strong", "gallery-topic-title", topic.title),
        );
        button.addEventListener("click", () => {
          activeTopic = topic;
          refresh();
        });
        topicButtons.push([topic, button]);
        topicList.append(button);
      });
    }

    function refresh() {
      categoryButtons.forEach(([category, button]) => button.classList.toggle("active", category.id === activeCategory.id));
      topicButtons.forEach(([topic, button]) => {
        const selected = topic.id === activeTopic.id;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-selected", String(selected));
      });
      setReader(activeTopic);
    }

    galleryCategories.forEach((category, index) => {
      const button = createElement("button", `gallery-category${index === galleryCategories.length - 1 ? " gallery-category-wide" : ""}`);
      button.type = "button";
      button.textContent = category.label;
      button.addEventListener("click", () => {
        activeCategory = category;
        activeTopic = manifest.find((topic) => topic.category === category.id);
        renderTopics();
        topicList.scrollTop = 0;
        refresh();
      });
      categoryButtons.push([category, button]);
      categoryGrid.append(button);
    });

    renderTopics();
    replaceChildren(gallery, [heading, shell]);
    refresh();
  }

  function applyPublicContent() {
    const heroAuthors = document.querySelectorAll(".hero-authors span");
    const tengAffiliation = heroAuthors[2]?.querySelector("sup");
    if (tengAffiliation) tengAffiliation.textContent = "2";

    const affiliation = document.querySelector(".hero-affiliation");
    if (affiliation && !affiliation.dataset.expanded) {
      affiliation.dataset.expanded = "true";
      const zju = createElement("span");
      zju.append(createElement("sup", "", "1"), document.createTextNode(" Zhejiang University"));
      const sjtu = createElement("span");
      sjtu.append(createElement("sup", "", "2"), document.createTextNode(" Shanghai Jiao Tong University"));
      replaceChildren(affiliation, [zju, sjtu]);
    }

    const resourceLinks = [
      ["Code", "https://github.com/ZhikaiXu24/DAS"],
      ["Huggingface", "https://huggingface.co/datasets/ZhikaiXu24/DAS-2M"],
    ];
    document.querySelectorAll(".hero-resources > span").forEach((resource) => {
      const label = resource.querySelector(".resource-das-label")?.textContent?.trim();
      const target = resourceLinks.find(([name]) => name === label);
      if (!target) return;
      const link = createElement("a", "hero-resource-link");
      link.href = target[1];
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      const publicLabel = target[0] === "Huggingface" ? "Data" : target[0];
      link.setAttribute("aria-label", `${publicLabel} for DAS`);
      while (resource.firstChild) link.append(resource.firstChild);
      const visibleLabel = link.querySelector(".resource-das-label");
      if (visibleLabel) visibleLabel.textContent = publicLabel;
      resource.replaceWith(link);
    });

    const statement = document.querySelector(".hero-statement");
    if (statement && !document.querySelector(".hero-abstract")) {
      const abstract = createElement("p", "hero-abstract");
      abstract.append(
        createElement("strong", "hero-abstract-label", "Abstract:"),
        createElement(
          "span",
          "hero-abstract-copy",
          "Academic surveys play a central role in organizing rapidly expanding scholarly literature, yet their construction requires extensive paper analysis, coherent knowledge organization, fine-grained citation support, and reliable manuscript assembly. Existing Deep Research and automated survey generation systems address parts of this process, but typically do not coordinate paper understanding, literature organization, evidence-grounded drafting, and manuscript validation through a shared, revisable state. We introduce DAS, a stateful agentic framework for generating publication-oriented academic surveys. Its key idea is to separate reusable paper analysis from topic-specific manuscript construction. DAS builds on DAS-2M, a dynamically updated metadata lake containing survey-oriented representations of approximately two million papers. Its agents maintain explicit literature, organization, writing, and finalization states through candidate-grounded taxonomy planning, reverse paper-to-section routing, and hierarchical claim and citation planning. Semantic review reactivates only the affected writing states for repair and reevaluation, forming a scoped closed loop with deterministic validation. We further introduce DAS-Bench, a 30-topic benchmark, together with DAS-Eval, which assesses scholarly citation quality, taxonomic synthesis, hierarchical discourse, and manuscript assembly reliability through 16 criteria. Among systems evaluated on all 30 topics, DAS achieves the highest average in all four dimensions, with an overall score of 4.34 compared with 4.03 for the strongest competitor, and the same ordering is preserved on the matched 21-topic CS subset. Blinded expert evaluation further prefers DAS to Naive RAG on 27 of 30 topics and to AutoSurvey on 19 of 21 shared CS topics.",
        ),
      );
      statement.after(abstract);
    }

    const navigationLabels = [
      "Why DAS",
      "How DAS Works",
      "DAS-Bench & Results",
      "Surveys by DAS",
    ];

    document.querySelectorAll(".hero-button").forEach((button, index) => {
      const label = button.querySelector("span");
      if (label) label.textContent = navigationLabels[index];
      const arrow = button.querySelector("i");
      if (arrow) arrow.textContent = "↓";
      if (!button.querySelector(".hero-button-index")) {
        button.prepend(createElement("b", "hero-button-index", String(index + 1).padStart(2, "0")));
      }
    });

    document.querySelectorAll(".section-navigation nav button strong").forEach((label, index) => {
      label.textContent = navigationLabels[index];
    });

    const highlightParagraphs = document.querySelectorAll(".highlights article .highlight-content p");
    if (highlightParagraphs.length >= 3) {
      replaceChildren(highlightParagraphs[0], [
        document.createTextNode("A stateful agentic framework for "),
        createElement("strong", "publication-accent", "publication-oriented academic survey generation"),
        document.createTextNode(", connecting literature discovery, organization, citation-grounded writing, closed-loop review, and manuscript finalization in one end-to-end workflow."),
      ]);
      replaceChildren(highlightParagraphs[1], [
        document.createTextNode("A persistent and dynamically updated literature metadata lake that provides reusable, "),
        createElement("strong", "highlight-emphasis", "survey-oriented representations"),
        document.createTextNode(" of approximately "),
        createElement("strong", "highlight-emphasis", "2 million papers"),
        document.createTextNode("."),
      ]);
      replaceChildren(highlightParagraphs[2], [
        document.createTextNode("A "),
        createElement("strong", "highlight-emphasis", "30-topic multi-domain benchmark"),
        document.createTextNode(" for academic survey generation, paired with "),
        createElement("strong", "highlight-emphasis", "DAS-Eval"),
        document.createTextNode(", a 16-criterion evaluation suite designed specifically for "),
        createElement("strong", "publication-accent", "publication-oriented academic surveys"),
        document.createTextNode(", covering scholarly citation, taxonomic synthesis, hierarchical discourse, and manuscript reliability."),
      ]);
    }

    const topicInput = document.querySelector(".topic-input strong");
    if (topicInput && !topicInput.dataset.expanded) {
      topicInput.dataset.expanded = "true";
      replaceChildren(topicInput, [
        createElement("span", "", "User survey topic:"),
        createElement("b", "", surveyTopic),
      ]);
    }
    document.querySelector(".topic-cloud")?.remove();
    polishLakeLabel();

    const candidateStack = document.querySelector(".candidate-stack");
    if (candidateStack) {
      const title = candidateStack.querySelector(":scope > strong");
      const detail = candidateStack.querySelector(":scope > small");
      if (title) title.textContent = "Candidate papers on";
      if (detail) detail.textContent = surveyTopic;
    }

    enhanceCandidateRows();

    const storyKicker = document.querySelector(".story-kicker");
    if (storyKicker) storyKicker.textContent = "The Agentic Survey in Action";

    const storyList = document.querySelector(".story-steps ol");
    if (storyList && !document.querySelector(".story-outcome")) {
      const outcome = createElement("div", "story-outcome");
      outcome.append(
        document.createTextNode("A stateful agentic loop for generating "),
        createElement("strong", "publication-accent", "publication-oriented"),
        document.createTextNode(" academic surveys."),
      );
      storyList.after(outcome);
    }

    document.querySelectorAll(".paper-title").forEach((title) => {
      title.textContent = "Retrieval-Augmented Generation for Large Language Models: A Survey";
    });

    document.querySelectorAll(".outline-view").forEach((outline) => {
      const nodes = outline.querySelectorAll(".outline-node b");
      ["Introduction", "Foundations", "Retrieval Architectures", "Evaluation", "Conclusion"].forEach(
        (label, index) => {
          if (nodes[index]) nodes[index].textContent = label;
        },
      );
      const children = outline.querySelectorAll(".outline-children > div:not(.outline-ellipsis)");
      updateOutlineLabel(children[0], "3.1 Modular RAG");
      updateOutlineLabel(children[1], "3.2 Agentic RAG");
    });

    const plan = document.querySelector(".plan-view");
    if (plan) {
      const breadcrumb = plan.querySelector(".zoom-breadcrumb");
      const heading = plan.querySelector("h3");
      const objective = plan.querySelector(".section-objective");
      if (breadcrumb) breadcrumb.textContent = "3 / Retrieval Architectures";
      if (heading) heading.textContent = "3.2 Agentic RAG";
      if (objective) {
        objective.textContent =
          "Explain how agents plan retrieval, use tool feedback, and control iterative evidence acquisition.";
      }
      const cards = plan.querySelectorAll(".plan-card");
      const planItems = [
        ["Iterative retrieval and planning", "[18] [34]"],
        ["Tool use and feedback-guided retrieval", "[46] [52] [57] [63]"],
        ["Verification and stopping control", "[27] [43]"],
      ];
      cards.forEach((card, index) => {
        const title = card.querySelector("b");
        const references = card.querySelector("small");
        if (title) title.textContent = planItems[index][0];
        if (references) references.textContent = planItems[index][1];
      });
    }

    const claimPlan = document.querySelector(".claim-view");
    if (claimPlan) {
      const breadcrumb = claimPlan.querySelector(".zoom-breadcrumb");
      if (breadcrumb) breadcrumb.textContent = "3.2 Agentic RAG";
      const cards = claimPlan.querySelectorAll(".claim-card");
      const claims = [
        ["Agentic retrieval systems organize complex information needs into iterative search decisions.", "Support · [18, 34]"],
        ["Agentic RAG adapts evidence gathering through tool feedback, query reformulation, and complementary retrieval.", "Support · [46, 52, 57]"],
        ["Flexible retrieval requires explicit stopping and verification policies to preserve traceability.", "Support · [27, 43, 63]"],
      ];
      cards.forEach((card, index) => {
        card.classList.add("claim-paragraph");
        const claimText = card.querySelector("p");
        const support = card.querySelector("small");
        if (claimText) claimText.textContent = claims[index][0];
        if (support) support.textContent = claims[index][1];
      });
    }

    document.querySelectorAll(".prose-view").forEach((prose, proseIndex) => {
      const journal = prose.querySelectorAll(".journal-line span");
      if (journal[0]) journal[0].textContent = "3.2 Agentic RAG";
      if (journal[1]) journal[1].textContent = "Paragraph 02";
      const heading = prose.querySelector("h3");
      if (heading) heading.textContent = "Tool use and feedback-guided retrieval";
      const oldParagraph = prose.querySelector(":scope > p");
      if (oldParagraph) oldParagraph.remove();
      if (proseIndex === 1 && heading) heading.textContent = "Validated subsection";
      const paragraphSets = [
        [
          "Agentic retrieval systems organize complex information needs into iterative search decisions. Planning exposes intermediate objectives and allows the agent to revise its search trajectory as evidence accumulates ",
          { citation: "[18, 34]" },
          ".",
        ],
        [
          "Agentic RAG decomposes retrieval into iterative search actions that adapt evidence gathering to the evolving information need ",
          { citation: "[46]" },
          ". Tool feedback enables query reformulation and complementary evidence acquisition when initial results remain incomplete ",
          { citation: "[52, 57]" },
          ".",
        ],
        [
          "Flexible retrieval requires explicit stopping and verification policies. These controls bound retrieval, preserve traceability, and reduce unsupported synthesis across long search trajectories ",
          { citation: "[27, 43, 63]" },
          ".",
        ],
      ];
      paragraphSets.forEach((pieces) => {
        const paragraph = createElement("p");
        setRichParagraph(paragraph, pieces);
        prose.append(paragraph);
      });
    });

    const review = document.querySelector(".review-view");
    if (review) {
      const journal = review.querySelectorAll(".journal-line span");
      if (journal[0]) journal[0].textContent = "3.2 Agentic RAG";
      if (journal[1]) journal[1].textContent = "Subsection review";
      const paragraphs = review.querySelectorAll(".review-prose p");
      setRichParagraph(paragraphs[0], [
        "Agentic retrieval systems organize complex information needs into iterative search decisions. Planning exposes intermediate objectives and allows the agent to revise its search trajectory as evidence accumulates ",
        { citation: "[18, 34]" },
        "…",
      ]);
      setRichParagraph(paragraphs[1], [
        "Agentic RAG decomposes retrieval into iterative search actions that adapt evidence gathering to the evolving information need ",
        { citation: "[46]" },
        ". Tool feedback enables query reformulation and complementary evidence acquisition when initial results remain incomplete ",
        { citation: "[52, 57]" },
        "…",
      ]);
      setRichParagraph(paragraphs[2], [
        "The same flexibility creates a need for explicit stopping and verification policies. These controls bound retrieval, preserve traceability, and reduce unsupported synthesis across long search trajectories ",
        { citation: "[27, 43, 63]" },
        "…",
      ]);
      const reviewNote = review.querySelector(".review-actions small");
      if (reviewNote) {
        reviewNote.textContent = "* In DAS, the reviewer agent automatically selects and executes the scoped action.";
      }
    }

    document.querySelector(".story-note")?.remove();
    polishNavigationToggle();
    rebuildBenchmark();
    rebuildGallery();
    accentDAS(document.querySelector("main"));

    const footer = document.querySelector("footer");
    if (footer && !footer.dataset.polished) {
      footer.dataset.polished = "true";
      const navButton = createElement("button", "footer-nav-trigger");
      navButton.type = "button";
      navButton.setAttribute("aria-label", "Toggle section navigation");
      navButton.append(createElement("span", "footer-nav-glyph"));

      const brand = createElement("span", "footer-brand");
      const acronym = createElement("span", "footer-acronym");
      acronym.append(
        createElement("b", "footer-d", "D"),
        createElement("b", "footer-a", "A"),
        createElement("b", "footer-s", "S"),
      );
      const description = createElement("i");
      description.append(
        document.createTextNode(" : "),
        createElement("strong", "publication-accent", "publication-oriented"),
        document.createTextNode(" academic survey automation"),
      );
      brand.append(acronym, description);

      const topLink = createElement("a", "", "↑");
      topLink.href = "#top";
      topLink.setAttribute("aria-label", "Back to top");

      replaceChildren(footer, [navButton, brand, topLink]);
    }
  }

  function lockWheel(duration) {
    wheelLocked = true;
    window.setTimeout(() => {
      wheelLocked = false;
    }, duration);
  }

  function smoothScrollTo(top) {
    window.scrollTo({ top, behavior: "smooth" });
  }

  function playLakeSequence(lake) {
    if (lakeAutoplaying) return;
    lakeAutoplaying = true;
    lakeHasPlayed = true;
    document.documentElement.classList.add("lake-autoplaying");
    const rect = lake.getBoundingClientRect();
    const from = window.scrollY + rect.top;
    const to = from + lake.offsetHeight;
    const duration = 4000;
    const startedAt = performance.now();
    const ease = (value) =>
      value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

    function frame(now) {
      const progress = clamp((now - startedAt) / duration, 0, 1);
      const scrollProgress = ease(progress);
      document.documentElement.dataset.lakePhase =
        progress < 0.35 ? "topic" : progress < 0.55 ? "processing" : progress < 0.8 ? "candidates" : "handoff";
      window.scrollTo({ top: from + (to - from) * scrollProgress, behavior: "auto" });
      if (progress < 1) {
        window.requestAnimationFrame(frame);
      } else {
        lakeAutoplaying = false;
        document.documentElement.classList.remove("lake-autoplaying");
        delete document.documentElement.dataset.lakePhase;
      }
    }
    window.requestAnimationFrame(frame);
  }

  function scrollStoryTo(story, stage) {
    const rect = story.getBoundingClientRect();
    const scrollable = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp((stage + 0.22) / 10, 0.02, 0.94);
    smoothScrollTo(window.scrollY + rect.top + scrollable * progress);
  }

  function storyStageTop(story, stage) {
    const rect = story.getBoundingClientRect();
    const scrollable = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp((stage + 0.22) / 10, 0.02, 0.94);
    return window.scrollY + rect.top + scrollable * progress;
  }

  function jumpStoryTo(story, stage) {
    document.documentElement.classList.add("direct-story-jump");
    window.scrollTo({ top: storyStageTop(story, stage), behavior: "auto" });
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.documentElement.classList.remove("direct-story-jump");
    }));
  }

  function sectionProgress(section) {
    const rect = section.getBoundingClientRect();
    const distance = Math.max(1, rect.height - window.innerHeight);
    return clamp(-rect.top / distance, 0, 1);
  }

  function handleSteppedWheel(event) {
    if (wheelLocked || Math.abs(event.deltaY) < 8 || event.ctrlKey) return;

    const lake = document.querySelector(".lake-sequence");
    const story = document.querySelector(".story-sequence");
    if (!lake || !story) return;

    const lakeRect = lake.getBoundingClientRect();
    const lakeActive = lakeRect.top <= 2 && lakeRect.bottom >= window.innerHeight - 2;

    if (lakeActive) {
      if (event.deltaY > 0 && !lakeHasPlayed && sectionProgress(lake) < 0.12) {
        event.preventDefault();
        playLakeSequence(lake);
        return;
      }
      if (lakeAutoplaying) {
        event.preventDefault();
        return;
      }
      const progress = sectionProgress(lake);
      const marks = [0, 0.52, 1];
      const current = progress < 0.26 ? 0 : progress < 0.76 ? 1 : 2;
      const next = clamp(current + (event.deltaY > 0 ? 1 : -1), 0, marks.length - 1);

      if (next !== current) {
        event.preventDefault();
        const rect = lake.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - window.innerHeight);
        const target =
          next === marks.length - 1
            ? window.scrollY + rect.top + rect.height
            : window.scrollY + rect.top + scrollable * marks[next];
        smoothScrollTo(target);
        lockWheel(860);
      }
      return;
    }

    const storyRect = story.getBoundingClientRect();
    const storyActive = storyRect.top <= 2 && storyRect.bottom >= window.innerHeight - 2;
    if (!storyActive) return;

    const steps = Array.from(story.querySelectorAll(".story-step-button"));
    const active = steps.findIndex((button) => button.closest("li")?.classList.contains("active"));
    const direction = event.deltaY > 0 ? 1 : -1;

    if (direction > 0 && active < steps.length - 1) {
      event.preventDefault();
      scrollStoryTo(story, Math.max(1, active + 2));
      lockWheel(720);
      return;
    }

    if (direction < 0) {
      event.preventDefault();
      if (active > 0) {
        scrollStoryTo(story, active);
      } else {
        smoothScrollTo(window.scrollY + storyRect.top);
      }
      lockWheel(720);
    }
  }

  function bindNavigationHelpers() {
    const footerTrigger = document.querySelector(".footer-nav-trigger");
    if (footerTrigger && !footerTrigger.dataset.clickBound) {
      footerTrigger.dataset.clickBound = "true";
      footerTrigger.addEventListener("click", () => {
        const shell = document.querySelector(".navigation-shell");
        const control = shell?.classList.contains("nav-collapsed")
          ? document.querySelector(".navigation-reopen")
          : document.querySelector(".navigation-toggle");
        control?.click();
      });
    }

    const story = document.querySelector(".story-sequence");
    if (story && !story.dataset.smoothBound) {
      story.dataset.smoothBound = "true";
      story.addEventListener("click", (event) => {
        const stepButton = event.target.closest(".story-step-button");
        if (stepButton) {
          event.preventDefault();
          event.stopImmediatePropagation();
          const steps = Array.from(story.querySelectorAll(".story-step-button"));
          const index = steps.indexOf(stepButton);
          if (index >= 0) jumpStoryTo(story, index + 1);
          return;
        }

        const decision = event.target.closest(".review-actions button");
        if (!decision) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        const label = decision.querySelector("b")?.textContent;
        if (label === "PASS") {
          document.getElementById("manuscripts")?.scrollIntoView({ behavior: "auto" });
          return;
        }
        const stage = { DIRECT_EDIT: 5, REPLAN_PARAGRAPH: 4, REPLAN_SECTION: 3 }[label];
        if (stage) jumpStoryTo(story, stage);
      }, true);
    }
  }

  function initialize() {
    window.requestAnimationFrame(() => {
      applyPublicContent();
      bindNavigationHelpers();
      window.addEventListener("wheel", handleSteppedWheel, { passive: false });
      window.addEventListener("hashchange", () => {
        if (window.location.hash === "#method") lakeHasPlayed = false;
      });

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) enhanceCandidateRows(node);
          });
        });
        bindNavigationHelpers();
      });
      const observerRoot = document.getElementById("root") || document.body;
      if (observerRoot instanceof Node) {
        observer.observe(observerRoot, { childList: true, subtree: true });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
