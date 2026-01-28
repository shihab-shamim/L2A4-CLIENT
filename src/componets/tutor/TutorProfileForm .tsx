"use client";

import React, { useMemo, useState } from "react";

type TutorProfile = {
  id: string;
  userId: string;
  headline?: string | null;
  about?: string | null;
  hourlyRate: number;
  currency: string;
  subjects: string[];
  languages: string[];
  ratingAvg: number;
  totalReviews: number;
  totalSessions: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  headline: string;
  about: string;
  hourlyRate: number;
  currency: string;
  subjectsText: string;
  languagesText: string;
  isFeatured: boolean;
};

export default function TutorProfileForm({
  tutorProfile,
}: {
  tutorProfile: TutorProfile | null;
}) {
  // ✅ safe profile (never null)
  const safeProfile = useMemo<TutorProfile>(() => {
    const now = new Date().toISOString();

    return (
      tutorProfile ?? {
        id: "",
        userId: "",
        headline: "",
        about: "",
        hourlyRate: 0,
        currency: "BDT",
        subjects: [],
        languages: [],
        ratingAvg: 0,
        totalReviews: 0,
        totalSessions: 0,
        isFeatured: false,
        createdAt: now,
        updatedAt: now,
      }
    );
  }, [tutorProfile]);

  // ✅ init form from safeProfile
  const [form, setForm] = useState<FormState>({
    headline: safeProfile.headline ?? "",
    about: safeProfile.about ?? "",
    hourlyRate: safeProfile.hourlyRate ?? 0,
    currency: safeProfile.currency ?? "BDT",
    subjectsText: (safeProfile.subjects ?? []).join(", "),
    languagesText: (safeProfile.languages ?? []).join(", "),
    isFeatured: safeProfile.isFeatured ?? false,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const parseList = (text: string) =>
    text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const onChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  // ✅ if profile null -> we allow create mode, so relaxed validation (no error)
  const validate = () => {
    // If you're in "create" mode you can still require headline etc.
    // For now we'll keep it required, but you asked "null thakle error na",
    // so we won't validate until submit and we will show message nicely.
    if (!form.headline.trim()) return "Headline is required.";
    if (form.hourlyRate < 0) return "Hourly rate cannot be negative.";
    if (!form.currency.trim()) return "Currency is required.";

    const subjects = parseList(form.subjectsText);
    const languages = parseList(form.languagesText);

    if (subjects.length === 0) return "At least 1 subject is required.";
    if (languages.length === 0) return "At least 1 language is required.";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    // ✅ If tutorProfile is null, this becomes "create" payload
    const payload = {
      id: safeProfile.id || undefined, // update হলে id থাকবে, create হলে undefined
      userId: safeProfile.userId || undefined,

      headline: form.headline.trim(),
      about: form.about.trim(),
      hourlyRate: Number(form.hourlyRate),
      currency: form.currency.trim().toUpperCase(),

      subjects: parseList(form.subjectsText),
      languages: parseList(form.languagesText),

      isFeatured: Boolean(form.isFeatured),
    };

    try {
      setLoading(true);

      // ✅ Decide endpoint by mode
      const isEdit = Boolean(tutorProfile?.id);
      const url = isEdit ? "/api/tutors/profile" : "/api/tutors/profile";
      const method = isEdit ? "PUT" : "POST"; // create mode => POST

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `HTTP ${res.status}`);
      }

      const data = await res.json().catch(() => null);
      setMsg(isEdit ? "Profile updated successfully." : "Profile created successfully.");
      console.log("saved:", data);
    } catch (e) {
      setErr("Save failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UI placeholders if tutorProfile is null
  const isEmpty = tutorProfile === null;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
        {isEmpty ? "Create Tutor Profile" : "Edit Tutor Profile"}
      </h2>

      {isEmpty ? (
        <div
          style={{
            border: "1px dashed #e5e7eb",
            borderRadius: 12,
            padding: 12,
            marginBottom: 16,
            background: "#fafafa",
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.6 }}>
            <div>
              <b>No profile found.</b> Fill the form below to create your tutor profile.
            </div>
            <div style={{ marginTop: 6 }}>
              Tip: Add at least 1 subject and 1 language.
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 12,
            marginBottom: 16,
            background: "#fafafa",
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.8 }}>
            <div>
              <b>Profile ID:</b> {safeProfile.id}
            </div>
            <div>
              <b>User ID:</b> {safeProfile.userId}
            </div>
            <div>
              <b>Rating:</b> {safeProfile.ratingAvg} ({safeProfile.totalReviews} reviews)
            </div>
            <div>
              <b>Sessions:</b> {safeProfile.totalSessions}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
          Headline
        </label>
        <input
          value={form.headline}
          onChange={(e) => onChange("headline", e.target.value)}
          placeholder='e.g. "Math Tutor | 5+ years"'
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            marginBottom: 14,
          }}
        />

        <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
          About
        </label>
        <textarea
          value={form.about}
          onChange={(e) => onChange("about", e.target.value)}
          rows={5}
          placeholder="Write a short bio..."
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            marginBottom: 14,
          }}
        />

        <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Hourly Rate
            </label>
            <input
              type="number"
              min={0}
              value={form.hourlyRate}
              onChange={(e) => onChange("hourlyRate", Number(e.target.value))}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #e5e7eb",
              }}
            />
          </div>

          <div style={{ width: 160 }}>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Currency
            </label>
            <input
              value={form.currency}
              onChange={(e) => onChange("currency", e.target.value)}
              placeholder="BDT"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #e5e7eb",
              }}
            />
          </div>
        </div>

        <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
          Subjects (comma separated)
        </label>
        <input
          value={form.subjectsText}
          onChange={(e) => onChange("subjectsText", e.target.value)}
          placeholder="Math, Physics"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            marginBottom: 14,
          }}
        />

        <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
          Languages (comma separated)
        </label>
        <input
          value={form.languagesText}
          onChange={(e) => onChange("languagesText", e.target.value)}
          placeholder="English, Bangla"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            marginBottom: 14,
          }}
        />

        <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => onChange("isFeatured", e.target.checked)}
          />
          <span style={{ fontWeight: 600 }}>Featured tutor</span>
        </label>

        {err && (
          <div
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid #fecaca",
              background: "#fff1f2",
              marginBottom: 12,
            }}
          >
            {err}
          </div>
        )}

        {msg && (
          <div
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid #bbf7d0",
              background: "#f0fdf4",
              marginBottom: 12,
            }}
          >
            {msg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : isEmpty ? "Create Profile" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
