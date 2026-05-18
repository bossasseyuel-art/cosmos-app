import type { Component } from "solid-js";
import { createSignal, For, Show } from "solid-js";
import "./App.css";

type Layer = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  status: "observable" | "hidden" | "validated";
};

type HypothesisResult = {
  hypothesis: string;
  domain: string;
  verdict: string;
  score: number;
};

type AnalysisResult = {
  m1: string;
  m2: string[];
  m3: {
    test: string;
    conclusion: string;
    status: string;
  };
};

const layers: Layer[] = [
  {
    id: "M1",
    title: "Observable",
    subtitle: "Zahir — ce qui apparaît",
    description:
      "Le niveau des faits visibles : données brutes, comportements, symptômes, événements mesurables.",
    icon: "👁",
    status: "observable",
  },
  {
    id: "M2",
    title: "Causal",
    subtitle: "Batin — ce qui produit",
    description:
      "Le niveau des mécanismes cachés : causes profondes, structures, intentions, dynamiques invisibles.",
    icon: "⚡",
    status: "hidden",
  },
  {
    id: "M3",
    title: "Validation",
    subtitle: "Haq / Batil — ce qui tient",
    description:
      "Le test de cohérence : si une hypothèse reste stable quand on l'étend à ses limites logiques.",
    icon: "🔬",
    status: "validated",
  },
];

