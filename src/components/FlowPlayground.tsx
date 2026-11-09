'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Background,
  BackgroundVariant,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Brain, CheckCircle2, Circle, Clock, FileText, Lightbulb, MessageCircle, RotateCcw, Tag, UserRound, Wand2, X, XCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import type { Dictionary } from '@/content/dictionaries';
import type { Locale } from '@/content/site';

type NodeKey = keyof Dictionary['flowGame']['nodes'];

type StepData = {
  title: string;
  sub: string;
  icon: NodeKey;
  step?: 1 | 2 | 3;
  isStart?: boolean;
  isEnd?: boolean;
  // Phones: handles on top/bottom so the flow reads downwards.
  vertical: boolean;
  dark: boolean;
  hint: boolean;
  solved: boolean;
};
type StepNode = Node<StepData, 'step'>;

const icons: Record<NodeKey, React.ElementType> = {
  trigger: MessageCircle,
  ai: Brain,
  handoff: UserRound,
  wait: Clock,
  tag: Tag,
  template: FileText,
};

const handleStyle: React.CSSProperties = { width: 18, height: 18, background: '#f97316', border: '3px solid #fff' };

function StepNodeView({ data }: NodeProps<StepNode>) {
  const Icon = icons[data.icon];
  const numbered = data.step !== undefined;
  const glow = data.solved && numbered
    ? 'ring-4 ring-green-400/70 border-green-400'
    : data.hint && numbered
      ? 'ring-4 ring-orange-400/60 animate-pulse border-orange-500'
      : numbered
        ? 'border-orange-500'
        : data.dark ? 'border-gray-600' : 'border-gray-300';

  return (
    <div className={`relative w-[190px] rounded-xl border-2 px-4 py-3 shadow-lg transition-all ${glow} ${data.dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      {!data.isStart && <Handle type="target" position={data.vertical ? Position.Top : Position.Left} style={handleStyle} />}
      {numbered && (
        <span className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold flex items-center justify-center shadow">
          {data.step}
        </span>
      )}
      <div className="flex items-center gap-2">
        <Icon size={18} className={numbered ? 'text-orange-500' : 'text-gray-400'} aria-hidden />
        <span className="font-semibold text-sm leading-tight">{data.title}</span>
      </div>
      <p className={`text-xs mt-1 ${data.dark ? 'text-gray-400' : 'text-gray-500'}`}>{data.sub}</p>
      {!data.isEnd && <Handle type="source" position={data.vertical ? Position.Bottom : Position.Right} style={handleStyle} />}
    </div>
  );
}

const nodeTypes = { step: StepNodeView };

const steps: { id: NodeKey; step?: 1 | 2 | 3; isStart?: boolean; isEnd?: boolean }[] = [
  { id: 'trigger', step: 1, isStart: true },
  { id: 'wait' },
  { id: 'ai', step: 2 },
  { id: 'template' },
  { id: 'tag' },
  { id: 'handoff', step: 3, isEnd: true },
];

// Wide canvas on desktop; two columns on phones so nodes stay readable. The
// distractors sit off the 1 → 2 → 3 lines so no edge seems to pass through them.
const layouts: Record<'wide' | 'narrow', Record<NodeKey, { x: number; y: number }>> = {
  wide: { trigger: { x: 0, y: 170 }, wait: { x: 280, y: 20 }, ai: { x: 280, y: 300 }, template: { x: 580, y: 20 }, tag: { x: 580, y: 430 }, handoff: { x: 860, y: 200 } },
  narrow: { trigger: { x: 0, y: 0 }, template: { x: 230, y: 0 }, wait: { x: 0, y: 170 }, ai: { x: 230, y: 170 }, handoff: { x: 0, y: 340 }, tag: { x: 230, y: 340 } },
};

const SOLUTION: [NodeKey, NodeKey][] = [['trigger', 'ai'], ['ai', 'handoff']];
const START_EDGES: Edge[] = [{ id: 'e-trigger-wait', source: 'trigger', target: 'wait' }];

const isCorrect = (e: Edge) => SOLUTION.some(([s, t]) => e.source === s && e.target === t);

interface FlowPlaygroundProps {
  locale: Locale;
  t: Dictionary['flowGame'];
  formT: Dictionary['contact']['form'];
  isDarkMode: boolean;
}

const FlowPlayground: React.FC<FlowPlaygroundProps> = ({ locale, t, formT, isDarkMode }) => {
  const [narrow] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  const [hint, setHint] = useState(false);
  const [previewStep, setPreviewStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // While the canvas is on screen, flag <html> so CSS can fade out the site's
  // floating buttons on small screens (see .floating-ui in globals.css).
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) root.dataset.flowFocus = '';
      else delete root.dataset.flowFocus;
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      delete root.dataset.flowFocus;
    };
  }, []);

  const buildNodes = useCallback(
    (): StepNode[] =>
      steps.map((s) => ({
        id: s.id,
        type: 'step',
        position: layouts[narrow ? 'narrow' : 'wide'][s.id],
        data: { ...t.nodes[s.id], icon: s.id, step: s.step, isStart: s.isStart, isEnd: s.isEnd, vertical: narrow, dark: isDarkMode, hint: false, solved: false },
      })),
    [narrow, t.nodes, isDarkMode],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<StepNode>(buildNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(START_EDGES);

  const solved = SOLUTION.every(([s, tgt]) => edges.some((e) => e.source === s && e.target === tgt));
  const has12 = edges.some((e) => e.source === 'trigger' && e.target === 'ai');
  const has23 = edges.some((e) => e.source === 'ai' && e.target === 'handoff');
  const wrongCount = edges.filter((e) => !isCorrect(e)).length;

  // Keep node visuals in sync with theme, hint and success state.
  useEffect(() => {
    setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, dark: isDarkMode, hint, solved } })));
  }, [isDarkMode, hint, solved, setNodes]);

  // Play the WhatsApp preview once the flow is solved, then open the form.
  useEffect(() => {
    if (!solved) {
      setPreviewStep(0);
      return;
    }
    const timers = [1, 2, 3, 4].map((step) => setTimeout(() => setPreviewStep(step), step * 650));
    timers.push(setTimeout(() => setModalOpen(true), 4 * 650 + 700));
    return () => timers.forEach(clearTimeout);
  }, [solved]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setModalOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  const styledEdges = useMemo(
    () =>
      edges.map((e) => {
        const color = solved ? '#22c55e' : isCorrect(e) ? '#f97316' : '#9ca3af';
        return {
          ...e,
          animated: solved || isCorrect(e),
          style: { stroke: color, strokeWidth: 3 },
          markerEnd: { type: MarkerType.ArrowClosed, color },
        };
      }),
    [edges, solved],
  );

  const onConnect = useCallback(
    (c: Connection) => setEdges((eds) => addEdge({ ...c, id: `e-${c.source}-${c.target}` }, eds)),
    [setEdges],
  );

  const isValidConnection = useCallback(
    (c: Edge | Connection) => c.source !== c.target && !edges.some((e) => e.source === c.source && e.target === c.target),
    [edges],
  );

  const reset = () => {
    setEdges(START_EDGES);
    setNodes(buildNodes());
    setHint(false);
    setModalOpen(false);
  };

  const solve = () =>
    setEdges(SOLUTION.map(([s, tgt]) => ({ id: `e-${s}-${tgt}`, source: s, target: tgt })));

  const panel = isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200 shadow';
  const muted = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const button = `inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`;

  const Check = ({ ok, label }: { ok: boolean; label: string }) => (
    <li className="flex items-start gap-2">
      {ok ? <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" aria-hidden /> : <Circle size={16} className={`${muted} mt-0.5 shrink-0`} aria-hidden />}
      <span>{label}</span>
    </li>
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button type="button" className={button} onClick={() => setHint((h) => !h)} aria-pressed={hint}>
          <Lightbulb size={16} aria-hidden /> {t.hint}
        </button>
        <button type="button" className={button} onClick={solve}>
          <Wand2 size={16} aria-hidden /> {t.solve}
        </button>
        <button type="button" className={button} onClick={reset}>
          <RotateCcw size={16} aria-hidden /> {t.reset}
        </button>
        {solved && !modalOpen && (
          <button type="button" onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500">
            {t.openForm}
          </button>
        )}
      </div>
      {hint && <p className="mb-4 text-sm text-orange-400">{t.hintText}</p>}

      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div ref={canvasRef} className={`h-[460px] sm:h-[420px] rounded-xl border overflow-hidden ${panel}`}>
          <ReactFlow
            nodes={nodes}
            edges={styledEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeClick={(_, edge) => setEdges((eds) => eds.filter((e) => e.id !== edge.id))}
            isValidConnection={isValidConnection}
            nodeTypes={nodeTypes}
            colorMode={isDarkMode ? 'dark' : 'light'}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.3}
            maxZoom={1.5}
            zoomOnScroll={false}
            preventScrolling={false}
          >
            <Background variant={BackgroundVariant.Dots} gap={18} size={1.5} />
          </ReactFlow>
        </div>

        <div className="flex flex-col gap-4">
          <div className={`p-4 rounded-xl border text-sm ${panel}`}>
            <h3 className="font-semibold mb-3 text-orange-400">{t.review.title}</h3>
            <ul className="space-y-2" aria-live="polite">
              <Check ok={has12} label={t.review.link12} />
              <Check ok={has23} label={t.review.link23} />
              {wrongCount > 0 && (
                <li className="flex items-start gap-2 text-red-400">
                  <XCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
                  <span>{t.review.wrong.replace('{n}', String(wrongCount))}</span>
                </li>
              )}
              {solved && <li className="font-semibold text-green-500">✓ {t.review.ready}</li>}
            </ul>
          </div>

          <div className={`flex-1 p-4 rounded-xl border text-sm ${panel}`}>
            <h3 className="font-semibold mb-3 text-orange-400">{t.preview.title}</h3>
            {previewStep === 0 ? (
              <p className={muted}>{t.preview.empty}</p>
            ) : (
              <div className="flex flex-col gap-2" aria-live="polite">
                <p className="self-end max-w-[85%] px-3 py-2 rounded-lg rounded-br-none bg-green-600 text-white">{t.preview.customer}</p>
                {previewStep >= 2 && (
                  <span className="self-start text-xs px-2 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    {t.preview.intent}
                  </span>
                )}
                {previewStep >= 3 && (
                  <p className={`self-start max-w-[85%] px-3 py-2 rounded-lg rounded-bl-none ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
                    {t.preview.reply}
                  </p>
                )}
                {previewStep >= 4 && <p className="self-center text-xs text-green-500 font-medium">— {t.preview.handoff} —</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setModalOpen(false)} aria-hidden />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="flow-modal-title"
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          >
            <div className="flex items-start justify-between gap-4 p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <h3 id="flow-modal-title" className="text-xl font-bold">{t.modalTitle}</h3>
              <button type="button" onClick={() => setModalOpen(false)} aria-label={t.close} className="p-1 rounded hover:bg-white/20">
                <X size={20} aria-hidden />
              </button>
            </div>
            <div className="p-6">
              <ContactForm locale={locale} t={formT} isDarkMode={isDarkMode} idPrefix="flow-contact" autoFocus showTitle={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowPlayground;
