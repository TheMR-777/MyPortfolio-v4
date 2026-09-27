import { useId } from "react";
import { cn } from "../utils/cn";

/** Cards in the Craft grid carry a full illustrated study. */
const CRAFT_ART = new Set(["schemaflow", "mr-crypt", "schema-weaver", "moire", "letitgo", "githubify"]);
/** Simpler studies, used only when a project is opened. */
const SIMPLE_ART = new Set(["smart-cleanup", "myportfolio", "this-site"]);

export const hasCraftArt = (id: string) => CRAFT_ART.has(id);
export const hasDialogArt = (id: string) => CRAFT_ART.has(id) || SIMPLE_ART.has(id);

function Node({ x, y, label, width = 112 }: { x: number; y: number; label: string; width?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="34" rx="7" fill="var(--plate)" stroke="currentColor" strokeOpacity=".22" />
      <circle cx={x + 13} cy={y + 17} r="2.5" fill="var(--accent)" />
      <text x={x + 24} y={y + 21} fill="currentColor" opacity=".75">{label}</text>
    </g>
  );
}

export function ProjectVisual({ id, className }: { id: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const dots = `${uid}-dots`;
  const wash = `${uid}-wash`;
  const floor = `${uid}-floor`;

  return (
    <div className={cn("project-visual", className)} aria-hidden="true">
      <svg viewBox="0 0 600 220" fill="none">
        <defs>
          <pattern id={dots} width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".75" fill="currentColor" /></pattern>
          <radialGradient id={wash}><stop stopColor="var(--accent)" stopOpacity=".25" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
          <clipPath id={floor}><rect x="99" y="25" width="402" height="162" /></clipPath>
        </defs>
        <rect x="18" y="8" width="564" height="196" fill={`url(#${dots})`} opacity=".14" />

        {id === "ems" && (
          <>
            <ellipse cx="315" cy="110" rx="150" ry="104" fill={`url(#${wash})`} />
            {[56, 110, 164].map((y, index) => (
              <g key={y}>
                <path d={`M35 ${y}h24l9 -8 12 16 12 -12 13 4h38C210 ${y} 218 110 274 110`} stroke="currentColor" strokeOpacity={.22 + index * .08} />
                <circle cx="35" cy={y} r="3" fill="var(--plate)" stroke="currentColor" strokeOpacity=".5" />
              </g>
            ))}
            <rect x="274" y="40" width="66" height="140" rx="33" fill="var(--plate)" stroke="var(--accent)" strokeOpacity=".35" strokeDasharray="3 5" />
            <path d="M298 110v-7a9 9 0 0 1 18 0v7m-21 0h24v21h-24z" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="307" cy="119" r="2" fill="var(--accent)" />
            <path d="M340 110h24c14 0 19-7 29-7s14 20 25 20 20-43 33-43 16 23 31 23 18-48 31-48 19 22 29 22h23" className="diagram-trace" stroke="var(--accent)" strokeWidth="1.7" />
            <path d="M371 153h194M371 68h194M371 110h194" stroke="currentColor" strokeOpacity=".07" />
            <circle cx="565" cy="77" r="4" fill="var(--accent)" />
            <circle cx="565" cy="77" r="9" stroke="var(--accent)" strokeOpacity=".25" />
            <g fill="currentColor" opacity=".5"><text x="35" y="203">COLLECT</text><text x="261" y="203">RESPECT BOUNDARIES</text><text x="488" y="203">REVEAL SIGNAL</text></g>
          </>
        )}

        {id === "erp-core" && (
          <>
            <circle cx="300" cy="110" r="103" fill={`url(#${wash})`} />
            <path d="M185 53h37q20 0 30 20l17 18M185 167h37q20 0 30-20l17-18M415 53h-37q-20 0-30 20l-17 18M415 167h-37q-20 0-30-20l-17-18" stroke="var(--accent)" strokeOpacity=".5" className="diagram-trace" />
            <circle cx="300" cy="110" r="45" fill="var(--plate)" stroke="var(--accent)" strokeWidth="1.3" />
            <circle cx="300" cy="110" r="56" stroke="var(--accent)" strokeOpacity=".18" strokeDasharray="2 5" />
            <text x="300" y="107" textAnchor="middle" fill="var(--accent)" style={{ fontSize: 18 }}>ERP</text>
            <text x="300" y="123" textAnchor="middle" fill="currentColor" opacity=".5" style={{ fontSize: 8 }}>SHARED CORE</text>
            <Node x={73} y={36} label="Approvals" />
            <Node x={73} y={150} label="Rights" />
            <Node x={415} y={36} label="Rules" />
            <Node x={415} y={150} label="Notifications" width={127} />
            <text x="300" y="207" textAnchor="middle" fill="currentColor" opacity=".5">ONE BACKBONE. MANY POSSIBILITIES.</text>
          </>
        )}

        {id === "reporting" && (
          <>
            <ellipse cx="303" cy="110" rx="113" ry="100" fill={`url(#${wash})`} />
            <path d="M181 49h37q26 0 36 26l10 23M181 110h83M181 171h37q26 0 36-26l10-23M338 110h47q21 0 21-21V57h34M338 110h102M338 110h47q21 0 21 21v32h34" stroke="currentColor" strokeOpacity=".3" />
            <Node x={69} y={32} label=".NET" />
            <Node x={69} y={93} label="Angular" />
            <Node x={69} y={154} label="Laravel" />
            <rect x="264" y="72" width="74" height="76" rx="19" fill="var(--plate)" stroke="var(--accent)" strokeWidth="1.2" />
            <path d="M285 103h32M285 110h21M285 117h27" stroke="var(--accent)" strokeWidth="1.5" />
            {["PDF", "XLSX", "CSV"].map((format, index) => (
              <g key={format} transform={`translate(440 ${32 + index * 53})`}>
                <path d="M0 0h65l13 13v31H0z" fill="var(--plate)" stroke="currentColor" strokeOpacity=".4" />
                <path d="M65 0v13h13" stroke="currentColor" strokeOpacity=".4" />
                <text x="15" y="27" fill="var(--accent)">{format}</text>
              </g>
            ))}
            <text x="300" y="204" textAnchor="middle" fill="currentColor" opacity=".5">A SINGLE, LANGUAGE-AGNOSTIC PIPELINE</text>
          </>
        )}

        {id === "uwb" && (
          <>
            <g clipPath={`url(#${floor})`}>
              <circle cx="190" cy="76" r="130" fill={`url(#${wash})`} />
              <circle cx="421" cy="136" r="145" fill={`url(#${wash})`} />
              {[30, 55, 82, 110].map((radius) => <circle key={radius} cx="190" cy="76" r={radius} stroke="var(--accent)" strokeOpacity={.5 - radius / 300} />)}
              {[35, 65, 95].map((radius) => <circle key={radius} cx="421" cy="136" r={radius} stroke="var(--accent)" strokeOpacity=".23" />)}
            </g>
            <path d="M100 25h400v162H100zM253 25v64m0 32v66M100 114h108m84-89v45h97m-43 0v78m0 39v-12m0-47h65m39 0h50" stroke="currentColor" strokeOpacity=".45" strokeWidth="2" />
            <path d="M253 121a32 32 0 0 0-32-32h32M208 114a31 31 0 0 1 31-31v31" stroke="currentColor" strokeOpacity=".2" />
            {[[190, 76], [421, 136], [296, 150]].map(([x, y], index) => (
              <g key={index}>
                <circle cx={x} cy={y} r="5" fill="var(--accent)" />
                <circle cx={x} cy={y} r="11" stroke="var(--accent)" strokeOpacity=".6" />
                <text x={x + 15} y={y - 11} fill="var(--accent)">A0{index + 1}</text>
              </g>
            ))}
            <path d="M85 25v162m-4-162h8m-8 162h8M100 201h400m-400-4v8m400-8v8" stroke="currentColor" strokeOpacity=".16" />
            <text x="35" y="112" fill="currentColor" opacity=".4" transform="rotate(-90 35 112)">COVERAGE STUDY</text>
          </>
        )}

        {id === "vault" && (
          <>
            <ellipse cx="300" cy="108" rx="135" ry="105" fill={`url(#${wash})`} />
            {[40, 66, 93].map((radius, index) => {
              const points = Array.from({ length: 6 }, (_, i) => {
                const angle = (i * 60 - 30) * Math.PI / 180;
                return `${300 + Math.cos(angle) * radius},${108 + Math.sin(angle) * radius}`;
              }).join(" ");
              return <polygon key={radius} points={points} stroke={index === 0 ? "var(--accent)" : "currentColor"} strokeOpacity={index === 0 ? .9 : .16} fill={index === 0 ? "var(--plate)" : "none"} />;
            })}
            <path d="M291 102v-6a9 9 0 0 1 18 0v6m-21 0h24v22h-24z" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx="300" cy="112" r="2" fill="var(--accent)" />
            <path d="M35 108h183M382 108h182" stroke="currentColor" strokeOpacity=".25" strokeDasharray="3 5" />
            <circle cx="219" cy="108" r="3" fill="var(--accent)" /><circle cx="381" cy="108" r="3" fill="var(--accent)" />
            <text x="59" y="88" fill="currentColor" opacity=".6">CREDENTIALS</text>
            <text x="436" y="88" fill="currentColor" opacity=".6">ENCRYPTED STORE</text>
            <text x="72" y="133" fill="var(--accent)" opacity=".8">AES-256</text>
            <text x="449" y="133" fill="var(--accent)" opacity=".8">RSA-4096</text>
            <text x="300" y="213" textAnchor="middle" fill="currentColor" opacity=".5">DEFENSE, IN DEPTH</text>
          </>
        )}

        {id === "overwatch" && (
          <>
            <ellipse cx="300" cy="110" rx="140" ry="105" fill={`url(#${wash})`} />
            <path d="M168 49h43q26 0 26 26v35h33M168 110h102M168 171h43q26 0 26-26v-35h33M332 110h43q26 0 26-26V57h39M332 110h108M332 110h43q26 0 26 26v27h39" stroke="var(--accent)" strokeOpacity=".4" className="diagram-trace" />
            <Node x={69} y={32} label="JSON" width={99} /><Node x={69} y={93} label="XML" width={99} /><Node x={69} y={154} label="HTTP" width={99} />
            <path d="M300 69l40 41-40 41-40-41z" fill="var(--plate)" stroke="var(--accent)" />
            <text x="300" y="114" textAnchor="middle" fill="var(--accent)">RULES</text>
            {[57, 110, 163].map((y, index) => (
              <g key={y}>
                <circle cx="457" cy={y} r="17" fill="var(--plate)" stroke="currentColor" strokeOpacity=".3" />
                <path d={`M450 ${y}l5 5 9-10`} stroke="var(--accent)" strokeWidth="1.5" />
                <text x="488" y={y + 4} fill="currentColor" opacity=".55">{["AND", "OR", "XOR"][index]}</text>
              </g>
            ))}
            <text x="300" y="208" textAnchor="middle" fill="currentColor" opacity=".5">CONFIGURATION, NOT REIMPLEMENTATION</text>
          </>
        )}

        {/* Mirror-symmetric around x=300: two service nodes left (centres 79/141),
            a six-device fleet right (rows centred 91/129), one control plane at
            the heart. Every connector has a mirrored twin. */}
        {id === "apple-mdm" && (
          <>
            <ellipse cx="300" cy="110" rx="132" ry="100" fill={`url(#${wash})`} />

            <Node x={88} y={62} label="nanoMDM · microMDM" width={140} />
            <Node x={88} y={124} label="SCEP · certs" width={140} />
            <path d="M228 79C244 79 246 97 264 97" stroke="currentColor" strokeOpacity=".3" className="diagram-trace" />
            <path d="M228 141C244 141 246 123 264 123" stroke="currentColor" strokeOpacity=".3" className="diagram-trace" />

            <rect x="264" y="84" width="72" height="52" rx="14" fill="var(--plate)" stroke="var(--accent)" strokeWidth="1.2" />
            <text x="300" y="107" textAnchor="middle" fill="var(--accent)" style={{ fontSize: 13 }}>.NET</text>
            <text x="300" y="122" textAnchor="middle" fill="currentColor" opacity=".5" style={{ fontSize: 8 }}>CONTROL</text>

            <path d="M336 97C354 97 356 91 393 91" stroke="var(--accent)" strokeOpacity=".4" />
            <path d="M336 123C354 123 356 129 393 129" stroke="var(--accent)" strokeOpacity=".4" />
            {Array.from({ length: 6 }, (_, index) => (
              <rect
                key={index}
                x={393 + (index % 3) * 36} y={79 + Math.floor(index / 3) * 38}
                width="26" height="24" rx="4"
                fill={index === 1 ? "var(--accent)" : "var(--plate)"}
                fillOpacity={index === 1 ? ".2" : "1"}
                stroke={index === 1 ? "var(--accent)" : "currentColor"}
                strokeOpacity={index === 1 ? ".9" : ".24"}
              />
            ))}
            <text x="300" y="207" textAnchor="middle" fill="currentColor" opacity=".5">ONE PLANE. ENROLL, RESTRICT, AUDIT.</text>
          </>
        )}
      </svg>
    </div>
  );
}

export function CraftVisual({ id }: { id: string }) {
  if (id === "moire") return (
    <div className="craft-art relative text-accent" aria-hidden="true">
      <div className="moire-pattern absolute -inset-20 opacity-30" />
      <div className="moire-pattern absolute -inset-20 rotate-[6deg] opacity-65" />
      <div className="absolute inset-0 bg-linear-to-r from-plate via-transparent to-plate" />
    </div>
  );
  if (id === "mr-crypt") return (
    <div className="craft-art flex flex-col justify-center px-7 font-mono" aria-hidden="true">
      <span className="text-[8px] uppercase tracking-[.2em] text-plate-faint">A more fluent way to think</span>
      <span className="mt-4 text-[12px] text-plate-fg">bytes <span className="px-1 text-accent">|</span> encrypt <span className="px-1 text-accent">|</span> encode</span>
      <span className="mt-2 text-[9px] text-plate-faint">C++23. Less ceremony.</span>
    </div>
  );
  /* Minor tools get a typographic plate, not a fabricated architecture diagram. */
  if (id === "smart-cleanup") return (
    <div className="craft-art flex flex-col justify-center px-7 font-mono" aria-hidden="true">
      <span className="text-[8px] uppercase tracking-[.2em] text-plate-faint">The whole idea</span>
      <span className="mt-4 text-[12px] text-plate-fg">paths <span className="px-1 text-accent">/</span> rules <span className="px-1 text-accent">/</span> schedule</span>
      <span className="mt-2 text-[9px] text-plate-faint">Nothing clever. Just tidy.</span>
    </div>
  );
  if (id === "myportfolio") return (
    <div className="craft-art flex flex-col justify-center px-7" aria-hidden="true">
      <span className="font-mono text-[8px] uppercase tracking-[.2em] text-plate-faint">The portfolio before this one</span>
      <span className="mt-4 font-serif text-[26px] leading-tight">Acrylic, mica, <em className="text-accent">frost.</em></span>
      <span className="mt-2 font-mono text-[9px] text-plate-faint">Every quiet zone, deliberate.</span>
    </div>
  );
  /* The current site, described the same way: one material, one accent. The
     rule is drawn rather than written, because that is the actual argument. */
  if (id === "this-site") return (
    <div className="craft-art flex flex-col justify-center px-7" aria-hidden="true">
      <span className="font-mono text-[8px] uppercase tracking-[.2em] text-plate-faint">This page</span>
      <span className="mt-4 font-serif text-[26px] leading-tight">Paper and <em className="text-accent">ink.</em></span>
      <svg viewBox="0 0 150 10" fill="none" className="mt-4 w-[150px]">
        <path d="M0 5h120" stroke="var(--accent)" strokeWidth="1.5" />
        <path d="M126 5h18" stroke="currentColor" strokeOpacity=".2" />
      </svg>
    </div>
  );
  return (
    <div className="craft-art text-plate-fg" aria-hidden="true">
      <svg viewBox="0 0 360 140" fill="none">
        {id === "schemaflow" && <>
          <path d="M151 64h25q17 0 17 17v0q0 17 17 17h10" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="41" y="26" width="110" height="76" rx="7" stroke="currentColor" strokeOpacity=".2" fill="var(--plate)" />
          <path d="M41 50h110" stroke="currentColor" strokeOpacity=".13" />
          <text x="53" y="42" fill="var(--accent)">users</text><text x="53" y="67" fill="currentColor" opacity=".6">id</text><text x="53" y="85" fill="currentColor" opacity=".35">name</text>
          <rect x="220" y="39" width="100" height="76" rx="7" stroke="currentColor" strokeOpacity=".2" fill="var(--plate)" />
          <path d="M220 63h100" stroke="currentColor" strokeOpacity=".13" />
          <text x="232" y="55" fill="var(--accent)">orders</text><text x="232" y="81" fill="currentColor" opacity=".35">id</text><text x="232" y="101" fill="currentColor" opacity=".6">user_id</text>
          <circle cx="151" cy="64" r="3" fill="var(--accent)" /><circle cx="220" cy="98" r="3" fill="var(--accent)" />
        </>}
        {id === "schema-weaver" && <>
          <path d="M180 36 80 88 188 116 285 62 180 36M80 88 285 62M180 36l8 80" stroke="var(--accent)" strokeOpacity=".4" />
          {[[180, 36], [80, 88], [188, 116], [285, 62]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x - 24} ${y - 16})`}>
              <path d="M0 9 24 0 48 9 24 18zM0 9v18l24 10V18M48 9v18L24 37" fill="var(--plate)" stroke={i === 0 ? "var(--accent)" : "currentColor"} strokeOpacity={i === 0 ? 1 : .35} />
              <path d="m7 17 10 4m-10 3 10 4" stroke="currentColor" strokeOpacity=".25" />
            </g>
          ))}
        </>}
        {id === "letitgo" && <>
          <circle cx="109" cy="70" r="40" stroke="currentColor" strokeOpacity=".13" />
          <circle cx="109" cy="70" r="32" stroke="var(--accent)" strokeOpacity=".45" strokeDasharray="1 8" />
          <path d="M109 43v27l17 10" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" /><circle cx="109" cy="70" r="3" fill="var(--accent)" />
          <text x="178" y="66" fill="currentColor" style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>A moment,</text>
          <text x="178" y="94" fill="var(--accent)" style={{ fontFamily: "var(--font-display)", fontSize: 28, fontStyle: "italic" }}>kept.</text>
        </>}
        {id === "githubify" && <>
          <text x="35" y="74" fill="currentColor" opacity=".65"># Hello.</text>
          <path d="M147 69h48m-6-5 6 5-6 5" stroke="var(--accent)" />
          <text x="221" y="81" fill="var(--accent)" style={{ fontFamily: "var(--font-display)", fontSize: 35 }}>Hello.</text>
          <text x="35" y="108" fill="currentColor" opacity=".35" style={{ fontSize: 8 }}>MARKDOWN</text><text x="222" y="108" fill="currentColor" opacity=".35" style={{ fontSize: 8 }}>BEAUTIFUL HTML</text>
        </>}

      </svg>
    </div>
  );
}