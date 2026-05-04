"use client";

import { useState, useMemo } from "react";
import ModelCard from "@/components/ModelCard";
import styles from "./filters.module.css";
import Link from "next/link";

/* ── Mock Data ───────────────────────────────────────────────── */
const lamborghiniModels = [
  {
    slug: "veneno",
    image: "/ImperialMotors1/images/lamborghini_veneno.png",
    alt: "Lamborghini Veneno",
    heritage: "Italy",
    focus: "Raw Emotion",
    name: "Lamborghini Veneno",
    description:
      "A limited-production hypercar celebrating Lamborghini's 50th anniversary. Only 5 units were ever built.",
    model: "Veneno",
    price: 4500000,
    power: 750,
    torque: 690,
    acceleration: 2.8,
    colors: ["Rosso Veneno", "Verde Ithaca", "Nero Nemesis"],
    wheels: ["Forged Carbon 20\""],
    materials: ["Carbon Fiber", "Alcantara"],
  },
  {
    slug: "aventador-svj",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1000&auto=format&fit=crop",
    alt: "Lamborghini Aventador SVJ",
    heritage: "Italy",
    focus: "Track Domination",
    name: "Aventador SVJ",
    description:
      "The ultimate evolution of the Aventador — Nürburgring record holder with advanced ALA 2.0 aerodynamics.",
    model: "Aventador SVJ",
    price: 573966,
    power: 770,
    torque: 720,
    acceleration: 2.8,
    colors: ["Giallo Orion", "Arancio Atlas", "Verde Alceo", "Blu Nethuns"],
    wheels: ["Leirion 20\"/21\"", "Nireo 20\"/21\""],
    materials: ["Carbon Fiber", "Leather", "Alcantara"],
  },
  {
    slug: "huracan-sto",
    image: "https://images.unsplash.com/photo-1690023271821-5e8ef2e3f4b0?q=80&w=1000&auto=format&fit=crop",
    alt: "Lamborghini Huracán STO",
    heritage: "Italy",
    focus: "Street-Legal Race Car",
    name: "Huracán STO",
    description:
      "Super Trofeo Omologata — a street-legal race car derived directly from the Huracán Super Trofeo EVO.",
    model: "Huracán STO",
    price: 327838,
    power: 640,
    torque: 565,
    acceleration: 3.0,
    colors: ["Blu Laufey", "Rosso Mars", "Arancio California"],
    wheels: ["Center-Lock Magnesium 20\""],
    materials: ["Carbon Fiber", "Alcantara"],
  },
  {
    slug: "revuelto",
    image: "https://images.unsplash.com/photo-1709249006093-9c8e66f92587?q=80&w=1000&auto=format&fit=crop",
    alt: "Lamborghini Revuelto",
    heritage: "Italy",
    focus: "Hybrid V12",
    name: "Revuelto",
    description:
      "Lamborghini's first PHEV super sports car — a naturally aspirated V12 paired with three electric motors producing 1,015 HP.",
    model: "Revuelto",
    price: 608358,
    power: 1015,
    torque: 725,
    acceleration: 2.5,
    colors: ["Grigio Telesto", "Bianco Siderale", "Verde Turbine", "Arancio Apodis"],
    wheels: ["Forged Alloy 20\"/21\"", "Diamond-Cut 20\"/21\""],
    materials: ["Carbon Fiber", "Leather", "Alcantara", "Corsa-Tex"],
  },
  {
    slug: "urus-performante",
    image: "https://images.unsplash.com/photo-1669296654042-b9f3e8907b3e?q=80&w=1000&auto=format&fit=crop",
    alt: "Lamborghini Urus Performante",
    heritage: "Italy",
    focus: "Super SUV",
    name: "Urus Performante",
    description:
      "The world's first Super Sport Utility Vehicle in its most powerful form — lighter, faster, and sharper than ever.",
    model: "Urus Performante",
    price: 260676,
    power: 666,
    torque: 850,
    acceleration: 3.3,
    colors: ["Verde Mantis", "Giallo Inti", "Nero Noctis", "Blu Eleos"],
    wheels: ["Leonis 23\"", "Taigete 22\""],
    materials: ["Carbon Fiber", "Leather", "Alcantara"],
  },
];

/* ── Extract unique filter options from data ─────────────────── */
const allModels = [...new Set(lamborghiniModels.map((c) => c.model))];
const allColors = [...new Set(lamborghiniModels.flatMap((c) => c.colors))];
const allWheels = [...new Set(lamborghiniModels.flatMap((c) => c.wheels))];
const allMaterials = [...new Set(lamborghiniModels.flatMap((c) => c.materials))];

/* ── Slider bounds ───────────────────────────────────────────── */
const PRICE_MIN = 200000;
const PRICE_MAX = 5000000;
const POWER_MIN = 500;
const POWER_MAX = 1100;
const TORQUE_MIN = 400;
const TORQUE_MAX = 900;
const ACCEL_MIN = 2.0;
const ACCEL_MAX = 5.0;

