export default function Hero() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            Smart Notes for <br /> Every Class & Subject
          </h1>

          <p className="mt-4 text-gray-600 max-w-md">
            Search, read and manage notes class-wise and subject-wise.
            Create your own notes after sign up.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-md">
              Browse Notes
            </button>
            <button className="border border-black px-6 py-3 rounded-md">
              Create Notes
            </button>
          </div>
        </div>

        {/* Right (Image Placeholder) */}
        <div className="bg-white rounded-xl shadow-lg h-72 flex items-center justify-center text-gray-400">
          Hero Image / Illustration
        </div>

      </div>
    </section>
  );
}
