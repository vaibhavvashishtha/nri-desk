import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const BENEFIT_MODES = {
  without: [
    ["Close the entire transaction without flying down to India", "Remote coordination and Power of Attorney support."],
    ["Lower TDS with Form 13 and capital gains optimisation", "Keep more of your sale proceeds working for you."],
    ["One partner instead of managing legal, tax and banking teams", "One accountable relationship manager from start to finish."],
    ["Verified buyers, transparent pricing and progress reports", "Clear updates at every milestone."],
    ["Paperless, secure documentation and reliable remittance", "Compliance completed before funds move abroad."],
  ],
  with: [
    ["Save time through one coordinated NRI desk", "No chasing multiple professionals across different time zones."],
    ["Plan tax before signing the sale agreement", "Apply the right structure and certificates at the right time."],
    ["Receive one clear written execution plan", "Defined scope, responsibilities, fees and milestones."],
    ["Stay informed with scheduled progress updates", "Know what is completed, pending and needed from you."],
    ["Move eligible funds overseas with confidence", "Bank-ready FEMA and tax documentation from one team."],
  ],
};

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [benefitTab, setBenefitTab] = useState("without");
  const [leadStatus, setLeadStatus] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleNavClick() {
    setNavOpen(false);
  }

  function handleLeadSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setLeadStatus("Thank you. A senior adviser will contact you within one business day.");
    form.reset();
  }

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubscribed(true);
    form.reset();
  }

  return (
    <div className="landing-page">
      <div className="topbar">
        Trusted by NRIs across 10+ countries <span>•</span> Secure, transparent, India-wide support
      </div>
      <header className="site-header">
        <div className="landing-container nav-wrap">
          <a className="brand" href="#top" aria-label="NRI One Desk home">
            <span className="brand-mark">N</span>
            <span>
              <strong>NRI One Desk</strong>
              <small>Property. Tax. FEMA.</small>
            </span>
          </a>
          <button
            className="menu-toggle"
            aria-label="Open navigation"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`main-nav${navOpen ? " open" : ""}`} aria-label="Main navigation" onClick={handleNavClick}>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#why-us">Why us</a>
            <a href="#partners">Partners</a>
            <a href="#countries">Countries</a>
            <a href="#insights">Insights</a>
            <a href="#faq">FAQs</a>
            <Link to="/app">TDS Calculator</Link>
          </nav>
          <a className="button button-small" href="#consultation">
            Free consultation <span>→</span>
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="landing-container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow">A single desk for global Indians</span>
              <h1>
                Everything an <em>NRI</em> needs in India,
                <br />
                handled from one desk.
              </h1>
              <p className="lead">Property, Tax, FEMA, Remittance.</p>
              <p>
                NRI One Desk is the single-window NRI practice of Nirula Gupta &amp; Co. Chartered Accountants. Clear
                updates, dependable execution and one point of contact, wherever you live.
              </p>
              <div className="hero-actions">
                <a className="button" href="#consultation">
                  Book free consultation <span>→</span>
                </a>
                <a className="button button-ghost" href="#services">
                  See what we do
                </a>
              </div>
              <div className="micro-trust">
                <span>✓ 30-minute expert call</span>
                <span>✓ No spam</span>
                <span>✓ Clear next steps</span>
              </div>
              <div className="need-row">
                <b>I need assistance with:</b>
                <a href="#services">Buying property</a>
                <a href="#services">NRI income tax filing</a>
                <a href="#services">Power of Attorney</a>
              </div>
            </div>
            <div className="expert-card reveal delay-1">
              <div className="expert-visual">
                <span className="visual-label">NRI property &amp; tax specialist</span>
                <div className="building-art">
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <div className="visual-stamp">CA</div>
              </div>
              <div className="expert-foot">
                <div className="avatar">NG</div>
                <div>
                  <b>Talk to CA Nirula Gupta</b>
                  <small>30+ years of experience</small>
                </div>
                <a href="#consultation">Book call</a>
              </div>
            </div>
          </div>
          <div className="landing-container stats reveal">
            <div>
              <b>100%</b>
              <span>Remote process</span>
            </div>
            <div>
              <b>Up to 35%</b>
              <span>Potential savings</span>
            </div>
            <div>
              <b>₹0</b>
              <span>Fee to understand</span>
            </div>
            <div>
              <b>15+</b>
              <span>Years of expertise</span>
            </div>
          </div>
        </section>

        <section className="section-pad" id="services">
          <div className="landing-container">
            <div className="section-heading">
              <span className="kicker">Our services</span>
              <h2>All the services you need under one roof</h2>
              <p>One carefully coordinated team for every property and compliance need in India.</p>
            </div>
            <div className="service-grid">
              <article className="service-card">
                <span className="icon">⌂</span>
                <small>01</small>
                <h3>NRI Property Sales &amp; Purchase</h3>
                <p>End-to-end handling of your property transaction, from due diligence through registration.</p>
                <ul>
                  <li>Title and document checks</li>
                  <li>Buyer sourcing and negotiation</li>
                  <li>Sale deed and registration</li>
                </ul>
                <a href="#consultation">Learn more →</a>
              </article>
              <article className="service-card">
                <span className="icon">₹</span>
                <small>02</small>
                <h3>NRI Taxation &amp; Form 15CB</h3>
                <p>Tax planning, returns and certificates built around your residential status.</p>
                <ul>
                  <li>Lower TDS certificates</li>
                  <li>Capital gains planning</li>
                  <li>ITR filing and notices</li>
                </ul>
                <a href="#consultation">Learn more →</a>
              </article>
              <article className="service-card">
                <span className="icon">✎</span>
                <small>03</small>
                <h3>Legal &amp; Power of Attorney</h3>
                <p>Practical legal support so matters progress without repeated travel to India.</p>
                <ul>
                  <li>POA drafting and attestation</li>
                  <li>Property documentation</li>
                  <li>Legal representation</li>
                </ul>
                <a href="#consultation">Learn more →</a>
              </article>
              <article className="service-card">
                <span className="icon">◎</span>
                <small>04</small>
                <h3>FEMA, Banking &amp; Remittance</h3>
                <p>Move and manage funds while staying aligned with RBI and FEMA requirements.</p>
                <ul>
                  <li>NRO/NRE account support</li>
                  <li>15CA/15CB certification</li>
                  <li>Repatriation of funds</li>
                </ul>
                <a href="#consultation">Learn more →</a>
              </article>
            </div>
            <div className="center">
              <a className="button" href="#consultation">
                Explore services →
              </a>
            </div>
          </div>
        </section>

        <section className="section-pad tint" id="process">
          <div className="landing-container">
            <div className="section-heading">
              <span className="kicker">Our process</span>
              <h2>
                Empowering NRIs, simplifying
                <br />
                property transactions
              </h2>
              <p>A transparent six-step journey, coordinated by a single relationship manager.</p>
            </div>
            <div className="process-grid">
              <article>
                <b>01</b>
                <span>Step 1</span>
                <h3>Free consultation</h3>
                <p>Understand your situation, goals and immediate priorities.</p>
              </article>
              <article>
                <b>02</b>
                <span>Step 2</span>
                <h3>Engagement &amp; plan</h3>
                <p>Receive a written scope, timeline, fees and responsibilities.</p>
              </article>
              <article>
                <b>03</b>
                <span>Step 3</span>
                <h3>Documentation</h3>
                <p>Share documents securely; we verify and organise everything.</p>
              </article>
              <article>
                <b>04</b>
                <span>Step 4</span>
                <h3>Tax structuring</h3>
                <p>Plan ownership, capital gains, TDS and remittance implications.</p>
              </article>
              <article>
                <b>05</b>
                <span>Step 5</span>
                <h3>Safe execution</h3>
                <p>We coordinate buyers, banks, lawyers and registration teams.</p>
              </article>
              <article>
                <b>06</b>
                <span>Step 6</span>
                <h3>Repatriation</h3>
                <p>Complete compliance and help remit eligible funds overseas.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-pad" id="why-us">
          <div className="landing-container split">
            <div>
              <span className="kicker">Why us</span>
              <h2>NRIs can save up to 35% on property selling</h2>
              <div className="tabs">
                <button className={benefitTab === "without" ? "active" : ""} onClick={() => setBenefitTab("without")}>
                  Without us
                </button>
                <button className={benefitTab === "with" ? "active" : ""} onClick={() => setBenefitTab("with")}>
                  With us
                </button>
              </div>
              <div className="family-visual" role="img" aria-label="Family enjoying their home">
                <div className="sun"></div>
                <div className="house">⌂</div>
                <div className="family">● ● ● ●</div>
                <span>Protecting family wealth across borders</span>
              </div>
              <div className="tab-actions">
                <a className="button" href="#consultation">
                  Book a call
                </a>
                <a className="button button-ghost" href="#process">
                  Explore the process
                </a>
              </div>
            </div>
            <div className="benefit-list">
              {BENEFIT_MODES[benefitTab].map(([title, description]) => (
                <div key={title}>
                  <i>✓</i>
                  <span>
                    <b>{title}</b>
                    <small>{description}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad tint testimonials">
          <div className="landing-container">
            <div className="section-heading">
              <span className="kicker">Testimonials</span>
              <h2>9/10 NRIs recommend NRI One Desk</h2>
            </div>
            <div className="quote-grid">
              <blockquote>
                <div className="stars">★★★★★</div>
                <p>“Closed remotely from New Jersey.”</p>
                <small>
                  We had been stuck for almost a year. Their team took charge, found a serious buyer and kept us
                  informed.
                </small>
                <footer>
                  <span>AS</span>
                  <b>
                    Amit &amp; Priya Sethi<small>New Jersey, USA</small>
                  </b>
                </footer>
              </blockquote>
              <blockquote>
                <div className="stars">★★★★★</div>
                <p>“They lowered our tax significantly.”</p>
                <small>The Form 13 process was explained clearly and completed in time for our sale registration.</small>
                <footer>
                  <span>RK</span>
                  <b>
                    Rohit Kapoor<small>London, UK</small>
                  </b>
                </footer>
              </blockquote>
              <blockquote>
                <div className="stars">★★★★★</div>
                <p>“Honest and responsive partner.”</p>
                <small>Professional advice, no surprises and regular updates despite the time difference.</small>
                <footer>
                  <span>DS</span>
                  <b>
                    Gurmeet Singh<small>Toronto, Canada</small>
                  </b>
                </footer>
              </blockquote>
            </div>
            <div className="recognition">
              <span>Recognised by</span>
              <b>ICAI</b>
              <b>RERA</b>
              <b>ASSOCHAM</b>
              <b>Chartered Accountants Worldwide</b>
            </div>
          </div>
        </section>

        <section className="section-pad" id="partners">
          <div className="landing-container">
            <div className="section-heading row-heading">
              <div>
                <span className="kicker">Our partners</span>
                <h2>Partner-led, not junior-led.</h2>
                <p>Every NRI engagement is directly supervised by senior professionals.</p>
              </div>
              <a className="button button-ghost" href="#consultation">
                Meet our partners →
              </a>
            </div>
            <div className="partner-grid">
              <article>
                <div className="portrait p1">
                  <span>NG</span>
                </div>
                <div>
                  <small>CA &amp; Managing Partner</small>
                  <h3>CA Neeraj Nirula</h3>
                  <p>Direct Tax, NRI taxation and real estate transactions with 30+ years of experience.</p>
                  <a href="#consultation">View profile →</a>
                </div>
              </article>
              <article>
                <div className="portrait p2">
                  <span>SG</span>
                </div>
                <div>
                  <small>CA &amp; Senior Partner</small>
                  <h3>CA Saini Gupta</h3>
                  <p>FEMA, RBI and cross-border banking specialist advising global Indian families.</p>
                  <a href="#consultation">View profile →</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-pad countries" id="countries">
          <div className="landing-container split compact">
            <div>
              <span className="kicker">Global reach</span>
              <h2>Serving Indians across 10 countries.</h2>
              <p>
                Wherever you are in the world, our India-based team works around your time zone and keeps every
                stakeholder aligned.
              </p>
              <a href="#consultation">Discuss your requirement →</a>
            </div>
            <div className="country-grid">
              <span>🇺🇸 United States</span>
              <span>🇨🇦 Canada</span>
              <span>🇬🇧 United Kingdom</span>
              <span>🇩🇪 Germany</span>
              <span>🇫🇷 France</span>
              <span>🇦🇪 UAE</span>
              <span>🇸🇬 Singapore</span>
              <span>🇦🇺 Australia</span>
              <span>🇳🇿 New Zealand</span>
              <span>🇳🇱 Netherlands</span>
            </div>
          </div>
        </section>

        <section className="section-pad" id="insights">
          <div className="landing-container">
            <div className="section-heading row-heading">
              <div>
                <span className="kicker">Blog</span>
                <h2>Insights from the NRI One Desk</h2>
              </div>
              <a href="#">View all →</a>
            </div>
            <div className="filter-row">
              <button className="active">Property</button>
              <button>Tax</button>
              <button>FEMA &amp; Remittance</button>
              <button>NRI Banking</button>
            </div>
            <div className="article-grid">
              <article>
                <div className="article-image skyline"></div>
                <small>8 min read · NRI property</small>
                <h3>Why a 30-day delay in India can change your property sale tax</h3>
                <p>The dates that matter, documents to prepare and how to avoid expensive surprises.</p>
                <a href="#">Read more →</a>
              </article>
              <article>
                <div className="article-image papers"></div>
                <small>6 min read · Tax</small>
                <h3>Form 13 for NRIs: a practical guide to lower TDS</h3>
                <p>When to apply, what the tax officer reviews and typical timelines.</p>
                <a href="#">Read more →</a>
              </article>
              <article>
                <div className="article-image bank"></div>
                <small>7 min read · Banking</small>
                <h3>NRO to overseas account: your remittance checklist</h3>
                <p>A step-by-step guide to 15CA, 15CB and bank documentation.</p>
                <a href="#">Read more →</a>
              </article>
            </div>
          </div>
        </section>

        <section className="section-pad tint" id="faq">
          <div className="landing-container">
            <div className="section-heading">
              <span className="kicker">FAQs</span>
              <h2>Frequently asked questions</h2>
              <p>Quick answers across our four most asked NRI categories.</p>
            </div>
            <div className="faq-layout">
              <div className="faq-tabs">
                <button className="active">Legal</button>
                <button>Tax</button>
                <button>Remittance</button>
                <button>NRI Banking</button>
              </div>
              <div className="accordions">
                <details open>
                  <summary>Can I sell property in India without travelling?</summary>
                  <p>
                    Yes. A carefully drafted and attested Power of Attorney can allow a trusted representative to
                    complete most steps. We coordinate the documentation and registration process.
                  </p>
                </details>
                <details>
                  <summary>How much TDS applies when an NRI sells property?</summary>
                  <p>
                    TDS depends on the nature and value of the capital gain. A lower deduction certificate may reduce
                    excessive withholding before the sale.
                  </p>
                </details>
                <details>
                  <summary>Can sale proceeds be sent outside India?</summary>
                  <p>
                    Eligible funds can generally be repatriated after taxes and FEMA documentation are completed,
                    subject to bank and regulatory limits.
                  </p>
                </details>
                <details>
                  <summary>How do I get started?</summary>
                  <p>Book a free 30-minute consultation. We will assess your situation and send a written scope with next steps.</p>
                </details>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad" id="consultation">
          <div className="landing-container consultation">
            <div className="consult-visual">
              <span className="eyebrow">CA-led NRI advisory</span>
              <div className="line-art">
                NRI
                <br />
                ONE
                <br />
                DESK
              </div>
              <small>India property · Tax · FEMA</small>
            </div>
            <div className="consult-copy">
              <span className="kicker">Schedule a call</span>
              <h2>A 30-minute free consultation with a partner.</h2>
              <p>
                Share your situation. We&rsquo;ll identify priorities, explain likely timelines and give you a clear
                plan, with no obligation.
              </p>
              <div className="contact-cards">
                <a href="tel:+919810001234">
                  <span>☎</span>
                  <b>
                    +91 98100 01234<small>Call or WhatsApp</small>
                  </b>
                </a>
                <a href="mailto:partners@nrionedesk.com">
                  <span>✉</span>
                  <b>
                    partners@nrionedesk.com<small>Response within one day</small>
                  </b>
                </a>
              </div>
              <a className="button" href="#property-form">
                Book your slot →
              </a>
            </div>
          </div>
        </section>

        <section className="section-pad community">
          <div className="landing-container">
            <div className="section-heading">
              <span className="kicker">Community</span>
              <h2>Join our community</h2>
              <p>Stay connected with practical India property, tax and compliance updates.</p>
            </div>
            <div className="community-grid">
              <article>
                <span className="icon">◉</span>
                <div>
                  <h3>WhatsApp</h3>
                  <p>Join 2,000+ NRIs receiving concise updates and consultation alerts.</p>
                  <a className="button button-ghost" href="#">
                    Join community →
                  </a>
                </div>
              </article>
              <article>
                <span className="icon">✉</span>
                <div>
                  <h3>Newsletter</h3>
                  <p>One useful cross-border property or tax insight in your inbox each month.</p>
                  <form className="newsletter" onSubmit={handleNewsletterSubmit}>
                    <input type="email" placeholder="Your email address" aria-label="Email address" required />
                    <button className="button" type="submit">
                      {subscribed ? "Subscribed" : "Subscribe"}
                    </button>
                  </form>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-pad tint form-section" id="property-form">
          <div className="landing-container split">
            <div>
              <span className="kicker">Get started</span>
              <h2>Tell us about your property in India</h2>
              <p>Share a few details and a senior member of our team will call you within one business day.</p>
              <ul className="check-list">
                <li>No fee, no obligation</li>
                <li>Information kept confidential</li>
                <li>Transparent pricing before work begins</li>
                <li>Available across 100+ cities in India</li>
              </ul>
            </div>
            <form className="lead-form" onSubmit={handleLeadSubmit}>
              <div>
                <label>
                  First name*
                  <input name="firstName" required />
                </label>
                <label>
                  Last name*
                  <input name="lastName" required />
                </label>
              </div>
              <div>
                <label>
                  Phone*
                  <input type="tel" name="phone" required />
                </label>
                <label>
                  Email*
                  <input type="email" name="email" required />
                </label>
              </div>
              <label>
                Address of property in India*
                <input name="address" required />
              </label>
              <label>
                Considering selling property?
                <span className="radio-row">
                  <input type="radio" name="selling" id="yes" value="yes" />
                  <label htmlFor="yes">Yes</label>
                  <input type="radio" name="selling" id="maybe" value="maybe" />
                  <label htmlFor="maybe">Maybe</label>
                  <input type="radio" name="selling" id="no" value="no" />
                  <label htmlFor="no">No</label>
                </span>
              </label>
              <label>
                Message
                <textarea name="message" rows="4"></textarea>
              </label>
              <div className="form-bottom">
                <small>
                  By submitting, you agree to our{" "}
                  <Link to="/privacy" style={{ textDecoration: "underline" }}>
                    privacy policy
                  </Link>
                  .
                </small>
                <button className="button" type="submit">
                  Submit →
                </button>
              </div>
              <p className="form-status" role="status">
                {leadStatus}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="landing-container footer-grid">
          <div>
            <a className="brand light" href="#top">
              <span className="brand-mark">N</span>
              <span>
                <strong>NRI One Desk</strong>
                <small>Property. Tax. FEMA.</small>
              </span>
            </a>
            <p>Single-window services for NRIs managing property, tax and money matters in India.</p>
            <p className="contact-lines">
              +91 98100 01234
              <br />
              partners@nrionedesk.com
              <br />
              New Delhi · Gurugram · India
            </p>
          </div>
          <div>
            <h4>Portal</h4>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#why-us">Why us</a>
            <a href="#partners">Partners</a>
            <a href="#insights">Insights</a>
          </div>
          <div>
            <h4>Practice areas</h4>
            <a href="#services">Property transactions</a>
            <a href="#services">NRI taxation</a>
            <a href="#services">FEMA compliance</a>
            <a href="#services">Power of Attorney</a>
            <a href="#services">Repatriation</a>
          </div>
          <div>
            <h4>Countries served</h4>
            <div className="footer-tags">
              <span>USA</span>
              <span>Canada</span>
              <span>UK</span>
              <span>UAE</span>
              <span>Singapore</span>
              <span>Australia</span>
            </div>
            <h4>Follow us</h4>
            <div className="socials">
              <a href="#">in</a>
              <a href="#">f</a>
              <a href="#">▶</a>
            </div>
          </div>
        </div>
        <div className="landing-container copyright">
          <span>© 2026 NRI One Desk. All rights reserved.</span>
          <span>Privacy · Terms · Disclaimer</span>
        </div>
      </footer>
      <a className="whatsapp" href="https://wa.me/919810001234" aria-label="Chat on WhatsApp">
        ◉
      </a>
    </div>
  );
}