/* ═══════════════════════════════════════════════════════════════ */
export default function LamborghiniPage() {
  /* ── Filter state ────────────────────────────────────────── */
  const [selectedModels, setSelectedModels] = useState([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [minPower, setMinPower] = useState(POWER_MIN);
  const [minTorque, setMinTorque] = useState(TORQUE_MIN);
  const [maxAccel, setMaxAccel] = useState(ACCEL_MAX);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedWheels, setSelectedWheels] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  /* ── Toggle helpers ──────────────────────────────────────── */
  const toggle = (arr, setArr, value) =>
    setArr((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  /* ── Filtered results ────────────────────────────────────── */
  const filtered = useMemo(() => {
    return lamborghiniModels.filter((car) => {
      if (selectedModels.length && !selectedModels.includes(car.model))
        return false;
      if (car.price > maxPrice) return false;
      if (car.power < minPower) return false;
      if (car.torque < minTorque) return false;
      if (car.acceleration > maxAccel) return false;
      if (
        selectedColors.length &&
        !car.colors.some((c) => selectedColors.includes(c))
      )
        return false;
      if (
        selectedWheels.length &&
        !car.wheels.some((w) => selectedWheels.includes(w))
      )
        return false;
      if (
        selectedMaterials.length &&
        !car.materials.some((m) => selectedMaterials.includes(m))
      )
        return false;
      return true;
    });
  }, [
    selectedModels,
    maxPrice,
    minPower,
    minTorque,
    maxAccel,
    selectedColors,
    selectedWheels,
    selectedMaterials,
  ]);

  /* ── Color palette map (for swatches) ────────────────────── */
  const colorHex = {
    "Rosso Veneno": "#cc0000",
    "Verde Ithaca": "#00b300",
    "Nero Nemesis": "#1a1a1a",
    "Giallo Orion": "#ffd700",
    "Arancio Atlas": "#ff6600",
    "Verde Alceo": "#228B22",
    "Blu Nethuns": "#0044cc",
    "Blu Laufey": "#1e90ff",
    "Rosso Mars": "#b22222",
    "Arancio California": "#ff8c00",
    "Grigio Telesto": "#808080",
    "Bianco Siderale": "#f5f5f5",
    "Verde Turbine": "#2e8b57",
    "Arancio Apodis": "#ff4500",
    "Verde Mantis": "#74c365",
    "Giallo Inti": "#ffe135",
    "Nero Noctis": "#0d0d0d",
    "Blu Eleos": "#4169e1",
  };

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <div className={styles.configuratorLayout}>
      {/* ─── Sidebar ─────────────────────────────────────── */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Filters</h2>

        {/* Model */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Model</h3>
          {allModels.map((m) => (
            <label key={m} className={styles.filterLabel}>
              <input
                type="checkbox"
                className={styles.filterInput}
                checked={selectedModels.includes(m)}
                onChange={() => toggle(selectedModels, setSelectedModels, m)}
              />
              {m}
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Price Range</h3>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              className={styles.sliderInput}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={50000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className={styles.sliderValues}>
              <span>${PRICE_MIN.toLocaleString()}</span>
              <span>Up to ${maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Power Range */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Power (HP)</h3>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              className={styles.sliderInput}
              min={POWER_MIN}
              max={POWER_MAX}
              step={10}
              value={minPower}
              onChange={(e) => setMinPower(Number(e.target.value))}
            />
            <div className={styles.sliderValues}>
              <span>Min {minPower} HP</span>
              <span>{POWER_MAX} HP</span>
            </div>
          </div>
        </div>

        {/* Torque Range */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Torque (Nm)</h3>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              className={styles.sliderInput}
              min={TORQUE_MIN}
              max={TORQUE_MAX}
              step={10}
              value={minTorque}
              onChange={(e) => setMinTorque(Number(e.target.value))}
            />
            <div className={styles.sliderValues}>
              <span>Min {minTorque} Nm</span>
              <span>{TORQUE_MAX} Nm</span>
            </div>
          </div>
        </div>

        {/* 0-100 km/h */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>0–100 km/h (s)</h3>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              className={styles.sliderInput}
              min={ACCEL_MIN}
              max={ACCEL_MAX}
              step={0.1}
              value={maxAccel}
              onChange={(e) => setMaxAccel(Number(e.target.value))}
            />
            <div className={styles.sliderValues}>
              <span>{ACCEL_MIN}s</span>
              <span>Up to {maxAccel.toFixed(1)}s</span>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Colors</h3>
          <div className={styles.colorSwatches}>
            {allColors.map((c) => (
              <button
                key={c}
                title={c}
                className={`${styles.swatch} ${
                  selectedColors.includes(c) ? styles.selected : ""
                }`}
                style={{ backgroundColor: colorHex[c] || "#888" }}
                onClick={() =>
                  toggle(selectedColors, setSelectedColors, c)
                }
              />
            ))}
          </div>
        </div>

        {/* Wheels */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Wheels</h3>
          {allWheels.map((w) => (
            <label key={w} className={styles.filterLabel}>
              <input
                type="checkbox"
                className={styles.filterInput}
                checked={selectedWheels.includes(w)}
                onChange={() => toggle(selectedWheels, setSelectedWheels, w)}
              />
              {w}
            </label>
          ))}
        </div>

        {/* Materials */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Materials</h3>
          {allMaterials.map((m) => (
            <label key={m} className={styles.filterLabel}>
              <input
                type="checkbox"
                className={styles.filterInput}
                checked={selectedMaterials.includes(m)}
                onChange={() =>
                  toggle(selectedMaterials, setSelectedMaterials, m)
                }
              />
              {m}
            </label>
          ))}
        </div>
      </aside>

      {/* ─── Main Content ────────────────────────────────── */}
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Lamborghini</h1>
        <p className={styles.pageSubtitle}>Configure Your Dream Machine</p>

        <div className={styles.carsGrid}>
          {filtered.length > 0 ? (
            filtered.map((car) => (
              <ModelCard
                key={car.slug}
                image={car.image}
                alt={car.alt}
                heritage={car.heritage}
                focus={car.focus}
                name={car.name}
                description={car.description}
                slug={car.slug}
                buttonText="Order Now"
                buttonHref="#"
              />
            ))
          ) : (
            <p className={styles.noResults}>
              No models match your current filters.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