const App: Component = () => {
  const [selectedLayer, setSelectedLayer] = createSignal<Layer>(layers[0]);
  const [inputValue, setInputValue] = createSignal("");
  const [isAnalyzing, setIsAnalyzing] = createSignal(false);
  const [result, setResult] = createSignal<AnalysisResult | null>(null);
  const [error, setError] = createSignal("");

  const handleAnalyze = async () => {
    const problem = inputValue().trim();
    if (!problem) return;

    setIsAnalyzing(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ m1: problem }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        m1: problem,
        m2: [
          `${problem} — hypothèse biologique`,
          `${problem} — hypothèse environnementale`,
          `${problem} — hypothèse comportementale`,
          `${problem} — hypothèse inconsciente`,
        ],
        m3: {
          test: "cohérence sous extension",
          conclusion: "Analyse locale générée (backend hors-ligne).",
          status: "HAQ_PARTIEL",
        },
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getVerdictColor = (status: string) => {
    if (status === "HAQ_PARTIEL") return "var(--neon-amber)";
    if (status === "HAQ") return "var(--neon-green)";
    return "var(--neon-red)";
  };

  return (
    <main class="app-shell">
      {/* Animated background */}
      <div class="bg-grid" />
      <div class="bg-glow bg-glow-1" />
      <div class="bg-glow bg-glow-2" />

      {/* Navigation */}
      <nav class="nav">
        <div class="nav-brand">
          <span class="nav-logo">◆</span>
          <span class="nav-name">COSMOS</span>
        </div>
        <div class="nav-links">
          <a href="#dashboard" class="nav-link">Dashboard</a>
          <a href="#analyze" class="nav-link">Analyser</a>
          <a href="#method" class="nav-link">Méthode</a>
        </div>
        <div class="nav-badge">LCCLU v2</div>
      </nav>

      {/* Hero */}
      <section class="hero">
        <div class="hero-tag">
          <span class="pulse-dot" />
          Système actif
        </div>

        <h1 class="hero-title">
          <span class="gradient-text">Cartographier</span> le réel.
          <br />
          <span class="gradient-text">Tester</span> la cohérence.
          <br />
          <span class="gradient-text">Séparer</span> le Haq du Batil.
        </h1>

        <p class="hero-subtitle">
          Une interface analytique de nouvelle génération pour distinguer les
          faits observables, les causes profondes et les hypothèses qui
          survivent au test logique.
        </p>

        <div class="hero-actions">
          <a href="#analyze" class="btn btn-primary">
            <span class="btn-glow" />
            Lancer une analyse
          </a>
          <a href="#method" class="btn btn-ghost">
            Voir la méthode
          </a>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">3</span>
            <span class="stat-label">Niveaux</span>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <span class="stat-value">4</span>
            <span class="stat-label">Domaines</span>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <span class="stat-value">∞</span>
            <span class="stat-label">Extensions</span>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section class="dashboard" id="dashboard">
        <div class="section-header">
          <span class="section-tag">Architecture</span>
          <h2>Structure M1 → M2 → M3</h2>
          <p>Trois niveaux d'analyse pour une compréhension causale complète.</p>
        </div>

        <div class="layers-grid">
          <For each={layers}>
            {(layer) => (
              <button
                class={`layer-card ${selectedLayer().id === layer.id ? "active" : ""}`}
                onClick={() => setSelectedLayer(layer)}
              >
                <div class="layer-card-header">
                  <span class="layer-icon">{layer.icon}</span>
                  <span class={`layer-badge layer-badge-${layer.status}`}>
                    {layer.id}
                  </span>
                </div>

                <h3>{layer.title}</h3>
                <p class="layer-subtitle">{layer.subtitle}</p>
                <p class="layer-desc">{layer.description}</p>

                <div class="layer-card-footer">
                  <span class="layer-arrow">→</span>
                </div>
              </button>
            )}
          </For>
        </div>

        {/* Detail panel */}
        <div class="detail-panel">
          <div class="detail-panel-inner">
            <div class="detail-header">
              <span class={`detail-badge detail-badge-${selectedLayer().status}`}>
                {selectedLayer().id}
              </span>
              <h2>{selectedLayer().title}</h2>
            </div>
            <h3 class="detail-subtitle">{selectedLayer().subtitle}</h3>
            <p class="detail-desc">{selectedLayer().description}</p>

            <div class="logic-box">
              <div class="logic-box-header">
                <span class="logic-icon">λ</span>
                <span>Formule logique</span>
              </div>
              <code>Vérité = cohérence sous extension infinie</code>
            </div>
          </div>
        </div>
      </section>

      {/* Analyze */}
      <section class="analyze-section" id="analyze">
        <div class="section-header">
          <span class="section-tag">Analyse</span>
          <h2>Soumettre un problème</h2>
          <p>Décrivez un phénomène observable pour lancer l'analyse LCCLU.</p>
        </div>

        <div class="analyze-card">
          <div class="analyze-input-group">
            <label for="m1-input">Observation M1</label>
            <div class="input-wrapper">
              <input
                id="m1-input"
                type="text"
                placeholder="Ex: Je procrastine quand je dois avancer sur mon projet..."
                value={inputValue()}
                onInput={(e) => setInputValue(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAnalyze();
                }}
              />
              <Show when={inputValue().length > 0}>
                <div class="scanner-line" />
              </Show>
            </div>
          </div>

          <button
            class="btn btn-primary btn-analyze"
            disabled={isAnalyzing() || !inputValue().trim()}
            onClick={handleAnalyze}
          >
            <span class="btn-glow" />
            {isAnalyzing() ? (
              <span class="analyzing-text">Analyse en cours<span class="dots" /></span>
            ) : (
              "Lancer l'analyse"
            )}
          </button>

          <Show when={error()}>
            <p class="error-msg">{error()}</p>
          </Show>
        </div>

        {/* Results */}
        <Show when={result()}>
          <div class="results-container">
            <div class="result-card result-m1">
              <div class="result-header">
                <span class="result-badge">M1</span>
                <span class="result-title">Observable</span>
              </div>
              <p class="result-content">{result()!.m1}</p>
            </div>

            <div class="result-card result-m2">
              <div class="result-header">
                <span class="result-badge">M2</span>
                <span class="result-title">Hypothèses causales</span>
              </div>
              <ul class="hypothesis-list">
                <For each={result()!.m2}>
                  {(h, i) => (
                    <li class="hypothesis-item" style={`animation-delay: ${i() * 0.1}s`}>
                      <span class="hypothesis-num">{String(i() + 1).padStart(2, "0")}</span>
                      <span>{h}</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>

            <div class="result-card result-m3">
              <div class="result-header">
                <span class="result-badge">M3</span>
                <span class="result-title">Validation</span>
              </div>
              <div class="verdict-grid">
                <div class="verdict-item">
                  <span class="verdict-label">Test</span>
                  <span class="verdict-value">{result()!.m3.test}</span>
                </div>
                <div class="verdict-item">
                  <span class="verdict-label">Verdict</span>
                  <span
                    class="verdict-value verdict-status"
                    style={`color: ${getVerdictColor(result()!.m3.status)}`}
                  >
                    {result()!.m3.status}
                  </span>
                </div>
              </div>
              <p class="verdict-conclusion">{result()!.m3.conclusion}</p>
            </div>
          </div>
        </Show>
      </section>

      {/* Method */}
      <section class="method" id="method">
        <div class="section-header">
          <span class="section-tag">Protocole</span>
          <h2>Protocole opérationnel</h2>
          <p>Trois étapes pour une analyse rigoureuse.</p>
        </div>

        <div class="steps-grid">
          <article class="step-card">
            <div class="step-number">01</div>
            <h3>Cartographier M1</h3>
            <p>
              Décrire uniquement les faits observables, sans jugement ni
              interprétation émotionnelle.
            </p>
            <div class="step-tag">Observation</div>
          </article>

          <article class="step-card">
            <div class="step-number">02</div>
            <h3>Générer M2</h3>
            <p>
              Produire plusieurs hypothèses causales concurrentes, même celles
              qui dérangent.
            </p>
            <div class="step-tag">Hypothèses</div>
          </article>

          <article class="step-card">
            <div class="step-number">03</div>
            <h3>Tester M3</h3>
            <p>
              Étendre chaque hypothèse à ses limites logiques pour détecter les
              contradictions.
            </p>
            <div class="step-tag">Validation</div>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer class="footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="nav-logo">◆</span>
            <span>COSMOS — LCCLU Framework</span>
          </div>
          <p class="footer-copy">
            Al-Chimiste Group Ltnd. — Future Gen-Alpha AKIP
          </p>
        </div>
      </footer>
    </main>
  );
};

export default App;
