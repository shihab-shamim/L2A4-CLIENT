"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { tutorProfileCreateAndUpdate } from "@/actions/user.actions";

/* =====================
   Types
===================== */
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

type TutorProfilePayload = {
  headline: string;
  about: string;
  hourlyRate: number;
  currency: string;
  subjects: string[];
  languages: string[];
  isFeatured: boolean;
};

export default function TutorProfileForm({
  tutorProfile,
}: {
  tutorProfile: TutorProfile | null;
}) {
  const router = useRouter();

  /* =====================
     Safe Profile
  ===================== */
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

  const buildFormFromProfile = (p: TutorProfile): FormState => ({
    headline: p.headline ?? "",
    about: p.about ?? "",
    hourlyRate: typeof p.hourlyRate === "number" ? p.hourlyRate : 0,
    currency: p.currency ?? "BDT",
    subjectsText: (p.subjects ?? []).join(", "),
    languagesText: (p.languages ?? []).join(", "),
    isFeatured: !!p.isFeatured,
  });

  /* =====================
     State
  ===================== */
  const [form, setForm] = useState<FormState>(() =>
    buildFormFromProfile(safeProfile)
  );
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // tutorProfile পরে load হলে form re-sync
  useEffect(() => {
    setForm(buildFormFromProfile(safeProfile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeProfile.id]);

  /* =====================
     Helpers
  ===================== */
  const parseList = (text: string) =>
    text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const onChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const validate = () => {
    if (!form.headline.trim()) return "Headline is required.";
    if (form.hourlyRate < 0) return "Hourly rate cannot be negative.";
    if (!form.currency.trim()) return "Currency is required.";

    const subjects = parseList(form.subjectsText);
    const languages = parseList(form.languagesText);

    if (subjects.length === 0) return "At least 1 subject is required.";
    if (languages.length === 0) return "At least 1 language is required.";

    return null;
  };

  /* =====================
     Submit
  ===================== */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const v = validate();
    if (v) {
      toast.error(v);
      return;
    }

    const payload: TutorProfilePayload = {
      headline: form.headline.trim(),
      about: form.about.trim(),
      hourlyRate: Number(form.hourlyRate) || 0,
      currency: form.currency.trim(),
      subjects: parseList(form.subjectsText),
      languages: parseList(form.languagesText),
      isFeatured: !!form.isFeatured,
    };

    setLoading(true);
    setErr(null);
    setMsg(null);

    try {
      const result = await tutorProfileCreateAndUpdate(payload);

      if (result?.error) {
        const message =
          (result.error as any)?.message || "Failed to save tutor profile";
        setErr(message);
        toast.error(message);
        return;
      }

      setMsg("Profile saved successfully.");
      toast.success("Profile saved!");
      router.refresh();
    } catch (e) {
      setErr("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = tutorProfile === null;

  /* =====================
     UI
  ===================== */
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
              <b>No profile found.</b> Fill the form below to create your tutor
              profile.
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
              <b>Rating:</b> {safeProfile.ratingAvg} ({safeProfile.totalReviews}{" "}
              reviews)
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

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
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
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Saving..." : isEmpty ? "Create Profile" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
