import Sidebar from "@/components/marketing/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed width to match design */}
      <aside className="w-[260px] fixed inset-y-0 left-0 z-50">
        <Sidebar isOpen />
      </aside>

      {/* Main Content - Offset by sidebar width */}
      <main className="flex-1 ml-[260px] bg-white">
        
        {/* About / Hero Section */}
        <section className="p-16 flex gap-12 items-start max-w-5xl">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">About BIRD</h1>
            <p className="text-slate-400 font-medium mb-6">Boston Immigrant Resource Dashboard</p>
            <p className="text-slate-600 leading-relaxed max-w-2xl mb-8">
              To provide real-time, accessible information on essential resources for immigrants, 
              refugees, and service providers—ensuring timely and effective support. 
              To foster a "city of belonging" by creating a more connected and efficient support network.
            </p>
            <div className="flex gap-25">
              <button className="flex items-center gap-2 bg-[#4E61F6] text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-[#3F51B5] transition">
                <img 
                  src="/icons/dashboard.png" 
                  alt="Dashboard Icon"
                  className="w-5 h-5 object-contain brightness-0 invert"
                />
                Dashboard
              </button>

              <button className="flex items-center gap-2 bg-[#4E61F6] text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-[#3F51B5] transition">
                <img 
                  src="/icons/pages.png" 
                  alt="Pages Icon"
                  className="w-5 h-5 object-contain brightness-0 invert"
                />
                My Services
              </button>
            </div>
          </div>


          
          <div className="w-[400px]">
            <img 
              src="/img/group_photo.png"              
              alt="Group" 
              className="rounded-2xl w-full h-64 object-cover shadow-md" 
            />
          </div>
        </section>

        {/* Blue Stats Bar */}
        <div className="bg-gradient-to-b from-[#4E61F6] to-[#2C2F8F] grid grid-cols-4 py-10 px-8 text-center text-white">
          <div>
            <div className="text-5xl font">2,500 +</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Social Worker Served</div>
          </div>
          <div>
            <div className="text-5xl font">500 +</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Resources Available</div>
          </div>
          <div>
            <div className="text-5xl font">150 +</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Services Locations</div>
          </div>
          <div>
            <div className="text-5xl font">5 +</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Years of Experiences</div>
          </div>
        </div>

        {/* Why BIRD Matters */}
       <section className="py-16 px-16 mx-auto flex flex-col items-center">
          {/* Header: Centered and full width of its container */}
          <h2 className="text-5xl font-bold text-slate-800 mb-10 w-full text-center">
            Why BIRD Matters
          </h2>

          {/* Body Text: Extended width, text remains left-aligned */}
          <div className="space-y-6 text-slate-600 leading-loose text-lg w-full max-w-6xl text-left">
            <p>
              Boston is a city shaped and strengthened by immigrants, yet too often new arrivals and those who serve them struggle to find up-to-date, reliable information about essential resources. Whether it’s shelter, legal services, English classes, or job training, the systems meant to help can feel confusing, outdated, and fragmented.
            </p>
            <p>
              That’s where the Boston Immigrant Resource Dashboard (BIRD) comes in. Over the past year, leaders across the city have been collaborating to build a dynamic, real-time platform. BIRD allows immigrant-facing providers to post and update their available services, so providers and clients can quickly see what’s available through a simple green–yellow–red light display.
            </p>
          </div>
        </section>

        <section className="py-20 px-16 bg-gray-50">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-800 mb-4">
              Our Partners
            </h2>
            <p className="text-slate-500 max-w-6xl mx-auto text-left">
              BIRD is accessible through a private dashboard. If your organization is working with immigrants in the Greater Boston area, use the “Contact Us” form to schedule a call or meeting for a BIRD orientation and how your organization can be included here. 

            </p>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            {/* Card */}
            <div className="bg-white rounded-xl shadow-sm h-28 px-6 flex items-center justify-center">
              <img src="/img/city.png" className="max-h-full w-auto object-contain" />
            </div>

            <div className="bg-white rounded-xl shadow-sm h-28 px-6 flex items-center justify-center">
              <img src="/img/usa.png" className="max-h-20 w-auto object-contain" />
            </div>

            <div className="bg-white rounded-xl shadow-sm h-28 px-6 flex items-center justify-center">
              <img src="/img/fellowship.png" className="max-h-20 w-auto object-contain" />
            </div>

            <div className="bg-white rounded-xl shadow-sm h-28 px-6 flex items-center justify-center">
              <img src="/img/mosaic.jpg" className="max-h-20 w-auto object-contain" />
            </div>

            <div className="bg-white rounded-xl shadow-sm h-28 px-6 flex items-center justify-center">
              <img src="/img/alliance.png" className="max-h-20 w-auto object-contain" />
            </div>

            <div className="bg-white rounded-xl shadow-sm h-28 px-6 flex items-center justify-center">
              <img src="/img/gospel.png" className="max-h-20 w-auto object-contain" />
            </div>

            <div className="bg-white rounded-xl shadow-sm h-28 px-6 flex items-center justify-center">
              <img src="/img/collab.png" className="max-h-full w-auto object-contain" />
            </div>

            <div className="bg-white rounded-xl shadow-sm h-28 px-6 flex items-center justify-center">
              <img src="/img/precor.png" className="max-h-full w-auto object-contain" />
            </div>

          </div>
        </section>

        <footer className="bg-gradient-to-b from-[#4E61F6] to-[#2C2F8F] text-white py-16 px-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Title */}
            <h3 className="text-2xl font-semibold mb-4">BIRD</h3>

            {/* Description */}
            <p className="text-white/80  leading-relaxed">
              To provide real-time, accessible information on essential resources for immigrants,
              refugees, and service providers—ensuring timely and effective support.
            </p>

          </div>
        </footer>

      </main>
    </div>
  );
}