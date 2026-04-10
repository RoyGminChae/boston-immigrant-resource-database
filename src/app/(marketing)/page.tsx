import Sidebar from "@/components/marketing/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar - Fixed width to match design */}
      <aside className="w-[260px] fixed inset-y-0 left-0 z-50">
        <Sidebar isOpen activePage="About BIRD" />
      </aside>

      {/* Main Content - Offset by sidebar width */}
      <main className="flex-1 ml-[260px] bg-white">

        {/* Hero Section - Full width background image with overlay */}
        <section className="relative h-[550px] w-full  overflow-hidden">
          <img
            src="/img/land.png"
            alt="Boston skyline"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

          {/* Hero content - Changed to justify-end and added pb-16 to match bottom alignment */}
          {/* Hero content */}
          <div className="relative z-10 flex h-auto flex-col justify-end px-10 pb-3 pt-70">
            {/* Titles remain stacked */}
            <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">
              Welcome to BIRD
            </h1>
            <p className="text-white/90 text-xl font-medium mb-10">
              Boston Immigrant Resource Dashboard
            </p>

            {/* CTA Row - This is where the magic happens */}
            <div className="flex items-end justify-between w-full">
              {/* Left Side: Button */}
              <button className="bg-[#4E61F6] hover:bg-[#3F51B5] transition text-white px-10 py-3 rounded-lg shadow-lg font-semibold text-sm shrink-0">
                Sign Up
              </button>

              {/* Right Side: Description Text */}
              <div className="max-w-[365px] border-l border-white/20 pl-6">
                <p className="text-white/80 text-sm leading-relaxed hidden md:block">
                  To provide real-time, accessible information on essential resources for 
                  immigrants, refugees, and service providers—ensuring timely and 
                  effective support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About BIRD Section */}
        <section className="py-14 px-20 max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">About BIRD</h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            Boston is a city{" "}
            <span className="underline underline-offset-2">shaped and strengthened</span> by immigrants, yet too often new
            arrivals and those who serve them struggle to find up-to-date, reliable information
            about essential resources. Whether it's shelter, legal services, English classes, or
            job training, the systems meant to help can feel confusing, outdated, and
            fragmented.That's where the Boston Immigrant Resource Dashboard (BIRD) comes in. Over the past
            year, leaders across the city have been collaborating to build a dynamic, real-time
            platform. BIRD allows immigrant-facing providers to post and update their available
            services, so providers and clients can quickly see what's available through a simple
            green–yellow–red light display.
          </p>
        </section>

       {/* Group Photo Section */}
        {/* Group Photo - Full Width Bleed */}
       
        <section className="w-full overflow-hidden">
          <img
            src="/img/people.png"
            alt="Community group holding signs"
            /* 1. Removed rounded-xl and shadow-md to allow edge-to-edge bleed.
              2. Changed h-[720px] to h-[500px] (or your preferred crop height).
              3. object-top ensures we see heads and crop the bottom.
            */
            className="w-full h-[750px] object-cover object-top block"
          />
        </section>

        {/* Mission & Vision - Blue Background */}
        <section className="bg-[#3441A4] px-40 py-20">
          <div className="max-w-5xl space-y-12">
            <div>
              <h3 className="text-white text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/80 leading-relaxed text-base max-w-2xl">
                To provide real-time information on essential resources for immigrants, refugees,
                and service providers, ensuring timely and effective support.
              </p>
            </div>
            
            <div>
              <h3 className="text-white text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/80 leading-relaxed text-base max-w-2xl">
                To foster a "city of belonging" by creating a more connected and efficient support
                network for immigrants, refugees, and asylum seekers in Boston.
              </p>
            </div>
          </div>
        </section>

        {/* Our Partners */}
        <section className="py-16 px-14 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 text-center">Our Partners</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w">
              BIRD is accessible through a private dashboard. If your organization is working with
              immigrants in the Greater Boston area, use the "Contact Us" form to schedule a call or
              meeting for a BIRD orientation and how your organization can be included here.
            </p>

            {/* Logo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm h-24 px-5 flex items-center justify-center">
                <img src="/img/city.png" alt="City of Boston" className="max-h-full w-auto object-contain" />
              </div>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm h-24 px-5 flex items-center justify-center">
                <img src="/img/usa.png" alt="FSI USA" className="max-h-16 w-auto object-contain" />
              </div>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm h-24 px-5 flex items-center justify-center">
                <img src="/img/fellowship.png" alt="Fellowship" className="max-h-16 w-auto object-contain" />
              </div>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm h-24 px-5 flex items-center justify-center">
                <img src="/img/mosaic.jpg" alt="Mosaic" className="max-h-16 w-auto object-contain" />
              </div>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm h-24 px-5 flex items-center justify-center">
                <img src="/img/alliance.png" alt="True Alliance Center" className="max-h-16 w-auto object-contain" />
              </div>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm h-24 px-5 flex items-center justify-center">
                <img src="/img/gospel.png" alt="Gospel" className="max-h-16 w-auto object-contain" />
              </div>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm h-24 px-5 flex items-center justify-center">
                <img src="/img/collab.png" alt="Massachusetts Immigrant Collaborative" className="max-h-full w-auto object-contain" />
              </div>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm h-24 px-5 flex items-center justify-center">
                <img src="/img/precor.png" alt="iPrecor" className="max-h-full w-auto object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className=" bg-[#3441A4] text-white py-12 px-14">
          <div className="max-w-5xl">
            <h3 className="text-xl font-semibold mb-3">BIRD</h3>
            <p className="text-white/70 text-sm leading-relaxed ">
              To provide real-time, accessible information on essential resources for immigrants,
              refugees, and service providers—ensuring timely and effective support.
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}