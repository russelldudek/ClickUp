const scenarios = {
  priority: {
    title: "Cross-functional priority",
    subtitle: "Turn a fast CEO directive into one owned, testable delivery commitment.",
    verdict: "COMMIT TO SHIP",
    rows: {
      intent: ["Make one strategic priority executable across Product, GTM, Finance, and Operations.", "Clarify outcome and non-goals"],
      decision: ["Choose the tradeoff, decision owner, and escalation threshold before work begins.", "Named authority + due date"],
      split: ["Agents synthesize context, dependencies, updates, and risk; humans retain product and commercial judgment.", "Human authority explicit"],
      delivery: ["One accountable owner, one current state, one unblock path, one definition of shipped.", "No status theater"],
      evidence: ["Customer or business result, decision record, adoption signal, and learning returned to the next cycle.", "Closure is visible"]
    },
    human: "Judgment, tradeoffs, relationship repair, and irreversible decisions stay human-owned.",
    agent: "Synthesis, preparation, monitoring, routing, and recurring follow-through are agent-default."
  },
  redesign: {
    title: "Function redesign",
    subtitle: "Question the workflow itself before assigning automation to it.",
    verdict: "REDESIGN FIRST",
    rows: {
      intent: ["Remove work that exists only because the old organization or toolchain required it.", "Start with purpose"],
      decision: ["Eliminate, agentize, retain for human judgment, or rebuild as a new operating path.", "Four-way disposition"],
      split: ["Agents own repeatable context work; humans own exception judgment, trust, and system design.", "Not task-by-task automation"],
      delivery: ["Pilot inside one value stream with an accountable leader and a reversible release boundary.", "Bound the experiment"],
      evidence: ["Cycle time, labor hours avoided, rework, adoption, quality, and leader capacity reclaimed.", "Measure the work"]
    },
    human: "The function leader owns the operating outcome and accepts the redesigned decision rights.",
    agent: "Agents execute recurring work inside explicit permissions, audit logs, and escalation rules."
  },
  board: {
    title: "Board cycle",
    subtitle: "Make the AI-era company narrative rigorous enough to survive board scrutiny.",
    verdict: "BOARD-READY",
    rows: {
      intent: ["Connect strategy, operating model, product proof, economics, risk, and the next decisions required.", "Narrative follows choices"],
      decision: ["Identify what the board is being asked to understand, challenge, approve, or monitor.", "Every page earns a decision"],
      split: ["Agents assemble and reconcile source material; executives own interpretation and commitments.", "No automated conviction"],
      delivery: ["Single narrative owner, locked data definitions, review cadence, dry run, and issue log.", "Prep runs on rails"],
      evidence: ["Traceable data, closed prior actions, decision quality, and consistency across CEO/CFO/product narratives.", "One company story"]
    },
    human: "CEO and executives retain accountability for interpretation, risk posture, and forward commitments.",
    agent: "Agents maintain the evidence room, reconcile deltas, and surface contradictions before review."
  },
  customer: {
    title: "Customer + product signal",
    subtitle: "Keep the CEO deep in product and customers without letting raw signal become organizational whiplash.",
    verdict: "DECIDE, THEN ROUTE",
    rows: {
      intent: ["Convert a customer or product insight into a bounded decision rather than an untracked request.", "Preserve signal fidelity"],
      decision: ["Classify as immediate fix, discovery input, strategic bet, operating defect, or watch item.", "Route by consequence"],
      split: ["Agents retrieve comparable evidence and history; humans judge product meaning and customer consequence.", "Context before priority"],
      delivery: ["Assign one owner and response date; publish disposition back to the source and affected teams.", "Close the loop"],
      evidence: ["Decision latency, repeat-signal frequency, customer response, shipped change, and observed outcome.", "Signal becomes learning"]
    },
    human: "Product judgment, customer empathy, and priority tradeoffs remain explicit leadership work.",
    agent: "Agents cluster signals, retrieve history, draft briefs, and monitor disposition and learning."
  }
};

const rowIds = ["intent","decision","split","delivery","evidence"];
let runToken = 0;
function applyScenario(key){
  const s=scenarios[key]; if(!s) return;
  runToken += 1; const token=runToken;
  document.querySelectorAll('.scenario-button').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.scenario===key)));
  const wb=document.querySelector('.commit-workbench');
  wb.classList.remove('is-changing'); void wb.offsetWidth; wb.classList.add('is-changing');
  document.getElementById('scenario-title').textContent=s.title;
  document.getElementById('scenario-subtitle').textContent=s.subtitle;
  document.getElementById('scenario-verdict').textContent=s.verdict;
  rowIds.forEach((id,idx)=>{
    const value=document.querySelector(`[data-value="${id}"]`);
    const proof=document.querySelector(`[data-proof="${id}"]`);
    value.textContent=s.rows[id][0]; proof.textContent=s.rows[id][1];
    value.style.opacity='0'; value.style.transform='translateY(7px)';
    setTimeout(()=>{if(token!==runToken)return; value.style.transition='opacity .28s ease, transform .28s ease'; value.style.opacity='1'; value.style.transform='translateY(0)';},70+idx*45);
  });
  document.getElementById('human-note').textContent=s.human;
  document.getElementById('agent-note').textContent=s.agent;
  const live=document.getElementById('scenario-live'); live.textContent=`${s.title} selected. Verdict: ${s.verdict}.`;
}
document.querySelectorAll('.scenario-button').forEach(btn=>btn.addEventListener('click',()=>applyScenario(btn.dataset.scenario)));
if(document.querySelector('.scenario-button')) applyScenario('priority');
