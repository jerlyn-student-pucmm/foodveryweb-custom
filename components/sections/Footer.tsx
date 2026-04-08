export function Footer() {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <img
          alt="Logo"
          className="h-20 mx-auto mb-8 brightness-0 invert"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGazDtueOPMtq_L2kx-VScolYr5ShwoXJHRWns9SKf1RILsI1z5lbMb5-b_tcBWhH5n8039vECwG1p2Fii0SvgqudZ-0GKYgy0409AmB828gSobh_Kc9JjJ7qsD5daQbv6RiVxgVDZCzedxp4xjx4-gwaIYocm-O6cQeSldoHKuYNlEKswt7dlpAVS64QUjp4LOKx_DSD2CeqdhrnWHW_HgvttGrzDMGqHfM6i4NEoEBBkq5d77KVx6B7jG84eRB1hVg3PtARpTS4"
        />
        <p className="max-w-md mx-auto text-white/70 mb-8">
          Your daily dose of tropical energy. Proudly serving the community of Las Terrenas since 2021.
        </p>
        <div className="flex justify-center gap-8 mb-12">
          <a className="hover:text-secondary transition-colors" href="#">
            Menu
          </a>
          <a className="hover:text-secondary transition-colors" href="#">
            About
          </a>
          <a className="hover:text-secondary transition-colors" href="#">
            Careers
          </a>
          <a className="hover:text-secondary transition-colors" href="/privacy">
            Privacy Policy
          </a>
        </div>
        <p className="text-sm text-white/40">© 2024 Food Very Coffee. All rights reserved.</p>
      </div>
    </footer>
  );
}
