-- Seed data for Fearless Logic AI

-- 1. Create a demo user
INSERT INTO users (id, name, email, email_verified, image)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Demo User',
  'demo@fearlesslogic.ai',
  NOW(),
  'https://avatars.githubusercontent.com/u/1?v=4'
) ON CONFLICT (email) DO NOTHING;

-- 2. Create a subscription for the demo user
INSERT INTO subscriptions (id, user_id, tier, status, trial_end)
VALUES (
  'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'pro',
  'active',
  NOW() + INTERVAL '14 days'
) ON CONFLICT (user_id) DO NOTHING;

-- 3. Create a sample project (Clarity Career Coaching)
INSERT INTO projects (id, user_id, title, business_type, business_idea, target_audience, status, blueprint)
VALUES (
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Clarity Career Coaching',
  'Career Coaching',
  'Help ambitious professionals transition to executive roles through a personalized 90-day roadmap.',
  'Ambitious mid-life professionals',
  'published',
  $json${
    "strategy": "Position as the go-to career strategist for ambitious professionals. Your unique angle: personalized roadmaps that bridge the gap between where clients are and where they want to be. Lead with transformation stories in your marketing. Differentiate by offering a proprietary 3-phase framework (Clarify → Accelerate → Excel) that produces measurable results within 90 days.",
    "pages": [
      {
        "id": "home",
        "name": "Home",
        "enabled": true,
        "sections": [
          {"type": "hero", "label": "Hero"},
          {"type": "features", "label": "Features"},
          {"type": "cta", "label": "CTA"}
        ],
        "headline": "Break Through to Your Next Executive Role",
        "cta": "Book a Free Discovery Call"
      },
      {
        "id": "about",
        "name": "About",
        "enabled": true,
        "sections": [
          {"type": "about", "label": "About"},
          {"type": "credentials", "label": "Credentials"}
        ],
        "headline": "With 15+ Years of Executive Coaching Experience",
        "cta": "Learn My Story"
      },
      {
        "id": "services",
        "name": "Services",
        "enabled": true,
        "sections": [
          {"type": "pricing", "label": "Pricing"},
          {"type": "features", "label": "Offerings"}
        ],
        "headline": "Transform Your Career with Personalized Coaching",
        "cta": "View Packages"
      },
      {
        "id": "testimonials",
        "name": "Testimonials",
        "enabled": true,
        "sections": [
          {"type": "testimonials", "label": "Testimonials"},
          {"type": "stats", "label": "Results"}
        ],
        "headline": "What My Clients Say",
        "cta": "Read Success Stories"
      },
      {
        "id": "contact",
        "name": "Contact",
        "enabled": true,
        "sections": [
          {"type": "contact", "label": "Contact Form"},
          {"type": "cta", "label": "Final CTA"}
        ],
        "headline": "Ready to Take the Next Step?",
        "cta": "Get in Touch"
      }
    ],
    "theme": {
      "id": "professional-blue",
      "name": "Professional Blue",
      "colors": ["#2D5A8E", "#1A1A2E", "#F5F7FA", "#FFFFFF", "#E8A838"]
    }
  }$json$::jsonb
) ON CONFLICT (id) DO NOTHING;

-- 4. Create a published site record for the project
INSERT INTO published_sites (id, project_id, subdomain, ssl_status)
VALUES (
  'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
  'clarity-coaching',
  'active'
) ON CONFLICT (project_id) DO NOTHING;
