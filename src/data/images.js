/**
 * Image library. Photos are served by Unsplash (free licence, no API key).
 * To use your own photos, put them in /public/images and replace `id` with `src: '/images/your-file.jpg'`.
 */

const unsplash = (id, w, h) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75&w=${w}${h ? `&h=${h}` : ''}`;

const build = ({ id, src, alt }) => ({
  alt,
  src: src || unsplash(id, 1200),
  // Responsive widths for srcSet; local images skip this.
  srcSet: src ? undefined : [480, 800, 1200, 1600].map((w) => `${unsplash(id, w)} ${w}w`).join(', '),
});

export const images = {
  hero: build({
    id: 'photo-1573384666979-2b1e160d2d08',
    alt: 'A woman stretching with one arm raised high in a bright, plant-filled living room',
  }),
  guidedExercise: build({
    id: 'photo-1571019614242-c5c5dee9f50b',
    alt: 'A physiotherapist supporting a patient’s posture during a guided strengthening exercise',
  }),
  homeVisit: build({
    id: 'photo-1581056771107-24ca5f033842',
    alt: 'A clinician reviewing progress notes with a patient seated comfortably at home',
  }),
  manualTherapy: build({
    id: 'photo-1519823551278-64ac92734fb1',
    alt: 'A therapist’s hands applying gentle manual therapy to a patient’s back',
  }),
  kneeTherapy: build({
    id: 'photo-1617952986600-802f965dcdbc',
    alt: 'Hands-on soft tissue therapy around the knee after surgery',
  }),
  wristSupport: build({
    id: 'photo-1597764690523-15bea4c581c9',
    alt: 'A physiotherapist fitting a supportive wrist brace',
  }),
  neuro: build({
    id: 'photo-1559757175-5700dde675bc',
    alt: 'An anatomical model of the brain and a neuron',
  }),
  elderCare: build({
    id: 'photo-1631217868264-e5b90bb7e133',
    alt: 'A clinician explaining an exercise plan to an older patient',
  }),
  sport: build({
    id: 'photo-1607962837359-5e7e89f86776',
    alt: 'Runners training outdoors in the morning sun',
  }),
  homeExercise: build({
    id: 'photo-1571019613454-1cb2f99b2d8b',
    alt: 'A woman doing a core strengthening exercise on a mat at home',
  }),
  stretching: build({
    id: 'photo-1518611012118-696072aa579a',
    alt: 'People doing guided mobility and stretching exercises',
  }),
  care: build({
    id: 'photo-1584515933487-779824d29309',
    alt: 'A caregiver gently holding a patient’s hand',
  }),
};
