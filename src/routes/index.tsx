import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import altar from "@/assets/altar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar de Día de Muertos para Mascotas" },
      { name: "description", content: "Un altar de Día de Muertos para recordar a nuestras mascotas queridas." },
      { property: "og:title", content: "Altar de Día de Muertos para Mascotas" },
      { property: "og:description", content: "Enciende una vela y recuerda a tus compañeros de cuatro patas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@600;800&family=Nunito:wght@400;700&display=swap" },
    ],
  }),
  component: Index,
});

const papel = ["bg-magenta", "bg-marigold", "bg-violeta", "bg-verde", "bg-magenta", "bg-marigold", "bg-violeta", "bg-verde"];

const ofrendas = [
  { e: "🌼", t: "Cempasúchil", d: "Su color y aroma guían el camino de regreso." },
  { e: "🕯️", t: "Velas", d: "Iluminan el sendero de nuestras mascotas." },
  { e: "🦴", t: "Su comida favorita", d: "Croquetas, premios y un huesito." },
  { e: "💧", t: "Agua", d: "Para calmar la sed tras el largo viaje." },
  { e: "🎾", t: "Juguetes", d: "La pelota de siempre, para seguir jugando." },
  { e: "🍞", t: "Pan de muerto", d: "Para compartir en familia." },
];

type Pet = { nombre: string; tipo: string; recuerdo: string };

function Index() {
  const [pets, setPets] = useState<Pet[]>([
    { nombre: "Canela", tipo: "🐕", recuerdo: "Siempre nos recibía en la puerta." },
    { nombre: "Michi", tipo: "🐈", recuerdo: "Dormía al sol todas las tardes." },
    { nombre: "Firulais", tipo: "🐕", recuerdo: "El mejor compañero de caminatas." },
  ]);
  const [form, setForm] = useState<Pet>({ nombre: "", tipo: "🐕", recuerdo: "" });
  const [velas, setVelas] = useState(0);

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="flex justify-center gap-2 px-2">
        {papel.map((c, i) => (
          <div key={i} className={`${c} sway h-16 w-16 sm:h-20 sm:w-24 [clip-path:polygon(0_0,100%_0,100%_80%,85%_100%,70%_80%,50%_100%,30%_80%,15%_100%,0_80%)] flex items-center justify-center text-2xl`} style={{ animationDelay: `${i * 0.3}s` }}>🐾</div>
        ))}
      </div>

      <section className="mx-auto max-w-5xl px-4 pt-10 text-center">
        <p className="font-display text-marigold tracking-widest uppercase text-sm">1 y 2 de noviembre</p>
        <h1 className="font-display text-5xl sm:text-7xl font-extrabold glow mt-2">Altar para nuestras mascotas</h1>
        <p className="mt-4 text-muted-foreground text-lg">Porque también ellos regresan a casa a visitarnos.</p>
        <img src={altar} alt="Altar de Día de Muertos con fotos de perros y gatos, cempasúchil y velas" width={1536} height={1024} className="mt-10 rounded-[var(--radius)] border-4 border-marigold shadow-[0_0_80px_var(--magenta)]" />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="font-display text-3xl text-center text-marigold">Los elementos de la ofrenda</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ofrendas.map((o) => (
            <div key={o.t} className="rounded-[var(--radius)] bg-card border p-6">
              <div className="text-4xl">{o.e}</div>
              <h3 className="font-display text-xl mt-2">{o.t}</h3>
              <p className="text-muted-foreground mt-1">{o.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="font-display text-3xl text-center text-marigold">Los que nos acompañan</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {pets.map((p, i) => (
            <div key={i} className="rounded-[var(--radius)] border-4 border-magenta bg-card p-6 text-center">
              <div className="text-6xl">{p.tipo}</div>
              <h3 className="font-display text-2xl mt-2">{p.nombre}</h3>
              <p className="text-muted-foreground italic mt-1">"{p.recuerdo}"</p>
              <div className="mt-3 text-2xl">🌼🕯️🌼</div>
            </div>
          ))}
        </div>

        <form
          className="mt-10 mx-auto max-w-xl rounded-[var(--radius)] bg-violeta/40 border p-6 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.nombre.trim()) return;
            setPets([...pets, form]);
            setForm({ nombre: "", tipo: "🐕", recuerdo: "" });
          }}
        >
          <h3 className="font-display text-xl">Agrega a tu mascota al altar</h3>
          <div className="flex gap-2">
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="rounded-md bg-background border px-3 text-2xl">
              {["🐕", "🐈", "🐇", "🐦", "🐢", "🐹", "🐠"].map((t) => <option key={t}>{t}</option>)}
            </select>
            <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="flex-1 rounded-md bg-background border px-3 py-2" />
          </div>
          <input placeholder="Un recuerdo especial" value={form.recuerdo} onChange={(e) => setForm({ ...form, recuerdo: e.target.value })} className="rounded-md bg-background border px-3 py-2" />
          <button className="rounded-md bg-primary text-primary-foreground font-bold py-2 hover:opacity-90">Colocar en el altar 🌼</button>
        </form>
      </section>

      <section className="pb-20 text-center px-4">
        <div className="flex justify-center gap-1 text-4xl min-h-12 flex-wrap max-w-3xl mx-auto">
          {Array.from({ length: velas }).map((_, i) => <span key={i} className="flame inline-block" style={{ animationDelay: `${(i % 5) * 0.2}s` }}>🕯️</span>)}
        </div>
        <button onClick={() => setVelas(velas + 1)} className="mt-6 rounded-full bg-magenta text-foreground font-bold px-8 py-3 hover:opacity-90">Encender una vela</button>
        <p className="mt-3 text-muted-foreground">{velas} {velas === 1 ? "vela encendida" : "velas encendidas"} en su memoria</p>
      </section>
    </main>
  );
}
