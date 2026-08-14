/*
 * Canonical survey-topic catalogue for the DAS manuscript gallery.
 * Source: the 10 ordered topic groups specified for the project page.
 */
(function registerDASSurveyTopicGroups() {
  const groups = [
  {
    "id": "foundation-model",
    "roman": "I",
    "title": "Foundation Model",
    "range": "1–20",
    "topics": [
      {
        "id": 1,
        "title": "Foundation Models: From Task-Specific AI to General Intelligence"
      },
      {
        "id": 2,
        "title": "A Survey on Scaling Laws of Foundation Models"
      },
      {
        "id": 3,
        "title": "Data Scaling in Foundation Models: Quantity, Quality and Diversity"
      },
      {
        "id": 4,
        "title": "Post-training Paradigms for Foundation Models"
      },
      {
        "id": 5,
        "title": "Foundation Model Alignment: RLHF, RLAIF and Beyond"
      },
      {
        "id": 6,
        "title": "Efficient Foundation Models: Compression, Distillation and Adaptation"
      },
      {
        "id": 7,
        "title": "Open-source Foundation Models: Evolution, Ecosystem and Challenges"
      },
      {
        "id": 8,
        "title": "Foundation Models for Scientific Discovery"
      },
      {
        "id": 9,
        "title": "Foundation Models as General Purpose Reasoning Engines"
      },
      {
        "id": 10,
        "title": "Foundation Model Evaluation: Beyond Benchmark Saturation"
      },
      {
        "id": 11,
        "title": "Multimodal Foundation Models: A Unified Perspective"
      },
      {
        "id": 12,
        "title": "Foundation Models with External Memory"
      },
      {
        "id": 13,
        "title": "Continual Learning of Foundation Models"
      },
      {
        "id": 14,
        "title": "Personalized Foundation Models"
      },
      {
        "id": 15,
        "title": "Small Foundation Models: Towards Edge Intelligence"
      },
      {
        "id": 16,
        "title": "Mixture-of-Experts Foundation Models"
      },
      {
        "id": 17,
        "title": "Foundation Models Without Transformers"
      },
      {
        "id": 18,
        "title": "Neuro-inspired Foundation Models"
      },
      {
        "id": 19,
        "title": "World Knowledge Representation in Foundation Models"
      },
      {
        "id": 20,
        "title": "Foundation Models for Artificial General Intelligence"
      }
    ]
  },
  {
    "id": "vision-foundation-model",
    "roman": "II",
    "title": "Vision Foundation Model",
    "range": "21–45",
    "topics": [
      {
        "id": 21,
        "title": "Vision Foundation Models: Evolution from CNN to ViT and Beyond"
      },
      {
        "id": 22,
        "title": "Self-supervised Vision Foundation Models"
      },
      {
        "id": 23,
        "title": "Masked Image Modeling: A Comprehensive Survey"
      },
      {
        "id": 24,
        "title": "Vision Foundation Models for Dense Prediction"
      },
      {
        "id": 25,
        "title": "Universal Vision Encoders"
      },
      {
        "id": 26,
        "title": "Vision Models as General Perception Systems"
      },
      {
        "id": 27,
        "title": "DINO Family Models: Representation Learning Evolution"
      },
      {
        "id": 28,
        "title": "Vision Foundation Models in Embodied AI"
      },
      {
        "id": 29,
        "title": "Vision Foundation Models for Robotics"
      },
      {
        "id": 30,
        "title": "Promptable Vision Models"
      },
      {
        "id": 31,
        "title": "Segment Anything and Beyond: Universal Segmentation Models"
      },
      {
        "id": 32,
        "title": "Open Vocabulary Vision Models"
      },
      {
        "id": 33,
        "title": "Vision-Language Pretraining Evolution"
      },
      {
        "id": 34,
        "title": "Visual Representation Learning Without Labels"
      },
      {
        "id": 35,
        "title": "Large Vision Models: Architecture, Data and Scaling"
      },
      {
        "id": 36,
        "title": "Vision Model Adaptation: Prompt, Adapter and LoRA"
      },
      {
        "id": 37,
        "title": "Vision Foundation Models for Medical AI"
      },
      {
        "id": 38,
        "title": "Vision Foundation Models for Autonomous Driving"
      },
      {
        "id": 39,
        "title": "Vision Foundation Models for Remote Sensing"
      },
      {
        "id": 40,
        "title": "Vision Models Under Distribution Shift"
      },
      {
        "id": 41,
        "title": "Robust Vision Foundation Models"
      },
      {
        "id": 42,
        "title": "Efficient Vision Foundation Models"
      },
      {
        "id": 43,
        "title": "3D Vision Foundation Models"
      },
      {
        "id": 44,
        "title": "Video Vision Foundation Models"
      },
      {
        "id": 45,
        "title": "First-person Vision Foundation Models"
      }
    ]
  },
  {
    "id": "multimodal-large-models",
    "roman": "III",
    "title": "Multimodal Large Models",
    "range": "46–75",
    "topics": [
      {
        "id": 46,
        "title": "Vision-Language Models: A Comprehensive Survey"
      },
      {
        "id": 47,
        "title": "Multimodal Large Language Models: Architecture Evolution"
      },
      {
        "id": 48,
        "title": "Unified Multimodal Understanding and Generation"
      },
      {
        "id": 49,
        "title": "Multimodal Alignment Learning"
      },
      {
        "id": 50,
        "title": "Multimodal Instruction Tuning"
      },
      {
        "id": 51,
        "title": "Multimodal Reasoning"
      },
      {
        "id": 52,
        "title": "Chain-of-Thought in Multimodal Models"
      },
      {
        "id": 53,
        "title": "Visual Prompt Engineering"
      },
      {
        "id": 54,
        "title": "Multimodal Agents"
      },
      {
        "id": 55,
        "title": "Multimodal Retrieval-Augmented Generation"
      },
      {
        "id": 56,
        "title": "Multimodal Hallucination"
      },
      {
        "id": 57,
        "title": "Multimodal Evaluation Benchmarks"
      },
      {
        "id": 58,
        "title": "Multimodal Safety and Alignment"
      },
      {
        "id": 59,
        "title": "Audio-Visual Language Models"
      },
      {
        "id": 60,
        "title": "Video-Language Foundation Models"
      },
      {
        "id": 61,
        "title": "Long Video Understanding Models"
      },
      {
        "id": 62,
        "title": "Streaming Multimodal Models"
      },
      {
        "id": 63,
        "title": "Real-time Multimodal Interaction Models"
      },
      {
        "id": 64,
        "title": "Omni-modal Foundation Models"
      },
      {
        "id": 65,
        "title": "Multimodal Tokenization"
      },
      {
        "id": 66,
        "title": "Multimodal Representation Learning"
      },
      {
        "id": 67,
        "title": "Cross-modal Generation Models"
      },
      {
        "id": 68,
        "title": "Multimodal World Knowledge"
      },
      {
        "id": 69,
        "title": "Multimodal Reasoning Agents"
      },
      {
        "id": 70,
        "title": "Multimodal Memory Systems"
      },
      {
        "id": 71,
        "title": "Multimodal Retrieval Agents"
      },
      {
        "id": 72,
        "title": "Multimodal Model Compression"
      },
      {
        "id": 73,
        "title": "Multimodal Data Curation"
      },
      {
        "id": 74,
        "title": "Synthetic Multimodal Data Generation"
      },
      {
        "id": 75,
        "title": "Multimodal Foundation Models for Robotics"
      }
    ]
  },
  {
    "id": "generative-ai-diffusion-video-generation",
    "roman": "IV",
    "title": "Generative AI / Diffusion / Video Generation",
    "range": "76–100",
    "topics": [
      {
        "id": 76,
        "title": "Diffusion Models: From Images to World Simulation"
      },
      {
        "id": 77,
        "title": "Diffusion Models Beyond Generation"
      },
      {
        "id": 78,
        "title": "Controllable Diffusion Models"
      },
      {
        "id": 79,
        "title": "Efficient Diffusion Models"
      },
      {
        "id": 80,
        "title": "Diffusion Distillation"
      },
      {
        "id": 81,
        "title": "Consistency Models"
      },
      {
        "id": 82,
        "title": "Flow Matching Models"
      },
      {
        "id": 83,
        "title": "Diffusion Transformers"
      },
      {
        "id": 84,
        "title": "Text-to-Image Generation"
      },
      {
        "id": 85,
        "title": "Text-to-Video Generation"
      },
      {
        "id": 86,
        "title": "Video Foundation Models"
      },
      {
        "id": 87,
        "title": "Long Video Generation"
      },
      {
        "id": 88,
        "title": "Physics-aware Video Generation"
      },
      {
        "id": 89,
        "title": "3D-aware Generative Models"
      },
      {
        "id": 90,
        "title": "4D Generative Models"
      },
      {
        "id": 91,
        "title": "Interactive Video Generation"
      },
      {
        "id": 92,
        "title": "Generative World Models"
      },
      {
        "id": 93,
        "title": "Simulation via Generative Models"
      },
      {
        "id": 94,
        "title": "Generative Agents"
      },
      {
        "id": 95,
        "title": "Synthetic Data Generation"
      },
      {
        "id": 96,
        "title": "Data Generation for Foundation Models"
      },
      {
        "id": 97,
        "title": "AI-generated Content Detection"
      },
      {
        "id": 98,
        "title": "Generative Model Evaluation"
      },
      {
        "id": 99,
        "title": "Personalized Generation"
      },
      {
        "id": 100,
        "title": "Multimodal Generative Foundation Models"
      }
    ]
  },
  {
    "id": "spatial-intelligence",
    "roman": "V",
    "title": "3D / Spatial Intelligence",
    "range": "101–125",
    "topics": [
      {
        "id": 101,
        "title": "3D Foundation Models"
      },
      {
        "id": 102,
        "title": "NeRF Evolution and Beyond"
      },
      {
        "id": 103,
        "title": "3D Gaussian Splatting: Theory and Applications"
      },
      {
        "id": 104,
        "title": "Dynamic Neural Rendering"
      },
      {
        "id": 105,
        "title": "4D Reconstruction"
      },
      {
        "id": 106,
        "title": "Spatial Intelligence Foundation Models"
      },
      {
        "id": 107,
        "title": "3D Generative Models"
      },
      {
        "id": 108,
        "title": "Text-to-3D Generation"
      },
      {
        "id": 109,
        "title": "Image-to-3D Reconstruction"
      },
      {
        "id": 110,
        "title": "Video-to-3D Reconstruction"
      },
      {
        "id": 111,
        "title": "Large-scale Scene Reconstruction"
      },
      {
        "id": 112,
        "title": "Indoor Scene Understanding"
      },
      {
        "id": 113,
        "title": "Outdoor World Modeling"
      },
      {
        "id": 114,
        "title": "Semantic 3D Mapping"
      },
      {
        "id": 115,
        "title": "3D Vision-Language Models"
      },
      {
        "id": 116,
        "title": "Spatial Reasoning Models"
      },
      {
        "id": 117,
        "title": "Embodied Spatial Intelligence"
      },
      {
        "id": 118,
        "title": "3D Scene Graph Generation"
      },
      {
        "id": 119,
        "title": "Digital Twins with AI"
      },
      {
        "id": 120,
        "title": "Neural Simulation Environments"
      },
      {
        "id": 121,
        "title": "Virtual Worlds for AI Training"
      },
      {
        "id": 122,
        "title": "3D Dataset Generation"
      },
      {
        "id": 123,
        "title": "3D Representation Learning"
      },
      {
        "id": 124,
        "title": "Spatial Computing AI"
      },
      {
        "id": 125,
        "title": "Foundation Models for Metaverse"
      }
    ]
  },
  {
    "id": "embodied-ai-robotics",
    "roman": "VI",
    "title": "Embodied AI / Robotics",
    "range": "126–160",
    "topics": [
      {
        "id": 126,
        "title": "Embodied AI: From LLMs to World Models"
      },
      {
        "id": 127,
        "title": "Vision-Language-Action Models"
      },
      {
        "id": 128,
        "title": "Robot Foundation Models"
      },
      {
        "id": 129,
        "title": "Generalist Robot Policies"
      },
      {
        "id": 130,
        "title": "Robot Learning from Demonstrations"
      },
      {
        "id": 131,
        "title": "Large-scale Robot Datasets"
      },
      {
        "id": 132,
        "title": "Robot Data Engines"
      },
      {
        "id": 133,
        "title": "Synthetic Data for Robotics"
      },
      {
        "id": 134,
        "title": "Robot Simulation Foundation Models"
      },
      {
        "id": 135,
        "title": "World Models for Robotics"
      },
      {
        "id": 136,
        "title": "Interactive World Models"
      },
      {
        "id": 137,
        "title": "Physics-aware World Models"
      },
      {
        "id": 138,
        "title": "Robot Skill Learning"
      },
      {
        "id": 139,
        "title": "Hierarchical Robot Intelligence"
      },
      {
        "id": 140,
        "title": "Robot Agents"
      },
      {
        "id": 141,
        "title": "Embodied Multimodal Agents"
      },
      {
        "id": 142,
        "title": "Language-conditioned Robot Control"
      },
      {
        "id": 143,
        "title": "Vision-based Robot Manipulation"
      },
      {
        "id": 144,
        "title": "Dexterous Manipulation Learning"
      },
      {
        "id": 145,
        "title": "Humanoid Robot Intelligence"
      },
      {
        "id": 146,
        "title": "Whole-body Robot Control"
      },
      {
        "id": 147,
        "title": "Mobile Manipulation"
      },
      {
        "id": 148,
        "title": "Robot Navigation Foundation Models"
      },
      {
        "id": 149,
        "title": "Autonomous Driving Agents"
      },
      {
        "id": 150,
        "title": "Multi-robot Intelligence"
      },
      {
        "id": 151,
        "title": "Robot Reinforcement Learning"
      },
      {
        "id": 152,
        "title": "Offline RL for Robotics"
      },
      {
        "id": 153,
        "title": "Robot Imitation Learning"
      },
      {
        "id": 154,
        "title": "Learning from Human Videos"
      },
      {
        "id": 155,
        "title": "Egocentric Learning for Robots"
      },
      {
        "id": 156,
        "title": "Robot Memory Systems"
      },
      {
        "id": 157,
        "title": "Robot Continual Learning"
      },
      {
        "id": 158,
        "title": "Safe Embodied AI"
      },
      {
        "id": 159,
        "title": "Human-Robot Collaboration"
      },
      {
        "id": 160,
        "title": "Embodied AGI"
      }
    ]
  },
  {
    "id": "ai-agent-reasoning",
    "roman": "VII",
    "title": "AI Agent / Reasoning",
    "range": "161–180",
    "topics": [
      {
        "id": 161,
        "title": "Large Language Model Agents"
      },
      {
        "id": 162,
        "title": "Agent Architecture Evolution"
      },
      {
        "id": 163,
        "title": "Tool-using Agents"
      },
      {
        "id": 164,
        "title": "Multi-agent Systems with LLMs"
      },
      {
        "id": 165,
        "title": "Agent Memory"
      },
      {
        "id": 166,
        "title": "Agent Planning"
      },
      {
        "id": 167,
        "title": "Agent Reasoning"
      },
      {
        "id": 168,
        "title": "Agent Evaluation"
      },
      {
        "id": 169,
        "title": "Agent Benchmarking"
      },
      {
        "id": 170,
        "title": "Agent Safety"
      },
      {
        "id": 171,
        "title": "Coding Agents"
      },
      {
        "id": 172,
        "title": "Research Agents"
      },
      {
        "id": 173,
        "title": "Scientific Discovery Agents"
      },
      {
        "id": 174,
        "title": "Browser Agents"
      },
      {
        "id": 175,
        "title": "Computer-use Agents"
      },
      {
        "id": 176,
        "title": "Autonomous Workflow Agents"
      },
      {
        "id": 177,
        "title": "Agent Reinforcement Learning"
      },
      {
        "id": 178,
        "title": "Agent Self-improvement"
      },
      {
        "id": 179,
        "title": "Agent Simulation"
      },
      {
        "id": 180,
        "title": "Agent Society"
      }
    ]
  },
  {
    "id": "data-centric-ai",
    "roman": "VIII",
    "title": "Data-centric AI",
    "range": "181–195",
    "topics": [
      {
        "id": 181,
        "title": "Data-centric AI: From Dataset to Data Engine"
      },
      {
        "id": 182,
        "title": "Automatic Dataset Construction"
      },
      {
        "id": 183,
        "title": "AI Data Curation"
      },
      {
        "id": 184,
        "title": "Data Filtering for Foundation Models"
      },
      {
        "id": 185,
        "title": "High-quality Data Selection"
      },
      {
        "id": 186,
        "title": "Synthetic Data Pipeline"
      },
      {
        "id": 187,
        "title": "Data Annotation Agents"
      },
      {
        "id": 188,
        "title": "Automatic Labeling Systems"
      },
      {
        "id": 189,
        "title": "Data Mixture Optimization"
      },
      {
        "id": 190,
        "title": "Data Scaling Laws"
      },
      {
        "id": 191,
        "title": "Training Data Attribution"
      },
      {
        "id": 192,
        "title": "Dataset Governance"
      },
      {
        "id": 193,
        "title": "Data Security for AI"
      },
      {
        "id": 194,
        "title": "Private Data Foundation Models"
      },
      {
        "id": 195,
        "title": "Data Infrastructure for AI"
      }
    ]
  },
  {
    "id": "emerging-cross-disciplinary-topics",
    "roman": "IX",
    "title": "Emerging Cross-disciplinary Topics",
    "range": "196–200",
    "topics": [
      {
        "id": 196,
        "title": "AI for Physical World Intelligence"
      },
      {
        "id": 197,
        "title": "From Internet AI to Real-world AI"
      },
      {
        "id": 198,
        "title": "Artificial Intelligence Simulation Platforms"
      },
      {
        "id": 199,
        "title": "AI Systems Engineering for Foundation Models"
      },
      {
        "id": 200,
        "title": "The Road Toward Embodied Artificial General Intelligence"
      }
    ]
  },
  {
    "id": "future-high-value-survey-topics",
    "roman": "X",
    "title": "Future High-value Survey Topics",
    "range": "201–220",
    "topics": [
      {
        "id": 201,
        "title": "Vision-Language-Action Models"
      },
      {
        "id": 202,
        "title": "Robot Foundation Models"
      },
      {
        "id": 203,
        "title": "Interactive World Models"
      },
      {
        "id": 204,
        "title": "Embodied AI Data Engine"
      },
      {
        "id": 205,
        "title": "Spatial Intelligence Foundation Models"
      },
      {
        "id": 206,
        "title": "Video Foundation Models"
      },
      {
        "id": 207,
        "title": "4D World Models"
      },
      {
        "id": 208,
        "title": "Multimodal Agents"
      },
      {
        "id": 209,
        "title": "AI Research Agents"
      },
      {
        "id": 210,
        "title": "Synthetic Data for Foundation Models"
      },
      {
        "id": 211,
        "title": "Vision Foundation Models"
      },
      {
        "id": 212,
        "title": "Multimodal Understanding-Generation Models"
      },
      {
        "id": 213,
        "title": "Robot Learning from Human Videos"
      },
      {
        "id": 214,
        "title": "Generative Simulation"
      },
      {
        "id": 215,
        "title": "3D Gaussian Splatting Ecosystem"
      },
      {
        "id": 216,
        "title": "Long Video Understanding"
      },
      {
        "id": 217,
        "title": "Foundation Model Evaluation"
      },
      {
        "id": 218,
        "title": "Data-centric Foundation Models"
      },
      {
        "id": 219,
        "title": "Personalized Foundation Models"
      },
      {
        "id": 220,
        "title": "Edge Foundation Models"
      }
    ]
  }
];

  const topicIds = groups.flatMap((group) => group.topics.map((topic) => topic.id));
  const isContinuous = topicIds.length === 220 && topicIds.every((id, index) => id === index + 1);
  if (!isContinuous || new Set(topicIds).size !== 220) {
    throw new Error("DAS survey-topic data must contain exactly IDs 1–220 without gaps or duplicates.");
  }

  window.DASSurveyTopicGroups = groups;
})();


