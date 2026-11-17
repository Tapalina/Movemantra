/**
 * Service content. Edit freely – the Services grid, detail pages, footer links and sitemap
 * are all generated from this list.
 *
 * Copy guideline: describe what physiotherapy *aims* to do and what a session involves.
 * Avoid promising cures, timeframes or specific outcomes.
 *
 * `icon` is a key from src/components/ui/Icon.jsx; `image` is a key from src/data/images.js.
 * Keep this file free of JSX/asset imports (the sitemap script imports it in Node).
 */

export const services = [
  {
    slug: 'orthopaedic-physiotherapy',
    title: 'Orthopaedic Physiotherapy',
    icon: 'bone',
    image: 'wristSupport',
    summary:
      'Assessment and treatment for joint, muscle, bone and ligament problems – from stiff necks to painful knees.',
    intro: [
      'Orthopaedic physiotherapy focuses on the musculoskeletal system: your joints, muscles, bones, tendons and ligaments. Whether a problem came on suddenly or has been building for years, the aim is to understand what is driving it and help you move more comfortably.',
      'Your physiotherapist will assess how you move, identify the structures involved and build a plan around your daily routine – so treatment fits into your life at home.',
    ],
    helpsWith: [
      'Neck, shoulder and back pain',
      'Knee, hip and ankle problems',
      'Arthritis-related stiffness',
      'Tendon and ligament strains',
      'Postural discomfort from desk work',
      'Recovery after fractures (once cleared by your doctor)',
    ],
    sessionIncludes: [
      'Detailed movement and posture assessment',
      'Hands-on (manual) therapy where appropriate',
      'Progressive strengthening and mobility exercises',
      'Advice on activity, ergonomics and pacing',
    ],
    seo: {
      title: 'Orthopaedic Physiotherapy at Home',
      description:
        'Home visit physiotherapy for joint, muscle and back problems. Personalised orthopaedic assessment, exercise and hands-on care from MoveMantra.',
    },
  },
  {
    slug: 'sports-injury-rehabilitation',
    title: 'Sports Injury Rehabilitation',
    icon: 'dumbbell',
    image: 'sport',
    summary:
      'Structured rehab to help you recover from sprains, strains and overuse injuries and return to the sport you love.',
    intro: [
      'Sports injuries are frustrating – especially when you are keen to get back to training. Sports injury rehabilitation combines careful assessment with a staged plan that rebuilds strength, control and confidence.',
      'Whether you play recreationally or competitively, your programme is shaped around your sport, your goals and how your body is responding week to week.',
    ],
    helpsWith: [
      'Ankle and knee sprains',
      'Muscle strains (hamstring, calf, groin)',
      'Shoulder and elbow overuse injuries',
      'Runner’s knee and shin pain',
      'Ligament injuries, including post-ACL care',
      'Return-to-sport preparation',
    ],
    sessionIncludes: [
      'Injury and load assessment',
      'Graded strengthening and conditioning',
      'Balance, agility and sport-specific drills',
      'Guidance on training load and injury prevention',
    ],
    seo: {
      title: 'Sports Injury Rehabilitation at Home',
      description:
        'Sports injury rehabilitation delivered at home. Staged, goal-focused physiotherapy to rebuild strength and confidence for your return to sport.',
    },
  },
  {
    slug: 'neurological-rehabilitation',
    title: 'Neurological Rehabilitation',
    icon: 'brain',
    image: 'neuro',
    summary: 'Patient, goal-led therapy for people living with stroke, Parkinson’s and other neurological conditions.',
    intro: [
      'Neurological conditions can affect movement, balance, coordination and independence. Neurological rehabilitation aims to help you make the most of your abilities and stay as active and independent as possible.',
      'Treating you at home is especially valuable here: your physiotherapist works with you in the real spaces you move through every day, and can involve family members and carers in the plan.',
    ],
    helpsWith: [
      'Recovery after stroke',
      'Parkinson’s disease',
      'Multiple sclerosis',
      'Peripheral neuropathy',
      'Balance and walking difficulties',
      'Recovery after spinal or head injury',
    ],
    sessionIncludes: [
      'Functional assessment of movement and balance',
      'Task-specific practice (transfers, walking, reaching)',
      'Strength, coordination and balance training',
      'Guidance for family members and carers',
    ],
    seo: {
      title: 'Neurological Rehabilitation at Home',
      description:
        'Home-based neurological physiotherapy for stroke, Parkinson’s, MS and balance difficulties. Goal-led rehabilitation in familiar surroundings.',
    },
  },
  {
    slug: 'post-operative-rehabilitation',
    title: 'Post-operative Rehabilitation',
    icon: 'heartPulse',
    image: 'kneeTherapy',
    summary:
      'Guided recovery after surgery – including knee and hip replacements – working alongside your surgeon’s protocol.',
    intro: [
      'The weeks after surgery are when good guidance matters most. Post-operative rehabilitation helps you regain movement, strength and independence safely, in line with the instructions from your surgical team.',
      'Home visits mean you do not have to travel while you are still sore or limited – your physiotherapist comes to you and adapts exercises to your home environment.',
    ],
    helpsWith: [
      'Knee and hip replacement',
      'ACL and other ligament reconstruction',
      'Shoulder surgery',
      'Spinal surgery',
      'Fracture fixation',
      'General deconditioning after a hospital stay',
    ],
    sessionIncludes: [
      'Review of your surgeon’s guidelines and precautions',
      'Range-of-motion and strengthening exercises',
      'Walking, stair and transfer practice',
      'Swelling and comfort management advice',
    ],
    seo: {
      title: 'Post-operative Physiotherapy at Home',
      description:
        'Physiotherapy at home after knee replacement, hip replacement, ligament reconstruction and other surgery. Safe, guided recovery from MoveMantra.',
    },
  },
  {
    slug: 'geriatric-physiotherapy',
    title: 'Geriatric Physiotherapy',
    icon: 'personStanding',
    image: 'elderCare',
    summary: 'Gentle, respectful care that supports strength, balance and independence for older adults.',
    intro: [
      'Staying active is one of the best ways to stay independent as we get older. Geriatric physiotherapy focuses on maintaining strength, balance, mobility and confidence in everyday tasks.',
      'Sessions are unhurried and adapted to each person – and because they happen at home, your physiotherapist can also look at practical ways to make daily routines safer.',
    ],
    helpsWith: [
      'Balance concerns and fear of falling',
      'Age-related stiffness and weakness',
      'Arthritis',
      'Osteoporosis (with medical guidance)',
      'Recovery after illness or hospital stay',
      'Walking aid assessment and training',
    ],
    sessionIncludes: [
      'Strength, balance and mobility assessment',
      'Gentle, progressive exercise programme',
      'Home safety suggestions',
      'Involvement of family members where helpful',
    ],
    seo: {
      title: 'Geriatric Physiotherapy at Home',
      description:
        'Physiotherapy at home for older adults – balance, strength, mobility and independence. Gentle, personalised care from MoveMantra.',
    },
  },
  {
    slug: 'pain-management',
    title: 'Pain Management',
    icon: 'activity',
    image: 'manualTherapy',
    summary:
      'Understand your pain and build a plan to move more comfortably, using exercise, hands-on care and education.',
    intro: [
      'Living with ongoing pain can affect sleep, mood, work and the things you enjoy. Physiotherapy for pain management takes a whole-person approach: understanding your pain, finding what eases it and gradually building your capacity to do more.',
      'Your plan is collaborative – we work with you to set realistic goals and adjust as you go.',
    ],
    helpsWith: [
      'Persistent low back and neck pain',
      'Joint pain and arthritis',
      'Sciatica-type symptoms',
      'Headaches linked to neck and posture',
      'Muscle tension and stiffness',
      'Flare-up planning',
    ],
    sessionIncludes: [
      'Thorough pain history and movement assessment',
      'Hands-on techniques where appropriate',
      'Graded activity and exercise',
      'Practical education and self-management strategies',
    ],
    seo: {
      title: 'Physiotherapy for Pain Management at Home',
      description:
        'Home physiotherapy for back pain, neck pain, joint pain and persistent pain. A personalised, whole-person plan from MoveMantra.',
    },
  },
  {
    slug: 'home-based-rehabilitation',
    title: 'Home-based Rehabilitation',
    icon: 'house',
    image: 'homeExercise',
    summary:
      'Complete rehabilitation programmes delivered where you live – ideal when travelling to a clinic is difficult.',
    intro: [
      'Home-based rehabilitation brings the full physiotherapy process to your door: assessment, treatment, exercise and progress reviews. It suits anyone who finds travel difficult, prefers privacy, or simply wants treatment to fit around family and work.',
      'Working in your own space also means your exercises are designed around the furniture, stairs and routines you actually use.',
    ],
    helpsWith: [
      'Limited mobility or difficulty travelling',
      'Recovery after a hospital discharge',
      'Long-term conditions needing regular support',
      'Busy schedules that make clinic visits hard',
      'Patients who prefer privacy and comfort',
      'Ongoing maintenance programmes',
    ],
    sessionIncludes: [
      'Assessment in your home environment',
      'Exercises using everyday household items',
      'A clear, written home exercise plan',
      'Regular reviews and progression',
    ],
    seo: {
      title: 'Home-based Rehabilitation Services',
      description:
        'Home-based rehabilitation and physiotherapy at your doorstep. Personalised assessment, treatment and exercise plans from MoveMantra.',
    },
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
