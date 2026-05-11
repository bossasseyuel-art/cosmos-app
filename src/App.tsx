import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import "./App.css";

type Layer = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "observable" | "hidden" | "validated";
};

const layers: Layer[] = [
  {
    id: "M1",
    title: "Observable",
    subtitle: "Zahir — ce qui apparaît",
    description:
      "Le niveau des faits visibles : données brutes, comportements, symptômes, événements mesurables.",
    status: "observable",
  },
  {
    id: "M2",
    title: "Causal",
    subtitle: "Batin — ce qui produit",
    description:
      "Le niveau des mécanismes cachés : causes profondes, structures, intentions, dynamiques invisibles.",
    status: "hidden",
  },
  {
    id: "M3",
    title: "Validation",
    subtitle: "Haq / Batil — ce qui tient",
    description:
      "Le test de cohérence : si une hypothèse reste stable quand on l’étend à ses limites logiques.",
    status: "validated",
  },
];

const App: Component = () => {
  const [selectedLayer, setSelectedLayer] = createSignal<Layer>(layers[0]);

  return (
    <main class="app-shell">
      <section class="hero">
        <p class="eyebrow">LCCLU Framework</p>

        <h1>
          Cartographier le réel.
          <br />
          Tester la cohérence.
          <br />
          Séparer le Haq du Batil.
        </h1>

        <p class="hero-text">
          Une interface conceptuelle pour distinguer les faits observables, les
          causes profondes et les hypothèses qui survivent au test logique.
        </p>

        <div class="hero-actions">
          <button class="primary-button">Analyser un M1</button>
          <button class="secondary-button">Voir la méthode</button>
        </div>
      </section>

      <section class="dashboard">
        <div class="panel layers-panel">
          <div class="panel-header">
            <span>Structure</span>
            <strong>M1 → M2 → M3</strong>
          </div>

          <div class="layers-list">
            <For each={layers}>
              {(layer) => (
                <button
                  class={`layer-card ${
                    selectedLayer().id === layer.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedLayer(layer)}
                >
                  <span class="layer-id">{layer.id}</span>

                  <div>
                    <h2>{layer.title}</h2>
                    <p>{layer.subtitle}</p>
                  </div>
                </button>
              )}
            </For>
          </div>
        </div>

        <div class="panel detail-panel">
          <p class="detail-label">Niveau sélectionné</p>

          <h2>
            {selectedLayer().id} — {selectedLayer().title}
          </h2>

          <h3>{selectedLayer().subtitle}</h3>

          <p>{selectedLayer().description}</p>

          <div class="logic-box">
            <span>Formule logique</span>

            <code>
              Vérité = cohérence sous extension infinie
            </code>
          </div>
        </div>
      </section>

      <section class="method">
        <h2>Protocole opérationnel</h2>

        <div class="steps">
          <article>
            <span>01</span>
            <h3>Cartographier M1</h3>
            <p>
              Décrire uniquement les faits observables, sans jugement ni
              interprétation émotionnelle.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Générer M2</h3>
            <p>
              Produire plusieurs hypothèses causales concurrentes, même celles
              qui dérangent.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Tester M3</h3>
            <p>
              Étendre chaque hypothèse à ses limites logiques pour détecter les
              contradictions.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default App;
