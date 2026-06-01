export default function SocialProofBar() {
  return (
    <section className="border-y border-lightgray bg-white py-8">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-midgray">
          <span className="font-medium text-darkgray">
            Trusted by <strong className="text-navy">2,000+</strong> founders
          </span>
          <span className="hidden text-lightgray sm:block">|</span>
          <span>As seen in</span>
          <span className="font-semibold text-navy">Forbes</span>
          <span className="text-lightgray">•</span>
          <span className="font-semibold text-navy">TechCrunch</span>
          <span className="text-lightgray">•</span>
          <span className="font-semibold text-navy">Product Hunt</span>
        </div>
      </div>
    </section>
  );
}
